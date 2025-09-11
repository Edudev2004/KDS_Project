const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  crearCliente,
  listarClientes,
  obtenerCliente,
  actualizarCliente,
  eliminarCliente
} = require("../controllers/clienteController");

const router = express.Router();

// Rutas de Cliente
router.post("/", asyncHandler(crearCliente));
router.get("/", asyncHandler(listarClientes));
router.get("/:id", asyncHandler(obtenerCliente));
router.put("/:id", asyncHandler(actualizarCliente));
router.delete("/:id", asyncHandler(eliminarCliente));

module.exports = router;