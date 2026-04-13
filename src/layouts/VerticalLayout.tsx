"use client";

import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapse } from "reactstrap";
// Import Data
import navdata from "./LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const VerticalLayout = (props: any) => {
  const navData = navdata().props.children;
  const pathname = usePathname();

  /*
  layout settings
  */

  const selectLayoutState = (state: any) => state.Layout;
  const selectLayoutProperties = createSelector(selectLayoutState, layout => ({
    leftsidbarSizeType: layout.leftsidbarSizeType,
    sidebarVisibilitytype: layout.sidebarVisibilitytype,
    layoutType: layout.layoutType,
  }));
  // Inside your component
  const { leftsidbarSizeType, sidebarVisibilitytype, layoutType } = useSelector(
    selectLayoutProperties
  );

  //vertical and semibox resize events
  const resizeSidebarMenu = useCallback(() => {
    var windowSize = document.documentElement.clientWidth;
    const humberIcon = document.querySelector(".hamburger-icon") as HTMLElement;
    var hamburgerIcon = document.querySelector(".hamburger-icon");
    if (windowSize >= 1025) {
      if (document.documentElement.getAttribute("data-layout") === "vertical") {
        document.documentElement.setAttribute(
          "data-sidebar-size",
          leftsidbarSizeType
        );
      }
      if (document.documentElement.getAttribute("data-layout") === "semibox") {
        document.documentElement.setAttribute(
          "data-sidebar-size",
          leftsidbarSizeType
        );
      }
      if (
        (sidebarVisibilitytype === "show" ||
          layoutType === "vertical" ||
          layoutType === "twocolumn") &&
        document.querySelector(".hamburger-icon")
      ) {
        if (hamburgerIcon !== null) {
          hamburgerIcon.classList.remove("open");
        }
      } else {
        if (hamburgerIcon !== null) {
          hamburgerIcon.classList.add("open");
        }
      }
    } else if (windowSize < 1025 && windowSize > 767) {
      if (document.documentElement.getAttribute("data-layout") === "vertical") {
        document.documentElement.setAttribute("data-sidebar-size", "sm");
      }
      if (document.documentElement.getAttribute("data-layout") === "semibox") {
        document.documentElement.setAttribute("data-sidebar-size", "sm");
      }
      if (humberIcon) {
        humberIcon.classList.add("open");
      }
    } else if (windowSize <= 767) {
      document.body.classList.remove("vertical-sidebar-enable");
      if (
        document.documentElement.getAttribute("data-layout") !== "horizontal"
      ) {
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }
      if (humberIcon) {
        humberIcon.classList.add("open");
      }
    }
  }, [leftsidbarSizeType, sidebarVisibilitytype, layoutType]);

  useEffect(() => {
    window.addEventListener("resize", resizeSidebarMenu, true);
    return () => {
      window.removeEventListener("resize", resizeSidebarMenu, true);
    };
  }, [resizeSidebarMenu]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const ul = document.getElementById("navbar-nav") as HTMLElement;
      const items: any = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find(x => {
        return x.pathname === pathname;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === "vertical") {
      initMenu();
    }
  }, [pathname, props.layoutType]);

  function activateParentDropdown(item: any) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        if (
          parentCollapseDiv.parentElement.closest(".collapse")
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.classList.add("active");
        if (
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
        ) {
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .classList.add("show");
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .previousElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items: any) => {
    let actiItems = items.filter((x: any) => x.classList.contains("active"));

    actiItems.forEach((item: any) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <div className="layout-wrapper">
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          <div id="sidebar-menu">
            <ul className="navbar-nav" id="navbar-nav">
              {(navData || []).map((item: any, key: number) => {
                return (
                  <React.Fragment key={key}>
                    {item["isHeader"] ? (
                      <li className="menu-title">
                        <span data-key="t-menu">{props.t(item.label)}</span>
                      </li>
                    ) : item.subItems ? (
                      <li className="nav-item">
                        <Link
                          onClick={item.click}
                          className="nav-link menu-link"
                          href={item.link ? item.link : "#"}
                          data-bs-toggle="collapse"
                        >
                          <i className={item.icon}></i>
                          <span data-key="t-apps">{props.t(item.label)}</span>
                          {item.badgeName ? (
                            <span
                              className={
                                "badge badge-pill bg-" + item.badgeColor
                              }
                              data-key="t-new"
                            >
                              {item.badgeName}
                            </span>
                          ) : null}
                        </Link>
                        <Collapse
                          className="menu-dropdown"
                          isOpen={item.stateVariables}
                          id="sidebarApps"
                        >
                          <ul className="nav nav-sm flex-column">
                            {item.subItems &&
                              (item.subItems || []).map(
                                (subItem: any, key: number) => (
                                  <React.Fragment key={key}>
                                    {!subItem.isChildItem ? (
                                      <li className="nav-item">
                                        <Link
                                          href={
                                            subItem.link ? subItem.link : "#"
                                          }
                                          className="nav-link"
                                        >
                                          {props.t(subItem.label)}
                                          {subItem.badgeName ? (
                                            <span
                                              className={
                                                "badge badge-pill bg-" +
                                                subItem.badgeColor
                                              }
                                              data-key="t-new"
                                            >
                                              {subItem.badgeName}
                                            </span>
                                          ) : null}
                                        </Link>
                                      </li>
                                    ) : (
                                      <li className="nav-item">
                                        <Link
                                          onClick={subItem.click}
                                          className="nav-link"
                                          href="#"
                                          data-bs-toggle="collapse"
                                        >
                                          {props.t(subItem.label)}
                                          {subItem.badgeName ? (
                                            <span
                                              className={
                                                "badge badge-pill bg-" +
                                                subItem.badgeColor
                                              }
                                              data-key="t-new"
                                            >
                                              {subItem.badgeName}
                                            </span>
                                          ) : null}
                                        </Link>
                                        <Collapse
                                          className="menu-dropdown"
                                          isOpen={subItem.stateVariables}
                                          id="sidebarEcommerce"
                                        >
                                          <ul className="nav nav-sm flex-column">
                                            {subItem.childItems &&
                                              (subItem.childItems || []).map(
                                                (
                                                  childItem: any,
                                                  key: number
                                                ) => (
                                                  <li
                                                    className="nav-item"
                                                    key={key}
                                                  >
                                                    <Link
                                                      href={
                                                        childItem.link
                                                          ? childItem.link
                                                          : "#"
                                                      }
                                                      className="nav-link"
                                                    >
                                                      {props.t(childItem.label)}
                                                    </Link>
                                                  </li>
                                                )
                                              )}
                                          </ul>
                                        </Collapse>
                                      </li>
                                    )}
                                  </React.Fragment>
                                )
                              )}
                          </ul>
                        </Collapse>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <Link
                          className="nav-link menu-link"
                          href={item.link ? item.link : "#"}
                        >
                          <i className={item.icon}></i>{" "}
                          <span>{props.t(item.label)}</span>
                          {item.badgeName ? (
                            <span
                              className={
                                "badge badge-pill bg-" + item.badgeColor
                              }
                              data-key="t-new"
                            >
                              {item.badgeName}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

VerticalLayout.propTypes = {
  t: PropTypes.any,
  children: PropTypes.any,
};

export default withTranslation()(VerticalLayout);
