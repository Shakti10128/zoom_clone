import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"


export const useGetCallById = (id:string | string[]) => {
  const[call,setCall] = useState<Call>();
  const[isCallLoading,setIsCallLoading] = useState(true);

    // getting the client which host the meeting
  const client = useStreamVideoClient();

  useEffect(()=>{
    // if there is no user which host the meeting
    if(!client) return;

    const loadCall = async()=>{
        // getting all calls & filtering by id
        const {calls} = await client.queryCalls({
            filter_conditions:{
                id
            }
        })

        // if there are call then take the first one according to the start time
        if(calls.length > 0){
            // set first call
            setCall(calls[0]);
        }
        // stop loading
        setIsCallLoading(false);
    }

    loadCall();
  },[client,id]);

  return {call,isCallLoading};
}

