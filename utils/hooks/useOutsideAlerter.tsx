"use client";

import React, { useRef, useEffect } from "react";
import { useApp } from "../context/app.context";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideAlerter = (ref) => {
  const { showNavbar, setShowNavbar } = useApp();
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowNavbar(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
