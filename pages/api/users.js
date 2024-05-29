import { mongooseConnect } from "@/lib/mongoose";
import { Users } from "@/models/Users";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") res.json(await Users.find());
}
