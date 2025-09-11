const pool = require("../config/db");

// Listar todas las ventas
const listarVentas = async (req, res) => {
  const result = await pool.query(
    `SELECT v.*, c.nombre AS cliente
     FROM venta v
     LEFT JOIN cliente c ON v.id_cliente = c.id_cliente
     ORDER BY v.id_venta`
  );
  res.json(result.rows);
};

// Obtener venta por ID
const obtenerVenta = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `SELECT * FROM venta WHERE id_venta = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Venta no encontrada" });
  }

  res.json(result.rows[0]);
};

// Crear una nueva venta
const crearVenta = async (req, res) => {
  const {
    id_pedido,
    id_cliente,
    tipo_comprobante,
    serie,
    correlativo,
    subtotal,
    igv,
    total,
    estado,
    observaciones
  } = req.body;

  const result = await pool.query(
    `INSERT INTO venta 
     (id_pedido, id_cliente, tipo_comprobante, serie, correlativo, subtotal, igv, total, estado, observaciones)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *`,
    [
      id_pedido,
      id_cliente,
      tipo_comprobante,
      serie,
      correlativo,
      subtotal,
      igv,
      total,
      estado || 'PENDIENTE',
      observaciones || ''
    ]
  );

  res.json(result.rows[0]);
};

// Actualizar venta
const actualizarVenta = async (req, res) => {
  const { id } = req.params;
  const { id_cliente, observaciones } = req.body;

  const result = await pool.query(
    `UPDATE venta SET id_cliente = $1, observaciones = $2 WHERE id_venta = $3 RETURNING *`,
    [id_cliente, observaciones, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Venta no encontrada" });
  }

  res.json(result.rows[0]);
};

// Cambiar estado de una venta
const cambiarEstadoVenta = async (req, res) => {
  const { id } = req.params;
  const { nuevoEstado } = req.body;

  const flujo = {
    PENDIENTE: ["PAGADO", "ANULADO"],
    PAGADO: [],
    ANULADO: []
  };

  const venta = await pool.query(
    `SELECT estado FROM venta WHERE id_venta = $1`,
    [id]
  );

  if (venta.rows.length === 0) {
    return res.status(404).json({ error: "Venta no encontrada" });
  }

  const estadoActual = venta.rows[0].estado;

  if (!flujo[estadoActual].includes(nuevoEstado)) {
    return res.status(400).json({ error: `No se puede cambiar de ${estadoActual} a ${nuevoEstado}` });
  }

  const result = await pool.query(
    `UPDATE venta SET estado = $1 WHERE id_venta = $2 RETURNING *`,
    [nuevoEstado, id]
  );

  res.json(result.rows[0]);
};

// Eliminar venta
const eliminarVenta = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `DELETE FROM venta WHERE id_venta = $1 RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Venta no encontrada" });
  }

  res.json({ mensaje: "Venta eliminada correctamente" });
};

module.exports = {
  listarVentas,
  obtenerVenta,
  crearVenta,
  actualizarVenta,
  cambiarEstadoVenta,
  eliminarVenta
};
