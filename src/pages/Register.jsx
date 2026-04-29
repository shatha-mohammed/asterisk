import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser, clearError } from "@/store/slices";
import { supabase } from "@/services/supabaseClient";
import { useAppNavigation } from "@/hooks";
import { Input, Button } from "@/components/ui";
import { AuthFooter, AuthRedirect } from "@/components";
import { Header } from "@/layout";

export default function Register() {
  const dispatch = useDispatch();
  const { goToDashboard } = useAppNavigation();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (user) goToDashboard();
  }, [user, goToDashboard]);

  // Clear any previous error when the user starts typing
  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload avatar
  const handleFileChange = (e) => {
    if (error) dispatch(clearError());
    const file = e.target.files[0];
    if (!file) return;

    // Set max avatar size = 2MB
    const MAX_SIZE_MB = 2;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
      e.target.value = "";
      return;
    }
    setAvatarFile(file);
  };

  // Submit form action
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalAvatarUrl = "";

      if (avatarFile) {
        setIsUploading(true);

        // Rename the avatar with a unique name
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.round(Math.random() * 10000)}.${fileExt}`;
        const filePath = fileName;

        // upload the photo
        const { error: uploadError } = await supabase.storage
          .from("profiles")
          .upload(filePath, avatarFile);

        // stop if there is an error
        if (uploadError) throw uploadError;

        // get the public url for avatar
        const { data } = supabase.storage
          .from("profiles")
          .getPublicUrl(filePath);

        finalAvatarUrl = data.publicUrl;
        setIsUploading(false);
      }

      // collect the form data with avatar
      const payload = {
        ...formData,
        avatarUrl: finalAvatarUrl,
      };

      // dispatch the register
      await dispatch(registerUser(payload)).unwrap();
    } catch (err) {
      setIsUploading(false);
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="lg:hidden">
        <Header />
        <div className="h-16"></div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-indigo-800">
          Create an account
        </h2>
        <p className="mt-2 text-gray-600">
          Start managing your freelance business like a pro.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-100 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Register */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Ahmed Mohamed"
        />

        <Input
          label="Email"
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a strong password"
        />

        <Input
          label="Avatar Profile"
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="text-xs leading-relaxed text-gray-500">
          By creating an account, you agree to our{" "}
          <Link
            to="/terms"
            className="cursor-pointer text-indigo-600 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="cursor-pointer text-indigo-600 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </div>

        <Button
          type="submit"
          variant="primary"
          size="full"
          isLoading={isLoading || isUploading}
        >
          {isUploading
            ? "Uploading Avatar..."
            : isLoading
              ? "Signing up..."
              : "Sign up"}
        </Button>
      </form>

      {/* Redirect to login page */}
      <AuthRedirect
        text="Already have an account?"
        to="/login"
        linkText="Sign in"
      />

      {/* Footer */}
      <AuthFooter />
    </div>
  );
}
