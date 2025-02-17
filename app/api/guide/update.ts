import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // Ensure this path matches your setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { id, title, content } = req.body;

        if (!id || !title || !content) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const updatedGuide = await prisma.guide.update({
            where: { id: id },
            data: { title, content },
        });

        return res.status(200).json(updatedGuide);
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
