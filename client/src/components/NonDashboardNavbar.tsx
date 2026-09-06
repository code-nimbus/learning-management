"use client";
import React from 'react';
import Link from "next/link";
import { Bell, BookOpen } from 'lucide-react';
import { UserButton, useUser} from '@clerk/nextjs';
// import { auth } from "@clerk/nextjs/server";
import {dark} from "@clerk/themes";

const NonDashboardNavbar = () => {
    const { isSignedIn, user } = useUser();
    // const { userId, sessionClaims } = await auth(); 
    const userRole = (user?.publicMetadata?.userType as "student" | "teacher"| undefined) ?? "student";
    const profileUrl = userRole === "teacher" ? "/teacher/profile" : "/user/profile";
    console.log(user?.publicMetadata?.userType)

  return (
    <nav className="nondashboard-navbar">
        <div className="nondashboard-navbar__container">
            <div className="nondashboard-navbar__search">
                <Link href="/" className="nondashboard-navbar__brand">
                
            </Link>
            
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Link href="/search" className="nondashboard-navbar__search-input">
                       <span className="hidden sm:inline">Search Courses</span>
                       <span className="sm:hidden">Search</span>
                    </Link>
                    <BookOpen className = "nondashboard-navbar__search-icon" />
                </div>
            </div>
            
        </div>
        <div className="nondashboard-navbar__actions">
            <button className="nondashboard-navbar__notification-button">
                <span className="nondashboard-navbar__notification-indicator">
                    <Bell className="nondashboard-navbar__notification-icon" />
                </span>
            </button>
            {/* <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <Link href="/signin" className='nondashboard-navbar__auth-button--login'>
                    Log In
                </Link>
                <Link href="/signin" className='nondashboard-navbar__auth-button--signup'>
                    Sign Up
                </Link>
            
            </SignedOut> */}

            {/* {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <Link
                href="/signin"
                className="nondashboard-navbar__auth-button--login"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="nondashboard-navbar__auth-button--signup"
              >
                Sign Up
              </Link>
            </>
          )} */}

          {/* <SignInButton mode="modal"> <button className="nondashboard-navbar__auth-button--login"> Log In </button> </SignInButton> <SignUpButton mode="modal"> <button className="nondashboard-navbar__auth-button--signup"> Sign Up </button> </SignUpButton> */}
          {isSignedIn ? (
            <UserButton appearance={{
                theme: dark,
                elements:{
                    userButtonOuterIdentifier: "flex justify-center items-center",
                    userButtonBox: "scale-90 sm:scale-100",
                },
                }}
                showName={false} 
                userProfileMode = "navigation" 
                userProfileUrl ={ profileUrl}
                
            />
          ) : (
            <>
              <Link
                href="/signin"
                className="nondashboard-navbar__auth-button--login"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="nondashboard-navbar__auth-button--signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        </div> 
    </nav>
  )
}

export default NonDashboardNavbar