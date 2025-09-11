const pool = require("../config/db");

// Crear usuario
const crearUsuario = async (req, res) => {
  const { nombre, usuario, password, rol } = req.body;

  const result = await pool.query(
    `INSERT INTO usuario (nombre, usuario, password, rol)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nombre, usuario, password, rol]
  );

  res.json(result.rows[0]);
};

// Listar todos los usuarios
const listarUsuarios = async (req, res) => {
  const result = await pool.query("SELECT * FROM usuario");
  res.json(result.rows);
};

// Obtener usuario por ID
const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    "SELECT * FROM usuario WHERE id_usuario = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(result.rows[0]);
};

// Actualizar usuario
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, usuario, password, rol, estado } = req.body;

  const result = await pool.query(
    `UPDATE usuario
     SET nombre=$1, usuario=$2, password=$3, rol=$4, estado=$5
     WHERE id_usuario=$6
     RETURNING *`,
    [nombre, usuario, password, rol, estado, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(result.rows[0]);
};

// Eliminar usuario
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    `DELETE FROM usuario WHERE id_usuario=$1 RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json({ mensaje: "Usuario eliminado correctamente" });
};

module.exports = {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
};