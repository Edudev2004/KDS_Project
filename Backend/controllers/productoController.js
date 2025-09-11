const pool = require("../config/db");

// Obtener todos los productos
const listarProductos = async (req, res) => {
  const result = await pool.query(
    `SELECT p.*, c.nombre AS categoria 
     FROM producto p
     JOIN categoria c ON p.id_categoria = c.id_categoria
     ORDER BY p.id_producto`
  );
  res.json(result.rows);
};

// Obtener un producto por id
const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `SELECT * FROM producto WHERE id_producto = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(result.rows[0]);
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
  const { id_categoria, nombre, precio, stock } = req.body;

  const result = await pool.query(
    `INSERT INTO producto (id_categoria, nombre, precio, stock) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [id_categoria, nombre, precio, stock || 0]
  );

  res.json(result.rows[0]);
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { id_categoria, nombre, precio, stock } = req.body;

  const result = await pool.query(
    `UPDATE producto 
     SET id_categoria = $1, nombre = $2, precio = $3, stock = $4
     WHERE id_producto = $5 RETURNING *`,
    [id_categoria, nombre, precio, stock, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(result.rows[0]);
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `DELETE FROM producto WHERE id_producto = $1 RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json({ message: "Producto eliminado correctamente" });
};

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};