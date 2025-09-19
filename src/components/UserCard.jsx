import React from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return null;

  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    about,
    photoUrl,
  } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative max-w-sm w-full bg-card text-card-foreground rounded-3xl shadow-2xl overflow-hidden mx-auto transform transition-transform duration-300 hover:scale-105 border border-border">
      {/* Profile Image with overlay */}
      <div className="relative h-[400px] w-full">
        <img
          src={
            photoUrl ||
            "https://ctmirror-images.s3.amazonaws.com/wp-content/uploads/2021/01/dummy-man-570x570-1.png"
          }
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
          <h2 className="text-2xl font-bold">
            {firstName} {lastName}
            {age && `, ${age}`}
          </h2>
          <p className="text-sm capitalize opacity-90">{gender}</p>
        </div>
      </div>

      {/* About Section */}
      {about && (
        <div className="p-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{about}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-around px-6 pb-6">
        <button
          onClick={() => handleSendRequest("ignore", _id)}
          className="w-24 py-2 rounded-full bg-muted text-foreground/90 font-semibold hover:opacity-90 transition border border-border"
        >
          Ignore
        </button>
        <button
          onClick={() => handleSendRequest("interested", _id)}
          className="w-32 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow"
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
