import {
  createNotificationRepo,
  getUserNotificationsRepo,
} from "../repositories/notification.repository";

export const createNotification = async (
  userId: string,
  message: string
) => {
  return createNotificationRepo({ userId, message });
};

export const getUserNotifications = async (userId: string) => {
  return getUserNotificationsRepo(userId);
};
