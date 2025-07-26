import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "../features/api/authApi";
import { Loader2 } from "lucide-react";

const UserProfile = () => {
  const { data, isLoading, isError, error } = useLoadUserQuery();
  const user = useSelector((state) => state.auth.user);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <Loader2 className="animate-spin h-6 w-6 text-orange-500" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-red-500 text-lg font-medium">Failed to load user profile.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-50 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt="User Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-orange-100 shadow"
          />

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <span className="inline-block px-3 py-1 mt-2 text-sm rounded-full bg-orange-100 text-orange-600 capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
