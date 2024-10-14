const express = require('express'); //importing express module from npm
const router = express.Router(); //creating a router to handle routes seperate from the main app

//setting an array of objects for sample data 
let users = [
    { id: 1, first_name: 'John', last_name: 'Doe', age: 30, email: 'John@test.ca'},
    { id: 2, first_name: 'James', last_name: 'Doe', age: 32, email: 'James@test.ca'},
    { id: 3, first_name: 'Jane', last_name: 'Dough', age: 13, email: 'Jane@test.ca'},
    { id: 4, first_name: 'Jim', last_name: 'Doe', age: 20, email: 'Jim@test.ca'},
    { id: 5, first_name: 'Jack', last_name: 'Dork', age: 35, email: 'Jack@test.ca'}
]

//defining a route for root URL
router.get("/", (req, res) => {
        res.json(users) //returning the users array in json
    }
);


router.get("/:id", (req, res) => {
    const userId = parseInt(req.params.id); //parsing id from the url and converting to Int 
    const user = users.find((u) => u.id === userId); //looking for that has the id and assigning to variable 
    if(user) res.json(user); //if user found send json data
    else res.status(404).send('User Not Found') //else send error message 
});

router.post("/", (req, res) => {
    const newUser = { id: users.length + 1, ...req.body }; //creating new user with an object
    users.push(newUser) //adding new user to array of users
    res.status(201).json(newUser) //sending new user with status
});

router.put("/:id", (req, res) => {
    const userId = parseInt(req.params.id) //converting the id from the request into a variable 
    const userIndex = users.findIndex((u) => u.id === userId) //searching the array of users for the 'userId'
    if(userIndex !== -1) { //checking to see if the user/index exists
        users[userIndex] = { id:userId, ...req.body }; //updating the user at that index, keeping the same userID
        res.json(users[userIndex]); //sending back the updated object in json
    } else res.status(404).send('User not found'); //error if user not found 
    
});

router.delete("/:id", (req, res) => {
    users = users.filter((u) => u.id !== parseInt(req.params.id)); //creating a new users without the user from the query 
    res.status(204).send();
});



module.exports = router;