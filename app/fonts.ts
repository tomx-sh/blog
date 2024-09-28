import localFont from 'next/font/local'


export const sf_mono = localFont({
    src: '../public/fonts/SF-Mono-Medium.otf',
    display: 'swap',
    weight: '400',
    variable: '--sf-mono',
})


export const new_york_small = localFont({
    variable: '--new-york-small',
    src: [
        {
            path: '../public/fonts/New-York/Small/NewYorkSmall-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/New-York/Small/NewYorkSmall-RegularItalic.otf',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../public/fonts/New-York/Small/NewYorkSmall-BoldItalic.otf',
            weight: '700',
            style: 'italic',
        }
    ]
})

export const new_york_large = localFont({
    variable: '--new-york-large',
    src: [
        {
            path: '../public/fonts/New-York/Large/NewYorkLarge-Heavy.otf',
            weight: '800',
            style: 'normal',
        },
    ]
})


export const sf_pro = localFont({
    variable: '--sf-pro',
    src: [
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-Ultralight.otf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-UltralightItalic.otf',
            weight: '100',
            style: 'italic',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-Thin.otf',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-ThinItalic.otf',
            weight: '200',
            style: 'italic',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-LightItalic.otf',
            weight: '300',
            style: 'italic',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-RegularItalic.otf',
            weight: '400',
            style: 'italic',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-MediumItalic.otf',
            weight: '500',
            style: 'italic',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-Semibold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-SemiboldItalic.otf',
            weight: '600',
            style: 'italic',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-Bold.otf',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-BoldItalic.otf',
            weight: '700',
            style: 'italic',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-Heavy.otf',
            weight: '800',
            style: 'normal',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-HeavyItalic.otf',
            weight: '800',
            style: 'italic',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-Black.otf',
            weight: '900',
            style: 'normal',
        },
        {
            path: '../public/fonts/SF-Pro/SF-Pro-Text-BlackItalic.otf',
            weight: '900',
            style: 'italic',
        },
    ],
    display: 'swap',
})