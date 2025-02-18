
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import rotuerTypeUsers from './router/TypeUsersRouter.js';
import  { RouterUsuer } from './router/UserRouter.js';
import { RouterPerson } from './router/PersonRouter.js';
import { RouterBus } from './router/busRouter.js';
import { sequelize } from "./db/conexion.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { RouterPL } from './router/ProductoRouter.js';

const _PORT = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', rotuerTypeUsers);
app.use('/api', RouterUsuer);
app.use('/api', RouterBus);
app.use('/api', RouterPerson);
app.use('/api', RouterPL);


const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false })
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();

