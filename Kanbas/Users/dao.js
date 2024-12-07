import model from "./model.js";

// Create New User
{/*
    export const createUser = (user) => {
        const newUser = {...user, _id: Date.now()} // change the _id property's value
        users = [...users, newUser] // append the new user to users list
        return newUser; // return the created new user
    };
*/}
export const createUser = (user) => {
    delete user._id // allow the databased generate primary key
    return model.create(user);
}
  
// .find() is a function to retrive every document, === select * from user
export const findAllUsers = () => 
    model.find();

// retrive all documents whoes primary Key is Id
export const findUserById = (userId) => 
    model.findById(userId);

// findOne: find unique document
export const findUserByUsername = (username) =>  
    model.findOne({ username: username });
    // Javascript: users.find((user) => user.name === username)

export const findUserByCredentials = (username, password) =>  
    model.findOne({ username, password });

export const updateUser = (userId, user) =>  
    model.updateOne({ _id: userId }, { $set: user }); // only fileds listed there and values are different, then update
    // model.findByIdAndUpdate(userId, user, {new : true}); merge the new values 
    // if no mathcing, it will insert 

export const deleteUser = (userId) => 
    model.deleteOne({ _id: userId });

export const findUsersByRole = (role) => 
    model.find({ role: role }); // or just model.find({ role })

export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};


{/*
    //import Database from "../Database/index.js";
    export const findUserByUsername = (username) => users.find((user) => user.username === username);

    export const findAllUsers = () => users;
    export const findUserById = (userId) => users.find((user) => user._id === userId);

    export const findUserByCredentials = (username, password) =>
        users.find( (user) => user.username === username && user.password === password );

    export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
    export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
*/}
  