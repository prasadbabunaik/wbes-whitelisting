"use client";
import React, { useEffect, useState } from "react";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { get } from "lodash";

//i18n
import i18n from "@common/data/i18n";
import languages from "@common/data/languages";
import Image from "next/image";

const LanguageDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentLanguage: any = localStorage.getItem("I18N_LANGUAGE");
      setSelectedLang(currentLanguage);
    }
  }, []);

  const changeLanguageAction = (lang: any) => {
    //set language as i18n
    i18n.changeLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("I18N_LANGUAGE", lang);
    }
    setSelectedLang(lang);
  };

  return (
    <React.Fragment>
      <UncontrolledDropdown
        nav
        inNavbar
        className="ms-1 topbar-head-dropdown header-item"
      >
        <DropdownToggle
          className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
          tag="button"
        >
          {get(languages, `${selectedLang}.flag`) && (
            <Image
              src={get(languages, `${selectedLang}.flag`)}
              alt="Header Language"
              height={20}
              width={20}
              className="rounded"
            />
          )}
        </DropdownToggle>
        <DropdownMenu className="notify-item language py-2">
          {Object.keys(languages).map(key => (
            <DropdownItem
              key={key}
              onClick={() => changeLanguageAction(key)}
              className={`notify-item ${
                selectedLang === key ? "active" : "none"
              }`}
            >
              {get(languages, `${key}.flag`) && (
                <Image
                  src={get(languages, `${key}.flag`)}
                  alt="Skote"
                  className="me-2 rounded"
                  height={20}
                  width={20}
                />
              )}
              <span className="align-middle">
                {get(languages, `${key}.label`)}
              </span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </React.Fragment>
  );
};

export default LanguageDropdown;
