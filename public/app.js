const apiUri = 'http://localhost:3000/users'; //assigning the uri to a variable

//setting up variables to handle the buttons from HTML
const getBtn = document.getElementById('get-btn');
const postbtn = document.getElementById('post-btn');
const putbtn = document.getElementById('put-btn');
const deletebtn = document.getElementById('delete-btn');
const getAllBtn = document.getElementById('get-all-btn');

//creating async event lister 
getAllBtn.addEventListener("click", async () => {
    const allUserList = document.getElementById('all-user-list'); //creating a variable to handle HTML list
    allUserList.innerText = ""; //clearing the list

    //starting the try catch
    try{
        const response = await fetch(`${apiUri}`) //fetching info and storing in variable

        //if no response send error
        if(!response.ok){
            console.log('Users Not Found')
        } else {
            //if response ok store json in users variable
            const users = await response.json()
            console.log(users) //log for testing

            //for each loop to loop through returned json object
            users.forEach(user => {
                const newListElement = document.createElement('li'); //creating new html list element
                newListElement.textContent = `${user.first_name} ${user.last_name} Age: ${user.age}` //adding text content to new element
                allUserList.appendChild(newListElement); //adding element to the list
            })
        }
    } catch(error){ //catch if error and log error
        console.log(error)
    }
}) 

//making async event lister to take action on button click
getBtn.addEventListener("click", async () => {
    const userId = document.getElementById('get-id').value; //getting the user input assigning to variable

    //creating a variable to handle user info
    const userInfo = document.getElementById('get-user-para');

    //starting my try catch
    try{
        const response = await fetch(`${apiUri}/${userId}`) //sending get to url and assigning response to variable

        //if not ok send error
        if(!response.ok){
            console.log('User Not Found');
        } else {
            //if ok send response to variable 
            const user = await response.json();
            console.log(user); //log response 
            //clear the input once button clicked 
            document.getElementById('get-id').value = "";
            //displaying requested user info to the page
            userInfo.innerHTML = `First Name: ${user.first_name} <br> Last Name: ${user.last_name} <br> Age: ${user.age} <br> Email: ${user.email}`;

        }
    //catch if error, and log    
    } catch (error){
        console.log("Error", error)
    }
    document.getElementById('get-id').value = ""; //clearing the input 
});

//making async event lister to take action on button click
postbtn.addEventListener("click", async () => {
    //getting the user input assigning to variables
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value
    const age = document.getElementById('user-age').value;
    const email = document.getElementById('user-email').value;

    //creating a variable to handel new user info
    const newUserInfo = document.getElementById('new-user-para');

    //creating new user object from user input
    const newUser = {
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age),
        email: email
    }

    //starting try catch
    try {
        //sending a post, with headers and body, body contains new user object in json
        const response = await fetch(apiUri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(newUser)
        });
        //if response not ok throw error
        if(!response.ok){
            console.log(error)
        } else {
            //if ok assign new user to variable 
            const user = await response.json();
            console.log(user);
            //setting the inputs to empty after button click
            document.getElementById('first-name').value = "";
            document.getElementById('last-name').value = ""
            document.getElementById('user-age').value = "";
            document.getElementById('user-email').value = "";

            //displaying new user success message 
            newUserInfo.textContent = `${newUser.first_name.toUpperCase()} ${newUser.last_name.toUpperCase()}, successfully created.`;
        };
    //catch if error, log error    
    } catch(error){
        console.log('Error', error);

    }
});

//making async event lister to take action on button click
putbtn.addEventListener("click" , async () => {
    //creating variables to handle the user input from HTML forms
    const userId = document.getElementById('put-id').value;
    const firstName = document.getElementById('put-first-name').value;
    const lastName = document.getElementById('put-last-name').value
    const age = document.getElementById('put-user-age').value;
    const email = document.getElementById('put-user-email').value;

    //creating a variable to handel updated user
    const updateUserInfoList = document.getElementById('update-user-list');

    //clearing the list
    updateUserInfoList.innerText = "";

    //creating an update user object from user input
    const updateUser = {
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age),
        email: email
    }

    //starting a try catch
    try{
        //sending a put, with headers and body in json 
        const response = await fetch(`${apiUri}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(updateUser)
    });
    //if response not ok send back error
    if(!response.ok){
        console.log("Error")
    } else {
        //if response ok assign to variable
        const user = await response.json();
        console.log(user); //log the response 
        //setting the inputs to empty after button click
        document.getElementById('put-id').value = "";
        document.getElementById('put-first-name').value = "";
        document.getElementById('put-last-name').value = ""
        document.getElementById('put-user-age').value = "";
        document.getElementById('put-user-email').value = "";

        //creating new list elements and assigning data from json
        const idItem = document.createElement('li');
        idItem.textContent = `ID: ${user.id}`
        const firstNameItem = document.createElement('li');
        firstNameItem.textContent = `First Name: ${user.first_name}`;
        const lastNameItem = document.createElement('li');
        lastNameItem.textContent = `Last Name: ${user.last_name}`;
        const ageItem = document.createElement('li');
        ageItem.textContent = `Age: ${user.age}`;
        const emailItem = document.createElement('li');
        emailItem.textContent = `Email: ${user.email}`;
        
        //addidng new list elemnents to list on page
        updateUserInfoList.appendChild(idItem);
        updateUserInfoList.appendChild(firstNameItem);
        updateUserInfoList.appendChild(lastNameItem);
        updateUserInfoList.appendChild(ageItem);
        updateUserInfoList.appendChild(emailItem);

    }
    } catch (error) { //catch to catch an error and log the error 
        console.log('Error', error);
    }
});

//making async event lister to take action on button click
deletebtn.addEventListener("click", async () => {
    //variable to handle the user input 
    const userId = document.getElementById('delete-id').value;

    //boolen to have user confirm delete 
    const isConfirmed = window.confirm(`Are you sure you want to delete user ${userId}?`);

    const deleteUserMsg = document.getElementById('delete-user-para');

    //if true do this 
    if(isConfirmed){
        //starting a try catch
        try {
            //sending a delete with user input as value
            const response = await fetch(`${apiUri}/${userId}`, {
            method: "DELETE",
            });

        //if response not ok log error
        if(!response.ok){
            console.log("Error");
        } else {
            //if ok log the user that was deleted
            console.log(`User ${userId} deleted`);
            document.getElementById('delete-id').value = "";
            deleteUserMsg.textContent = `User ${userId} deleted.`
        }
        } catch(error){ //catch any errors 
        console.log("Error", error);
        }
    } else {
        console.log('Delete Cancelled')
        deleteUserMsg.textContent = `Delete Cancelled`
    }
})