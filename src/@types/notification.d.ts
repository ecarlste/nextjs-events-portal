export interface Notification {
  title: string;
  message: string;
  status: string;
}

export type NotificationContextType = {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
};
