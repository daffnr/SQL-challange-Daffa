import { Request, Response  } from "express";
import { QueryError } from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import database from "../config/server.ts"
import { QueryResult } from "mysql2";

interface Student {
  id_student: number;
  nama_student: string;
  age: number;
  class: number;
  exam_score: number;
  enrollment_date: string;
}

export const getStudentNameByage = (req: Request, res: Response) => {
  const age = parseInt(req.params.age)
  const query = "SELECT * FROM student WHERE age = ?";
 
  database.query(
       query,
       [age],
    (err: QueryError | null, result: QueryResult) => {
      const student = result as Student[];
      if (err) {
        res.status(500).send(err);
      }else if (student.length > 0) {
      res.status(200).send({
        data: result,
      });
      }else {
        res.status(404).send({
          message: "Data Not Found",
        });
      }
    }
  );
};

export const getNameAndScoreByClass = (req: Request, res: Response) => {
  const studentClass = req.params.class;
  const query = "SELECT nama_student, exam_score FROM student WHERE class = ?";
 
  database.query(
       query,
       [studentClass],
    (err: QueryError | null, result: QueryResult) => {
      const student = result as Student[];
      if (err) {
        res.status(500).send(err);
      }else if (student.length > 0) {
      res.status(200).send({
        data: result,
      });
      } else {
        res.status(404).send({
          message: "Data Not Found",
        });
      }
    }
  );
};

export const getStudentRankDesc = (req: Request, res: Response) => {
  database.query(
    "SELECT * FROM student ORDER BY exam_score DESC", 
  (err: QueryError, result: Student[]) => {
    const student = result as Student[];
    if (err) {
      res.status(500).send(err);
    } else if (student.length > 0) {
      res.status(200).send({
        data: result,
      });
    } else {
      res.status(404).send({
        message: "Data Not Found",
      });
    } 
  }
);
};

export const getTotalStudentByclass = (req: Request, res: Response) => {
  database.query(
    "SELECT class, COUNT(*) AS jumlah_siswa FROM students GROUP BY class", 
  (err: QueryError, result: Student[]) => {
    const student = result as Student[];
    if (err) {
      res.status(500).send(err);
    } else if (student.length > 0) {
      res.status(200).send({
        data: result,
      });
    } else {
      res.status(404).send({
        message: "Data Not Found",
      });
    } 
  }
);
};

export const getAvgExamScore = (req: Request, res: Response) => {
  database.query(
    "SELECT class, AVG(exam_score) FROM student GROUP BY class limit 2", 
  (err: QueryError, result: Student[]) => {
    const student = result as Student[];
    if (err) {
      res.status(500).send(err);
    } else if (student.length > 0) {
      res.status(200).send({
        data: result,
      });
    } else {
      res.status(404).send({
        message: "Data Not Found",
      });
    } 
  }
);
};

export const getUniqueClass = (req: Request, res: Response) => {
  database.query(
    "SELECT class FROM student GROUP BY class HAVING COUNT(*) = 1;", 
  (err: QueryError, result: Student[]) => {
    const student = result as Student[];
    if (err) {
      res.status(500).send(err);
    } else if (student.length > 0) {
      res.status(200).send({
        data: result,
      });
    } else {
      res.status(404).send({
        message: "Data Not Found",
      });
    } 
  }
);
};

export const GetFirst5StudentsToEnroll= (req: Request, res: Response) => {
  database.query(
    "SELECT * FROM student ORDER BY enrollment_date ASC LIMIT 5", 
  (err: QueryError, result: Student[]) => {
    const student = result as Student[];
    if (err) {
      res.status(500).send(err);
    } else if (student.length > 0) {
      res.status(200).send({
        data: result,
      });
    } else {
      res.status(404).send({
        message: "Data Not Found",
      });
    } 
  }
);
};

export const getStudentByScoresAndAge = (req: Request, res: Response) => {
  const { exam_score, age } = req.query;
  const query = [exam_score, age];
  const sqlQuery =
    "SELECT nama_student, exam_score FROM student WHERE exam_score > ? AND age > ?";
  database.query(
    sqlQuery,
    query,
    (err: QueryError | null, result: QueryResult) => {
      const student = result as Student[];
      if (err) {
        res.status(500).send(err);
      }
      if (student.length > 0) {
        res.status(200).send(student);
      } else {
        res.status(404).send("Data Not Found");
      }
    }
  );
};

export const getAvgExamScoreByAge= (req: Request, res: Response) => {
  const age = parseInt(req.params.age)
  const query = "SELECT age, AVG(exam_score) as rata2_nilai_ujian FROM student WHERE age = ?";
 
  database.query(
       query,
       [age],
    (err: QueryError | null, result: QueryResult) => {
      const student = result as Student[];
      if (err) {
        res.status(500).send(err);
      }else if (student.length > 0) {
      res.status(200).send({
        data: result,
      });
      }
    }
  );
};

export const getTopStudentByClass= (req: Request, res: Response) => {
  const studentClass = req.params.class;
  const query = "SELECT nama_student, exam_score FROM  student WHERE class = ? ORDER BY exam_score DESC LIMIT 1";
 
  database.query(
       query,
       [studentClass],
    (err: QueryError | null, result: QueryResult) => {
      const student = result as Student[];
      if (err) {
        res.status(500).send(err);
      }if (student.length > 0) {
      res.status(200).send({
        data: result,
      });
      }else{
        res.status(404).send({
          message: "Data Not Found",
        });
      }
    }
  );
};