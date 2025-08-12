import express from "express";

const app = express();

//Routing
app.get('/', (req, res) => {
  res.send('Hola mundo desde express con ts')
})

app.get('/home', (req, res) => {
  res.send('HOlad desde HOME')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
