import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}:
    {setIsSetupComplete:(value:boolean)=> void}
) => {
    const [isMicCamToggledOn,setIsMicCamToggledOn] = useState(false);

    const call = useCall();

    if(!call){
        throw new Error("usecall must be used withing StreamCall component")
    }

    useEffect(()=>{
        // if mic & cam on try to off both
        if(isMicCamToggledOn){
            call?.camera.disable();
            call?.microphone.disable();
        }
        // else try to on both
        else{
            call?.camera.enable();
            call?.microphone.enable();
        }
    },[isMicCamToggledOn,call?.microphone,call?.camera])

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>
            Setup
        </h1>
        {/* To show the video preview provided by stream default */}
        <VideoPreview/>
        {/* Other options */}
        <div className='flex h-16 items-center justify-center gap-3'>
            <label className='flex items-center justify-center gap-2 font-medium'>
                <input 
                    type="checkbox"
                    checked={isMicCamToggledOn}
                    onChange={(e)=> setIsMicCamToggledOn(e.target.checked)}
                />
                Join with mic and camera off
            </label>

            {/* device setting for camera and mic etc provided by stream default */}
            <DeviceSettings/>
        </div>

            <Button className='rounded-md bg-green-500 px-4 py-2.5'
            // click to join the meeting
            onClick={()=> {
                call.join();
                setIsSetupComplete(true);
            }
            }
            >
                Join Meeting
            </Button>
    </div>
  )
}

export default MeetingSetup