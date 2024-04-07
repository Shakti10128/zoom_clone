'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from '@/components/ui/use-toast'

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState,setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

    const [values,setValues] = useState({
        dateTime:new Date(),
        description:"",
        links:""
    })

    const [callDetails,setCallDetails] = useState<Call>();
    const {toast} = useToast();

    // getting user from clerk
    const {user} = useUser();
    const client = useStreamVideoClient();

    // **************** function to create the meeting ******************
    const createMeeting = async()=>{
        // if we don't have user or client
        if(!user || !client) return;

        try {
            if(!values.dateTime){
                toast({title:"Please select date and time"});
                return;
            }
            // creating a random id by crypto, crypto is globaly availble in JavaScript according to
            // MDN Reference
            const id = crypto.randomUUID();
            // creating a call
            const call = client.call('default',id);
            // if somehow not able to create call
            if(!call) throw new Error("Failed to create call")
            // get the time or take the current time
            // toISOString -> will conver the date into string
            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant Meeting";
            
            // get the call or create new one
            await call.getOrCreate({
                data:{
                    // finding the meeting start with the given date or time
                    starts_at:startAt,
                    custom:{
                        description
                    }
                }
            });
            // set the call details if found any meeting
            setCallDetails(call);

            if(!values.description){
                router.push(`/meeting/${call.id}`)
            }

            toast({title:"Meeting Scheduled"})

        } catch (error) {
            console.log(error)
            toast({title:"Failded to create meeting"})
        }

    }


  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        {/* Meetings Card */}
        <HomeCard
        img='/icons/add-meeting.svg'
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={()=> setMeetingState('isInstantMeeting')}
        className='bg-orange-1'
        />

        <HomeCard
        img='/icons/schedule.svg'
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={()=> setMeetingState('isScheduleMeeting')}
        className='bg-blue-1'
        />

        <HomeCard
        img='/icons/recordings.svg'
        title="View Recordings"
        description="Check out your recordings"
        handleClick={()=> router.push('/recordings')}
        className='bg-purple-1'
        />

        <HomeCard
        img='/icons/join-meeting.svg'
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={()=> setMeetingState('isJoiningMeeting')}
        className='bg-yellow-1'
        />

        {/* Meeting Modal */}
        <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={()=> setMeetingState(undefined)}
        title='Start an instant meeting'
        className='text-center'
        buttonText="Start Meeting"
        handleClick={createMeeting}
        />
    </section>
  )
}

export default MeetingTypeList