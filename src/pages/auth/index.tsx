import React from "react";
import {
  // SignInButton,
  // SignUpButton,
  SignedIn,
  // SignedOut,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import "./Auth.css"; // Optional: Add any specific styles for Auth component

export const Auth: React.FC = () => {
  return (
    <div className="sign-in-container">
      {/* <SignedOut>
        <SignUpButton mode="modal">
          <button className="auth-button">Sign Up</button>
        </SignUpButton>
        <SignInButton mode="modal">
          <button className="auth-button">Sign In</button>
        </SignInButton>
      </SignedOut> */}
      <SignedIn>
        <Navigate to="/db" />
      </SignedIn>
    </div>
  );
};
