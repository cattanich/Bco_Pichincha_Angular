"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
let PORT = 3002;
// creates express app, registers all controller routes and returns you express app instance
const app = (0, routing_controllers_1.createExpressServer)({
    cors: true,
    routePrefix: "/bp",
    controllers: [
        __dirname + "/controllers/*{.js,.ts}",
    ], // we specify controllers we want to use
});
// Configuración adicional de CORS para más control
app.use((0, cors_1.default)({
    origin: '*',
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
