const {Router} = require('express')
const auth = require('../controllers/auth')

const router = Router();

router.get('/signup', auth.getSignup);
router.post('/signup', auth.postSignup);
router.get('/login', auth.getLogin);
router.post('/login', auth.postLogin);
router.get('/logout', auth.getLogout);

module.exports = router;