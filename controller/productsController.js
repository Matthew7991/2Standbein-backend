import { ObjectId } from "mongodb"
import { getDb } from "../utilities/db.js"
import { uploadImage } from "../utilities/imageService.js"

const col = "products"

export async function getProducts(_, res) {
  const db = await getDb()
  const response = await db.collection(col).find().toArray()

  res.json(response)
}

export async function updateProduct(req, res) {
  try {
    console.log("in update Product")
    console.log(req.body)
    const id = req.body.id
    delete req.body.id

    console.log(req.body)
    const product = req.body
    product.price = Number(product.price)
    product.stock = Number(product.stock)

    console.log(req.file)
    if (req.file) {
      const result = await uploadImage(req.file.buffer)
      product.imgUrl = result.secure_url
    }

    const db = await getDb()
    const response = await db
      .collection(col)
      .replaceOne({ _id: new ObjectId(id) }, product)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
  res.json()
}

export async function addProduct(req, res) {
  try {
    const result = await uploadImage(req.file.buffer)

    const product = req.body
    product.price = Number(product.price)
    product.stock = Number(product.stock)
    product.imgUrl = result.secure_url

    const db = await getDb()
    const response = await db.collection(col).insertOne(product)
  } catch (error) {
    console.log(error)
  }
  res.json()
}
