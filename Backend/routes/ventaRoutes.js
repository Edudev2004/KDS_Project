const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  listarVentas,
  obtenerVenta,
  crearVenta,
  actualizarVenta,
  cambiarEstadoVenta,
  eliminarVenta
} = require("../controllers/ventaController");

const router = express.Router();

// Rutas de ventas
router.post("/", asyncHandler(crearVenta));
router.get("/", asyncHandler(listarVentas));
router.get("/:id", asyncHandler(obtenerVenta));
router.put("/:id", asyncHandler(actualizarVenta));
router.patch("/:id/estado", asyncHandler(cambiarEstadoVenta));
router.delete("/:id", asyncHandler(eliminarVenta));

module.exports = router;