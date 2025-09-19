const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const upload = multer({storage:multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,path.join(__dirname,'..','uploads/user'))
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})})

const { registerUser, loginUser, logoutUser, forgotPassword, resertPassword, getUserProfile, changePassword, getAllUser, getUser, updateUser, deleteUser, updateProfile } = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authonticate');


router.route('/user/register').post(upload.single('avatar'),registerUser);
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(logoutUser);
router.route('/user/password/forgot').post(forgotPassword);
router.route('/user/password/reset/:token').post(resertPassword);
router.route('/user/myprofile').get(isAuthenticatedUser,getUserProfile);
router.route('/user/password/change').put(isAuthenticatedUser,changePassword);
router.route('/user/updateprofile').put(isAuthenticatedUser,upload.single('avatar'),updateProfile);

//Admin routes
router.route('/admin/user/all').get(isAuthenticatedUser,authorizeRoles('admin'),getAllUser);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUser);
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteUser);

module.exports =router;