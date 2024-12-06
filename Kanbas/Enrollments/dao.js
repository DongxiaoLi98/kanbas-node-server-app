import Database from "../Database/index.js";
import model from "./model.js";

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}

export function enrollUserInCourse(userId, courseId) {
    const {enrollments} = Database;
    enrollments.push({_id: Date.now(), user: userId, course: courseId }); //the enrollment information ={_id, userId, courseId}
}

export function unEnrollUserInCourse(userId, courseId) {
    const {enrollments} = Database;
    Database.enrollments = enrollments.filter((enrollment) => 
        !(enrollment.user === userId && enrollment.course === courseId));
}

export function fetchAllEnrollments() {
    return Database.enrollments;
}