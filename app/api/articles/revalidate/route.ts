import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const params = req.nextUrl.searchParams;
    const slug = params.get("slug");

    // Revalidate the home page containing the list of articles
    revalidatePath("/", "page");

    // Revalidate the article page
    if (slug) {
        revalidatePath(`/${slug}`, "page");
        return NextResponse.redirect(`/${slug}`);
    }

    return NextResponse.redirect("/");
}