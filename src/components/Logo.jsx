import { Image, Link } from "@heroui/react";
import { PiCrossBold } from "react-icons/pi";
export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center ml-3 gap-1">
      {/* <Image src="/logo.png" alt="Logo" width={20} height={20} /> */}
      <PiCrossBold size={28}/>
      <h1 className={`font-semibold text-emerald-500 text-2xl`}>
        GPdI Filadelfia
        {/* SIGEREJA */}
      </h1>
    </Link>
  );
}
