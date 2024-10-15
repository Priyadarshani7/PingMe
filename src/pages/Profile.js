import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
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
        profilePic:
          user.photoURL ||
          "https://banner2.cleanpng.com/20180622/tqt/aazen4lhc.webp",
      });
      fetchUserPosts(user.uid);
    } else {
      navigate("/login");
    }
  }, [auth, navigate]);

  const fetchUserPosts = async (userId) => {
    try {
      const postCollectionRef = collection(db, "posts");
      const q = query(postCollectionRef, where("author.id", "==", userId));
      const data = await getDocs(q);
      const userPostsData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserPosts(userPostsData);
    } catch (error) {
      console.log("Error in fetching posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setUserPosts(userPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.log("Error in deleting posts:", error);
    }
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
        <div className="w-full max-w-lg">
          <h2 className="text-xl font-bold p-4">My Blogs</h2>
          <div className="p-4 space-y-4">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-2">
                    {post.postText.slice(0, 100)}...
                  </p>
                  <button
                    className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
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
