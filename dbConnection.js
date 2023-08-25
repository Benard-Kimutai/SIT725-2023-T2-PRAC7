import { MongoClient, ServerApiVersion } from "mongodb";


const uri = "mongodb+srv://Benardkim:JwyNIz5tfMTFtwq3@cluster0.vphzmrp.mongodb.net/?retryWrites=true&w=majority"


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

client.connect();
console.log("MongoDB Connected");



export default client;
