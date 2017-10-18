const mongoose = require('mongoose');
const User = mongoose.model('User');


//view all students
exports.home = (req, res) => {
    User.find({}, (err, data) =>{
        if(err){
            console.log('you are in trouble')
        }else{
            res.json(data)
        }
    });
}


// view single student
exports.student = (req, res) =>{
    User.findById(req.params.id, (err, data) =>{
        if(err){
            console.log('you are in trouble')
        }else{
            res.json(data)
        }
    })
}


//create user
exports.registerStudent = (req, res)=> {
    const fullName = req.body.fullName,
          email = req.body.email,
          gender = req.body.gender,
          dateOfBirth = req.body.dateOfBirth,
          homeTown = req.body.homeTown,
          stateOfOrigin = req.body.stateOfOrigin,
          lga = req.body.lga,
          address = req.body.address,
          school = req.body.school,
          department = req.body.department,
          course = req.body.course;
        
    req.checkBody('fullName', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('gender', 'Gender is required').notEmpty();
    req.checkBody('dateOfBirth', 'State  is required').notEmpty();
    req.checkBody('homeTown', 'Please enter your home town').notEmpty();
    req.checkBody('stateOfOrigin', 'State of origin').notEmpty();
    req.checkBody('lga', 'Local Goverment Area').notEmpty();
    req.checkBody('address', 'Your Address is required').notEmpty();
    req.checkBody('school', 'School is required').notEmpty();
    req.checkBody('department', 'Department is required').notEmpty();
    req.checkBody('course', 'Course is required').notEmpty();

    req.sanitize(req.body).escape();
    

    // check for validation error
    let errors = req.validationErrors();
        if(errors){
            res.send(errors);
        } else {
            let newUser = new User({
                fullName,
                email,
                gender,
                dateOfBirth,
                homeTown,
                stateOfOrigin,
                lga,
                address,
                school,
                department,
                course
            });
    
        newUser.save((err) =>{
            if(err){
                console.log(err);
                return;
                } else {
                console.log(yay);
                res.redirect('/');
                }
            });
            };
    }


// Edit student info
exports.editStudent = (req, res) =>{
    User.findById(req.params.id, (err, data) =>{
        if(err){
            console.log('you are in trouble')
        }else{
            res.json(data)
        }
    })
}

//Update student info
exports.updateStudent = (req, res)=> {
    const fullName = req.body.fullName,
          email = req.body.email,
          gender = req.body.gender,
          dateOfBirth = req.body.dateOfBirth,
          homeTown = req.body.homeTown,
          stateOfOrigin = req.body.stateOfOrigin,
          lga = req.body.lga,
          address = req.body.address,
          school = req.body.school,
          department = req.body.department,
          course = req.body.course;
        
    req.checkBody('fullName', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('gender', 'Gender is required').notEmpty();
    req.checkBody('dateOfBirth', 'State  is required').notEmpty();
    req.checkBody('homeTown', 'Please enter your home town').notEmpty();
    req.checkBody('stateOfOrigin', 'State of origin').notEmpty();
    req.checkBody('lga', 'Local Goverment Area').notEmpty();
    req.checkBody('address', 'Address').notEmpty();
    req.checkBody('school', 'School').notEmpty();
    req.checkBody('department', 'Department').notEmpty();
    req.checkBody('course', 'Course').notEmpty();
    
    
    // check for validation error
    let errors = req.validationErrors();
   
    if(errors){
      res.send(errors);
    } else {

        let query = {_id:req.params.id}  
  
    User.update( query, req.body, (err) =>{
        // console.log(user.stateOfOrigin)
        if(err){
            console.log(err);
              return;
            } else {
        
              res.send('Yayyyyy')
            //   res.redirect('/');
            }
          });
        };
    }


    //delete student info
    exports.deleteStudent = (req, res)=> {
     
        
            let query = {_id:req.params.id}  
      
        User.remove(query, (err) =>{
            // console.log(user.stateOfOrigin)
            if(err){
                console.log(err);
                  return;
                } else {
            
                  res.send('yay')
                //   res.redirect('/');
                }
              });
            };
        