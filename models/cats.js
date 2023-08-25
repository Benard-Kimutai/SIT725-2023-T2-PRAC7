import client from "../dbConnection.js"


let collection = client.db("test").collection('Cat');


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


export {
    postCat,
    getAllCats
}
