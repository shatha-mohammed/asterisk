import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserCircle, Mail, Calendar, Edit, ShieldCheck } from "lucide-react";

import { fetchCurrentUser } from "@/store/slices";
import { PageHeader, Button } from "@/components/ui";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Dispatch the Redux thunk to fetch fresh user data
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (isLoading && !user) {
    return (
      <div className="mx-auto max-w-5xl p-4 lg:p-10">
        <PageHeader title="My Profile" subtitle="Loading profile details..." />
        <div className="flex justify-center p-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in mx-auto max-w-5xl p-4 duration-500 lg:p-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title="My Profile" subtitle="Your personal information" />
        <Link to="/settings">
          <Button variant="outline" icon={<Edit size={16} />}>
            Edit Profile
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm text-orange-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        {/* Cover Photo - Gradient */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 sm:h-48"></div>

        <div className="px-6 pb-8 sm:px-10">
          <div className="relative flex justify-between">
            {/* Avatar Container */}
            <div className="-mt-12 rounded-full border-4 border-white bg-white p-1 shadow-sm sm:-mt-16">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-slate-50 sm:h-32 sm:w-32">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserCircle className="h-full w-full p-4 text-slate-300" />
                )}
              </div>
            </div>
            
            {/* Badge Indicator */}
            <div className="mt-4 flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 h-fit">
              <ShieldCheck size={16} />
              Active Account
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {user?.name || "Unknown User"}
            </h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Mail size={16} />
              <span>{user?.email}</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
                <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                  <Calendar size={18} />
                </div>
                Member Since
              </div>
              <p className="text-base font-medium text-slate-800">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Recently joined"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
                <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                  <UserCircle size={18} />
                </div>
                Account Type
              </div>
              <p className="text-base font-medium capitalize text-slate-800">
                Freelancer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
