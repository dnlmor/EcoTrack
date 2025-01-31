import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile, getUserProfile } from "../services/authService";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

const Settings = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    email: "",
    username: "",
    full_name: "",
    bio: "",
    avatar_url: "",
    phone_number: "",
    password: "", // for current password
    newPassword: "", // for password change
    confirmPassword: "", // for confirming new password
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const avatarOptions = [
    "https://gravatar.com/avatar/4eb9d3b3f7a274ed45f5b7b5e25df256?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/18256c45d177b43f11a1ada863cb0ba8?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/f1e85ea4d020ba515eefe76f9d96c80d?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/0a44a4de5e05edda1e47ea9c008a0e32?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/f54f8544cada0a40f818737c1c134ea6?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/a3007c7ee09b7157b4ca921712dbd814?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/8c15de929f3d80227e26ea1a6159274d?s=400&d=robohash&r=x",
  ];

  useEffect(() => {
    if (!user?.token) return;

    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile(user.token);
        setForm({
          email: profileData.email || "",
          username: profileData.username || "",
          full_name: profileData.full_name || "",
          bio: profileData.bio || "",
          avatar_url: profileData.avatar_url || "",
          phone_number: profileData.phone_number || "",
          password: "", // we don't want to load the password
          newPassword: "",
          confirmPassword: "",
        });
      } catch (err) {
        setError(`Error fetching profile: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.token) return;

    // Validate password change if new password is provided
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (form.newPassword && (form.newPassword.length < 6 || !form.newPassword)) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    // Prepare form data for updating the profile
    const updateData = {
      ...form,
      password: form.newPassword || form.password, // use new password if provided, else current password
    };

    try {
      await updateUserProfile(user.token, updateData);
      setSaved(true);
      setPasswordSuccess(true); // Show password change success message
      setTimeout(() => {
        setSaved(false);
        setPasswordSuccess(false);
      }, 3000); // Reset saved state after 3 seconds
    } catch (err) {
      setError(`Failed to update profile: ${err.message || "Unknown error"}`);
    }
  };

  // Loading Skeleton
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="bg-gray-300 rounded-full w-16 h-16 mx-auto"></div>
          <div className="bg-gray-300 h-4 w-2/3 mx-auto mt-4"></div>
          <div className="bg-gray-300 h-4 w-1/2 mx-auto mt-2"></div>
          <div className="bg-gray-300 h-4 w-1/3 mx-auto mt-2"></div>
        </div>
      </div>
    );

  // Error handling
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600 font-semibold text-lg">{`Error: ${error}`}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8"> {/* Flex container with responsive layout */}
        
        {/* Profile Form */}
        <div className="flex-1 space-y-4">
          <Card className="p-4 shadow-lg transform transition-transform hover:scale-105">
            <h2 className="text-lg text-green-800 font-semibold mb-4">Profile Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                label="Full Name"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="border-2 border-gray-300 rounded-md p-1.5 w-full focus:outline-none focus:border-green-500 transition duration-150"
              />
              <Input
                label="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="border-2 border-gray-300 rounded-md p-1.5 w-full focus:outline-none focus:border-green-500 transition duration-150"
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border-2 border-gray-300 rounded-md p-1.5 w-full focus:outline-none focus:border-green-500 transition duration-150"
              />
              <Input
                label="Phone Number"
                value={form.phone_number}
                onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                className="border-2 border-gray-300 rounded-md p-1.5 w-full focus:outline-none focus:border-green-500 transition duration-150"
              />
              <Input
                label="Bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="border-2 border-gray-300 rounded-md p-1.5 w-full focus:outline-none focus:border-green-500 transition duration-150"
              />
              
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700">Choose Avatar</label>
                <div className="flex space-x-3 mt-2">
                  {avatarOptions.map((url, index) => (
                    <div
                      key={index}
                      onClick={() => setForm({ ...form, avatar_url: url })}
                      className={`cursor-pointer border-2 rounded-md p-1 ${form.avatar_url === url ? 'border-green-500' : 'border-gray-300'}`}
                    >
                      <img src={url} alt={`Avatar ${index + 1}`} className="h-16 w-16 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </Card>
        </div>

        {/* Password Form */}
        <div className="flex-1 space-y-4">
          <Card className="p-4 shadow-lg transform transition-transform hover:scale-105">
            <h2 className="text-lg text-green-800 font-semibold mb-4">Password Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                label="Current Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border-2 border-gray-300 rounded-md p-1.5 w-full focus:outline-none focus:border-green-500 transition duration-150"
              />
              <Input
                label="New Password"
                type="password"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                className="border-2 border-gray-300 rounded-md p-1.5 w-full focus:outline-none focus:border-green-500 transition duration-150"
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="border-2 border-gray-300 rounded-md p-1.5 w-full focus:outline-none focus:border-green-500 transition duration-150"
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-200"
              >
                Save Changes
              </Button>
            </form>
            {passwordError && (
              <Alert
                type="error"
                message={passwordError}
                className="mt-3 bg-red-100 text-red-800 p-2 rounded-md shadow-md"
              />
            )}
            {passwordSuccess && (
              <Alert
                type="success"
                message="Password changed successfully!"
                className="mt-3 bg-green-100 text-green-800 p-2 rounded-md shadow-md"
              />
            )}
          </Card>
        </div>

      </div>

      {saved && (
        <Alert
          type="success"
          message="Profile and password changes saved successfully!"
          className="mt-3 bg-green-100 text-green-800 p-2 rounded-md shadow-md"
        />
      )}
    </div>
  );
};

export default Settings;
