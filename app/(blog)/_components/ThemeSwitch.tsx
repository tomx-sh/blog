'use client'
import { useTheme } from "next-themes"
import { Tooltip, IconButton } from "@radix-ui/themes"
import { Sun, Moon } from "lucide-react"
import { useEffect } from "react"


export default function ThemeSwitch() {
    const { theme, systemTheme, resolvedTheme, setTheme } = useTheme()

    useEffect(() => {
        console.log(`Theme set to ${theme}${theme == 'system' ? ` (${resolvedTheme})` : ''}`)
    }, [theme, resolvedTheme])

    function handleClick() {
        if (theme == 'system' && systemTheme == 'dark') {
            setTheme('light')
        } else if (theme == 'system' && systemTheme == 'light') {
            setTheme('dark')
        } else {
            setTheme('system')
        }
    }


    return (
        <Tooltip content='Toggle dark mode'>
            <IconButton variant='ghost' size='1' onClick={handleClick}>
                { resolvedTheme == 'dark' ? <Moon size='16' /> : <Sun size='16' /> }
            </IconButton>
        </Tooltip>
    )
}
    