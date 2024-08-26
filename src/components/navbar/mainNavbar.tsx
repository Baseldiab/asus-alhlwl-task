import { Link } from "react-router-dom";

export default function MainNavbar() {
  return (
    <>
      <div className="bg-transparent py-2  shadow-sm border-b border-gray-300">
        <div className="myContainer flex justify-between items-center relative">
          <Link to={"/"}>
            <img
              src="/images/logo.webp"
              className="md:w-32 w-28 lg:w-52 min-w-24 md:h-auto"
              alt="logo image"
              loading="lazy"
            />
          </Link>
          <Link className="font-bold text-xl" to={"/"}>
            Users Management
          </Link>
        </div>
      </div>
    </>
  );
}
