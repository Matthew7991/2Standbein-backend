import { verifyToken } from "../utilities/token.js"

export function auth(req, res, next) {
  const token = req.get("authorization").split(" ")[1]
  try {
    const claims = verifyToken(token)
    req.claims = claims
    next()
  } catch (error) {
    res.status(403).end(error.message)
  }
}
