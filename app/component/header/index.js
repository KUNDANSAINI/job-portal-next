'use client'

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { AlignJustify } from "lucide-react";
import Link from "next/link";



function Header({ user, profile }) {

    return (
        <div>
            <header className="flex h-16 w-full shrink-0 items-center ">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button  className="lg:hidden">
                            <AlignJustify className="h-6 w-6" />
                            <span className="sr-only">Toggle Navigation Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link className="mr-6 lg:flex" href={'#'}><h3 className="text-xl font-bold">JOBSCO</h3></Link>
                        <div className="grid gap-2 py-6">
                            {
                                user ?
                                    <>
                                        <Link href={'/'} className="flex w-full items-center py-2 text-lg font-semibold">Home</Link>
                                        <Link href={'/jobs'} className="flex w-full items-center py-2 text-lg font-semibold">Jobs</Link>
                                        {
                                            profile?.role === 'candidate' ?
                                                <Link href={'/activity'} className="flex w-full items-center py-2 text-lg font-semibold">Activity</Link>
                                                : null
                                        }
                                        <Link href={'/membership'} className="flex w-full items-center py-2 text-lg font-semibold">Membership</Link>
                                        <Link href={'/account'} className="flex w-full items-center py-2 text-lg font-semibold">Account</Link>
                                    </>
                                    :
                                    <>
                                        <Link href={'/sign-in'} className="flex w-full items-center py-2 text-lg font-semibold">Login</Link>
                                        <Link href={'/sign-up'} className="flex w-full items-center py-2 text-lg font-semibold">Register</Link>
                                    </>
                            }
                            <UserButton />
                        </div>
                    </SheetContent>
                </Sheet>
                <Link className="hidden lg:flex mr-6" href={'/'}><h3 className="text-2xl font-bold">JOBSCO</h3></Link>
                <nav className="ml-auto lg:flex hidden gap-6 ">
                    {
                        user ?
                            <>
                                <Link href={'/'} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium">Home</Link>
                                <Link href={'/jobs'} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium">Jobs</Link>
                                {
                                    profile?.data?.role === 'candidate' ?
                                        <Link href={'/activity'} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium">Activity</Link>
                                        : null
                                }
                                <Link href={'/membership'} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium">Membership</Link>
                                <Link href={'/account'} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium">Account</Link>
                            </>
                            :
                            <>
                                <Link href={'/sign-in'} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium">Login</Link>
                                <Link href={'/sign-up'} className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium">Register</Link>
                            </>
                    }
                    <UserButton />
                </nav>
            </header>
        </div>
    );
}

export default Header;