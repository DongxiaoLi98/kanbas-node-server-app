import * as dao from "./dao.js"
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";


export default function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = dao.findAllCourses();
        res.send(courses);
    })

    app.delete("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        dao.deleteCourse(courseId);
        res.sendStatus(204);
    });   

    app.put("/api/courses/:courseId", (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        dao.updateCourse(courseId, courseUpdates);
        res.sendStatus(204);
    });

    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
          ...req.body,
          course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });
    
    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesforCourse(courseId);
        res.json(modules);
    });

    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignment = {
          ...req.body,
          course: courseId,
        };
        const newAssignment = assignmentsDao.createAssignment(assignment);
        res.send(newAssignment);
    });
    
    // get all assignments from the specified course by course._id
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = assignmentsDao.findAssignmentsforCourse(courseId);
        res.json(assignments);
    });    
}
