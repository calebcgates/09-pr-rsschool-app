import axios from 'axios';
import { config } from '../config';
import { NotificationId } from '../models/notification';

export async function sendNotification(notification: NotificationV2) {
  if (config.isDevMode) return;

  const { password, username } = config.users.cloud;
  const notificationsEndpoint = `${config.host}/api/v2/users/notifications/send`;

  await axios.post(notificationsEndpoint, notification, {
    auth: {
      username,
      password,
    },
  });
}

type NotificationV2 = {
  notificationId: NotificationId;
  userId: number;
  data?: object;
};
