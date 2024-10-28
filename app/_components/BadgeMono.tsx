import { Badge, BadgeProps } from "@radix-ui/themes";
import { sf_mono } from "@/app/fonts";
import '@radix-ui/themes/styles.css';
import '@/app/globals.css';

interface BadgeMonoProps extends BadgeProps {}


export default function BadgeMono(props: BadgeMonoProps) {
    return (
        <Badge
            {...props} className={`${sf_mono.variable} font-mono`}
            style={{fontFamily: 'var(--sf-mono)', fontWeight: 'normal'}}
        />
    )
}

