const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

// Importar rutas
const productoRoutes = require("./routes/productoRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const detallePedidoRoutes = require("./routes/detallePedidoRoutes");
const ventaRoutes = require("./routes/ventaRoutes");
const detalleVentaRoutes = require("./routes/detalleVentaRoutes");

// Importar middleware de errores
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(express.json());
app.use(cors());

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Ruta de prueba de DB
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Conectado a PostgreSQL. Hora del servidor: ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error conectando a la BD");
  }
});

// Rutas de los API
app.use("/api/productos", productoRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/detalles-pedido", detallePedidoRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/detalles-venta", detalleVentaRoutes);

// **Middleware global de errores** (siempre al final)
app.use(errorHandler);

// Levantar servidor
app.listen(PORT,() => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
