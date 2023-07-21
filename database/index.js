const mongoose = require('mongoose')

const connectToDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://thieuquangtruong3861:truong3861@wed69.4mfwvmb.mongodb.net/wed69')
        console.log("connect to db succeccful")
    } catch (error){
        console.log(error)
    }
   
}

module.exports = {
    connectToDb
}