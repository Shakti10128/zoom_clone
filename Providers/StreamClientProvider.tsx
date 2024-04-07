'use client'

import { ReactNode, useEffect, useState } from 'react';

import {
    StreamVideo,
    StreamVideoClient,
  } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = 'user-id';
//   const token = 'authentication-token';
//   const user: User = { id: userId };
  
const StreamVideoProvider = ({children}:{children:ReactNode}) => {
    const [videoClient,setVideoClient] = useState<StreamVideoClient>();
    // clerk default provides these below property
    const {user,isLoaded} = useUser();


    useEffect(()=>{
        // if there is no user or no loading return
        if(!user || !isLoaded) return;
        // if there is no apiKey of Stream
        if(!apiKey)
            throw new Error("Stream API key missing");

        const client = new StreamVideoClient({
            apiKey:apiKey,
            user:{
                id:user?.id,
                name:user?.username || user?.id,
                image:user?.imageUrl
            },
            // tokenProvier is a func that we have created in action folder to generate the token
            tokenProvider: tokenProvider
        })

        setVideoClient(client);
    },[user,isLoaded]);

    // returning loader, coz in start there will be no client for the meeting and the state will be
    // empty in starting, preventing the error in return statement -> client={videoClient}
    if(!videoClient) return <Loader/>

    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };

export default StreamVideoProvider;