import express,{json,urlencoded} from 'express';
import  path  from "path";
import { MongoClient, ServerApiVersion } from "mongodb";


const app = express();
const __dirname = path.resolve();

const uri = "mongodb+srv://Benardkim:JwyNIz5tfMTFtwq3@cluster0.vphzmrp.mongodb.net/?retryWrites=true&w=majority"
let port = process.env.port || 3000;
let collection;

app.use(express.static(path.join(__dirname,"/")));
app.use(json());
app.use(urlencoded({
    extended: false
}))


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function runDBconnect() {
    try {
        //connects the client to the server
        await client.connect();
        collection = client.db("test").collection('Cat');
        console.log("MongoDB Connected");
    }
    catch (ex) {
        console.error(ex);
    }
};


app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/api/cats', async (req, res) => {
    getAllCats((result) => {
            res.json({
                statuscode: 200,
                data: result,
                message: 'get all calls sucessful'
            });

    });
});


app.post('/api/cat', (req, res) => {
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (!err) {
            res.json({
                statuscode: 201,
                data: result,
                message: 'success'
            });
        }
    });
});

async function postCat(cat, callback) {
  try {
    let doc = await collection.insertOne(cat);
    callback(null, doc)
  } catch (ex) {
    callback(ex, null)
  }


}

async function getAllCats(callback) {
    let allCats = await collection.find({}).toArray();
    callback(allCats)
}


app.listen(port, () => {
    console.log('server started');
    runDBconnect();
});
