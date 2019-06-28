import { useEffect } from "react";

const useClickOutSide = (ref, fnc) => {
  useEffect(() => {
    const handleClickOutside = e => {
      if (e.target !== ref.current && !ref.current.contains(e.target)) {
        fnc();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
};

export default useClickOutSide;
