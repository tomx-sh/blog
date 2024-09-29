import { Client, isFullPage } from '@notionhq/client';
import { GetPagePropertyResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import { cache } from 'react';
import { revalidatePath } from 'next/cache';


export type Db = "articles" | "projects"

const getDatabaseId = (db: Db) => {
    switch (db) {
        case 'articles':
            return process.env.NOTION_DB_ARTICLES_ID!;
        case 'projects':
            return process.env.NOTION_DB_PROJECTS_ID!;
    }
}


export const getMarkdown = cache(async (pageId: string) => {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
    const notionMdClient = new NotionToMarkdown({ notionClient });

    const mdBlocks = await notionMdClient.pageToMarkdown(pageId);
    const mdString = notionMdClient.toMarkdownString(mdBlocks).parent;

    return mdString;
})


export const getPublishedPagesIds = cache(async (db: Db) => {
    const notionClient   = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.databases.query({
        database_id: getDatabaseId(db),
        filter: { property: 'Publier', checkbox: { equals: true } },
        sorts: [{ property: 'Date', direction: 'descending' }]
    });

    const pageIds: string[] = [];
    for (const page of response.results) {
        if (isFullPage(page)) {
            pageIds.push(page.id);
        }
    }

    return pageIds;
})


export const getFeaturedArticlesPagesIds = cache(async () => {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.databases.query({
        database_id: getDatabaseId('articles'),
        filter: {
            and: [
                { property: 'Publier', checkbox: { equals: true } },
                { property: 'Featured', checkbox: { equals: true } }
            ]
        }
    });

    const pageIds: string[] = [];
    for (const page of response.results) {
        if (isFullPage(page)) {
            pageIds.push(page.id);
        }
    }

    return pageIds;
})

export const getFeaturedProjectsPagesIds = cache(async () => {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.databases.query({
        database_id: getDatabaseId('projects'),
        filter: {
            and: [
                { property: 'Publier', checkbox: { equals: true } },
                { property: 'Featured', checkbox: { equals: true } }
            ]
        }
    });

    const pageIds: string[] = [];
    for (const page of response.results) {
        if (isFullPage(page)) {
            pageIds.push(page.id);
        }
    }

    return pageIds;
})


export const getNotionPage = cache(async (pageId: string) => {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
    const response = await notionClient.pages.retrieve({ page_id: pageId });

    if (!isFullPage(response)) {
        throw new Error('Page is not full');
    }

    return response;
})


export const getPageTitle = cache(async (pageId: string) => {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.pages.properties.retrieve(
        { page_id: pageId, property_id: 'title' }
    )

    const responseAny = response as any; // Unfortunatelly Notion's API doesn't provide a handy type for this response
    const title = responseAny.results[0].title.text.content as string;

    return title;
})


export const  getPageCoverImageUrl = cache(async (pageId: string) => {
    const page = await getNotionPage(pageId);
    
     if (!page.cover) {
            return undefined;
    } else {
        if (page.cover.type === 'external') {
            return page.cover.external.url;
        } else if (page.cover.type === 'file') {
            return page.cover.file.url;
        }
    }
})


export const getDatabaseCoverImageUrl = cache(async (db: Db) => {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.databases.retrieve({ database_id: getDatabaseId(db) });
    const responseAny = response as any; // Unfortunatelly Notion's API doesn't provide a handy type for this response

    response.properties.cover

    if (!responseAny.cover) {
        return undefined;
    } else {
        if (responseAny.cover.type === 'external') {
            return responseAny.cover.external.url;
        } else if (responseAny.cover.type === 'file') {
            return responseAny.cover.file.url;
        }
    }
})


export const getPageEmoji = cache(async (pageId: string) => {
    const page = await getNotionPage(pageId);

    if (!page.icon) {
        return null;
    } else {
        if (page.icon.type === 'emoji') {
            return page.icon.emoji;
        }
    }

    return null;
})


export const getDate = cache(async (pageId: string) => {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.pages.properties.retrieve(
        { page_id: pageId, property_id: 'Date' }
    )

    const responseAny = response as any; // Unfortunatelly Notion's API doesn't provide a handy type for this response
    const rawDate = responseAny.date.start;
    const date = new Date(rawDate);

    return date;
})


export interface Tag {
    id: string,
    name: string,
    color: string
}

export type TagProperty = 'Tags' | 'Features' | 'Stack'


export const getTags = cache(async ({ pageId, property }: { pageId: string, property: TagProperty }) => {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.pages.properties.retrieve(
        { page_id: pageId, property_id: property }
    )

    const responseAny = response as any; // Unfortunatelly Notion's API doesn't provide a handy type for this response
    const tags = responseAny.multi_select as Tag[];

    return tags;
})

export const getProperty = cache(async ({ pageId, property }: { pageId: string, property: string }) => {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.pages.properties.retrieve(
        { page_id: pageId, property_id: property }
    )

    const responseType = response.type;

    //console.log('response:', response);
    //console.log('responseType:', responseType);

    const responseAny = response as any; // Unfortunatelly Notion's API doesn't provide a handy type for this response

    switch (responseType) {
        case 'title':
            return response.title.plain_text;
        case 'rich_text':
            return response.rich_text.plain_text
        case 'number':
            return response.number
        case 'select':
            return response.select?.name;
        case 'multi_select':
            return response.multi_select.map((item: any) => item.name as string);
        case 'date':
            return response.date?.start;
        case 'checkbox':
            return response.checkbox
        case 'url':
            return response.url
        case 'email':
            return response.email
        case 'phone_number':
            return response.phone_number
        case 'property_item':
            return responseAny.results[0].rich_text.text.content as string;
        default:
            return 'Unknown type';
    }
})


export const clearCache = async (path: string) => {
    revalidatePath(path);
    return true;
}