import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../store/slices/authSlice";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthFooter from "../components/AuthFooter";
import AuthRedirect from "../components/AuthRedirect";

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

  useEffect(() => {
    if (user) goToDashboard();
  }, [user, goToDashboard]);

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (error) dispatch(clearError());
    const file = e.target.files[0];
    if (file) setAvatarFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalAvatarUrl = "";

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

      const payload = {
        ...formData,
        avatarUrl: finalAvatarUrl,
      };

      await dispatch(registerUser(payload)).unwrap();
    } catch (err) {
      setIsUploading(false);
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
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

      {/* Login */}
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
