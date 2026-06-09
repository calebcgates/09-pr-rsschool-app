import axios from 'axios';
import { config } from '../config';
import { NotificationId } from '../models/notification';

export async function sendNotification(notification: NotificationV2) {
  if (config.isDevMode) return;

  const { password, username } = config.users.cloud;

  await axios.post(`${config.host}/api/v2/users/notifications/send`, notification, {
    auth: {
      username,
      password,
    },
  });
}

export async function sendNotificationStatus(notificationId: NotificationId, status: string) {
  try {
    await axios.put(`${config.host}/api/v2/users/notifications/${notificationId}`, { status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`sendNotificationStatus failed (status=${error.response?.status ?? 'network'}): ${error.message}`);
    }
    throw error;
  }
}

type NotificationV2 = {
  notificationId: NotificationId;
  userId: number;
  data?: object;
};
