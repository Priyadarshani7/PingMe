import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";

function Home() {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });
  return (
    <div className="flex flex-col items-center p-4">
      {postList.map((post) => {
        return (
          <div
            key={post.id}
            className="w-full max-w-md bg-white rounded-lg shadow-lg mb-4 p-6"
          >
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <div className="text-gray-700 mb-2">{post.postText}</div>
            <h3 className="text-sm text-gray-500">@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
