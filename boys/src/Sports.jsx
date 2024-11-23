import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs } from './firebase'; // Import Firebase setup
import './sports.css';

function Sports() {
  // State variables
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState('');
  const [currentPostIndex, setCurrentPostIndex] = useState(null);

  // Fetch posts from Firestore
  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postsData = querySnapshot.docs.map(doc => doc.data());
    setPosts(postsData);
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to handle new post submission
  const handlePostSubmit = async () => {
    if (newPost.trim()) {
      try {
        await addDoc(collection(db, "posts"), {
          title: newPost,
          comments: [],
        });
        setNewPost(''); // Reset post input field
        fetchPosts(); // Fetch updated posts after adding new post
      } catch (error) {
        console.error("Error adding post: ", error);
      }
    }
  };

  // Function to handle comment submission
  const handleCommentSubmit = async (postIndex) => {
    if (newComment.trim()) {
      const postId = posts[postIndex].id;

      try {
        // Update the post with the new comment
        const updatedPosts = [...posts];
        updatedPosts[postIndex].comments.push(newComment);

        // Add comment to Firestore
        await addDoc(collection(db, "posts", postId, "comments"), {
          comment: newComment,
        });

        setPosts(updatedPosts);
        setNewComment(''); // Reset comment input field
        setCurrentPostIndex(null); // Close comment section
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }
  };

  return (
    <div className="sports-container">
      <h2 className="sports-header">Talk</h2>

      {/* New Post Section */}
      <div className="new-post">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What are you excited about?"
          rows="4"
        />
        <button onClick={handlePostSubmit}>Post</button>
      </div>

      {/* Posts List */}
      <div className="posts-list">
        {posts.length > 0 ? (
          posts.map((post, postIndex) => (
            <div key={post.id} className="post">
              <h3 className="post-title">{post.title}</h3>

              {/* Show Comments or Option to Add Comment */}
              <div className="comments">
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment, index) => (
                    <p key={index} className="comment">{comment}</p>
                  ))
                ) : (
                  <p>No comments yet. Be the first to comment!</p>
                )}
              </div>

              {/* Comment Section */}
              <button
                onClick={() => setCurrentPostIndex(postIndex)}
              >
                Add Comment
              </button>

              {currentPostIndex === postIndex && (
                <div className="comment-input">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    rows="4"
                  />
                  <button onClick={() => handleCommentSubmit(postIndex)}>Comment</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No discussions yet. Start the first one!</p>
        )}
      </div>
    </div>
  );
}

export default Sports;