import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US',{
    hour:"2-digit", minute:"2-digit"
  });
  // Intl->internation time format,
  // dateStyle-> we want full info like, day,month,date,year
  // format(now)-> will give us the current date
  const date = (new Intl.DateTimeFormat('en-US',{
    dateStyle:'full'
  })).format(now);
  return (
    <section className='flex flex-col size-full gap-8 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex flex-col h-full justify-between max-md:px-5 max-md:py-6 lg:p-11'>
          {/* Upcoming meeting Heading */}
          <h1 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
            Upcoming meeting at: 12:30 PM
          </h1>
          
          {/* Current Time Zone */}
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-xl font-medium text-sky-1 lg:text-2xl'>
              {date}
            </p>
          </div>

        </div>
      </div>

      {/* Meeting List */}
      <MeetingTypeList/>

    </section>
  )
}

export default Home