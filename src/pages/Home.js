import React, { useEffect, useState } from "react";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../firebase-config";

function Home() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, "posts"));
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {postList.map((post) => (
        <div
          key={post.id}
          className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 h-80 mx-auto"
        >
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <div className="text-gray-700 mb-2 h-40 overflow-y-auto">
            {post.postText}
          </div>
          <h3 className="text-sm text-gray-500">@{post.author.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default Home;
