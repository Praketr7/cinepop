// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;
// if(!MONGODB_URI){
//     throw new Error("define mongodb uri in .env.local");
// }

// let cached = global.mongoose;

// if(!cached){
//     cached = global.response = {conn: null, promise: null};
// }

// export async function connect(){
//     if(cached.conn) return cached.conn;
//     if(!cached.promise){
//         cached.promise = mongoose.connect(MONGODB_URI, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//         }).then((mongoose)=>mongoose);  
//     }
//     cached.conn = await cached.promise;
//     return cached.conn;
// }
 