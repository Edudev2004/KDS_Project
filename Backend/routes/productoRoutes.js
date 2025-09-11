const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productoController");

const router = express.Router();

// Rutas de productos
router.post("/", asyncHandler(crearProducto));
router.get("/", asyncHandler(listarProductos));
router.get("/:id", asyncHandler(obtenerProducto));
router.put("/:id", asyncHandler(actualizarProducto));
router.delete("/:id", asyncHandler(eliminarProducto));

module.exports = router;