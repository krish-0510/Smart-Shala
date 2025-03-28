import { Admin } from "../Models/Admin.js";
import { Classroom } from "../Models/Classroom.js";
import { Student } from "../Models/Student.js";
import { Teacher } from "../Models/Teacher.js";
import JWT from 'jsonwebtoken'
//add Admin
export const JWT_SECRET = "asbcdefgh123"
export const addAdmin = async (req, res) => {
  let admin = await Admin.find({ email: req.body.email });

  if (admin && admin.length > 0) {
    res.status(403).json({ message: "Admin already exists" });
    return;
  }

  admin = new Admin(req.body);

  admin
    .save()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.send("Error Occurred !!!");
    });
};

//get Admin
export const getAdmin = async(req, res) => {
  const id = req.params.id;
    try {
        const admin = await Admin.findById(id);
        if(admin == null) {
            res.status(400).json({message:"Admin does not exist"});
        }
        else {
            res.status(201).json({message:"success", admin});
        }
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

//admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Enter email or password",
      });
    }

    const admin = await Admin.findOne({ email : email });
    if (admin == null) {
      return res.status(404).send({
        success: false,
        message: "email not registered",
      });
    }

    if(password != admin.password) {
      return res.status(404).send({
        success: false,
        message: "Password is incorrect",
      });
    }
    const jwt_token = JWT.sign({ _id: admin._id }, JWT_SECRET, {
      expiresIn: "10d",
    });
    res.status(200).send({
      success: true,
      message: "login success",
      admin,
      jwt_token,
    });
  } catch (error) {
    console.log("error in login", error);
  }
};

//add classroom to admin portal
export const addClassroomToAdmin = async (req, res) => {
  let admin = await Admin.findById(req.params.id);

  if (admin == null) {
    res.status(404).json({ message: "Admin does not exist" });
    return;
  }
  let classroom = new Classroom(req.body);
  classroom
    .save()
    .then(() => {
      console.log("New Classroom Added Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  admin.classrooms.push(classroom._id);

  admin
    .save()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.send("Error Occurred !!!");
    });
};

//add teacher to admin portal
export const addTeacherToAdmin = async (req, res) => {
  let admin = await Admin.findById(req.params.id);
  let teachers = await Teacher.find({ email: req.body.email });

  if (admin == null) {
    res.status(404).json({ message: "Admin does not exist" });
    return;
  }
  if (!teachers || teachers.length == 0) {
    res.status(404).json({ message: "Teacher does not exist" });
    return;
  }
  if (admin.teachers.includes(teachers[0]._id)) {
    res
      .status(404)
      .json({ message: "Teacher Already exists in your institute" });
    return;
  }
  admin.teachers.push(teachers[0]._id);

  admin
    .save()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.send("Error Occurred !!!");
    });
};

//add student to admin portal
export const addStudentToAdmin = async (req, res) => {
  let admin = await Admin.findById(req.params.id);
  let students = await Student.find({ email: req.body.email });

  if (admin == null) {
    res.status(404).json({ message: "Admin does not exist" });
    return;
  }
  if (!students || students.length == 0) {
    res.status(404).json({ message: "Student does not exist" });
    return;
  }
  if (admin.students.includes(students[0]._id)) {
    res
      .status(404)
      .json({ message: "Student Already exists in your institute" });
    return;
  }
  admin.students.push(students[0]._id);

  admin
    .save()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.send("Error Occurred !!!");
    });
};

//get classrooms associated with admin
export const getClassroomsOfAdmin = async (req, res) => {
  let id = req.params.id;
  let admin = await Admin.findById(id);

  if (admin == null) {
    res.status(404).json({ message: "Admin does not exist" });
  } else {
    let classrooms = [];

    for (let i = 0; i < admin.classrooms.length; i++) {
      let classroom = await Classroom.findById(admin.classrooms[i]);
      if (classroom) {
        classrooms.push(classroom);
      }
    }
    res.status(201).json({ message: "success", classrooms });
  }
};

//get students associated with admin
export const getStudentsOfAdmin = async (req, res) => {
  let id = req.params.id;
  let admin = await Admin.findById(id);

  if (admin == null) {
    res.status(404).json({ message: "Admin does not exist" });
  } else {
    let students = [];

    for (let i = 0; i < admin.students.length; i++) {
      let student = await Student.findById(admin.students[i]);
      if (student) {
        students.push(student);
      }
    }
    res.status(201).json({ message: "success", students });
  }
};

//get teachers associated with admin
export const getTeachersOfAdmin = async (req, res) => {
  let id = req.params.id;
  let admin = await Admin.findById(id);

  if (admin == null) {
    res.status(404).json({ message: "Admin does not exist" });
  } else {
    let teachers = [];

    for (let i = 0; i < admin.teachers.length; i++) {
      let teacher = await Teacher.findById(admin.teachers[i]);
      if (teacher) {
        teachers.push(teacher);
      }
    }
    res.status(201).json({ message: "success", teachers });
  }
};

//delete student associated with Admin
export const deleteStudentOfAdmin = async (req, res) => {
  let aId = req.params.aId;
  let admin = await Admin.findById(aId);

  if (admin == null) {
    res.status(404).json({ message: "Admin does not exist" });
    return;
  }
  let sId = req.params.sId;
  admin.students = admin.students.filter((id) => id != sId);

  admin
    .save()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.send("Error Occurred !!!");
    });
};

//delete teacher associated with Admin
export const deleteTeacherOfAdmin = async (req, res) => {
  let aId = req.params.aId;
  let admin = await Admin.findById(aId);

  if (admin == null) {
    res.status(404).json({ message: "Admin does not exist" });
    return;
  }
  let tId = req.params.tId;
  admin.teachers = admin.teachers.filter((id) => id != tId);

  admin
    .save()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.send("Error Occurred !!!");
    });
};

//delete classrooms associated with Admin
export const deleteClassroomOfAdmin = async (req, res) => {
  let aId = req.params.aId;
  let admin = await Admin.findById(aId);

  if (admin == null) {
    res.status(404).json({ message: "Admin does not exist" });
    return;
  }
  let cId = req.params.cId;
  admin.classrooms = admin.classrooms.filter((id) => id != cId);

  admin
    .save()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.send("Error Occurred !!!");
    });
};
