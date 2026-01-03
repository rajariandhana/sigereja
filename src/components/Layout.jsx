import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div
      className="flex flex-col items-center min-h-screen gap-6 bg-stone-100"
    >
      <main className="flex flex-col items-center justify-center max-w-4xl gap-6 px-6 sm:gap-12 sm:px-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
