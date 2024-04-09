import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"


export const useGetCalls = () => {
    // below state will be array of call's as there can be multiple meetings
    const [calls,setCalls] = useState<Call[]>([]);
    const [isLoading,setIsLoading] = useState(false);

    // we want specific user meetings
    const client = useStreamVideoClient();
    const {user} = useUser();

    useEffect(()=>{
        const loadCalls = async()=>{
            // if there is no client or user 
            if(!client || !user?.id) return;

            // else start fetching the calls
            setIsLoading(true);

            try {
                const {calls} = await client.queryCalls({
                    sort:[{field:"starts_at",direction:-1}],
                    filter_conditions:{
                        starts_at:{$exists:true},
                        $or:[
                            {created_by_user_id:user?.id},
                            {members:{$in:[user?.id]}},
                        ]
                    }
                });

                setCalls(calls);
            } catch (error) {
                console.log(error)
            } finally{
                setIsLoading(false);
            }
        }

        loadCalls();
    },[client,user?.id])

    const now = new Date();

    // figuring out ended calls 
    const endedCalls = calls.filter(({state : {startsAt,endedAt}}:Call)=>{
        return (startsAt && new Date(startsAt) < now || !!endedAt)
    })
    // finding upcoming calls
    const upcomingCalls = calls.filter(({state : {startsAt,endedAt}}:Call)=>{
        return startsAt && new Date(startsAt) > now;
    })

    return {
        endedCalls,
        upcomingCalls,
        callRecordings:calls,
        isLoading
    }
}
