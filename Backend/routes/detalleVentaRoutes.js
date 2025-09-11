const express = require("express");
const asyncHandler = require("express-async-handler");
const {
    listarDetallesVenta,
    obtenerDetalleVenta,
    crearDetalleVenta,
    actualizarDetalleVenta,
    eliminarDetalleVenta,
    listarTodosDetallesVenta
} = require("../controllers/detalleVentaController");

const router = express.Router();

// Rutas
router.get("/", asyncHandler(listarTodosDetallesVenta)); // cuidado: solo para pruebas
router.get("/venta/:id_venta", asyncHandler(listarDetallesVenta));
router.get("/:id", asyncHandler(obtenerDetalleVenta));
router.post("/", asyncHandler(crearDetalleVenta));
router.put("/:id", asyncHandler(actualizarDetalleVenta));
router.delete("/:id", asyncHandler(eliminarDetalleVenta));

module.exports = router;
