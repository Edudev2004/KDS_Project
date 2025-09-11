const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  listarDetalles, // SOLO PARA PRUEBAS
  listarDetallesPorPedido,
  obtenerDetalle,
  crearDetalle,
  actualizarDetalle,
  eliminarDetalle
} = require("../controllers/detallePedidoController");

const router = express.Router();

// Rutas
router.get("/", asyncHandler(listarDetalles)); // cuidado, solo para pruebas
router.get("/pedido/:id_pedido", asyncHandler(listarDetallesPorPedido));
router.get("/:id", asyncHandler(obtenerDetalle));
router.post("/", asyncHandler(crearDetalle));
router.put("/:id", asyncHandler(actualizarDetalle));
router.delete("/:id", asyncHandler(eliminarDetalle));

module.exports = router;