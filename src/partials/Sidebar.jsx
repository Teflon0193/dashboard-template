import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-sm'}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">


              {/* Dashboard */}
              <SidebarLinkGroup activecondition={pathname === "/" || pathname.includes("dashboard")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname === "/" || pathname.includes("dashboard") ? "" : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current ${pathname === "/" || pathname.includes("dashboard") ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                              <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                            </svg>                            
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dashboard
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Main
                              </span>
                            </NavLink>
                          </li>
                         
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>



              {/* Environmental Dashboard */}
            <SidebarLinkGroup activecondition={pathname.includes("environmental")}>
              {(handleClick, open) => {
                return (
                  <React.Fragment>
                    <a
                      href="#0"
                      className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                        pathname.includes("environmental") ? "" : "hover:text-gray-900 dark:hover:text-white"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                        setSidebarExpanded(true);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <svg
                          className={`shrink-0 fill-current ${
                            pathname.includes('environmental') ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                         >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 3.43 2.65 7.11 7.72 11.62a1 1 0 0 0 1.56 0C16.35 16.11 19 12.43 19 9c0-3.87-3.13-7-7-7zm0 16.47C8.83 14.4 7 11.58 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.58-1.83 5.4-5 9.47z" />
                          <path d="M11 6h2v5h-2zm0 6h2v2h-2z" />
                       </svg>

                          <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Environmental
                          </span>
                        </div>
                        {/* Icon */}
                        <div className="flex shrink-0 ml-2">
                          <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/environmental/compliance-reports"
                            className={({ isActive }) =>
                              "block transition duration-150 truncate " + (isActive ? "text-green-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Compliance Reports
                            </span>
                          </NavLink>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/environmental/environmental-incidents"
                            className={({ isActive }) =>
                              "block transition duration-150 truncate " + (isActive ? "text-green-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Environmental Incidents
                            </span>
                          </NavLink>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <NavLink
                            end
                            to="/environmental/environmental-metrics"
                            className={({ isActive }) =>
                              "block transition duration-150 truncate " + (isActive ? "text-green-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                            }
                          >
                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Reports
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                );
              }}
            </SidebarLinkGroup>


              
                {/* Finance */}
                  <SidebarLinkGroup activecondition={pathname.includes("finance")}>
                   {(handleClick, open) => (
                    <React.Fragment>
                    <a
                      href="#0"
                    className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                     pathname.includes("finance") ? "" : "hover:text-gray-900 dark:hover:text-white"
                    }`}
                     onClick={(e) => {
                   e.preventDefault();
                     handleClick();
                     setSidebarExpanded(true);
                 }}
              >
              <div className="flex items-center justify-between">
             <div className="flex items-center">
            <svg
              className={`shrink-0 fill-current ${
                pathname.includes('finance') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M6 0a6 6 0 0 0-6 6c0 1.077.304 2.062.78 2.912a1 1 0 1 0 1.745-.976A3.945 3.945 0 0 1 2 6a4 4 0 0 1 4-4c.693 0 1.344.194 1.936.525A1 1 0 1 0 8.912.779 5.944 5.944 0 0 0 6 0Z" />
              <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
            </svg>
            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
              Finance
            </span>
          </div>
          {/* Icon */}
          <div className="flex shrink-0 ml-2">
            <svg
              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`}
              viewBox="0 0 12 12"
            >
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        </div>
      </a>
      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
          <li className="mb-1 last:mb-0">
            <NavLink
              end
              to="/finance/accounts-payable"
              className={({ isActive }) =>
                "block transition duration-150 truncate " +
                (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
              }
            >
              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                Accounts Payable
              </span>
            </NavLink>
          </li>
          <li className="mb-1 last:mb-0">
            <NavLink
              end
              to="/finance/accounts-receivable"
              className={({ isActive }) =>
                "block transition duration-150 truncate " +
                (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
              }
            >
              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                Accounts Receivable
              </span>
            </NavLink>
          </li>
          <li className="mb-1 last:mb-0">
            <NavLink
              end
              to="/finance/assets"
              className={({ isActive }) =>
                "block transition duration-150 truncate " +
                (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
              }
            >
              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                Assets
              </span>
            </NavLink>
          </li>
          <li className="mb-1 last:mb-0">
            <NavLink
              end
              to="/finance/general-ledger"
              className={({ isActive }) =>
                "block transition duration-150 truncate " +
                (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
              }
            >
              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                General Ledger
              </span>
            </NavLink>
          </li>
          <li className="mb-1 last:mb-0">
            <NavLink
              end
              to="/finance-dashboard"
              className={({ isActive }) =>
                "block transition duration-150 truncate " +
                (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
              }
            >
              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                Overview
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )}
</SidebarLinkGroup>



        {/* HR */}      
      <SidebarLinkGroup activecondition={pathname.includes("hr")}>
        {(handleClick, open) => (
          <React.Fragment>
            <a
              href="#0"
              className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                pathname.includes("hr") ? "" : "hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className={`shrink-0 fill-current ${
                      pathname.includes('hr') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 0 0-8 8c0 1.542.476 2.99 1.276 4.19a1 1 0 0 0 1.507-1.324A5.968 5.968 0 0 1 2 8a6 6 0 0 1 6-6c1.041 0 2.03.265 2.906.726a1 1 0 1 0 1.137-1.675A8.022 8.022 0 0 0 8 0Z" />
                    <path d="M10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-4 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
                  </svg>
                  <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    HR
                  </span>
                </div>
                <div className="flex shrink-0 ml-2">
                  <svg
                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </div>
              </div>
            </a>
            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/hr/applicants"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Applicant
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/hr/attendance"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Attendance
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/hr/employees"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Employees
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/hr/job-posting"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Job Posting
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/hr/payroll"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Payroll
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/hr/safety-training"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Safety Training
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </React.Fragment>
        )}
      </SidebarLinkGroup>



 {/* Production */}      
 <SidebarLinkGroup activecondition={pathname.includes("Production")}>
        {(handleClick, open) => (
          <React.Fragment>
            <a
              href="#0"
              className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                pathname.includes("hr") ? "" : "hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                <svg
                    className={`shrink-0 fill-current ${
                    pathname.includes('hr') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                >
                 <path d="M3 21h18v-2h-18v2zm17-7.514v-4.486h-3v-5h-6v5h-5v4.486l2.777-1.39c.434-.216.953-.158 1.348.134l2.875 2.156 2.875-2.156c.395-.292.914-.35 1.348-.134l2.777 1.39zm-7 1.514-3-2.25-3 2.25v-2.271h6v2.271zm4-7h-4v-3h4v3z" />
                </svg>

                  <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Production
                  </span>
                </div>
                <div className="flex shrink-0 ml-2">
                  <svg
                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </div>
              </div>
            </a>
            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/production/equipment"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Equipment
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/production/maintenanceSchedule"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    MaintenanceSchedule
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/production/minePlan"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    MinePlan
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/production/productionData"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    ProductionData
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/production/qualityControl"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    QualityControl
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </React.Fragment>
        )}
      </SidebarLinkGroup>



         {/* Project */}      
      <SidebarLinkGroup activecondition={pathname.includes("Project")}>
        {(handleClick, open) => (
          <React.Fragment>
            <a
              href="#0"
              className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                pathname.includes("hr") ? "" : "hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                <svg
                   className={`shrink-0 fill-current ${
                     pathname.includes('hr') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'
                   }`}
                   xmlns="http://www.w3.org/2000/svg"
                   width="16"
                   height="16"
                  viewBox="0 0 24 24"
             >
                  <path d="M19 3h-4.18c-.42-1.16-1.52-2-2.82-2s-2.4.84-2.82 2h-4.18c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18h-14v-16h3v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h3v16z" />
                  <path d="M8 12h8v2h-8zm0-4h8v2h-8zm0 8h5v2h-5z" />
                </svg>


                  <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Project
                  </span>
                </div>
                <div className="flex shrink-0 ml-2">
                  <svg
                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </div>
              </div>
            </a>
            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/project/milestone"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Milestone
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/project/Project"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Project
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/project/projectResource"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    ProjectResource
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/project/resource"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Resource
                    </span>
                  </NavLink>
                </li>          
              </ul>
            </div>
          </React.Fragment>
        )}
      </SidebarLinkGroup>



         {/* Supply Chain Management  */}      
      <SidebarLinkGroup activecondition={pathname.includes("Supply Chain ")}>
        {(handleClick, open) => (
          <React.Fragment>
            <a
              href="#0"
              className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                pathname.includes("hr") ? "" : "hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                <svg
                  className={`shrink-0 fill-current ${
                     pathname.includes('supply-chain') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'
                   }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm3 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-12-2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6 5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6-8.65c-.32-.14-.67-.23-1.04-.23-.8 0-1.52.39-1.95 1.02l-2.11-1.01c.06-.28.1-.57.1-.88s-.04-.6-.1-.88l2.11-1.01c.43.63 1.15 1.02 1.95 1.02.37 0 .72-.08 1.04-.23l1.39 1.39-1.39 1.39zm-12 0-1.39-1.39 1.39-1.39c.32.14.67.23 1.04.23.8 0 1.52-.39 1.95-1.02l2.11 1.01c-.06.28-.1.57-.1.88s.04.6.1.88l-2.11 1.01c-.43-.63-1.15-1.02-1.95-1.02-.37 0-.72.08-1.04.23zm5.12 2.74 2.11 1.01c.43-.63 1.15-1.02 1.95-1.02.37 0 .72.08 1.04.23l1.39-1.39-1.39-1.39c-.32-.14-.67-.23-1.04-.23-.8 0-1.52.39-1.95 1.02l-2.11-1.01c-.06.28-.1.57-.1.88s.04.6.1.88z" />
               </svg>



                  <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Supply Chain 
                  </span>
                </div>
                <div className="flex shrink-0 ml-2">
                  <svg
                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </div>
              </div>
            </a>
            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/scm/inventory"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Inventory
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/scm/procurement"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Procurement
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/scm/shipment"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Shipment
                    </span>
                  </NavLink>
                </li>
                <li className="mb-1 last:mb-0">
                  <NavLink
                    end
                    to="/scm/supplier"
                    className={({ isActive }) =>
                      "block transition duration-150 truncate " +
                      (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Supplier
                    </span>
                  </NavLink>
                </li>          
              </ul>
            </div>
          </React.Fragment>
        )}
      </SidebarLinkGroup>


           
              {/* Messages */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${pathname.includes("messages") && "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"}`}>
                <NavLink
                  end
                  to="https://cruip.com/mosaic/"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("messages") ? "" : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <svg className={`shrink-0 fill-current ${pathname.includes('messages') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M13.95.879a3 3 0 0 0-4.243 0L1.293 9.293a1 1 0 0 0-.274.51l-1 5a1 1 0 0 0 1.177 1.177l5-1a1 1 0 0 0 .511-.273l8.414-8.414a3 3 0 0 0 0-4.242L13.95.879ZM11.12 2.293a1 1 0 0 1 1.414 0l1.172 1.172a1 1 0 0 1 0 1.414l-8.2 8.2-3.232.646.646-3.232 8.2-8.2Z" />
                        <path d="M10 14a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Z" />
                      </svg>
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Messages
                      </span>
                    </div>
                    {/* Badge */}
                    <div className="flex flex-shrink-0 ml-2">
                      <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-violet-400 px-2 rounded">4</span>
                    </div>
                  </div>
                </NavLink>
              </li>
             
              {/* Calendar */}
              <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${pathname.includes("calendar") && "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"}`}>
                <NavLink
                  end
                  to="https://cruip.com/mosaic/"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("calendar") ? "" : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className={`shrink-0 fill-current ${pathname.includes('calendar') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                      <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
                      <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
                    </svg>
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Calendar
                    </span>
                  </div>
                </NavLink>
              </li>
          
              {/* Settings */}
              <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname.includes("settings") ? "" : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current ${pathname.includes('settings') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M10.5 1a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2h-1.145a3.502 3.502 0 0 1-6.71 0H1a1 1 0 0 1 0-2h6.145A3.502 3.502 0 0 1 10.5 1ZM9 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5.5 9a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2H8.855a3.502 3.502 0 0 1-6.71 0H1a1 1 0 1 1 0-2h1.145A3.502 3.502 0 0 1 5.5 9ZM4 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" fillRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Settings
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                My Account
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                My Notifications
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Connected Apps
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Plans
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Billing & Invoices
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Give Feedback
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Utility */}
              <SidebarLinkGroup activecondition={pathname.includes("utility")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname.includes("utility") ? "" : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current ${pathname.includes('utility') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M14.75 2.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM14.75 16a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM2.5 14.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM1.25 2.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
                              <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Utility
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Changelog
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Roadmap
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                FAQs
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Empty State
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                404
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">More</span>
            </h3>
            <ul className="mt-3">
              {/* Authentication */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${open ? "" : "hover:text-gray-900 dark:hover:text-white"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current text-gray-400 dark:text-gray-500`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M11.442 4.576a1 1 0 1 0-1.634-1.152L4.22 11.35 1.773 8.366A1 1 0 1 0 .227 9.634l3.281 4a1 1 0 0 0 1.59-.058l6.344-9ZM15.817 4.576a1 1 0 1 0-1.634-1.152l-5.609 7.957a1 1 0 0 0-1.347 1.453l.656.8a1 1 0 0 0 1.59-.058l6.344-9Z" />
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Authentication
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="https://cruip.com/mosaic/ dark:hover:text-gray-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sign in
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="https://cruip.com/mosaic/ dark:hover:text-gray-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Sign up
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="https://cruip.com/mosaic/ hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Reset Password
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Onboarding */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${open ? "" : "hover:text-gray-900 dark:hover:text-white"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current text-gray-400 dark:text-gray-500`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M6.668.714a1 1 0 0 1-.673 1.244 6.014 6.014 0 0 0-4.037 4.037 1 1 0 1 1-1.916-.571A8.014 8.014 0 0 1 5.425.041a1 1 0 0 1 1.243.673ZM7.71 4.709a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM9.995.04a1 1 0 1 0-.57 1.918 6.014 6.014 0 0 1 4.036 4.037 1 1 0 0 0 1.917-.571A8.014 8.014 0 0 0 9.995.041ZM14.705 8.75a1 1 0 0 1 .673 1.244 8.014 8.014 0 0 1-5.383 5.384 1 1 0 0 1-.57-1.917 6.014 6.014 0 0 0 4.036-4.037 1 1 0 0 1 1.244-.673ZM1.958 9.424a1 1 0 0 0-1.916.57 8.014 8.014 0 0 0 5.383 5.384 1 1 0 0 0 .57-1.917 6.014 6.014 0 0 1-4.037-4.037Z" />
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Onboarding
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="https://cruip.com/mosaic/ hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 1
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="https://cruip.com/mosaic/ hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 2
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="https://cruip.com/mosaic/ hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 3
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="https://cruip.com/mosaic/ hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Step 4
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Components */}
              <SidebarLinkGroup activecondition={pathname.includes("component")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname.includes("component") ? "" : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className={`shrink-0 fill-current ${pathname.includes('components-library') ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                              <path d="M.06 10.003a1 1 0 0 1 1.948.455c-.019.08.01.152.078.19l5.83 3.333c.053.03.116.03.168 0l5.83-3.333a.163.163 0 0 0 .078-.188 1 1 0 0 1 1.947-.459 2.161 2.161 0 0 1-1.032 2.384l-5.83 3.331a2.168 2.168 0 0 1-2.154 0l-5.83-3.331a2.162 2.162 0 0 1-1.032-2.382Zm7.856-7.981-5.83 3.332a.17.17 0 0 0 0 .295l5.828 3.33c.054.031.118.031.17.002l5.83-3.333a.17.17 0 0 0 0-.294L8.085 2.023a.172.172 0 0 0-.17-.001ZM9.076.285l5.83 3.332c1.458.833 1.458 2.935 0 3.768l-5.83 3.333c-.667.38-1.485.38-2.153-.001l-5.83-3.332c-1.457-.833-1.457-2.935 0-3.767L6.925.285a2.173 2.173 0 0 1 2.15 0Z" />
                            </svg>                             
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Components
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Button
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Input Form
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Dropdown
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Alert & Banner
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Modal
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Pagination
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tabs
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Breadcrumb
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Badge
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Avatar
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tooltip
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Accordion
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="https://cruip.com/mosaic/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " + (isActive ? "text-violet-500" : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Icons
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400" onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
