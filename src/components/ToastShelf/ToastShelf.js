import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";

function ToastShelf() {
  const { toastInput } = React.useContext(ToastContext);

  return (
    <ol className={styles.wrapper}>
      {toastInput.map(({ variant, message, id }) => {
        return (
          <li key={id} className={styles.toastWrapper}>
            <Toast variant={variant} id={id}>
              {message}
            </Toast>
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
