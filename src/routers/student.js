const express = require('express');
const router = new express.Router();
const Student = require('../models/students');

//create new student
// app.post('/students', (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });
// });

router.post('/students', async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/students', async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.status(201).send(studentsData);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/students/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById(_id);

    if (!studentData) {
      res.status(404).send();
    } else {
      res.status(201).send(studentData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete('/students/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(_id);

    if (!_id) {
      return res.status(400).send();
    }
    res.send(deleteStudent);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/students/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.send(updateStudents);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
