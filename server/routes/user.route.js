const express = require("express");
const {
    getAll,
    registerUser,
    loginUser,
    logoutUser,
    updateUserRole,
    currentUser,
    updateItem,
    updateUserPassword,
    getWithId
} = require('../controller/user.controller');

const upload = require('../middleware/uploadFIles');

const {
    verify_jwt,
    verify_admin,
} = require('../middleware/authorization/authenticate');


const router = express.Router();

router.get('/', verify_jwt, verify_admin, getAll);
router.post('/register', upload.single('img'), registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.put('/update_role', verify_jwt, verify_admin, updateUserRole);
router.get('/current_user', verify_jwt, currentUser);
router.post('/update/:id', verify_jwt, updateItem);
router.post('/update_password/:id', verify_jwt, updateUserPassword);
router.get('/:id', getWithId);

module.exports = router;