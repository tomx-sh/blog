import { getArticlesPagesIds, getPageTitle } from '../_notion/actions';
import Link from 'next/link';
import { Container, Section } from '@radix-ui/themes';


export default async function Home() {
    const pageIds = await getArticlesPagesIds();
    const titles = await Promise.all(pageIds.map(getPageTitle));

    return (
        <Container size='3' mx='5'>
            <Section>
                
            <h1>Articles</h1>
            <ul>
                {titles.map((title, index) => (
                    <li key={index}>
                        <Link href={`/${pageIds[index]}`}>
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
            </Section>
        </Container>

    );
}
