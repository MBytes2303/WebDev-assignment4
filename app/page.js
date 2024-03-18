"use client";
import { useState } from "react"; // No need for useEffect here if not used
import Link from "next/link";
import { useUserAuth } from "./auth-context"; // Assuming this is the correct path

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // TODO: Implement handleSignIn and handleSignOut functions using gitHubSignIn and firebaseSignOut from useUserAuth
  const handleSignIn = async () => {
    await gitHubSignIn();
  };

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  return (
    <div className="container mx-auto my-4 p-4 w-2/6">
      {user ? (
        <>
          <p className="text-center">
            Welcome, {user.displayName} <br /> You are signed in!
          </p>
          <div className="flex flex-col">
            {/* TODO: Render a button that links to the weather page. Use the Next.js Link component. */}
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              <Link href="/weather"> Go to Weather </Link>
            </button>
            {/* TODO: Render a Sign Out button that calls handleSignOut when clicked */}
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-center">
            Please sign in to access the weather information.
          </p>
          <div className="flex flex-col">
            {/* TODO: Render a Sign In button that calls handleSignIn when clicked */}
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
        </>
      )}
    </div>
  );
}
