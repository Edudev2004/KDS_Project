const pool = require("../config/db");

// Obtener todos los pedidos
const listarPedidos = async (req, res) => {
  const result = await pool.query(
    `SELECT p.*, 
            u1.nombre AS mesero, 
            u2.nombre AS cocinero, 
            u3.nombre AS cajero
     FROM pedido p
     JOIN usuario u1 ON p.id_mesero = u1.id_usuario
     JOIN usuario u2 ON p.id_cocinero = u2.id_usuario
     JOIN usuario u3 ON p.id_cajero = u3.id_usuario
     ORDER BY p.id_pedido`
  );
  res.json(result.rows);
};

// Obtener un pedido por id
const obtenerPedido = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `SELECT * FROM pedido WHERE id_pedido = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Pedido no encontrado" });
  }

  res.json(result.rows[0]);
};

// Crear un nuevo pedido (ahora incluye origen)
const crearPedido = async (req, res) => {
  const { id_mesero, id_cocinero, id_cajero, origen } = req.body;

  const result = await pool.query(
    `INSERT INTO pedido (id_mesero, id_cocinero, id_cajero, origen) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [id_mesero, id_cocinero, id_cajero, origen]
  );

  res.json(result.rows[0]);
};

// Actualizar un pedido (ahora incluye origen)
const actualizarPedido = async (req, res) => {
  const { id } = req.params;
  const { id_mesero, id_cocinero, id_cajero, origen } = req.body;

  const result = await pool.query(
    `UPDATE pedido 
     SET id_mesero = $1, id_cocinero = $2, id_cajero = $3, origen = $4
     WHERE id_pedido = $5 RETURNING *`,
    [id_mesero, id_cocinero, id_cajero, origen, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Pedido no encontrado" });
  }

  res.json(result.rows[0]);
};

// Cambiar estado de un pedido (sin cambios)
const cambiarEstadoPedido = async (req, res) => {
  const { id } = req.params;
  const { nuevoEstado } = req.body;

  const flujo = {
    PENDIENTE: ["EN_PREPARACION", "ANULADO"],
    EN_PREPARACION: ["LISTO", "ANULADO"],
    LISTO: ["ENTREGADO", "ANULADO"],
    ENTREGADO: ["PAGADO", "ANULADO"],
    PAGADO: [],
    ANULADO: [],
  };

  const pedido = await pool.query(
    `SELECT estado FROM pedido WHERE id_pedido = $1`,
    [id]
  );

  if (pedido.rows.length === 0) {
    return res.status(404).json({ error: "Pedido no encontrado" });
  }

  const estadoActual = pedido.rows[0].estado;

  if (!flujo[estadoActual].includes(nuevoEstado)) {
    return res.status(400).json({
      error: `No se puede cambiar de ${estadoActual} a ${nuevoEstado}`,
    });
  }

  const result = await pool.query(
    `UPDATE pedido SET estado = $1 WHERE id_pedido = $2 RETURNING *`,
    [nuevoEstado, id]
  );

  res.json(result.rows[0]);
};

// Eliminar un pedido (sin cambios)
const eliminarPedido = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `DELETE FROM pedido WHERE id_pedido = $1 RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Pedido no encontrado" });
  }

  res.json({ message: "Pedido eliminado correctamente" });
};

module.exports = {
  listarPedidos,
  obtenerPedido,
  crearPedido,
  actualizarPedido,
  cambiarEstadoPedido,
  eliminarPedido,
};
