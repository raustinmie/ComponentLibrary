import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getBCProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://harborviewwebdesign.bigcartel.com/products.json");

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch products" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("API fetch failed:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}