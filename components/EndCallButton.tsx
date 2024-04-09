'use client'

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
    const router = useRouter();
    // getting the current call
    const call = useCall();

    // getting hook to find for local participent
    const {useLocalParticipant} = useCallStateHooks();
    // getting all local participet
    const localParticipent = useLocalParticipant();

    // checking who is the meeting owner
    const isMeetingOwner = localParticipent &&
    call?.state.createdBy && localParticipent.userId ===
    call.state.createdBy.id;

    // if the current user is not the meeting owner return null
    if(!isMeetingOwner) return null;

  return (
    <Button onClick={async()=>{
        // endCall is async process
        await call.endCall();
        router.push('/')
    }}
    className='bg-red-500'
    >
        End call for everyone
    </Button>
  )
}

export default EndCallButton