import React, { useEffect } from "react";

function useKeydown(key, callback) {
  useEffect(() => {
    function escKeyDown(event) {
      if (event.code === key) {
        callback();
      }
    }

    window.addEventListener("keydown", escKeyDown);

    return () => {
      window.removeEventListener("keydown", escKeyDown);
    };
  }, []);
}

export default useKeydown;
