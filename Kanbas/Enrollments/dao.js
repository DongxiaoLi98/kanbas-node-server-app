import Database from "../Database/index.js";

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