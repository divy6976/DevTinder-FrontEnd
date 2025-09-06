import React from "react";
import EditProfile from "./EditProfile";
import Navbar from "../NavBar";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user); // ✅ fixed path

  console.log("Profile - user from store:", user);

  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
      {/* Enhanced Red Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle 800px at 20% 20%, rgba(239,68,68,0.3), transparent 70%),
            radial-gradient(circle 600px at 80% 80%, rgba(239,68,68,0.2), transparent 70%),
            radial-gradient(circle 1000px at 50% 50%, rgba(239,68,68,0.15), transparent 80%),
            radial-gradient(circle 400px at 0% 100%, rgba(239,68,68,0.25), transparent 60%),
            radial-gradient(circle 500px at 100% 0%, rgba(239,68,68,0.2), transparent 60%)
          `,
        }}
      />
      {/* Additional subtle overlay for depth */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(239,68,68,0.05) 0%, transparent 50%),
            linear-gradient(45deg, transparent 50%, rgba(239,68,68,0.05) 100%)
          `,
        }}
      />
      {/* Enhanced Reddish Black Texture Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle 200px at 10% 10%, rgba(0,0,0,0.4), transparent 50%),
            radial-gradient(circle 150px at 90% 10%, rgba(0,0,0,0.3), transparent 50%),
            radial-gradient(circle 180px at 10% 90%, rgba(0,0,0,0.35), transparent 50%),
            radial-gradient(circle 220px at 90% 90%, rgba(0,0,0,0.25), transparent 50%),
            radial-gradient(circle 300px at 50% 20%, rgba(0,0,0,0.2), transparent 60%),
            radial-gradient(circle 250px at 50% 80%, rgba(0,0,0,0.3), transparent 60%)
          `,
        }}
      />
      {/* Fine Grid Texture */}
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "15px 15px",
        }}
      />
      <Navbar />
      <div className="mt-8 relative z-10">
        {user ? (
          <EditProfile user={user} />
        ) : (
          <div className="text-center text-gray-400 mt-8">
            No user found. Please login.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
