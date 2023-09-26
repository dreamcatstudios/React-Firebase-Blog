import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../config/Firestore";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { AppContext } from "../context/Context";
import Errorpage from "./Errorpage";

const CreatePost = () => {
  const { isAuth } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postCollectionRef = collection(db, "posts");

  const createPost = async () => {
    try {
      await addDoc(postCollectionRef, {
        title: title,
        postText: postText,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      setTitle("");
      setPostText("");
      window.location.href = "/";
    } catch (error) {
      console.warn(error);
    }
  };

  if (!isAuth) {
    return (
      <div className="container">
        <Errorpage />
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="container">
        <article>
          <h1 style={{ marginBottom: "1rem" }}>Create a post</h1>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="text">Post </label>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              name="text"
              cols="20"
              rows="5"
            ></textarea>
          </div>
          <button onClick={createPost}>Submit Post</button>
        </article>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
