"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { sidebarLinks } from '@/constants';
import Image from 'next/image';

const Sidebar = () => {
    const pathname = usePathname();
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28
    text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-1 flex-col gap-6'>
            {sidebarLinks.map((link)=>{
                // checking which path is active, that we can highlight that with unique color in sidebar
                // putting '/' because we want a specific route not the home else home will also active along with another path
                const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

                return (
                    <Link href={link.route}
                    key={link.label}
                    // cn -> className, it's allow us to add multiple & dynamic classname
                    className={cn("flex gap-4 items-center p-4 rounded-lg justify-normal",{
                        // bg will only be apply if isActive is true
                        'bg-blue-1':isActive
                    })}
                    >
                        <Image
                        src={link.imgUrl}
                        alt={link.label}
                        height={24}
                        width={24}
                        />
                        <p className='text-lg font-semibold max-lg:hidden'>
                            {link.label}
                        </p>
                    </Link>
                )
            })}
        </div>
    </section>
  )
}

export default Sidebar