import { Badge, BadgeProps } from "@radix-ui/themes";
import { sf_mono } from "@/app/fonts";

interface BadgeMonoProps extends BadgeProps {}


export default function BadgeMono(props: BadgeMonoProps) {
    return (
        <Badge {...props} className={`${sf_mono.variable}`} />
    )
}

