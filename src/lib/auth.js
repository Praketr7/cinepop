// import jwt from "jsonwebtoken"

// export async function signToken(user){
//     return jwt.sign(
//         {id: user._id, username: user.username},
//         process.env.JWT_SECRET,
//         {expiresIn: "1h"}
//     );
// }

// export async function verifyToken(token){
//     try{
//         return jwt.verify(token, process.env.JWT_SECRET);
//     } 
//     catch(err){
//         return null;
//     }
// }

// export async function getUserFromRequest(req){
//     const authHeader = req.headers.get("authorization");
//     if(!authHeader || !authHeader.startsWith("Bearer ")){
//         return null;
//     }
//     const token = authHeader.split(" ")[1];
//     verifyToken(token);
// }