import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {

    const { id } = req.query;

    try {

        // GET Single Notice
        if (req.method === "GET") {

            const notice = await prisma.notice.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!notice) {
                return res.status(404).json({
                    message: "Notice not found",
                });
            }

            return res.status(200).json(notice);
        }

        // UPDATE
        if (req.method === "PUT") {

            const {
                title,
                body,
                category,
                priority,
                publishDate,
                image,
            } = req.body;

            const notice = await prisma.notice.update({

                where: {
                    id: Number(id),
                },

                data: {
                    title,
                    body,
                    category,
                    priority,
                    publishDate: new Date(publishDate),
                    image,
                },

            });

            return res.status(200).json(notice);
        }

        // DELETE

        if (req.method === "DELETE") {

            await prisma.notice.delete({

                where: {
                    id: Number(id),
                },

            });

            return res.status(200).json({
                message: "Notice deleted successfully",
            });
        }

        return res.status(405).json({
            message: "Method Not Allowed",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

}