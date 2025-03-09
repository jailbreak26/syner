import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../public/logo.png";
import { appName, kLogOut } from "../constants";

export function NavBar() {
  return (
    <Navbar fluid className="fixed z-50 w-full dark:bg-cardBg">
      <Navbar.Brand as={Link} to="/home">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo Image" />
        <span className="text-md self-center whitespace-nowrap font-semibold dark:text-white">
          {appName}
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/">{kLogOut}</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
