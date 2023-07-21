const { createCustomer } = require('../controllers/customer')

const router = require('express').Router()

router.get('/', (req, res) =>{
    return res.status(200).json({message: "get customer"})
  })

router.post('/', createCustomer)


  module.exports = router