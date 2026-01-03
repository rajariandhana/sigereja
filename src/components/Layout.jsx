import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="max-w-screen-3xl 3xl:container flex bg-gray-50">
        <Sidebar
          isOpen={open}
        />
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            classNames={{ wrapper: "p-0" }}
            position="static"
          >
            {/* <h1 className="text-3xl font-bold">title</h1> */}
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          {/* <p className="mb-4 text-small">description</p> */}
          <main className="flex flex-col gap-y-2 w-fit">
            <Outlet/>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
