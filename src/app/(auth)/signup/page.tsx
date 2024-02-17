"use client";

import { useEffect } from "react";
import SignUpForm from "./__components/form";
import Header from "./__components/header";

export default function SignUpPage() {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center mt-2">
        <Header />
      </div>
      <div className="flex justify-center items-center h-[75vh]">
        <SignUpForm />
      </div>
    </div>
  );
}
