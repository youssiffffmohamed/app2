import React, { use, useContext } from "react";
import Style from "./Navbar.module.css";
import { Link,  useNavigate } from "react-router-dom";
import { UserContext } from "./../../Contaxt/UserContext";
import { profileContext } from "../../Contaxt/ProfileConttext";

export default function Navbar() {
  let navigate = useNavigate();

  let { userlogin, setUserlogin } = useContext(UserContext);


  const data = useContext(profileContext);
      
  
  

  function signout() {
    navigate("/login");
    localStorage.removeItem("userToken");
    setUserlogin(null);
  }

  return (
    <>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
              Socail App
            </span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {userlogin !== null ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={data?.photo}
                    alt="user photo"
                  />
                </button>
                {/* Dropdown menu */}
                <div
                  className="z-50 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3 text-sm border-b border-default">
                    <span className="block text-heading font-medium">
                      {data?.name}
                    </span>
                    <span className="block text-body truncate">
                      {data?.email}
                    </span>
                  </div>
                  <ul
                    className="p-2 text-sm text-body font-medium"
                    aria-labelledby="user-menu-button"
                  >
                    <li>
                      <Link
                        to={`profile/${data?._id}`}
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <span
                        onClick={signout}
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded cursor-pointer"
                      >
                        Signout
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div>
                <ul className="flex gap-5 mx-5">
                  <li>
                    <Link to="login">login</Link>
                  </li>
                  <li>
                    <Link to="register">Register</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
