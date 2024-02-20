import React from "react";
import useEscapeKey from "../../hooks/use-keydown.hook";

export const ToastContext = React.createContext([
  {
    toastInput: [],
    createToast: () => {},
    removeToast: () => {},
  },
]);

function ToastProvider({ children }) {
  const [toastInput, setToastInput] = React.useState([]);

  const handleEscape = React.useCallback(() => {
    setToastInput([]);
  }, []);

  useEscapeKey("Escape", handleEscape);

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
