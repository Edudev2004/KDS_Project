const pool = require("../config/db");

// Listar TODOS los detalles (para pruebas)
const listarDetalles = async (req, res) => {
  const result = await pool.query(
    `SELECT d.id_detalle, d.id_pedido, d.id_producto, d.cantidad, 
            d.precio_unitario, d.subtotal, p.nombre AS producto
     FROM pedido_detalle d
     JOIN producto p ON d.id_producto = p.id_producto
     ORDER BY d.id_detalle`
  );
  res.json(result.rows);
};

// Listar detalles de un pedido
const listarDetallesPorPedido = async (req, res) => {
  const { id_pedido } = req.params;
  const result = await pool.query(
    `SELECT d.*, p.nombre AS producto
     FROM pedido_detalle d
     JOIN producto p ON d.id_producto = p.id_producto
     WHERE d.id_pedido = $1
     ORDER BY d.id_detalle`,
    [id_pedido]
  );
  res.json(result.rows);
};

// Obtener un detalle específico
const obtenerDetalle = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `SELECT d.*, p.nombre AS producto
     FROM pedido_detalle d
     JOIN producto p ON d.id_producto = p.id_producto
     WHERE d.id_detalle = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Detalle no encontrado" });
  }

  res.json(result.rows[0]);
};

// Crear un detalle
const crearDetalle = async (req, res) => {
  const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;

  const result = await pool.query(
    `INSERT INTO pedido_detalle (id_pedido, id_producto, cantidad, precio_unitario)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [id_pedido, id_producto, cantidad, precio_unitario]
  );

  res.json(result.rows[0]);
};

// Actualizar un detalle (cantidad o precio)
const actualizarDetalle = async (req, res) => {
  const { id } = req.params;
  const { cantidad, precio_unitario } = req.body;

  const result = await pool.query(
    `UPDATE pedido_detalle
     SET cantidad = $1, precio_unitario = $2
     WHERE id_detalle = $3 RETURNING *`,
    [cantidad, precio_unitario, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Detalle no encontrado" });
  }

  res.json(result.rows[0]);
};

// Eliminar un detalle
const eliminarDetalle = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `DELETE FROM pedido_detalle WHERE id_detalle = $1 RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Detalle no encontrado" });
  }

  res.json({ message: "Detalle eliminado correctamente" });
};

module.exports = {
  listarDetalles,
  listarDetallesPorPedido,
  obtenerDetalle,
  crearDetalle,
  actualizarDetalle,
  eliminarDetalle,
};
