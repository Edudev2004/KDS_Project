const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  listarPedidos,
  obtenerPedido,
  crearPedido,
  actualizarPedido,
  cambiarEstadoPedido,
  eliminarPedido,
} = require("../controllers/pedidoController");

const router = express.Router();

// Rutas de pedidos
router.post("/", asyncHandler(crearPedido));
router.get("/", asyncHandler(listarPedidos));
router.get("/:id", asyncHandler(obtenerPedido));
router.put("/:id", asyncHandler(actualizarPedido));
router.put("/:id/estado", asyncHandler(cambiarEstadoPedido));
router.delete("/:id", asyncHandler(eliminarPedido));

module.exports = router;
