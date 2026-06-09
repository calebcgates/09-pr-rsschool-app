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

// Added 2026-06-09 launch-walk: NEW violation in EXISTING file — tests bot's
// "new-violation-in-pre-existing-file" tagging signal.
export async function sendNotificationStatus(notificationId: NotificationId, status: string) {
  await axios.put(`${config.host}/api/v2/users/notifications/${notificationId}`, { status });
}

type NotificationV2 = {
  notificationId: NotificationId;
  userId: number;
  data?: object;
};
