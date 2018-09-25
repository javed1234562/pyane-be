"use strict";
var mongoose = require('mongoose');

var appointment = new mongoose.Schema({
   appointmentDate:{
       type:Date,
       default:null
   },
   name:{
       type:String,
       default:null
   },
   email:{
    type:String,
    default:null
    },
   appointTime:{
    type:String,
    default:null
   },
   AppointMentFor:{
    type:String,
    default:null
   },
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
   },
   created_on:{
    type: Date,
    default: new Date()
   },
   drId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
   }

}, { versionKey: false });
var User = mongoose.model('appointments', appointment);
module.exports = User;