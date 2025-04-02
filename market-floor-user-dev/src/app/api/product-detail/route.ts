import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { apiURL } from "@/constanst";

//@ts-ignore
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { storeId, upc } = req.query;
    try {
      const response = await axios.get(
        `${apiURL}/products/detail?upc=${upc}&storeId=${storeId}`
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ message: "An error occurred" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
