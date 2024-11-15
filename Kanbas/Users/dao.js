import db from "../Database/index.js";
let { users } = db;

{/*
// define the function to createUser
export const createUser = (user) => {
    const newUser = {...user, _id: Date.now()} // change the _id property's value
    users = [...users, newUser] // append the new user to users list
    return newUser; // return the created new user
};*/}
export const createUser = (user) => {
    const newUser = { ...user, _id: Date.now() };
        users = [...users, newUser];
        return newUser;
};

export const findUserByUsername = (username) => users.find((user) => user.username === username);

export const findAllUsers = () => users;
export const findUserById = (userId) => users.find((user) => user._id === userId);

export const findUserByCredentials = (username, password) =>
    users.find( (user) => user.username === username && user.password === password );

export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
  