import { useEffect } from "react";

/** 用来点击外部时候触发事件 */
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
