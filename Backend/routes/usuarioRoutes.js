const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require("../controllers/usuarioController");

const router = express.Router();

// Rutas de Usuario
router.post("/", asyncHandler(crearUsuario));
router.get("/", asyncHandler(listarUsuarios));
router.get("/:id", asyncHandler(obtenerUsuario));
router.put("/:id", asyncHandler(actualizarUsuario));
router.delete("/:id", asyncHandler(eliminarUsuario));

module.exports = router;
