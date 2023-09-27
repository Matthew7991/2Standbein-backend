import { ObjectId } from "mongodb"
import { getDb } from "../utilities/db.js"

const col = "orders"

export async function getOrders(_, res) {
  const db = await getDb()
  const response = await db.collection(col).find().toArray()

  res.json(response)
}

export async function addOrder(req, res) {
  const query = req.query
  console.log(query)
  const ids = query.ids.split(",").map((id) => new ObjectId(id))

  const db = await getDb()

  const updateResponse = await db
    .collection("products")
    .updateMany({ _id: { $in: ids } }, { $inc: { stock: -1 } })
  console.log(updateResponse)

  const articles = await db
    .collection("products")
    .find({ _id: { $in: ids } })
    .toArray()
  console.log(articles)

  const totalprice = articles.reduce((prevValue, curValue) => {
    return prevValue + curValue.price
  }, 0)
  console.log(totalprice)

  const order = {
    date: new Date(),
    products: articles,
    state: "nicht bearbeitet",
    price: totalprice,
  }
  console.log(order)

  const response = await db.collection(col).insertOne(order)
  console.log(response)
  res.end()
}

// export async function addOrder(req, res) {
//   const order = req.body
//   order.state = "in process"
//   order.date = new Date()

//   const db = await getDb()
//   const response = await db.collection(col).insertOne(order)

//   res.json()
// }

export async function updateOrder(req, res) {
  const id = req.params.id
  const db = await getDb()
  const response = await db
    .collection(col)
    .updateOne({ _id: new ObjectId(id) }, { state: "bearbeitet" })

  res.end()
}
