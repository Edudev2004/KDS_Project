const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  crearCategoria,
  listarCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria
} = require("../controllers/categoriaController");

const router = express.Router();

// Rutas de categoría
router.post("/", asyncHandler(crearCategoria));
router.get("/", asyncHandler(listarCategorias));
router.get("/:id", asyncHandler(obtenerCategoria));
router.put("/:id", asyncHandler(actualizarCategoria));
router.delete("/:id", asyncHandler(eliminarCategoria));

module.exports = router;
