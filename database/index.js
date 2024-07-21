import mongoose from "mongoose";


const connectToDB=async ()=>{
    const connectionUrl = 'mongodb://localhost:27017/jobs'

    mongoose.connect(connectionUrl).then(()=>{
        console.log("Connect To DB")
    }).catch((error)=>{
        console.log(error.message)
    })
}


export default connectToDB;