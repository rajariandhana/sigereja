import { Button, Listbox, ListboxItem } from "@heroui/react";
import Logo from "./Logo";
import { cn } from "../utils/cn";
import { CiLogout } from "react-icons/ci";
import { Link, useLocation } from "react-router";
import { PiBank, PiGear, PiHandsPraying, PiUsers } from "react-icons/pi";

const sidebarItems = [
  {
    key: "participants",
    label: "Jemaat",
    href: "/",
    icon: <PiUsers size={24} />,
  },
  {
    key: "wadah",
    label: "Wadah",
    href: "/wadah",
    icon: <PiBank size={24} />,
  },
  {
    key: "prayer-group",
    label: "Kelompok Doa",
    href: "/prayer-group",
    icon: <PiHandsPraying size={24} />,
  },
  // {
  //   key: "settings",
  //   label: "Settings",
  //   href: "/settings",
  //   icon: <PiGear size={24} />,
  // },
];

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const isActive = (path) => {
    // if (path === "/") return true;
    if (path === "/") {
      if (location.pathname === "/") return true;
      return false;
    }
    return location.pathname.startsWith(path);
  };
  const activeKey = sidebarItems.find((item) => {
    return isActive(item.href);
  })?.key;
  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-75 -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 pt-12 pb-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen }
      )}
    >
      <div>
        <Logo height={20}></Logo>
        <div className="flex flex-col gap-y-4 mt-8">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "h-12 px-4 rounded-lg text-sm flex gap-x-2 items-center \
         hover:bg-emerald-300 transition-colors duration-200 ease-in-out",
                {
                  "bg-primary text-white": isActive(item.href),
                }
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        {/* <Listbox
          items={sidebarItems}
          aria-label="Dashboard Menu"
          className="mt-8"
          selectedKeys={activeKey ? [activeKey] : []}
          selectionMode="single"
          color="primary"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {})}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              to={item.href}
              as={Link}
              color="primary"
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox> */}
      </div>
      {/* <div className="flex items-center p-1">
        <Button
          color="danger"
          fullWidth
          variant="light"
          className="flex justify-start rounded-lg px-2 py-1.5"
          size="lg"
        >
          <CiLogout />
          Logout
        </Button>
      </div> */}
    </div>
  );
};

export default Sidebar;
