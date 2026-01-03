import { Button, Listbox, ListboxItem } from "@heroui/react";
import Logo from "./Logo";
import { cn } from "../utils/cn";
import { CiLogout } from "react-icons/ci";
import { useLocation } from "react-router";
import { PiBank, PiGear, PiHandsPraying, PiUsers } from "react-icons/pi";

const sidebarItems = [
  {
    key: "participants",
    label: "Jemaat",
    href: "/",
    icon: <PiUsers />,
  },
  {
    key: "wadah",
    label: "Wadah",
    href: "/wadah",
    icon: <PiBank />,
  },
  {
    key: "prayer-group",
    label: "Kelompok Doa",
    href: "/prayer-group",
    icon: <PiHandsPraying />,
  },
  {
    key: "settings",
    label: "Settings",
    href: "/settings",
    icon: <PiGear />,
  },
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
  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-75 -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-4 pt-12 pb-6 transition-all lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen }
      )}
    >
      <div>
        <Logo height={20}></Logo>
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
          className="mt-8"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-primary text-white": isActive(item.href),
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              href={item.href}
              // as={link}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex items-center p-1">
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
      </div>
    </div>
  );
};

export default Sidebar;
