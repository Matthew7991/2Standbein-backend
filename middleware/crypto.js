import { createHmac } from "crypto"

export function encypt(req, _, next) {
  console.log(req.body.password)
  const hmac = createHmac("sha256", req.body.password)
  req.body.password = hmac.digest("hex")
  next()
}
