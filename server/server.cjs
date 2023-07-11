const express = require("express");

const app = express();

app.use("/hola", require("./userRouter.cjs"));
// Inicia el servidor en el puerto deseado
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor Express está escuchando en el puerto ${port}`);
});
