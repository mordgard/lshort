// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../db/client";

export default async function getUrl(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  console.log(slug);

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send({ message: "Slug isn't provided" });
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;
    res.send({ message: "Url not found" });
    return;
  }

  return res.send(data);
}
