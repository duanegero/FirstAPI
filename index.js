const express = require('express'); //importing the express module from npm
const cors = require('cors') //importing cors module from npm
const app = express(); // assigning variable to handle express
const PORT = process.env.PORT || 3000; //setting the port number for my server


const userRoutes = require("./routes/users"); //importing the user routes 

app.use(express.json()); //middleware to parse and handle json, make data available

app.use(cors()); //enable cors for all rotues

app.use("/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to my first API");
}); //defining a route for root URL

app.listen(PORT, () => console.log(`Sever running on http://localhost:${PORT}`)); //starting server and logging the port number