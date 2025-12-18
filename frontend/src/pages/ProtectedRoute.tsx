import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getMe } from "../api/user.api";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log("ProtectedRoute state:", { isLoading, isError, error, data });
  }, [isLoading, isError, error, data]);

  if (isLoading) {
    console.log("Showing loading screen...");
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold">Checking authentication...</p>
          <p className="text-sm text-gray-500 mt-2">If stuck here, check console logs</p>
        </div>
      </div>
    );
  }

  if (isError || error) {
    console.log("Auth error - redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (!data || !data.userId) {
    console.log("No user data - redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("Auth successful - showing protected content");
  return children;
}
