import { cn } from '@/lib/utils';
import React from 'react'

interface IMaxWidthWrapper {
    className?: string;
    children: React.ReactNode;
}
export default function MaxWidthWrapper({
    className,
    children,
}: IMaxWidthWrapper) {
  return (
    <div className={cn('max-w-full mx-auto px-4  md:max-w-screen-md lg:max-w-7xl', className)}>
        {children}
    </div>
  )
}
