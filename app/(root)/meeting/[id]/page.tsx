'use client'


import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
// as we are using hook mark your component as 'use client'

import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

const meeting = ({params}:{params:{id:string}}) => {
  const [isSetupComplete,setIsSetupComplete] = useState(false);
  // getting use from clerk
  const {user,isLoaded} = useUser();

  // hook that's return the call according to the id
  const {call,isCallLoading} = useGetCallById(params.id);

  if(!isLoaded || isCallLoading) return <Loader/>

  return (
    <main className='h-full w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetupComplete ? (
              <MeetingSetup
              setIsSetupComplete={setIsSetupComplete}
              />
            ) : (
              <MeetingRoom/>
            )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default meeting