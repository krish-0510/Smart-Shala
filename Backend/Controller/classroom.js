import {Classroom} from "../Models/Classroom.js"
import {Teacher} from "../Models/Teacher.js"
import {Student} from "../Models/Student.js"
import { Homework } from "../Models/Homework.js";

//get Classroom
export const getClassroom = async(req,res)=>{
    const id = req.params.id;
    try {
        const classroom = await Classroom.findById(id);
        if(classroom == null) {
            res.status(400).json({message:"Classroom does not exist"});
        }
        else {
            //respond with success message
            res.status(201).json({message:"success", classroom});
        }
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

//get all classrooms
export const getAllClassrooms = async(req,res)=>{
    try {
        const classrooms = await Classroom.find({});
        res.status(201).json({message:"success",classrooms})
    } catch (err) {
        //handle error
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }
}

//assign teacher
export const assignTeacherToClassroom = async(req,res) => {
    let teacher = await Teacher.findOne({email : req.body.email});
    let classroom = await Classroom.findById(req.params.id);

    if(teacher == null) {
        res.status(404).json({"message" : "Teacher does not exist"});
        return;
    }

    if(classroom == null) {
        res.status(404).json({"message" : "Classroom does not exist"});
        return;
    }

    if(classroom.teachers.includes(teacher._id) || teacher.classrooms.includes(classroom._id)) {
        res.status(404).json({"message" : "Teacher already exist in classroom"});
        return;
    }

    classroom.teachers.push(teacher._id);
    teacher.classrooms.push(classroom._id);

    classroom.save().then(()=>{
        teacher.save();
        res.status(200).json({ message: "Teacher Assigned to Classroom Successfully" });
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Assign teacher to the classroom");
    });
}

//assign student
export const assignStudentToClassroom = async(req,res) => {
    let student = await Student.findOne({email : req.body.email});
    let classroom = await Classroom.findById(req.params.id);

    if(student == null) {
        res.status(404).json({"message" : "Student does not exist"});
        return;
    }

    if(classroom == null) {
        res.status(404).json({"message" : "Classroom does not exist"});
        return;
    }

    if(classroom.students.includes(student._id)) {
        res.status(404).json({"message" : "Student already exist in classroom"});
        return;
    }

    if(student.classroom != null) {
        res.status(404).json({"message" : "Student is part of other classroom already"});
        return;
    }

    classroom.students.push(student._id);
    student.classroom = classroom._id;

    classroom.save().then(()=>{
        student.save();
        res.status(200).json({ message: "Student Assigned to Classroom Successfully" });
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Assign student to the classroom");
    });
}

export const getClassroomName = async(id) => {
    let classroom = await Classroom.findById(id);

    if(classroom == null) {
        return "No classroom found";
    }
    return classroom.name;
}

// delete classroom
export const deleteClassroom = async(req,res)=>{
    const id=req.params.id;
    try {
        const deleteClassroom = await Classroom.findByIdAndDelete(id);
        //respond with success message
        res.status(201).json({message:"success", deleteClassroom})
    } catch (err) {
        //handle error
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

// edit classroom
export const editClassroom = async(req, res) => {
    let id = req.params.id;
    let classroom = await Classroom.findById(id);

    if(classroom == null) {
        res.status(404).json({message : "Classroom does not exist"});
        return;
    }

    await Classroom.findByIdAndUpdate(id,{
        name : req.body.name,
        subjects : req.body.subjects,
        endingDate : req.body.endingDate
    },{runValidators : true , new :true});
    res.status(200).json({ message: "Classroom edited Successfully" });
}

// assign homework to classroom
export const assignHomeworkToClassroom = async(req, res) => {
    let teacherId = req.params.id;
    let classroomId = req.body.id;
    let teacher = await Teacher.findById(teacherId);
    let classroom = await Classroom.findById(classroomId);

    if(classroom == null) {
        res.status(404).json({message : "Classroom does not exist"});
        return;
    }

    if(teacher == null) {
        res.status(404).json({message : "Teacher does not exist"});
        return;
    }

    let homework = new Homework({
        subject : req.body.subject,
        title : req.body.title,
        description : req.body.description,
        dueDate : req.body.dueDate,
        teacher : teacher._id,
        classroom : classroom._id,
        file : req.body.file
    });
    classroom.homeworks.push(homework._id);
    teacher.homeworks.push(homework._id);

    homework.save().then(()=>{
        classroom.save();
        teacher.save();
        res.status(200).json({ message: "Homework Assigned to Classroom Successfully" , homework});
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!! , Couldn't Assign homework to the classroom");
    });
}

// initiate attendance
export const initiateAttendance = async(req, res) => {
    let date = new Date().toISOString().split('T')[0];
    let id = req.params.id;
    let classroom = await Classroom.findById(id);
    
    if(classroom == null) {
        res.status(404).json({message : "Classroom does not exist"});
        return;
    }

    let students = classroom.students;

    for (let i=0; i<students.length; i++) {
        let student = await Student.findById(students[i]);

        if(student && !student.absentDays.includes(date)) {
            student.absentDays.push(date);

            student.save();
        }
    }
    res.status(200).json({message : "success"});
}

// delete student from classroom
export const removeStudentFromClassroom = async(req, res) => {
    const student = await Student.findById(req.params.sId);
    const classroom = await Classroom.findById(req.params.cId);

    if(!student) {
        res.status(404).json({message : "Student does not exist"});
        return;
    }

    if(!classroom) {
        res.status(404).json({message : "Classroom does not exist"});
        return;
    }

    if(!classroom.students.includes(student._id)) {
        res.status(404).json({message : "Classroom does not contain student"});
        return;
    }
    
    classroom.students = classroom.students.filter((s)=> s._id != student.id);
    student.classroom = null;

    classroom.save().then(()=>{
        student.save();
        res.status(200).json({ message: "Student Deleted from Classroom Successfully"});
    }).catch((err)=>{
        console.log(err);
        res.send("Error Occurred !!!");
    });
}

// get Homework associated to classroom
export const getHomeworkOfClass = async(req, res) => {
    const id = req.params.id;
    const classroom = await Classroom.findById(id);

    if(!classroom) {
        res.status(404).json({message : "Classroom does not exist"});
        return;
    }
    res.status(200).json({homeworks : classroom.homeworks});

}

// Get students of a particular classroom
export const getStudentsOfClassroom = async (req, res) => {
    const classroomId = req.params.id;

    try {
        const classroom = await Classroom.findById(classroomId).populate('students');
        if (!classroom) {
            return res.status(404).json({ message: "Classroom does not exist" });
        }

        const students = classroom.students;
        res.status(200).json({ message: "success", students });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
};

// get average student attendance of a classroom
export const getAverageStudentAttendanceOfClassroom = async(req, res) => {
    const id = req.params.id;
    const classroom = await Classroom.findById(id).populate('students');

    if(!classroom) {
        res.status(404).json({message : "Classroom does not exist"});
        return;
    }
    let average = 0;
    await Promise.all(classroom.students.map(async(student) => {
        const presentDays = student.presentDays.length;
        const total = student.absentDays.length + presentDays;
        average += presentDays / total;
    }));
    average = (average/classroom.students.length)*100;
    res.status(200).json({message:"success", average : !average ? 0 : average});
}

// Get top 3 performers of a classroom based on attendance
export const getTopPerformersOfClassroom = async (req, res) => {
    const id = req.params.id;
    const classroom = await Classroom.findById(id).populate('students');

    if (!classroom) {
        return res.status(404).json({ message: "Classroom does not exist" });
    }

    const students = classroom.students.sort((a, b) => {
        const aAttendance = (a.presentDays.length / (a.presentDays.length + a.absentDays.length)) || 0;
        const bAttendance = (b.presentDays.length / (b.presentDays.length + b.absentDays.length)) || 0;
        return bAttendance - aAttendance;
    }).slice(0, 3);

    res.status(200).json({ message: "success", topPerformers: students });
};

export const getSubmittedHomeworksOfClassroom = async (req, res) => {
    const classroomId = req.params.id;
    try {
        const classroom = await Classroom.findById(classroomId).populate('homeworks');
        if (!classroom) {
            return res.status(404).json({ message: "Classroom does not exist" });
        }

        const submittedHomeworks = [];

        for (const homework of classroom.homeworks) {
            const students = await Student.find({ submittedHomeworks: homework._id });
            const submissions = students.map(student => ({
                studentId: student._id,
                studentName: student.name,
                homeworkId: homework._id,
                homeworkTitle: homework.title,
                homeworkDescription: homework.description,
                homeworkDueDate: homework.dueDate
            }));
            submittedHomeworks.push({
                homework,
                submissions
            });
        }

        res.status(200).json({ submittedHomeworks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};