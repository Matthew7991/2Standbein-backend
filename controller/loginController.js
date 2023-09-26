import { getDb } from "../utilities/db.js"
import { createToken } from "../utilities/token.js"

const col = "user"
export async function login(req, res) {
  const db = await getDb()
  const user = await db
    .collection(col)
    .findOne({ username: req.body.username, password: req.body.password })

  if (!user) {
    res.status(403).json({ message: "bad auth" })
  } else {
    const token = createToken(user)
    res.json(token)
  }
}

export function checkToken(req, res) {
  res.end()
}
