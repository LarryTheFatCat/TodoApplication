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
import { useRouter } from "next/router";
import React, { useState } from "react";

const LandingNav: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // navbar mobile menu items
  const menuItems: Array<String> = ["Home", "About", "Testimonials", "Contact"];
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
          <Button onClick={() => router.push("/register")} variant="solid" color="primary">
            Sign up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button onClick={() => router.push("/login")} variant="bordered" color="secondary">
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
          <Link href="/register">
            <Button variant="solid" color="primary">
              Sign up
            </Button>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button onClick={() => router.push("/login")} variant="bordered" color="secondary">
            Login
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
export default LandingNav;
