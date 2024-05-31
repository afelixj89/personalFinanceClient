import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import "./NavBar.css";

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand-link">MyFinanceLog</Link>
      </div>
      <div className="navbar-right">
        <SignedIn>
          <Link to="/db">Dashboard</Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignUpButton mode="modal">
            <button className="nav-button">Sign Up</button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="nav-button">Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default NavBar;
