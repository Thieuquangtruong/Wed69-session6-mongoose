const  createCustomer = (req,res) => {
    return res.status(200).json({message: "create Customer"})
}

module.exports = {
    createCustomer
}