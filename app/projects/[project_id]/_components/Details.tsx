import { DataList, Link } from "@radix-ui/themes";
import { Github, BriefcaseBusiness, Lightbulb, ExternalLink } from "lucide-react";
import { sf_mono } from "@/app/fonts";
import { getProperty } from "@/app/api/notion";


interface DetailsViewProps extends React.ComponentProps<typeof DataList.Root> {
    type: 'personnal' | 'professional';
    repositoryUrl?: string;
    publicUrl?: string;
}


function DetailsView({ type, repositoryUrl, publicUrl, ...props }: DetailsViewProps) {
    const iconMr = 7;
    const iconSize = 15;
    const labelStyle: React.CSSProperties = { fontFamily:'var(--sf-mono)', textTransform: 'uppercase' };

    return (
        <DataList.Root size='1' {...props}>


            <DataList.Item>
                <DataList.Label style={labelStyle} className={`${sf_mono.variable}`}>
                    {type === 'professional' ? <BriefcaseBusiness size={iconSize} style={{marginRight:iconMr}}/> : <Lightbulb size={iconSize} style={{marginRight:iconMr}}/>}
                    Context
                </DataList.Label>
                <DataList.Value style={{color:'var(--gray-11)'}}>{type === 'professional' ? 'Professional' : 'Personnal'}</DataList.Value>
            </DataList.Item>


            {repositoryUrl && (
                <DataList.Item>
                    <DataList.Label style={labelStyle} className={`${sf_mono.variable}`}>
                        <Github size={iconSize} style={{marginRight:iconMr}}/>Repository
                    </DataList.Label>
                    <DataList.Value><Link href={repositoryUrl} target="_blank">{repositoryUrl}</Link></DataList.Value>
                </DataList.Item>
            )}


            {publicUrl && (
                <DataList.Item>
                    <DataList.Label style={labelStyle} className={`${sf_mono.variable}`}>
                        <ExternalLink size={iconSize} style={{marginRight:iconMr}}/>Public URL
                    </DataList.Label>
                    <DataList.Value><Link href={publicUrl} target="_blank">{publicUrl}</Link></DataList.Value>
                </DataList.Item>
            )}
        </DataList.Root>
    )
}



interface DetailsProps extends React.ComponentProps<typeof DataList.Root> {
    project_id: string;
}

export default async function Details({ project_id, ...props }: DetailsProps) {
    const type = await getProperty({ pageId: project_id, property: 'Type' }) as 'Pro' | 'Perso';
    const repositoryUrl = await getProperty({ pageId: project_id, property: 'GitHub' }) as (string | undefined);
    const publicUrl = await getProperty({ pageId: project_id, property: 'Demo' }) as (string | undefined);

    const _type = type === 'Pro' ? 'professional' : 'personnal';

    return <DetailsView type={_type} repositoryUrl={repositoryUrl} publicUrl={publicUrl} {...props} />
}