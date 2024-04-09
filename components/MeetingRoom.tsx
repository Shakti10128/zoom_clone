'use client'

import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  


import React, { useState } from 'react'
import { LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

// 'personal' => !'personal' => false => !flase => true
// undefined => !undefined => true => false

const MeetingRoom = () => {
    const searchParam = useSearchParams();
    const isPersonalRoom = !!searchParam.get("personal");

    const router = useRouter();


    const [layout,setLayout] = useState<CallLayoutType>("speaker-left");
    const [showParticipent,setShowParticipent] = useState(false);

    // useCallStateHooks -> contain all hooks for a call state
    const {useCallCallingState} = useCallStateHooks();
    // useCallCallingState -> getting the state of the curret call
    const callingState = useCallCallingState();
    // CallingState -> is default property provided by stream
    if(callingState !== CallingState.JOINED) return <Loader/>

    const CallLayout = ()=>{
        // all below components are provided by stream
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout/>
            case 'speaker-left':
                return <SpeakerLayout
                participantsBarPosition={'left'}
                />
            default :
            return <SpeakerLayout
            participantsBarPosition={'right'}
            />
        }
    }


  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
        <div className="relative flex size-full items-center justify-center">
            {/* showing the layout */}
            <div className='flex size-full max-w[1000px] items-center'>
                <CallLayout/>
            </div>
            {/* showing the participent */}
            <div className={cn('h-[cal(100vh-86px)] hidden ml-2',{
                'show-block':showParticipent
            })}>
                <CallParticipantsList
                onClose={()=> setShowParticipent(false)}
                />
            </div>
        </div>

        <div className='fixed bottom-0 flex w-full items-center justify-center gap-5
        flex-wrap'>
            <CallControls onLeave={()=> router.push('/')}/>

            <DropdownMenu >

                <div className='flex items-center'>
                <DropdownMenuTrigger
                className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2
                hover:bg-[#4c535b]'
                >
                    <LayoutList
                    size={20}
                    className='text-white'
                    />
                </DropdownMenuTrigger>
                </div>

                <DropdownMenuContent className='bg-dark-1 border-dark-1
                 text-white'>
                    {
                    ['Grid','Speaker-Left','Speaker-Right'].
                    map((item,index)=>(
                        <div key={index}>
                            <DropdownMenuItem className='cursor-pointer'
                            onClick={()=>{
                                // doing all in lowercase coz CallLayoutType property are in lowercase
                                setLayout(item.toLowerCase() as CallLayoutType)
                            }}
                            >
                                {item}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator 
                            className='bg-dark-1'
                            />
                        </div>
                    ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            {/* see the call latency & performance */}
            <CallStatsButton/>

            <button onClick={()=>
                setShowParticipent((prev)=> !prev)
            }>
                <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2
                hover:bg-[#4c535b]'>
                    <Users size={20} className='text-white'/>
                </div>
            </button>
            {!isPersonalRoom && <EndCallButton/>}
        </div>

    </section>
  )
}

export default MeetingRoom