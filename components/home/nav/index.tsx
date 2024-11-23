import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from "@nextui-org/react";

export default function LandingPage() {
  return (
    <Navbar position="sticky">
      <NavbarBrand>
        <Tooltip showArrow content="Where Simple Tasks Turn into Achievements.">
          <Button variant="light">Dolt</Button>
        </Tooltip>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex" justify="center">
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
      <NavbarContent justify="end">
        <NavbarItem>
          <Button variant="solid" color="primary">
            Sign up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="bordered" color="primary">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
