const { Router } = require('express');
const {loginSession, logoutSession, changePassword,resetPassword} = require('./authentication.controller');
const router = Router();

/*Authentication controller*/
router.post('/login', loginSession );
router.post('/logout', logoutSession );
router.post('/reset-password',resetPassword );
router.post('/change-password', changePassword );
router.post('/change-password/:token/:id', changePassword );

module.exports = router;