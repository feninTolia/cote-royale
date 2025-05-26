import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <div className="navbar fixed top-0 left-0 z-50 w-full bg-black text-white">
        <div className="flex items-center justify-between p-2 md:p-4">
          <div className="p-2">menu</div>

          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Image
              src="/logo.svg"
              alt="logo"
              width={180}
              height={30}
              className="w-32 md:w-44"
            />
          </div>

          <div className="flex p-2">icons</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
