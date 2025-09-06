import axios from "axios";
import Navbar from "../NavBar";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;

    try {
      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      console.log("✅ API Response:", response.data);
      dispatch(addFeed(response.data.data));
    } catch (error) {
      console.error("❌ Feed error:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-gray-500 text-xl font-medium">Loading feed...</p>
        </div>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-gray-500 text-xl font-medium">
            No new users found 😢
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      {/* Only apply styling here, not on outer div */}
      <div className="max-w-4xl mx-auto py-12 px-4">
       <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
 
          👨‍💻 DevTinder Feed
        </h1>

        <div className="flex justify-center">
          <UserCard user={feed[0]} />
        </div>
      </div>
    </div>
  );
};

export default Feed;
