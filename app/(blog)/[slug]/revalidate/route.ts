import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug

    // Revalidate the home page containing the list of articles
    revalidatePath("/", "page");

    // Revalidate the article page
    if (slug) {
        revalidatePath(`/${slug}`, "page");
        redirect(`/${slug}`);
    }

    redirect("/");
}