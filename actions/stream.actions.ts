'use server'

import { currentUser } from "@clerk/nextjs";
// first you need to install -> @stream-io/node-sdk <- in api section of stream doc
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;


export const tokenProvider = async()=>{
    // get the current logged in user from clerk
    const user = await currentUser();

    // if there is no user
    if(!user) throw new Error("User not logged in");
    // if apiKey is missing
    if(!apiKey) throw new Error("Missing API key");
    // if apiSecret is missing
    if(!apiSecret) throw new Error("Missing API secret");

    const client = new StreamClient(apiKey,apiSecret);

    // expire of the token
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    // issued token time
    const issued = Math.floor(Date.now() / 1000 ) - 60;
    
    // generate the token
    const token = client.createToken(user?.id,exp,issued)

    return token;
}