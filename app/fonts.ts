import { Inter, Roboto_Mono, Merriweather, Lora } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})

export const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
})

export const lora = Lora({
    subsets: ['latin'],
    display: 'swap',
    weight: '500'
})

export const new_york = localFont({
    src: '../public/fonts/NewYork.ttf',
    display: 'swap',
    weight: '700',
})


export const sf_pro = localFont({
    src: '../public/fonts/SF-Pro.ttf',
    display: 'swap',
    weight: '400',
})

export const sf_mono = localFont({
    src: '../public/fonts/SF-Mono-Medium.otf',
    display: 'swap',
    weight: '400',
    variable: '--sf-mono',
})