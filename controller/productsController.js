import { ObjectId } from "mongodb"
import { getDb } from "../utilities/db.js"

const col = "products"

export async function getProducts(_, res) {
  const db = await getDb()
  const response = await db.collection(col).find().toArray()

  res.json(response)
}

export async function updateProduct(req, res) {
  console.log("in update Product")
  console.log(req.body)
  const id = req.body.id
  delete req.body.id
  console.log(req.body)
  const product = req.body

  const db = await getDb()
  const response = await db
    .collection(col)
    .replaceOne({ _id: new ObjectId(id) }, product)
  console.log(response)
  res.json()
}

export async function addProduct(req, res) {
  const product = req.body
  product.price = Number(product.price)
  product.stock = Number(product.stock)
  const db = await getDb()
  const response = await db.collection(col).insertOne(req.body)

  res.json()
}
