import * as dao from "./dao.js"
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
    const findUsersForCourse = async (req, res) => {
        try{const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
      }catch(error) {
        console.error("Error fetching all courses:", error); // Error log
        res.status(500).send({ error: "Failed to fetch all courses" });
    
      }};
    app.get("/api/courses/:cid/users", findUsersForCourse);

      
    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
          ...req.body,
          course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });
     
    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });

    app.delete("/api/courses/:courseId", async (req, res) => {
        //const currentUser = req.session["currentUser"];
        const { courseId } = req.params;
        //if (currentUser) {
           // await enrollmentsDao.unenrollUserFromCourse(currentUser._id, courseId);
       // }
        try {const status = await dao.deleteCourse(courseId);
        res.send(status);} catch (error) {
            console.error("Error deleting question:", error.message);
            res.status(500).json({ error: "Failed to delete courses. Check server logs for details." });
   
        }
      });
     
    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }


        //const currentUser = req.session["currentUser"];
        {/*if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }*/}
        //const course = await dao.createCourse(req.body);
        res.json(course);
    })

    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    })

    {/*app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.sendStatus(status);
    }); */}  


    {/*app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
          ...req.body,
          course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });*/}
    
    {/*app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesforCourse(courseId);
        res.json(modules);
    });*/}

    app.post("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignment = {
          ...req.body,
          course: courseId,
        };
        const newAssignment = await assignmentsDao.createAssignment(assignment);
        res.send(newAssignment);
    });
    
    // get all assignments from the specified course by course._id
    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await assignmentsDao.findAssignmentsforCourse(courseId);
        res.json(assignments);
    });    
}
