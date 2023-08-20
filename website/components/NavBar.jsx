import React, { useState } from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import Logo from "./Logo";
import { useUser } from '@auth0/nextjs-auth0/client';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar isBordered>
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">Fire Fly</p>
        </NavbarBrand>
        {user && (
            <>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link  href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/ssr" aria-current="page">
              Server Side
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link  href="/csr">
              Client Side
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/external">
              External API
            </Link>
          </NavbarItem>
        </NavbarContent>
            </>
        )}
        <NavbarContent justify="end">
          {!isLoading && !user && (
          <NavbarItem className="hidden lg:flex">
            <Link href="/api/auth/login">Login</Link>
          </NavbarItem>
          )}
          {user && (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      name="Jason Hughes"
                      size="sm"
                      src={user.picture}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user.name}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">
                      <Link color="foreground" href="/profile">My Settings</Link>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" >
                      <Link color="foreground" href="/api/auth/logout"> Log Out</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
        </NavbarContent>
      </Navbar>
  );
};

export default NavBar;
