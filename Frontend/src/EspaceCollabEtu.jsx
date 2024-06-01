import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCommenting } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

// Comment component
const Comment = ({ content }) => {
  return (
    <div className="rounded-md p-2 mb-2">
      <div className="flex items-start">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full mr-4">
          <FontAwesomeIcon icon={faCheck} className="text-white" />
        </div>
        <div>
          <p className="mb-1"> Commented by <strong> Anonymous</strong></p>
          <div className="bg-white p-2 rounded">{content}</div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
};

// Post component
const Post = ({ author = "Anonymous", content, comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState(comments);

  const handleComment = () => {
    if (commentText.trim() !== '') {
      const newComment = {
        id: postComments.length + 1,
        content: commentText,
      };
      setPostComments([...postComments, newComment]);
      setCommentText('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-start">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full mr-3">
              <FontAwesomeIcon icon={faCommenting} className="text-white" />
            </div>
            <div>
              <p className="mb-3"> Posted By <strong>{author}</strong></p>
              <div className="bg-white p-2 rounded">{content}</div>
            </div>
          </div>
          <div className="flex flex-row mt-2">
            <p className="text-gray-500 mr-20 ml-7">Comments: {postComments.length}</p>
            <div className="ml-auto">
              <button
                className="text-blue-500 mr-40"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments ? 'Hide Comments' : 'Show Comments'}
              </button>
            </div>
          </div>
          {showComments && (
            <div>
              {postComments.map((comment) => (
                <Comment key={comment.id} content={comment.content} />
              ))}
              <div className="mb-4 flex items-center p-4 border-b">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-none outline-none"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className="p-2 ml-2 bg-blue-500 text-white rounded"
                  onClick={handleComment}
                >
                  Add Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

// Main App component
export const EspaceCollabEtu = () => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');

  const { idmod , id} = useParams();


  const handlePost = async () => {
    if (postText.trim() !== '') {
      try {
  
        const response = await axios.post(`http://localhost:4000/forum/${idmod}/add`, {
          context: postText,
          authorId: id,
        });
  
        const newPost = response.data;
  
        setPosts([...posts, newPost]);
        setPostText('');
      } catch (error) {
        console.error('Error posting:', error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/forum/${idmod}/forums`);
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setPosts([]);
          console.error('Unexpected data format:', response.data);
          console.log(idmod)
        }
      } catch (error) {
        console.error('Error fetching forums:', error);
        setPosts([]);
      }
    };
    fetchPosts()
  }, [idmod]);


  return (
    <div className="flex h-screen">
      <div className="bg-blue-500 w-1/6 p-4">
        <h1 className="text-white text-2xl font-bold mb-4">Sidebar</h1>
      </div>
      <div className="w-4/5 p-4">
        <div className="mb-4 flex items-center p-4 border-b">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-none outline-none"
            placeholder="Poser votre question ici"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button
            className="p-2 ml-2 bg-blue-500 text-white rounded"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
        {posts.map((post) => (
          <Post
            key={post.id}
            author={post.author}
            content={post.content}
            comments={post.comments}
          />
        ))}
      </div>
    </div>
  );
};

