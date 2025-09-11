const pool = require("../config/db");

// Listar detalles completos sin filtrar (solo pruebas backend)
const listarTodosDetallesVenta = async (req, res) => {
  const result = await pool.query(
    `SELECT vd.*, p.nombre AS producto, v.numero_comprobante
     FROM venta_detalle vd
     JOIN producto p ON vd.id_producto = p.id_producto
     JOIN venta v ON vd.id_venta = v.id_venta
     ORDER BY vd.id_detalle`
  );
  res.json(result.rows);
};

// Listar todos los detalles de una venta
const listarDetallesVenta = async (req, res) => {
  const { id_venta } = req.params;
  const result = await pool.query(
    `SELECT vd.*, p.nombre AS producto
     FROM venta_detalle vd
     JOIN producto p ON vd.id_producto = p.id_producto
     WHERE vd.id_venta = $1
     ORDER BY vd.id_detalle`,
    [id_venta]
  );
  res.json(result.rows);
};

// Obtener un detalle específico por id_detalle
const obtenerDetalleVenta = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `SELECT vd.*, p.nombre AS producto
     FROM venta_detalle vd
     JOIN producto p ON vd.id_producto = p.id_producto
     WHERE vd.id_detalle = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Detalle de venta no encontrado" });
  }

  res.json(result.rows[0]);
};

// Crear un nuevo detalle de venta
const crearDetalleVenta = async (req, res) => {
  const { id_venta, id_producto, cantidad, precio_unitario, unidad_medida } = req.body;

  const result = await pool.query(
    `INSERT INTO venta_detalle (id_venta, id_producto, cantidad, precio_unitario, unidad_medida)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [id_venta, id_producto, cantidad, precio_unitario, unidad_medida || 'NIU']
  );

  res.json(result.rows[0]);
};

// Actualizar un detalle de venta
const actualizarDetalleVenta = async (req, res) => {
  const { id } = req.params;
  const { cantidad, precio_unitario, unidad_medida } = req.body;

  const result = await pool.query(
    `UPDATE venta_detalle
     SET cantidad = $1,
         precio_unitario = $2,
         unidad_medida = $3
     WHERE id_detalle = $4
     RETURNING *`,
    [cantidad, precio_unitario, unidad_medida || 'NIU', id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Detalle de venta no encontrado" });
  }

  res.json(result.rows[0]);
};

// Eliminar un detalle de venta
const eliminarDetalleVenta = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `DELETE FROM venta_detalle WHERE id_detalle = $1 RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Detalle de venta no encontrado" });
  }

  res.json({ mensaje: "Detalle de venta eliminado correctamente" });
};

module.exports = {
  listarTodosDetallesVenta,
  listarDetallesVenta,
  obtenerDetalleVenta,
  crearDetalleVenta,
  actualizarDetalleVenta,
  eliminarDetalleVenta
};