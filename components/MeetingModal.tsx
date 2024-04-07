import React, { ReactNode } from 'react'
// shadcn dialog for meeting
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image'
import { Button } from './ui/button'
  




interface MeetingModalProps{
    isOpen:boolean,
    onClose: ()=> void,
    title:string,
    className?:string,
    children?:ReactNode,
    handleClick?:()=> void,
    buttonText?:string,
    image?:string,
    buttonIcon?:string
}

const MeetingModal:React.FC<MeetingModalProps> = ({
    isOpen,onClose,title,className,children,handleClick,buttonText,image,buttonIcon
}) => {
  return (
    // open-> the modal will open only if isOpen set to be true
    // onOpenChange-> the modal will close according to the onClose function
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='flex w-full max-w[520px] flex-col gap-6 border-none  bg-dark-1 px-6 py9 text-white'>

            <div className='flex flex-col gap-6'>
                {/* if there is an image */}
                {image && (
                    <div>
                        <Image src={image} alt='image' height={72} width={72}/>
                    </div>
                )}
                {/* the card title */}
                <h1 className={`${className} text-3xl font-bold leading-[42px]`}>
                    {title}
                </h1>
                {/* render the children content */}
                {children}
                {/* meeting button */}
                <Button className='bg-blue-1 focus-visible:ring-0'
                onClick={handleClick}
                >
                    {buttonIcon && (
                        <Image
                        src={buttonIcon}
                        alt='buttonIcon'
                        width={13}
                        height={13}
                        />
                    )}
                    {/* &nbsp -> adding some space between icon & text */}
                    &nbsp;
                    {buttonText || 'Schedule Meeting'}
                </Button>
            </div>

        </DialogContent>
    </Dialog>

  )
}

export default MeetingModal