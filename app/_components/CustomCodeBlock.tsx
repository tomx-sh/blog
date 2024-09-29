'use client'
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { Box, IconButton, Tooltip, Badge, Flex } from '@radix-ui/themes';
import { sf_mono } from '@/app/fonts';
import { Copy } from 'lucide-react';
import { useState } from 'react';


interface CustomCodeBlockProps {
    codeString: string,
    language: string
}


function CopyClipboardButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const copyToClipboard = () => {
        setCopied(true);
        setOpen(true);
        navigator.clipboard.writeText(text);
        setTimeout(() => {
            setCopied(false);
            setOpen(false);
        }, 1000);
    }

    return (
        <Tooltip content={copied ? 'Copied!' : 'Copy'} open={open} onOpenChange={setOpen} side='left'>
            <IconButton 
                aria-label='Copy to clipboard'
                variant='soft'
                onClick={copyToClipboard}
            >
                <Copy size={15}/>
            </IconButton>
        </Tooltip>
    )
}





export default function CustomCodeBlock({ codeString, language }: CustomCodeBlockProps) {
    const { resolvedTheme } = useTheme();
    //const codeTheme = resolvedTheme === 'dark' ? themes.nightOwl : themes.nightOwlLight;
    const codeTheme = resolvedTheme === 'dark' ? themes.dracula : themes.github;

    return (
        <Box position='relative'
            style={{
                backgroundColor: 'var(--gray-1)',
                borderRadius: 'var(--radius-3)',
                boxShadow: 'var(--shadow-2)',
                fontSize: 'var(--font-size-2)',
            }}
        
        >

            <Flex justify='between' width='100%' p='2'>
                <Badge>{language}</Badge>
                <CopyClipboardButton text={codeString} />
            </Flex>


            <Box overflow='scroll' p='6' pt='0'  >

                <CodeBlock code={codeString} language={language} theme={codeTheme}>
                    <CodeBlock.Code className={sf_mono.className} style={{ filter: 'grayscale(1)' }}>
                        <CodeBlock.LineContent>
                            <CodeBlock.Token />
                        </CodeBlock.LineContent>
                    </CodeBlock.Code>
                </CodeBlock>

                

            </Box>
        </Box>
    )
}