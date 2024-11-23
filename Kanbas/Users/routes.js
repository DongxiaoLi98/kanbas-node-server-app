//import { use } from "express/lib/application.js";
import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
//let currentUser = null;

export default function UserRoutes(app) {
    const createUser = (req, res) => {
      const user = dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({message: "Username already in use"});
        return;
      }
      const newUser = dao.createUser(req.body);
      res.status(201).json(newUser)

     };
    const deleteUser = (req, res) => {
      const userId = req.params.userId;
      const user = dao.findUserById(userId);
      if (!user) {
        res.status(404).json({message: "No user found"});
        return;
      }
      dao.deleteUser(userId);
      res.sendStatus(200);
     };

    //const findAllUsers = (req, res) => {currentUser = dao.findAllUsers(); res.json(currentUser) };
    const findAllUsers = (req, res) => {
      const users = dao.findAllUsers();
      res.json(users)
    }
    app.get("/api/users", findAllUsers);

    const findUserById = (req, res) => { 
      const userId = req.params.userId;
      const user = dao.findUserById(userId);
      if (!user) {
        res.status(404).json({message: "No user found"});
        return;
      }
      res.json(user);
    };

    const updateUser = (req, res) => { 
      const userId = req.params.userId;
      const userUpdates = req.body;
      dao.updateUser(userId, userUpdates);
      const currentUser = dao.findUserById(userId);
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    };

    const signin = (req, res) => { 
      const { username, password } = req.body;
      const currentUser = dao.findUserByCredentials(username, password);
        //console.log("Current User", currentUser);
      if (currentUser) {
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
          res.status(401).json({ message: "Unable to login. Try again later." });
        }    
    };
    app.post("/api/users/signin", signin);

    const signup = (req, res) => {const user = dao.findUserByUsername(req.body.username);
        if (user) {
          res.status(400).json(
            { message: "Username already in use" });
          return;
        }
        const currentUser = dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    app.post("/api/users/signup", signup);

    const signout = (req, res) => {
      req.session.destroy();
      res.sendStatus(200);
    };

    const profile = async (req, res) => {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      res.json(currentUser);
    };
  

    app.post("/api/users", createUser);
    
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);

    const findCoursesForEnrolledUser = (req, res) => {
      let {userId} = req.params;

      if (userId === "current") {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
          res.sendStatus(401);
          return;
        }
        userId = currentUser._id;
      }

      const courses = courseDao.findCoursesForEnrolledUser(userId);
      res.json(courses);
    }; 
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

    const createCourse = (req, res) => {
      const currentUser = req.session["currentUser"];
      const newCourse = courseDao.createCourse(req.body);
      enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
      res.json(newCourse);
    };
    app.post("/api/users/current/courses", createCourse);

    const createEnrollment = (req, res) => {
      const currentUser = req.session["currentUser"];
      const {courseId} = req.body;
      if (!currentUser || ! courseId) {
        res.sendStatus(401);
        return;
      }
      enrollmentsDao.enrollUserInCourse(currentUser._id, courseId);
      res.sendStatus(204);
    };
    app.post("/api/users/current/enrollments", createEnrollment);

    const unEnrollment = (req, res) => {
      const currentUser = req.session["currentUser"];
      const {courseId} = req.body;
      if (!currentUser || ! courseId) {
        res.sendStatus(401);
        return;
      }
      enrollmentsDao.unEnrollUserInCourse(currentUser._id, courseId);
      res.sendStatus(204);
    }
    app.delete("/api/users/current/enrollments", unEnrollment);
}


