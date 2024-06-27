import express, {NextFunction, Request, Response} from "express";
import { 

    getStudentNameByage, 
    getNameAndScoreByClass, 
    getStudentRankDesc,
    getTotalStudentByclass, 
    getAvgExamScore,
    getUniqueClass,
    GetFirst5StudentsToEnroll,
    getStudentByScoresAndAge,
    getAvgExamScoreByAge,
    getTopStudentByClass,

} from "../controller/studentController.ts";


const router = express.Router();

    router.get('/student/age/:age',getStudentNameByage);
    router.get('/student/exam_score/:class', getNameAndScoreByClass);
    router.get('/student/rank', getStudentRankDesc);
    router.get('/student/total', getTotalStudentByclass);
    router.get('/student/avg', getAvgExamScore);
    router.get('/student/unique', getUniqueClass);
    router.get('/student/data', GetFirst5StudentsToEnroll);
    router.get('/student/exam_score_and_age/filter', getStudentByScoresAndAge);
    router.get('/student/avg_by_age/:age', getAvgExamScoreByAge);
    router.get('/student/top/:class', getTopStudentByClass);

export { router as productRouter };