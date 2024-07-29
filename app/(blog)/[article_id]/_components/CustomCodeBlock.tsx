'use client'
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { roboto_mono } from '@/app/fonts';
import { ScrollArea } from '@radix-ui/themes';


interface CustomCodeBlockProps {
    codeString: string,
    language: string
}

export default function CustomCodeBlock({ codeString, language }: CustomCodeBlockProps) {
    const { resolvedTheme } = useTheme();
    const codeTheme = resolvedTheme === 'dark' ? themes.nightOwl : themes.nightOwlLight;

    return (
        <CodeBlock code={codeString} language={language} theme={codeTheme}>
            <ScrollArea
                scrollbars='horizontal'
                style={{
                    backgroundColor: 'var(--gray-2)',
                    padding: 'var(--space-4)',
                    borderRadius: 'var(--radius-3)',
                    boxShadow: 'var(--shadow-2)',
                    fontSize: '0.8rem',
                    lineHeight: '0.9rem',
            }}>

                <CodeBlock.Code className={roboto_mono.className}>

                    <CodeBlock.LineContent>
                        <CodeBlock.Token />
                    </CodeBlock.LineContent>

                </CodeBlock.Code>

            </ScrollArea>
        </CodeBlock>
    )
}