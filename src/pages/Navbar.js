import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar({ isAuth, signUserOut }) {
  const [openNav, setOpenNav] = useState(false);
  const navlist = (
    <ul className="flex flex-col  lg:flex-row gap-6 lg:bg-blue-900">
      <li>
        <Link to="/" className="text-white ">
          Home
        </Link>
      </li>

      <li>
        {!isAuth ? (
          <Link to="/login" className="text-white">
            Login
          </Link>
        ) : (
          <div className="flex flex-col  lg:flex-row gap-6 lg:bg-blue-900">
            <li>
              <Link to="/createpost" className="text-white">
                Create Post
              </Link>
            </li>
            <button className="text-white" onClick={signUserOut}>
              Log out
            </button>
          </div>
        )}
      </li>
    </ul>
  );
  return (
    <div className="sticky top-0 z-20 bg-blue-900 py-4 px-4 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold text-white ">
          {/* <img className="w-10 h-10" src="" alt="logo"/> */}
          TechStory
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {navlist}
          {/* <AiOutlineSearch size={25} color='white'/>
          <AiOutlineShareAlt size={25} color='white'/> */}
          {/* 
          <Link to="/dashboard">
            <img
              src=""
              alt="avatar"
              className="w-6 h-6 rounded-full border border-gray-200"
            />
          </Link> */}
        </div>

        <button
          onClick={() => setOpenNav(!openNav)}
          className="ml-auto h-10 w-10 rounded-lg lg:hidden  text-white"
        >
          {openNav ? <ImCross size={20} /> : <GiHamburgerMenu size={20} />}
        </button>
      </div>
      {openNav && <div className="lg:hidden">{navlist}</div>}
    </div>
  );
}

export default Navbar;
