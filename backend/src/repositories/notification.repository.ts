import prisma from "../utils/prisma";

export const createNotificationRepo = (data: {
  userId: string;
  message: string;
}) => {
  return prisma.notification.create({ data });
};

export const getUserNotificationsRepo = (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};
