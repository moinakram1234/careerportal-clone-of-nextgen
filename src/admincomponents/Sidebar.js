import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { useState, useContext, useEffect } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useRouter } from "next/router";
import sidebarItems from "@/Data/sidemenuData";
import { BsChevronDown, BsChevronUp } from "react-icons/bs"; // Import the arrow icons

const Sidebar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);
  const [showHistorySubItems, setShowHistorySubItems] = useState(false);

  useEffect(() => {
    // Check if the current route matches the "History" link or any of its sub-items
    const isHistoryActive =
      router.pathname === "/dashboard/history" ||
      sidebarItems
        .find((item) => item.subItems && item.subItems.some((subItem) => subItem.href === router.pathname));

    // Set the state based on whether the "History" link is active
    setShowHistorySubItems(isHistoryActive);
  }, [router.pathname]);

  const handleHistoryClick = () => {
    setShowHistorySubItems(!showHistorySubItems);
  };

  return (
    <div className="sidebar__wrapper min-h-screen border-r-2 border-solid">
      <button className="btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <aside className="sidebar  h-full" data-collapse={isCollapsed}>
        <div className="sidebar__top">
          <Image
            width={80}
            height={80}
            className="sidebar__logo"
            src="/images/logo.png"
            alt="logo"
          />
          <p className="text-lg font-bold tracking-tight ">Haidri Beverages</p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon, subItems }) => {
            return (
              <li className="sidebar__item  " key={name}>
                {subItems ? (
                  <>
                    <div
                      className={`sidebar__link  border-2 ${
                       "sidebar__sublink--active  "
                      } `}
                      onClick={handleHistoryClick}
                    >
                      <span className="sidebar__icon">
                        <Icon/>
                      </span>
                      <span
                        className={` flex gap-24 sidebar__name ${
                        "sidebar__name--active " 
                        }`}
                      >
                        {name}
                        {!showHistorySubItems ?<div className="pt-1"> <BsChevronUp /></div> :<div className="pt-1"><BsChevronDown /></div> }
                      </span>
                    </div>
                    {showHistorySubItems && (
                      <ul>
                        {subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <a
                              className={`sidebar__sublink ${
                                router.pathname === subItem.href
                                  ? "sidebar__link--active "
                                  : ""
                              }`}
                              href={subItem.href}
                            >
                              <span
                                className={` text-xs ${
                                  router.pathname === subItem.href
                                    ? "sidebar__name--active "
                                    : ""
                                }`}
                              >
                                {subItem.name}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <a
                    className={`sidebar__link ${
                      router.pathname === href ? "sidebar__link--active " : ""
                    }`}
                    href={href}
                  >
                    <span className="sidebar__icon ">
                      <Icon  color="#FFC83D"/>
                    </span>
                    <span
                      className={`sidebar__name ${
                        router.pathname === href ? "sidebar__name--active " : ""
                      }`}
                    >
                      {name}
                    </span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
