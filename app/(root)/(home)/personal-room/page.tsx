'use client'

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'


const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const {user} = useUser();
  const meetingId = user?.id;
  const client = useStreamVideoClient();

  const router = useRouter();

  const {toast} = useToast();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

    // get the call access via meetingId, if exist or not any call
    const {call} = useGetCallById(meetingId!);


  const startRoom = async()=>{
    // if there is not user or client
    if(!client || !user) return;

    const newCall = client?.call("default",meetingId!);
    if(!call){
      // create new call
      await newCall.getOrCreate({
        data:{
            // that start with current Date
            starts_at: new Date().toISOString(),
        }
    });
    }

    // redirect to meeting room
    router.push(`/meeting/${meetingId}?personal=true`);
  }

  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Personal room
      </h1>

      <div className='flex w-full flex-col gap-8 xl:max-w[900px]'>
        <Table
        title='Topic'
        description={`${user?.fullName}'s Meeting Room`}
        />
        <Table
        title='Meeting ID'
        description={meetingId!}
        />
        <Table
        title='Invite Link'
        description={meetingLink!}
        />
      </div>

      <div className='flex gap-5'>
        <Button className='bg-blue-1'
        onClick={startRoom}
        >
          Start Meeting
        </Button>

        <Button className='bg-dark-3' onClick={()=>
          {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }
        }>
          Copy Invite Link
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom