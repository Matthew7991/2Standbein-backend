import { getDb } from "../utilities/db.js"

const col = "orders"

export async function getOrders(_, res) {
  const db = await getDb()
  const response = await db.collection(col).find().toArray()

  res.json(response)
}

export async function addOrder(req, res) {
  const order = req.body
  order.state = "in process"
  order.date = new Date()

  const db = await getDb()
  const response = await db.collection(col).insertOne(order)

  res.json()
}
