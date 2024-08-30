import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { styles } from '../assets/style';


const Header = () => {
  return (
    <Navbar shouldHideOnScroll className='rounded-t-2xl bg-transparent'>
      <NavbarBrand>
        <p className="font-bold text-inherit font-sofia">Albums</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          
        </NavbarItem>
        <NavbarItem>
          <Button className={`${styles["bg-gradient-tbr"]} rounded-md`} variant="flat">
            Add New Album
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header