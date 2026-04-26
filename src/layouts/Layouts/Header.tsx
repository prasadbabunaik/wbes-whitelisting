import React, { useState } from "react";
import Link from "next/link";
import { Dropdown, DropdownMenu, DropdownToggle, Form } from "reactstrap";
import Image from "next/image";

//import images
const logoSm = "/images/logo-sm.png";
const logoDark = "/images/logo-dark.png";
const logoLight = "/images/logo-light.png";

//import Components
import SearchOption from "@common/SearchOption";
import LanguageDropdown from "@common/LanguageDropdown";
import WebAppsDropdown from "@common/WebAppsDropdown";
import MyCartDropdown from "@common/MyCartDropdown";
import FullScreenDropdown from "@common/FullScreenDropdown";
import NotificationDropdown from "@common/NotificationDropdown";
import ProfileDropdown from "@common/ProfileDropdown";
import LightDark from "@common/LightDark";

import { changeSidebarVisibility } from "@slices/thunks";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import SessionTimer from "@common/SessionTimer";
import NotificationsDropdown from "@common/NotificationsDropdown";

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }: any) => {
  const dispatch: any = useDispatch();

  const selectDashboardData = createSelector(
    state => state.Layout,
    sidebarVisibilitytype => sidebarVisibilitytype.sidebarVisibilitytype
  );
  // Inside your component
  const sidebarVisibilitytype = useSelector(selectDashboardData);

  const [search, setSearch] = useState<boolean>(false);
  const toogleSearch = () => {
    setSearch(!search);
  };

  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth;
    const humberIcon = document.querySelector(".hamburger-icon") as HTMLElement;
    dispatch(changeSidebarVisibility("show"));

    if (windowSize > 767) humberIcon.classList.toggle("open");

    //For collapse horizontal menu
    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.contains("menu")
        ? document.body.classList.remove("menu")
        : document.body.classList.add("menu");
    }

    //For collapse vertical and semibox menu
    if (
      sidebarVisibilitytype === "show" &&
      (document.documentElement.getAttribute("data-layout") === "vertical" ||
        document.documentElement.getAttribute("data-layout") === "semibox")
    ) {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "sm"
          ? document.documentElement.setAttribute("data-sidebar-size", "")
          : document.documentElement.setAttribute("data-sidebar-size", "sm");
      } else if (windowSize > 1025) {
        document.body.classList.remove("vertical-sidebar-enable");
        document.documentElement.getAttribute("data-sidebar-size") === "lg"
          ? document.documentElement.setAttribute("data-sidebar-size", "sm")
          : document.documentElement.setAttribute("data-sidebar-size", "lg");
      } else if (windowSize <= 767) {
        document.body.classList.add("vertical-sidebar-enable");
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
    }

    //Two column menu
    if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
      document.body.classList.contains("twocolumn-panel")
        ? document.body.classList.remove("twocolumn-panel")
        : document.body.classList.add("twocolumn-panel");
    }
  };

  return (
    <React.Fragment>
      <header id="page-topbar" className={headerClass}>
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box horizontal-logo">
                <Link href="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <Image src={logoSm} width={22} alt="" height={22} />
                  </span>
                  <span className="logo-lg">
                    <Image src={logoDark} alt="" width={20} height={20} />
                  </span>
                </Link>

                <Link href="/" className="logo logo-light">
                  <span className="logo-sm">
                    <Image src={logoSm} width={20} alt="" height={20} />
                  </span>
                  <span className="logo-lg">
                    <Image
                      src={logoLight}
                      width={20}
                      alt=""
                      height={20}
                      style={{ width: "100px", height: "17px" }}
                    />
                  </span>
                </Link>
              </div>

              <button
                onClick={toogleMenuBtn}
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>

              {/* <SearchOption /> */}
            </div>

            <div className="d-flex align-items-center">
              <Dropdown
                isOpen={search}
                toggle={toogleSearch}
                className="d-md-none topbar-head-dropdown header-item"
              >
                <DropdownToggle
                  type="button"
                  tag="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                >
                  <i className="bx bx-search fs-22"></i>
                </DropdownToggle>
                {/* <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
                  <Form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </Form>
                </DropdownMenu> */}
              </Dropdown>

              {/* LanguageDropdown */}
              {/* <LanguageDropdown /> */}

              {/* WebAppsDropdown */}
              {/* <WebAppsDropdown /> */}

              {/* MyCartDropdwon */}
              {/* <MyCartDropdown /> */}

              {/* FullScreenDropdown */}
              {/* <FullScreenDropdown /> */}

              {/* Dark/Light Mode set */}
              {/* <LightDark
                layoutMode={layoutModeType}
                onChangeLayoutMode={onChangeLayoutMode}
              /> */}

              {/* NotificationDropdown */}
              {/* <NotificationDropdown /> */}

              {/* Notifications bell */}
              <NotificationsDropdown />

              {/* Session inactivity countdown */}
              <SessionTimer />

              {/* ProfileDropdown */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
