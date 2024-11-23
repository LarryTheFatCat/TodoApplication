import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Tooltip,
} from "@nextui-org/react";
import { div } from "framer-motion/client";
import React, { useState } from "react";

const LandingNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // navbar mobile menu items
  const menuItems: Array<String> = [
    "Home",
    "About",
    "Features",
    "Testimonials",
    "Contact",
  ];
  const menuID: Array<String> = [];
  menuItems.forEach((item: String) => {
    menuID.push(item.toLowerCase());
  });
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        className="md:hidden"
      />
      <NavbarBrand>
        <Tooltip showArrow content="Where Simple Tasks Turn into Achievements.">
          <Button
            variant="light"
            className="font-extrabold text-xl text-blue-500"
          >
            Task
            <span className="text-black ml-[-8px]">Flow</span>
          </Button>
        </Tooltip>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex" justify="center">
        <NavbarItem className="cursor-pointer">
          <Link color="foreground" href="#home">
            <p>Home</p>
          </Link>
        </NavbarItem>
        <NavbarItem className="cursor-pointer">
          <Link color="foreground" href="#about">
            <p>About</p>
          </Link>
        </NavbarItem>
        <NavbarItem className="cursor-pointer">
          <Link color="foreground" href="#features">
            <p>Features</p>
          </Link>
        </NavbarItem>
        <NavbarItem className="cursor-pointer">
          <Link color="foreground" href="#testimonials">
            <p>Testimonials</p>
          </Link>
        </NavbarItem>
        <NavbarItem className="cursor-pointer">
          <Link color="foreground" href="#contact">
            <p>Contact</p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem>
          <Button variant="solid" color="primary">
            Sign up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="bordered" color="secondary">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
      {/** Mobile Menu */}
      <NavbarMenu>
        {menuItems.map((item: String, index: number) => (
          <>
            <NavbarMenuItem key={index}>
              <Link href={`#${menuID[index]}`}>{item}</Link>
            </NavbarMenuItem>
          </>
        ))}
        <NavbarMenuItem>
          <Button variant="solid" color="primary">
            Sign up
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button variant="bordered" color="secondary">
            Login
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
export default LandingNav;
