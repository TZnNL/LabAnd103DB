const mongoose = require('mongoose')
mongoose.set('strictQuery' , true)

const atlat = "mongodb+srv://tuanvki33:2px98YHvrYD4IaoB@cluster0.r029q3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connect = async () =>{
    try {
        await mongoose.connect(atlat, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connect success");
    } catch (error) {
        console.log("Connect failed" , error);
    }
}

module.exports = { connect }