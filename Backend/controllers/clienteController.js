const pool = require("../config/db");

// Crear cliente
const crearCliente = async (req, res) => {
  console.log("Datos recibidos en body:", req.body);

  const {
    nombre,
    tipo_documento,
    numero_documento,
    direccion,
    telefono,
    email,
  } = req.body;

  const nombreFinal = nombre || "PÚBLICO GENERAL";

  const result = await pool.query(
    `INSERT INTO cliente (nombre, tipo_documento, numero_documento, direccion, telefono, email)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [nombreFinal, tipo_documento, numero_documento, direccion, telefono, email]
  );

  res.json(result.rows[0]);
};

// Listar todos los clientes
const listarClientes = async (req, res) => {
  const result = await pool.query("SELECT * FROM cliente");
  res.json(result.rows);
};

// Obtener cliente por ID
const obtenerCliente = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "SELECT * FROM cliente WHERE id_cliente = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }

  res.json(result.rows[0]);
};

// Actualizar cliente
const actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    tipo_documento,
    numero_documento,
    direccion,
    telefono,
    email,
  } = req.body;

  const result = await pool.query(
    `UPDATE cliente
     SET nombre=$1, tipo_documento=$2, numero_documento=$3, direccion=$4, telefono=$5, email=$6
     WHERE id_cliente=$7
     RETURNING *`,
    [nombre, tipo_documento, numero_documento, direccion, telefono, email, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }

  res.json(result.rows[0]);
};

// Eliminar cliente
const eliminarCliente = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `DELETE FROM cliente WHERE id_cliente=$1 RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }

  res.json({ mensaje: "Cliente eliminado correctamente" });
};

module.exports = {
  crearCliente,
  listarClientes,
  obtenerCliente,
  actualizarCliente,
  eliminarCliente,
};