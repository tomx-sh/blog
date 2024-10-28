import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const params = req.nextUrl.searchParams;
    const slug = params.get("slug");

    if(!slug){
        revalidatePath("/", "page");
        return NextResponse.redirect("/");

    } else {
        revalidatePath(`/${slug}`, "page");
        return NextResponse.redirect(`/${slug}`);
    }
}