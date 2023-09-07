import express, { json, urlencoded } from 'express';
import path from "path";
import http from "http";
import { Server } from "socket.io"
import "./dbConnection.js"
import router from './router/router.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
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

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function (req, res, next) {
    var firstNumber = parseInt(req.params.firstNumber)
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if (result == null) {
        res.json({ result: result, statusCode: 400 }).status(400)
    }
    else { res.json({ result: result, statusCode: 200 }).status(200) }
})


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
    console.log('user disconnected');
    });
    setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
    });


server.listen(port, () => {
    console.log('server started');
});
