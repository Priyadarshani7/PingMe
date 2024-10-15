import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserProfile({
        name: user.displayName,
        profilePic: user.photoURL || "https://via.placeholder.com/100",
      });
      fetchUserPosts(user.uid);
    } else {
      navigate("/login");
    }
  }, [auth, navigate]);

  const fetchUserPosts = async (userId) => {
    const postCollectionRef = collection(db, "posts");
    const q = query(postCollectionRef);
    const data = await getDocs(q);
    const userPostsdata = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((post) => post.authorId === userId);
    setUserPosts(userPostsdata);
  };

  return (
    <>
      <div class="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <div class="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div class="p-6">
            <div class="flex items-center space-x-4">
              {userProfile ? (
                <img
                  class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                  src={userProfile.profilePic}
                  alt=""
                />
              ) : (
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                  src="https://via.placeholder.com/100"
                  alt=""
                />
              )}

              <div>
                {userProfile ? (
                  <>
                    <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                    <p className="text-gray-600">@{userProfile.name}</p>
                  </>
                ) : (
                  <h2 className="text-2xl font-bold">Loading...</h2>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-bold p-4">My Blogs</h2>
          <div className="p-4">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div key={post.id} className="mb-4">
                  <h3 className="text-lg font-bold">{post.title}</h3>
                  <p className="text-gray-700">
                    {post.postText.slice(0, 100)}...
                  </p>
                </div>
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
