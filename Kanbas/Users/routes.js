//import { use } from "express/lib/application.js";
import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
//let currentUser = null;

export default function UserRoutes(app) {
 
  // Get request from URL, and response to it
  const findCoursesForUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (! currentUser) {
      res.sendStatus(401);
      return;
    }

    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      res.json(courses);
      return;
    }

    let {uid} = req.params;
    if (uid === "current") {
      uid = currentUser._id;
    }

    const courses = await enrollmentsDao.findCoursesForUser(uid);
    res.json(courses);
  }; 
  app.get("/api/users/:uid/courses", findCoursesForUser);
 
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  app.post("/api/users", createUser);
  
    {/*const createUser = (req, res) => {
      const user = dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({message: "Username already in use"});
        return;
      }
      const newUser = dao.createUser(req.body);
      res.status(201).json(newUser)

     };*/}

     const deleteUser = async (req, res) => {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
    };


    //const findAllUsers = (req, res) => {currentUser = dao.findAllUsers(); res.json(currentUser) };
    const findAllUsers = async (req, res) => {
      const { role , name  } = req.query;
      if (role) {
        const users = await dao.findUsersByRole(role);
        res.json(users);
        return;
      }
      if (name) {
        const users = await dao.findUsersByPartialName(name);
        res.json(users);
        return;
      }
  
      const users = await dao.findAllUsers();
      res.json(users);
    };
    
    app.get("/api/users", findAllUsers);

    const findUserById = async (req, res) => {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    };

    const updateUser = async(req, res) => { 
      const userId = req.params.userId;
      const userUpdates = req.body;
      await dao.updateUser(userId, userUpdates);
      const currentUser = req.session["currentUser"];
      if (currentUser && currentUser._id === userId) {
     req.session["currentUser"] = { ...currentUser, ...userUpdates };
   }
      res.json(currentUser);
    };
    app.put("/api/users/:userId", updateUser);

    const signin = async(req, res) => { const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        //console.log("Current User", currentUser);
        if (currentUser) {
          req.session["currentUser"] = currentUser;
          res.json(currentUser);
        } else {
          res.status(401).json({ message: "Unable to login. Try again later." });
        }    
    };
    app.post("/api/users/signin", signin);

    const signup = async(req, res) => {const user = await dao.findUserByUsername(req.body.username);
        if (user) {
          res.status(400).json(
            { message: "Username already in use" });
          return;
        }
        const currentUser = await dao.createUser(req.body);
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
  
    
    app.get("/api/users/:userId", findUserById);
    
    app.delete("/api/users/:userId", deleteUser);
    
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);

    {/*// Get request from URL, and response to it
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
    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);*/}

    {/*const createCourse = (req, res) => {
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
    app.delete("/api/users/current/enrollments", unEnrollment);*/}
}