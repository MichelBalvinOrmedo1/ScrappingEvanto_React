const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000; // Puerto en el que se ejecutará el servidor Express

// Middleware para permitir el acceso a los recursos estáticos generados por Vite
app.use(express.static("dist"));
app.use(cors());

// Ruta para manejar la solicitud de datos

app.use("/api/all_items", require("./userRouter.cjs"));
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express en http://localhost:${PORT}`);
});
