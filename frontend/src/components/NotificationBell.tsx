import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../api/notification.api";
import { socket } from "../sockets/socket";
import type { Notification } from "../types/notification";

export default function NotificationBell() {
  const { data = [], refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("notification", () => {
      refetch();
    });

    return () => {
      socket.off("notification");
    };
  }, [refetch]);

  const unreadCount = data.filter((n: Notification) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative px-3 py-1 border rounded"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow">
          <ul className="max-h-64 overflow-auto">
            {data.length === 0 && (
              <li className="p-2 text-sm text-gray-500">
                No notifications
              </li>
            )}
            {data.map((n: Notification) => (
              <li
                key={n.id}
                className="p-2 border-b text-sm"
              >
                {n.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
