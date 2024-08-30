import React from 'react'
import { styles } from "../assets/style";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Input,
  User,
  AvatarIcon,
} from "@nextui-org/react";

const NavMob = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Dashboard", "Albums", "Users", "Log Out"];

  return (
    <Navbar shouldHideOnScroll isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="min-w-screen lg:hidden" >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p
            className={`font-bold text-inherit font-sofia ${styles["text-gradient-tbr"]} text-3xl px-2`}
          >
            Admin
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <p
            className={`font-bold text-inherit font-sofia ${styles["text-gradient-tbr"]} text-3xl px-2`}
          >
            Admin
          </p>
        </NavbarBrand>
      </NavbarContent>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={"/albums"} aria-current="page">
            Albums
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to={"/users"}>
            Users
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              icon={<AvatarIcon />}
              classNames={{
                base: styles["bg-gradient-tbr"],
                icon: "text-black/80",
              }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">admin@admin.com</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} className={`${styles["bg-gradient-tbr"]}`} href="#" variant="flat">
            Add New Album
          </Button>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className={`flex flex-col justify-around h-full`}>
            <Link
              className={`w-full h-full flex flex-col items-center justify-between`}
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              to={`/${item.toLowerCase()}`}
              size="lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={`${styles["bg-gradient-tbr"]} h-[0.5px] w-screen justify-self-start m-0`}/>
              <div className={`text-2xl font-inter`}>{item}</div>
              <div className={`${styles["bg-gradient-tbr"]} h-[4px] w-screen justify-self-start -m-2 bottom-0 relative z-10 blur-2xl `}/>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavMob