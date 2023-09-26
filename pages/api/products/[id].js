import { getProductById } from "@/services/productServices";

export default function handler(request, response) {
  const product = getProductById(request.query.id);

  if (!product) {
    response.status(404).json({ status: "Not found." });
    return;
  }

  response.status(200).json(product);
}
