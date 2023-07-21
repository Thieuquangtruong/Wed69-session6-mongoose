const { getUser, createUser, deleteUser, login } = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const router = require('express').Router()

router.post('/login', login)
router.get ('/',authentication, getUser )
router.post ('/', createUser )
router.delete('/:id', deleteUser)

module.exports = router