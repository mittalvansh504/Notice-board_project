import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {

  try {

    if (req.method === "GET") {

      const notices = await prisma.notice.findMany({
        orderBy: [
          {
            priority: "desc",
          },
          {
            publishDate: "desc",
          },
        ],
      });

      return res.status(200).json(notices);
    }

    if (req.method === "POST") {

      const {
        title,
        body,
        category,
        priority,
        publishDate,
        image,
      } = req.body;

      // Validation

      if (!title?.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (!body?.trim()) {
            return res.status(400).json({
                message: "Body is required"
            });
        }

        if (!publishDate || isNaN(new Date(publishDate).getTime())) {
            return res.status(400).json({
                message: "Invalid publish date"
            });
        }

      const notice = await prisma.notice.create({

        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image,
        },

      });

      return res.status(201).json(notice);

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