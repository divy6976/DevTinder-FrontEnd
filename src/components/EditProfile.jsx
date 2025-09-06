import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user: initialUser }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    about: "",
    photoUrl: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const IMGBB_API_KEY = "291209fab5ea442f5c759b93cb4bfe3b";

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:7777/profile", {
          withCredentials: true,
        });
        const user = res.data;
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          age: user.age || "",
          gender: user.gender || "",
          about: user.about || "",
          photoUrl: user.photoUrl || "",
        });
        setError("");
      } catch (err) {
        console.error("Failed to load user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    if (!initialUser) {
      fetchUser();
    } else {
      setFormData({
        firstName: initialUser.firstName || "",
        lastName: initialUser.lastName || "",
        age: initialUser.age || "",
        gender: initialUser.gender || "",
        about: initialUser.about || "",
        photoUrl: initialUser.photoUrl || "",
      });
    }
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImage = new FormData();
    formDataImage.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formDataImage
      );
      const imageUrl = res.data.data.url;
      setFormData((prev) => ({ ...prev, photoUrl: imageUrl }));
      setError("");
    } catch (uploadErr) {
      console.error("Image upload failed:", uploadErr);
      setError("Image upload failed. Try again.");
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    const cleanedData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      about: formData.about.trim(),
      photoUrl: formData.photoUrl?.trim() || "",
    };

    if (!cleanedData.firstName) return setError("First name is required.");
    if (!cleanedData.lastName) return setError("Last name is required.");
    if (isNaN(cleanedData.age) || cleanedData.age < 10)
      return setError("Age must be a number and at least 10.");
    if (!cleanedData.gender) return setError("Gender is required.");
    if (
      cleanedData.about.length < 9 ||
      cleanedData.about.length > 500
    )
      return setError("About must be between 9 and 500 characters.");
    if (!cleanedData.photoUrl)
      return setError("Profile Picture is required.");

    setError("");
    setLoading(true);

    try {
      const res = await axios.patch(
        "http://localhost:7777/profile/edit",
        cleanedData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(addUser(res.data));
      setSuccessMessage("Profile updated successfully!");

      setTimeout(() => {
        navigate("/feed");
      }, 500);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-300 mt-8 relative z-10">Loading user data...</div>
    );
  }

  if (error && !formData.firstName) {
    return <div className="text-center text-red-400 mt-8 relative z-10">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-6 justify-between items-stretch h-[650px] relative z-10">
      {/* Left - Form */}
      <div className="flex-[0.4] max-w-md bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-300 overflow-visible">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Edit Profile
        </h2>

        {error && (
          <div className="mb-3 text-red-600 text-center font-semibold text-sm">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-3 text-green-600 text-center font-semibold text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={saveProfile} className="space-y-3 text-sm">
          {/* First Name */}
          <label className="block text-gray-700 font-semibold">
            First Name
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
              placeholder="First Name"
            />
          </label>

          {/* Last Name */}
          <label className="block text-gray-700 font-semibold">
            Last Name
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
              placeholder="Last Name"
            />
          </label>

          {/* Age */}
          <label className="block text-gray-700 font-semibold">
            Age
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
              placeholder="Age"
            />
          </label>

          {/* Gender */}
          <label className="block text-gray-700 font-semibold">
            Gender
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male ♂️</option>
              <option value="female">Female ♀️</option>
              <option value="other">Other ⚧</option>
            </select>
          </label>

          {/* About */}
          <label className="block text-gray-700 font-semibold">
            About
            <textarea
              name="about"
              value={formData.about || ""}
              onChange={handleChange}
              rows={3}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
              placeholder="About"
            />
          </label>

          {/* Photo Upload */}
          <label className="block text-gray-700 font-semibold">
            Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-white file:mr-3 file:px-4 file:py-2 file:border-0 file:bg-red-100 file:text-red-700 hover:file:bg-red-200 transition"
            />
          </label>


          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-md ${
              loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      {/* Right - UserCard */}
      <div className="flex-[0.6] max-w-lg bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-300 h-full overflow-y-auto">
        <UserCard user={formData} />
      </div>
    </div>
  );
};

export default EditProfile;
