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
const bookingCollection = db.collection("bookings");


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

// Booking api for my booking page with API : http://localhost:8000/booking

app.post("/booking", async (req, res) => {
    const data = req.body;
    const result = await bookingCollection.insertOne(data);
    res.send(result);

})

// // New routes for listing and bookings  from line 82++
// // NEW ROUTE 1: MY STUDIO LISTINGS (Filtered by Owner Email)
// // API: GET http://localhost:8000/my-studios?email=user@email.com
// // -------------------------------------------------------------------

app.get("/my-studios", async (req, res) => {
  const { email } = req.query;
  const result = await studioCollection
    .find({ "hostInfo.email": email })
    .toArray();
  res.send(result);
});

// -------------------------------------------------------------------
// NEW ROUTE 2: BOOKING SYSTEM & MY BOOKINGS
// -------------------------------------------------------------------

// Create New Booking API : POST http://localhost:8000/bookings
app.post("/bookings", async (req, res) => {
  const bookingData = {
    ...req.body,
    status: "Pending", // Default status as per requirements
    createdAt: new Date(),
  };
  const result = await bookingCollection.insertOne(bookingData);
  res.send(result);
});

// Get User Bookings API : GET http://localhost:8000/my-bookings?email=user@email.com
app.get("/my-bookings", async (req, res) => {
  const { email } = req.query;
  const result = await bookingCollection
    .find({ userEmail: email })
    .sort({ createdAt: -1 })
    .toArray();
  res.send(result);
});

// Cancel Booking API : PATCH http://localhost:8000/bookings/:id/cancel
app.patch("/bookings/:id/cancel", async (req, res) => {
  const { id } = req.params;
  const result = await bookingCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "Cancelled" } }
  );
  res.send(result);
});


// feature section
app.get('/featured-studios', async (req, res) => {
  const result = await studioCollection.find().limit(6).toArray()
  res.send(result)
})


// http://localhost:8000 backend Base Url

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});