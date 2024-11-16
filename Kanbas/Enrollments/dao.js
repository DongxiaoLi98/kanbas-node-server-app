import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
    const {enrollments} = Database;

    enrollments.push({_id: Date.now(), user: userId, course: courseId }); //the enrollment information ={_id, userId, courseId}
}