import dbConnect from "@/lib/db";
import User from "@/models/User";
import {signToken} from "@/lib/auth";

export default async function(req){
    await dbConnect();
    const {username, password} = await req.json();

    const user = await User.findOne({username});
    if(!user) return new Response(JSON.stringify({error: "User not found"}), {status:400});

    const isMatch = await user.matchPassword(password);
    if(!isMatch) return new Response(JSON.stringify({error: "Wrong password"}), {status: 400});

    const token = signToken({username: user.username, id:user._id});
    return new Response(JSON.stringify({token}), {status:200}); 
}