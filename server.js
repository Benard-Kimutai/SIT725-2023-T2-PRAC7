import express, { json, urlencoded } from 'express';
import path from "path";

import "./dbConnection.js"
import router from './router/router.js';


const app = express();
const __dirname = path.resolve();

let port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, "/")));
app.use(json());
app.use(urlencoded({
    extended: false
}))


app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.use("/api", router)


app.listen(port, () => {
    console.log('server started');
});
