import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running fine!");
});



const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("studiospace");
const studioCollection = db.collection("studio");


// add-studio api create  API : http://localhost:8000/add-studio

app.post("/add-studio", async (req, res) => {
    const data = req.body;
    const result = await studioCollection.insertOne(data);
    console.log(result);
    res.send(result);
})


// Api for Studios /Explore Studios API : http://localhost:8000/studios

app.get("/studios", async (req, res) => {
    const result = await studioCollection.find({}).toArray();
    res.send(result);
})

// Studio details Api : http://localhost:8000/studio/:id

app.get("/studio/:id", async (req, res) => {
    const {id} = req.params;
    const result = await studioCollection.findOne({_id: new ObjectId (id)});
    res.send(result);
})


// update studio data  with PATCH method with API : http://localhost:8000/studio/:id

app.patch("/studio/:id", async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const result = await studioCollection.updateOne(
        {_id: new ObjectId(id)},
         {$set: data}
        );
    res.send(result);
})

// Delete studio functionality with DELETE method with API : http://localhost:8000/studio/:id

app.delete("/studio/:id", async (req, res) => {
    const {id} = req.params;
    const result = await studioCollection.deleteOne({_id: new ObjectId(id)});
    res.send(result);
})


// http://localhost:8000 backend Base Url

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});