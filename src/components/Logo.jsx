import { Image, Link } from "@heroui/react";
export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image src="/logo.png" alt="Logo" width={20} height={20} />
      <h1 className={`font-semibold text-emerald-500 text-2xl`}>
        GPdI Filadelfia
      </h1>
    </Link>
  );
}
