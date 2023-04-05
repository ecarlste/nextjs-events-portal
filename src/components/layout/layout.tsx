import React, { Fragment, useContext } from 'react';
import MainHeader from './main-header';
import NotificationContext from '@/store/notification-context';
import Notification from '../ui/notification';

function Layout(props: any) {
  const context = useContext(NotificationContext);

  const activeNotification = context?.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
