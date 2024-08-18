import { Callout, Separator, Code, Link, Heading, Box } from '@radix-ui/themes';
import CustomCodeBlock from './CustomCodeBlock';
import { lora } from '@/app/fonts';


function CustomBlockquote(props: any) {
    return (
        <Callout.Root my='5'>
            {props.children[1].props.children}
        </Callout.Root>
    )
}

function CustomSeparator(props: any) {
    return <Separator size='4' my='5' />
}

function CustomCode(props: any) {
    return <Code>{props.children}</Code>
}

function CustomLink(props: any) {
    return <Link href={props.href}>{props.children}</Link>
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
    return <p className={lora.className} style={{color:'var(--gray-12)', textAlign: 'justify', margin: 'var(--space-3) 0' }}>{props.children}</p>
}

function CustomImage(props: any) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img src={props.src} alt={props.alt} style={{ maxWidth: '100%', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} />
}

function CustomH1(props: any) {
    return <Heading as='h1' size='8' mt='75px'>{props.children}</Heading>
}

function CustomH2(props: any) {
    return <Heading as='h2' size='7' mt='50px'>{props.children}</Heading>
}

function CustomH3(props: any) {
    return <Heading as='h3' size='4' mt='25px'>{props.children}</Heading>
}

function CustomOl(props: any) {
    return <ol className={lora.className} style={{ paddingInlineStart: '40px', margin: 'var(--space-3) 0'}}>{props.children}</ol>
}

function CustomUl(props: any) {
    return <ul className={lora.className} style={{ paddingInlineStart: '40px', margin: 'var(--space-3) 0'}}>{props.children}</ul>
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