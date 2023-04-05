import { Notification, NotificationContextType } from '@/@types/notification';
import { createContext, useState } from 'react';

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationContextProvider(props: { children: any }) {
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);

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
