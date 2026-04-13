"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

//import Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import RightSidebar from "@common/RightSidebar";

//import actions
import {
  changeLayout,
  changeSidebarTheme,
  changeLayoutMode,
  changeLayoutThemeColor,
  changeLayoutTheme,
  changeLayoutWidth,
  changeLayoutPosition,
  changeTopbarTheme,
  changeLeftsidebarSizeType,
  changeLeftsidebarViewType,
  changeSidebarImageType,
  changeSidebarVisibility,
} from "@slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [headerClass, setHeaderClass] = useState("");
  const dispatch = useDispatch<any>();
  const pathname = usePathname();

  const selectLayoutState = (state: any) => state.Layout;
  const selectLayoutProperties = createSelector(selectLayoutState, layout => ({
    layoutType: layout.layoutType,
    leftSidebarType: layout.leftSidebarType,
    layoutModeType: layout.layoutModeType,
    layoutThemeColorType: layout.layoutThemeColorType,
    layoutThemeType: layout.layoutThemeType,
    layoutWidthType: layout.layoutWidthType,
    layoutPositionType: layout.layoutPositionType,
    topbarThemeType: layout.topbarThemeType,
    leftsidbarSizeType: layout.leftsidbarSizeType,
    leftSidebarViewType: layout.leftSidebarViewType,
    leftSidebarImageType: layout.leftSidebarImageType,
    preloader: layout.preloader,
    sidebarVisibilitytype: layout.sidebarVisibilitytype,
  }));

  const {
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutThemeColorType,
    layoutThemeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    sidebarVisibilitytype,
  } = useSelector(selectLayoutProperties);

  useEffect(() => {
    if (
      layoutType ||
      leftSidebarType ||
      layoutModeType ||
      layoutThemeType ||
      layoutThemeColorType ||
      layoutWidthType ||
      layoutPositionType ||
      topbarThemeType ||
      leftsidbarSizeType ||
      leftSidebarViewType ||
      leftSidebarImageType ||
      sidebarVisibilitytype
    ) {
      window.dispatchEvent(new Event("resize"));
      dispatch(changeLeftsidebarViewType(leftSidebarViewType));
      dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
      dispatch(changeSidebarTheme(leftSidebarType));
      dispatch(changeLayoutThemeColor(layoutThemeColorType));
      dispatch(changeLayoutTheme(layoutThemeType));
      dispatch(changeLayoutMode(layoutModeType));
      dispatch(changeLayoutWidth(layoutWidthType));
      dispatch(changeLayoutPosition(layoutPositionType));
      dispatch(changeTopbarTheme(topbarThemeType));
      dispatch(changeLayout(layoutType));
      dispatch(changeSidebarImageType(leftSidebarImageType));
      dispatch(changeSidebarVisibility(sidebarVisibilitytype));
    }
  }, [
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutThemeType,
    layoutThemeColorType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    sidebarVisibilitytype,
    dispatch,
  ]);

  const onChangeLayoutMode = (value: any) => {
    if (changeLayoutMode) {
      dispatch(changeLayoutMode(value));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollup = document.documentElement.scrollTop;
      if (scrollup > 50) {
        setHeaderClass("topbar-shadow");
      } else {
        setHeaderClass("");
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  useEffect(() => {
    const humberIcon = document.querySelector(".hamburger-icon") as HTMLElement;
    if (
      sidebarVisibilitytype === "show" ||
      layoutType === "vertical" ||
      layoutType === "twocolumn"
    ) {
      humberIcon?.classList.remove("open");
    } else {
      humberIcon?.classList.add("open");
    }
  }, [sidebarVisibilitytype, layoutType]);

  return (
    <>
      <div id="layout-wrapper">
        <Header
          headerClass={headerClass}
          layoutModeType={layoutModeType}
          onChangeLayoutMode={onChangeLayoutMode}
        />
        <Sidebar layoutType={layoutType} />
        <div className="main-content">
          {children}
          <Footer />
        </div>
      </div>
      {/* <RightSidebar /> */}
    </>
  );
};

export default Layout;
