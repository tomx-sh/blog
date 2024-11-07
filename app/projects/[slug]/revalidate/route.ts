import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug

    // Revalidate the home page containing the list of articles
    revalidatePath("/projects", "page");

    // Revalidate the article page
    if (slug) {
        revalidatePath(`/projects/${slug}`, "page");
        redirect(`/projects/${slug}`);
    }

    redirect("/projects");
}