const router = require('express').Router();

const userController = require('../controllers/userController');


//view all student info
router.get('/', userController.home);

//view single student info
router.get('/student/:id', userController.student);

//create student info
router.post('/register', userController.registerStudent);

//edit student info
router.get('/student/:id/edit', userController.editStudent);
router.post('/student/edit/:id', userController.updateStudent);

//ddelete student info
router.post('/student/delete/:id', userController.deleteStudent);






module.exports = router;