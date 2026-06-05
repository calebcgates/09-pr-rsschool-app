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

export async function fetchNarkPostSprint1Status(): Promise<unknown> {
  const response = await axios.get(`${config.host}/api/v2/nark/post-sprint1-status`);
  return response.data;
}

// qt-231 verify: trigger re-scan via empty-line bump after dev server restart 2026-06-05
