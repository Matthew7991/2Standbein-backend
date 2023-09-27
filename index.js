import "dotenv/config"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import multer from "multer"
import {
  addOrder,
  getOrders,
  updateOrder,
} from "./controller/ordersController.js"
import {
  addProduct,
  getProducts,
  updateProduct,
} from "./controller/productsController.js"
import { auth } from "./middleware/authMiddleware.js"
import { checkToken, login } from "./controller/loginController.js"
import { encypt } from "./middleware/crypto.js"

const port = process.env.PORT
const upload = multer()
const server = express()

server.use(cors())
server.use(express.json())
server.use(morgan("dev"))
server.use(upload.none())

server.get("/api/products", getProducts)
server.put("/api/products", auth, updateProduct)
server.post("/api/products", auth, addProduct)

server.get("/api/admin/auth", auth, checkToken)

server.get("/api/orders", auth, getOrders)
server.patch("/api/orders/:id", auth, updateOrder)
server.post("/api/orders", addOrder)

server.post("/api/login", encypt, login)

server.listen(port, () => {
  console.log("Running on port", port)
})
