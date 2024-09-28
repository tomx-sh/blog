'use client'
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
import { ScrollArea } from '@radix-ui/themes';
import { sf_mono } from '@/app/fonts';


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
                    backgroundColor: 'var(--gray-1)',
                    padding: 'var(--space-6)',
                    borderRadius: 'var(--radius-3)',
                    boxShadow: 'var(--shadow-2)',
                    fontSize: '0.9rem',
                    lineHeight: '1.2rem',
            }}>

                <CodeBlock.Code className={sf_mono.className}>

                    <CodeBlock.LineContent>
                        <CodeBlock.Token />
                    </CodeBlock.LineContent>

                </CodeBlock.Code>

            </ScrollArea>
        </CodeBlock>
    )
}