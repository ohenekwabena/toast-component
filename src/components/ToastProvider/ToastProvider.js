import React from "react";

export const ToastContext = React.createContext([
  {
    toastInput: [],
    createToast: () => {},
    removeToast: () => {},
  },
]);

function ToastProvider({ children }) {
  const [toastInput, setToastInput] = React.useState([]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        setToastInput([]);
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function removeToast(id) {
    const newToastInput = toastInput.filter((toast) => toast.id != id);
    setToastInput(newToastInput);
  }

  function createToast(message, variant) {
    const nextToastInput = [...toastInput, { message, variant, id: crypto.randomUUID() }];
    setToastInput(nextToastInput);
  }

  const value = React.useMemo(() => {
    return {
      toastInput,
      createToast,
      removeToast,
    };
  }, [toastInput]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
