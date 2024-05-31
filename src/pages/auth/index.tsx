import React from "react";
import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import "./Auth.css";

export const Auth: React.FC = () => {
  return (
    <div className="sign-in-container">
      <SignedIn>
        <div className="dashboard-link-container">
          <Link to="/db" className="dashboard-link">
            Dashboard
          </Link>
        </div>
      </SignedIn>
    </div>
  );
};
