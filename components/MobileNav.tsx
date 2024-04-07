'use client'

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
  

const MobileNav = () => {
    const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger asChild>
                <Image
                src='/icons/hamburger.svg'
                width={36}
                height={36}
                alt='MenuBurger icon'
                className='cursor-pointer sm:hidden'
                />
            </SheetTrigger>
            <SheetContent side={'left'} className='border-none bg-dark-1'>
            <Link href={'/'} className='flex items-center gap-1'>
                <Image
                src='/icons/logo.svg'
                alt='Yoom'
                width={32}
                height={32}
                className='max-sm:size-10'
                />
                <p className='text-[26px] font-extrabold text-white'>
                Yoom
                </p>
            </Link>

            <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                <SheetClose asChild>
                    <section className='flex flex-col h-full gap-6 pt-16 text-white'>
                        {sidebarLinks.map((link)=>{
                            // checking which path is active, that we can highlight that with unique color in sidebar
                            const isActive = pathname === link.route;

                            return (
                                <SheetClose asChild key={link.route}>
                                    <Link href={link.route}
                                    key={link.label}
                                    // cn -> className, it's allow us to add multiple & dynamic classname
                                    className={cn("flex gap-4 items-center p-4 rounded-lg w-full max-w-60",{
                                        // bg will only be apply if isActive is true
                                        'bg-blue-1':isActive
                                    })}
                                    >
                                        <Image
                                        src={link.imgUrl}
                                        alt={link.label}
                                        height={20}
                                        width={20}
                                        />
                                        <p className='font-semibold'>
                                            {link.label}
                                        </p>
                                    </Link>
                                </SheetClose>
                            )
                        })}
                    </section>
                </SheetClose>
            </div>
            </SheetContent>
        </Sheet>

    </section>
  )
}

export default MobileNav