import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {

}
async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }

    try{
       const db =  await mongoose.connect(process.env.MONGODB_URI || "")
       console.log("DB: ",db)
        connection.isConnected = db.connections[0].readyState
        console.log("DB connections: ",db.connections)
        console.log("Connected to database")
    }
    catch(err){
        console.log("Database connection failed!",err)
        process.exit(1)
    }
}

export default dbConnect;