import jwt from "jsonwebtoken"

export function createToken(user) {
  const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET)
  return token
}

export function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded
}
