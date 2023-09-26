import React, { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../config/Firestore";
import { AppContext } from "../context/Context";
import { ClipLoader } from "react-spinners";

const Homepage = () => {
  const { postLists, setPostList, isAuth } = useContext(AppContext);
  const postCollectionRef = collection(db, "posts");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPostList(posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      setPostList((prevState) => prevState.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="container">
        {loading ? (
          <div
            style={{
              minHeight: "80vh",
              width: "100%",
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="loading-spinner"
          >
            <ClipLoader color="#36D7B7" size={100} />
          </div>
        ) : (
          <>
            {!isAuth ? (
              // Render a message if the user is not authenticated
              <article>
                <p style={{ textAlign: "center", fontSize: "20px" }}>
                  Please sign in to see your blog posts. 🧑‍💻🚀
                </p>
              </article>
            ) : // Render posts when data is available

            postLists.length === 0 ? (
              <article>
                <p>You have no blogs. 🤷‍♂️ Go add some!! </p>
              </article>
            ) : (
              postLists.map((item) => {
                if (
                  auth.currentUser &&
                  item.author.id === auth.currentUser.uid
                ) {
                  return (
                    <article key={item.id}>
                      <div>
                        <h1>{item.title}</h1>
                        <p>{item.postText}</p>
                      </div>
                      <div>
                        <button onClick={() => deletePost(item.id)}>
                          Delete
                        </button>
                      </div>
                    </article>
                  );
                }
                return null;
              })
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
