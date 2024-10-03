import { Callout, Separator, Code, Link, Heading, Box } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
const CustomCodeBlock = dynamic(() => import('./CustomCodeBlock'), { ssr: false });
import { new_york_small, sf_pro, sf_mono } from '@/app/fonts';
import { getPageContentImageBlobUrl } from '../api/notion';


const textColor = 'var(--gray-12)';
const normalFont = sf_pro


function CustomBlockquote(props: any) {
    return (
        <Callout.Root my='5' className={new_york_small.className} style={{fontStyle: 'italic', filter: 'grayscale(1)'}}>
            {props.children[1].props.children}
        </Callout.Root>
    )
}

function CustomSeparator(props: any) {
    return <Separator size='4' my='5' />
}

function CustomCode(props: any) {
    return <Code className={sf_mono.className}>{props.children}</Code>
}

function CustomLink(props: any) {
    return <Link href={props.href} color='gray'>{props.children}</Link>
}

function CustomPre(props: any) {
    const codeString = props.children.props.children as string;
    const language = props.children.props.className.split('-')[1] as string;
    return (
        <Box my='5'>
            <CustomCodeBlock codeString={codeString} language={language} />
        </Box>
    )
}

function CustomParagraph(props: any) {
    return <p className={normalFont.className} style={{color: textColor, textAlign: 'justify', margin: 'var(--space-3) 0' }}>{props.children}</p>
}

async function CustomImage(props: any) {
    const imageUrl = await getPageContentImageBlobUrl(props.src) || props.src;
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img src={imageUrl} alt={props.alt} style={{ maxWidth: '100%', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} />
}

function CustomH1(props: any) {
    return <Heading as='h1' size='7' mt='var(--space-9)'>{props.children}</Heading>
}

function CustomH2(props: any) {
    return <Heading as='h2' size='6' mt='var(--space-8)'>{props.children}</Heading>
}

function CustomH3(props: any) {
    return <Heading as='h3' size='5' mt='var(--space-7)'>{props.children}</Heading>
}

function CustomOl(props: any) {
    return <ol className={normalFont.className} style={{ color: textColor, paddingInlineStart: '40px', margin: 'var(--space-3) 0'}}>{props.children}</ol>
}

function CustomUl(props: any) {
    return <ul className={normalFont.className} style={{ color: textColor, paddingInlineStart: '40px', margin: 'var(--space-3) 0'}}>{props.children}</ul>
}

const customComponents = {
    blockquote: CustomBlockquote,
    hr: CustomSeparator,
    code: CustomCode,
    a: CustomLink,
    pre: CustomPre,
    p: CustomParagraph,
    img: CustomImage,
    h1: CustomH1,
    h2: CustomH2,
    h3: CustomH3,
    ol: CustomOl,
    ul: CustomUl
}

export default customComponents;