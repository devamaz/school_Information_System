const router = require('express').Router();

const userController = require('../controllers/userController');
const imageController = require('../controllers/imageController');



router.get('/', userController.home);

//view all student info
router.get('/student', userController.students);

//view single student info

router.get('/student/:id', userController.student);

//create student info
router.get('/register', userController.studentRegistration)
router.post('/register',    
    imageController.upload, 
    imageController.resize, 
    userController.registerStudent
);

//edit student info
router.get('/student/:id/edit', userController.editStudent);
router.post('/student/edit/:id', userController.updateStudent);

//delete student info
router.delete('/student/delete/:id', userController.deleteStudent);

module.exports = router;