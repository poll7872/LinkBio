import server from './server.ts'

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
