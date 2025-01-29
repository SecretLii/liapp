import { prisma } from "@/lib/prisma";
import { EditGuideForm } from "@/app/admin/guides/[id]/edit/edit-guide-form";

export default async function EditGuidePage({ params }: { params: { id: string } }) {
    const guide = await prisma.guide.findUnique({
        where: { id: params.id },
        include: { game: true },
    });

    if (!guide) {
        return <p>Guide not found</p>;
    }

    return <EditGuideForm guide={guide} />;
}
