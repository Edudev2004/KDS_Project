const pool = require("../config/db");

// Listar todas las categorías
const listarCategorias = async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM categoria ORDER BY id_categoria`
  );
  res.json(result.rows);
};

// Obtener una categoría por id
const obtenerCategoria = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `SELECT * FROM categoria WHERE id_categoria = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }

  res.json(result.rows[0]);
};

// Crear una nueva categoría
const crearCategoria = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  const result = await pool.query(
    `INSERT INTO categoria (nombre) VALUES ($1) RETURNING *`,
    [nombre]
  );

  res.json(result.rows[0]);
};

// Actualizar categoría
const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }

  const result = await pool.query(
    `UPDATE categoria SET nombre = $1 WHERE id_categoria = $2 RETURNING *`,
    [nombre, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }

  res.json(result.rows[0]);
};

// Eliminar categoría
const eliminarCategoria = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `DELETE FROM categoria WHERE id_categoria = $1 RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Categoría no encontrada" });
  }

  res.json({ mensaje: "Categoría eliminada correctamente" });
};

module.exports = {
  listarCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};