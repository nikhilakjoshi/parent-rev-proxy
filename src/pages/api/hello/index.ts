import type { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  samlToken?: string;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });
  res.status(200).json({ message: "Hello World!!" });
}
