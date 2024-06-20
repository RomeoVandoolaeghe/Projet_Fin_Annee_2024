import React from 'react';
import './Notification.css';

function NotificationCard({ notification }) {
  return (
    <div className="notification-card">
      <div className="notification-details">
        <span> {`${notification.count}  nouveau message ${notification.count > 1 ? 's' : ''} dans ${notification.group}`}</span>
      </div>
    </div>
  );
}

export default NotificationCard;