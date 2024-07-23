'use server'
import { Client, isFullPage } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';


export async function getMarkdown(pageId: string) {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
    const notionMdClient = new NotionToMarkdown({ notionClient });

    const mdBlocks = await notionMdClient.pageToMarkdown(pageId);
    const mdString = notionMdClient.toMarkdownString(mdBlocks).parent;

    return mdString;
}


export async function getArticlesPagesIds() {
    const notionClient   = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.databases.query({
        database_id: process.env.NOTION_DB_ID!,
        filter: { property: 'Publier', checkbox: { equals: true } }
    });

    const pageIds: string[] = [];
    for (const page of response.results) {
        if (isFullPage(page)) {
            pageIds.push(page.id);
        }
    }

    return pageIds;
}


export async function getNotionPage(pageId: string) {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
    const response = await notionClient.pages.retrieve({ page_id: pageId });

    if (!isFullPage(response)) {
        throw new Error('Page is not full');
    }

    return response;
}


export async function getPageTitle(pageId: string) {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.pages.properties.retrieve(
        { page_id: pageId, property_id: 'title' }
    )

    const responseAny = response as any; // Unfortunatelly Notion's API doesn't provide a handy type for this response
    const title = responseAny.results[0].title.text.content;

    return title;
}


export async function getDate(pageId: string): Promise<Date> {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.pages.properties.retrieve(
        { page_id: pageId, property_id: 'Date' }
    )

    const responseAny = response as any; // Unfortunatelly Notion's API doesn't provide a handy type for this response
    const rawDate = responseAny.date.start;
    const date = new Date(rawDate);

    return date;
}


interface Tag {
    id: string,
    name: string,
    color: string
}

export async function getTags(pageId: string) {
    const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

    const response = await notionClient.pages.properties.retrieve(
        { page_id: pageId, property_id: 'Tags' }
    )

    const responseAny = response as any; // Unfortunatelly Notion's API doesn't provide a handy type for this response
    const tags = responseAny.multi_select as Tag[];

    return tags;
}