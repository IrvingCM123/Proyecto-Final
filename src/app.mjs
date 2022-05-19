import express from  'express';
import config from './Connection/config.mjs';
import cors from "cors";
import routes from "./Connection/Routes/routes.mjs";
import morgan from "morgan";
import path from "path"
import engines from "consolidate"
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
let port;
app.set('port', config.port)


app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //Recibir datos desde formularios html
app.use(express.json()); //Usar JSON

app.set('views', __dirname + '\\views');
app.use(express.static(__dirname + '\\public'));
app.set("view engine", "ejs");

// Routes
app.use(routes);

export default app;
