const mongoose = require('mongoose');
const async = require('async');
const User = require('../modals/user');
const Appointment = require('../modals/appointment');

exports.userLogin = async function (req, res) {
    console.log(req.body)
    User.findOne({
        email: req.body.obj.email
    }, function (err, user) {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Error processing request' + err
            });
        }
        if (!user) {
            res.status(201).json({
                success: false,
                message: 'incorrect  credebtials.'
            });
        }
        if (user) {
            console.log('the user data is' + user)
            // let newUser ={
            //     id : user._id,
            //     email:user.email,
            //     userName:user.userName
            //             }
            user.comparePassword(req.body.obj.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // user2 = Object.assign(newUser, {
                    //     exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) // 1 year
                    //     // exp: Math.floor(Date.now() / 1000) + (60 * 2)
                    // });
                    // var token = jwt.sign(user2, process.env.SECRET_KEY);

                    // var token = jwt.sign({data:user},process.env.SECRET_KEY,{
                    //     expiresIn: config.expiresin
                    // });
                    res.json({
                        success: true,
                        msg: user

                    })
                } else {
                    res.status(201).json({
                        success: false,
                        message: 'incorrect login credentials'
                    })
                }
            })
        }
    })

}
exports.adminSignup = async function (req, res) {
    const useremail = req.body.email;
    const password = req.body.password;
    const firstname = req.body.name;
    const specilization = req.body.specilization;
    const isDoctor = req.body.isDoctor ? true : false;
    const address = req.body.address
    if (!useremail || !password) {
        return res.json({
            success: false,
            message: 'posted data is not correct or incomplete.'
        });
    }
    User.findOne({
        email: useremail
    }, function (err, existingUser) {
        if (err) {
            res.status(400).json({
                success: false,
                message: 'Error Processing request' + err
            })
        };
        //if the user isalready there
        if (existingUser) {
            return res.status(201).json({
                success: false,
                message: 'email already exists'
            });
        }
        //if no user create accouunt 
        let newUser = new User({
            email: useremail,
            password: password,
            firstname: firstname,
            isDoctor: isDoctor,
            address: address,
            specilization:specilization

        });
        newUser.save(function (err, user) {
            if (err) {
                res.json({
                    success: false,
                    message: 'ErrorProcessing request' + err
                });
            }
            res.json({
                success: true,
                message: 'user Created Successfully Please Login to your account.'
            });
        });
    });


}
exports.saveAppointment = async function(req,res){
    let appointment = new Appointment({
        appointmentDate:req.body.appointmentDate,
        name:req.body.name,
        email:req.body.email,
        appointTime:req.body.appointTime,
        AppointMentFor:req.body.AppointMentFor,
        userId:req.body.userId,
        drId:req.body.drId
    })
  let appo = await   appointment.save();
  if(appo){
      res.json({
          mesage:appo,
          success:true
      })
  } else{
    res.json({
        mesage:'unable to book appointment',
        success:false
    })
  }
}


exports.getdoctors = async function(req,res){
    // let appointment = new Appointment({
    //     appointmentDate :req.body.obj.appointmentDate,
    //     userId:req.body.obj.userId,
    //     created_on:req.body.obj.created_on,
    //     drId: req.body.obj.drId
    // })
  let appo = await   User.find({isDoctor:true});
  if(appo){
      res.json({
          mesage:appo,
          success:true
      })
  } else{
    res.json({
        mesage:'unable to book appointment',
        success:false
    })
  }
}

exports.getAppointmentDetails = async function(req,res){
  let appo = await   Appointment.find({userId:req.body.userId}).populate({
      path:'drId',
      modal:'users'
  });
  if(appo){
      res.json({
          message:appo,
          success:true
      })
  } else{
    res.json({
        mesage:'unable to book appointment',
        success:false
    })
  }
}

exports.deleteAppointment = async function(req,res){
    let appo = await   Appointment.remove({_id:req.body.user.appId});
    if(appo){
        let app = await   Appointment.find({userId:req.body.user.userId}).populate({
            path:'drId',
            modal:'users'
        });;
        res.json({
            message:app,
            success:true
        })
    } else{
      res.json({
          mesage:'unable to book appointment',
          success:false
      })
    }
  }
  exports.drdeleteAppointment = async function(req,res){
    let appo = await   Appointment.remove({_id:req.body.user.appId});
    if(appo){
        let app = await   Appointment.find({drId:req.body.user.userId}).populate({
            path:'userId',
            modal:'users'
        });;
        res.json({
            message:app,
            success:true
        })
    } else{
      res.json({
          mesage:'unable to book appointment',
          success:false
      })
    }
  }
  exports.drgetAppointmentDetails = async function(req,res){
    let appo = await   Appointment.find({drId:req.body.userId}).populate({
        path:'userId',
        modal:'users'
    });
    console.log('the appointMent details is'+ appo)
    if(appo){
        res.json({
            message:appo,
            success:true
        })
    } else{
      res.json({
          mesage:'unable to book appointment',
          success:false
      })
    }
  }




