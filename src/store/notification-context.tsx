import { Notification, NotificationContextType } from '@/@types/notification';
import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationContextProvider(props: { children: any }) {
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      ['error', 'success'].includes(activeNotification.status)
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotification(notificationData: Notification) {
    setActiveNotification(notificationData);
  }

  function hideNotification() {
    setActiveNotification(null);
  }

  const context = {};

  return (
    <NotificationContext.Provider
      value={{
        notification: activeNotification,
        showNotification,
        hideNotification,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
