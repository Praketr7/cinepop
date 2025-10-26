// import dbConnect from "@/lib/db";
// import User from "@/models/User"; 

// export async function POST(req){
//     await dbConnect();
//     const {username, password} = await req.json();

//     if(!username || !password) return new Response(JSON.stringify({error: "Missing fields"}), {status:400});

//     const existingUser = await User.findOne({username});
//     if(existingUser) return new Response(JSON.stringify({error: "Username taken"}), {status:400});
    
//     const user = await User.create({username, password});
//     return new Response(JSON.stringify({message: "User created", userId: user._id}), {status:201});
// }

