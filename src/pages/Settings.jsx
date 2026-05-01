import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { UserCircle, Lock } from "lucide-react";

import { updateUser, clearError, changePassword } from "@/store/slices";
import { supabase } from "@/services/supabaseClient";
import { Input, Button, PageHeader, FormSection } from "@/components/ui";

export default function Settings() {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || "");
  const [isUploading, setIsUploading] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    if (error) dispatch(clearError());
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("New passwords do not match");
    }

    try {
      await dispatch(
        changePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      ).unwrap();

      toast.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err || "Failed to change password");
    }
  };

  const handleFileChange = (e) => {
    if (error) dispatch(clearError());
    const file = e.target.files[0];
    if (!file) return;

    const MAX_SIZE_MB = 2;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
      e.target.value = "";
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalAvatarUrl = user?.avatarUrl || "";

      if (avatarFile) {
        setIsUploading(true);
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.round(Math.random() * 10000)}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from("profiles")
          .upload(filePath, avatarFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("profiles")
          .getPublicUrl(filePath);

        finalAvatarUrl = data.publicUrl;
        setIsUploading(false);
      }

      await dispatch(
        updateUser({
          name: formData.name,
          avatarUrl: finalAvatarUrl,
        }),
      ).unwrap();

      toast.success("Profile updated successfully!");
    } catch (err) {
      setIsUploading(false);
      console.error("Update failed:", err);
      toast.error(err || "Failed to update profile");
    }
  };

  return (
    <div className="animate-in fade-in mx-auto max-w-5xl p-4 duration-500 lg:p-10">
      <PageHeader title="Settings" subtitle="Manage your account preferences" />

      {error && (
        <div className="mb-6 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Profile Settings */}
        <div className="flex w-full flex-col gap-6">
          <FormSection icon={<UserCircle size={24} />} title="Profile Details">
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-indigo-50 bg-indigo-100">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-full w-full p-2 text-indigo-300" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Profile Picture
                  </span>
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="avatar-upload"
                      className="cursor-pointer rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                    >
                      Choose Image
                    </label>
                    {avatarFile && (
                      <span className="max-w-30 truncate text-xs text-slate-500">
                        {avatarFile.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Input
                label="Full Name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={(e) => {
                  if (error) dispatch(clearError());
                  setFormData({ ...formData, name: e.target.value });
                }}
                placeholder="Your Name"
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="bg-slate-50 opacity-70"
              />

              <div className="flex justify-end border-t border-slate-100 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading || isUploading}
                >
                  {isUploading
                    ? "Uploading..."
                    : isLoading
                      ? "Saving..."
                      : "Save Changes"}
                </Button>
              </div>
            </form>
          </FormSection>
        </div>

        {/* Change Password Section */}
        <div className="flex w-full flex-col gap-6">
          <FormSection icon={<Lock size={24} />} title="Change Password">
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter current password"
              />
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter new password"
              />
              <Input
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Confirm new password"
              />
              <div className="flex justify-end border-t border-slate-100 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading && !isUploading}
                >
                  {isLoading && !isUploading
                    ? "Updating..."
                    : "Update Password"}
                </Button>
              </div>
            </form>
          </FormSection>
        </div>
      </div>
    </div>
  );
}
