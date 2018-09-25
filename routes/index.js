var express = require('express');
var router = express.Router();
var common = require('../controllers/common');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login',common.userLogin);
router.post('/signup',common.adminSignup);
router.post('/saveAppointment',common.saveAppointment);
router.post('/getdoctors',common.getdoctors);
router.post('/getAppointmentDetails',common.getAppointmentDetails);
router.post('/deleteAppointment',common.deleteAppointment);
router.post('/drgetAppointmentDetails',common.drgetAppointmentDetails);
router.post('/drdeleteAppointment',common.drdeleteAppointment);

module.exports = router;
