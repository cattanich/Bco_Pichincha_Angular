import { createExpressServer } from "routing-controllers";
import cors from 'cors';
import 'dotenv/config';

let PORT = 3002;

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  cors: true, // Habilitamos CORS a nivel de routing-controllers
  routePrefix: "/bp", 

  controllers: [
    __dirname + "/controllers/*{.js,.ts}",
  ], // we specify controllers we want to use
});

// Configuración adicional de CORS para más control
app.use(cors({
  origin: '*', // Permitir cualquier origen (para desarrollo)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// run express application on port 3000
app.listen(PORT, () => {
  console.log(`Servidor Iniciado`);
  console.log(`Host: http://localhost:${PORT}`);
  console.log(`Fecha/Hora: ${new Date().toLocaleString()}`);
  console.log(`CORS habilitado para todos los orígenes`);
});
