import mongoose from "mongoose";


const connectToDB=async ()=>{
    const connectionUrl = 'mongodb+srv://kundansaini2311:xknaZM81dJgv3UF4@cluster0.lylbqmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

    mongoose.connect(connectionUrl).then(()=>{
        console.log("Connect To DB")
    }).catch((error)=>{
        console.log(error.message)
    })
}


export default connectToDB;