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
          <p className="text-muted-foreground text-xl font-medium">Loading feed...</p>
        </div>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-muted-foreground text-xl font-medium">
            No new users found 😢
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background relative">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0 animate-pulse"
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

      {/* Navbar and main content - put z-10 so content is on top */}
      <Navbar />

      <main className="max-w-4xl mx-auto py-12 px-4 relative z-10">
        <h1 className="text-3xl font-bold text-center text-foreground mb-8">
          👨‍💻 DevMatch Feed
        </h1>

        <div className="flex justify-center">
          <UserCard user={feed[0]} />
        </div>
      </main>
    </div>
  );
};

export default Feed;
