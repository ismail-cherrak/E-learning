
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCommenting } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

// Comment component
const Comment =({ content, commentId, authore, postId, onDeleteComment }) => {
 
  // const { idmod } = useParams();

  // const handleDeleteComment = async () => {
  //   try {
  //     await axios.delete(`http://localhost:4000/forum/deleteReply`, {
  //       params: { forumId: postId, replyId: commentId } // Use params for URL parameters
  //     });
  //     onDeleteComment(commentId);
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       console.error('Error deleting reply: Forum not found');
  //     } else {
  //       console.error('Error deleting reply:', error.message);
  //     }
  //   }
  // };
 


  const handleDeleteComment = async () => {
    console.log(postId,commentId)
    try {
      const response = await axios.delete('http://localhost:4000/forum/deleteReply', {
        data: { forumId: postId, replyId: commentId }
      });
      if (response.status === 200) {
        console.log('Reply deleted successfully');
        onDeleteComment(commentId); // Update the UI after successful deletion
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Error deleting reply: Forum or Reply not found');
        console.log(commentId)
      } else {
        console.error('Error deleting reply:', error.message);
      }
    }
  };
  // const handleDeleteComment = async (commendId) => {
  //   try {
  //     // Use commentId fetched in the useEffect hook
  //     await axios.delete('http://localhost:4000/forum/deleteReply', {
  //       data: { forumId: postId, replyId: commendId }
  //     });
  //     onDeleteComment(commendId);
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       console.error('Error deleting reply: Forum or Reply not found');
  //     } else {
  //       console.error('Error deleting reply:', error.message);
  //     }
  //   }
  // };

  return (
    <div className="rounded-md p-2 mb-2">
      <div className="flex items-start">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full mr-4">
          <FontAwesomeIcon icon={faCheck} className="text-white" />
        </div>
        <div>
          <p className="mb-1"> Commented by <strong>{authore ? `${authore.nom} ${authore.prenom}` : 'Anonymous'}</strong></p>
          <div className="bg-white p-2 rounded">{content}</div>
        </div>
        <button className="text-red-500 ml-auto" onClick={handleDeleteComment}>
  Delete
</button>
      </div>
    </div>
  );
};

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  // commentId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired, 
  onDeleteComment: PropTypes.func.isRequired, 
  authore: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    prenom: PropTypes.string.isRequired,
    authorType: PropTypes.string.isRequired,
    isAuthor: PropTypes.bool.isRequired,
  }),
  postId: PropTypes.string.isRequired,
};


// Post component
const Post = ({ postId , author = "Anonymous", content, comments = [], onDeletePost  , onDeleteComment}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState(comments); 

  const { idAuth } = useParams();

  // const handleComment = async () => {
  //   if (commentText.trim() !== '') {
  //     try {
  //       const response = await axios.post(`http://localhost:4000/forum/reply`, {
  //         forumId: postId,
  //         context: commentText,
  //         authorId: idAuth,
  //       });
  //       const newComment = response.data;
  //       setPostComments([...postComments, newComment]);
  //       setCommentText('');
  //     } catch (error) {
  //       console.error('Error posting comment:', error);
  //     }
  //   }
  // };


  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:4000/forum/deletePost`, {
        data: { forumId: postId }
      });
      onDeletePost(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  const handleComment = async () => {
    if (commentText.trim() !== '') {
      try {
        const response = await axios.post(`http://localhost:4000/forum/reply`, {
          forumId: postId,
          context: commentText,
          authorId: idAuth,
        });
        const newComment = response.data;
        // newComment.author = {
        //   nom: newComment.author.nom,
        //   prenom: newComment.author.prenom,
        // };
        newComment.commendId = response.data._id;
        setPostComments([...postComments, newComment]);
        setCommentText('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
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
              <p className="mb-3"> Posted By <strong>{author.nom}  {author.prenom}</strong></p>
              <div className="bg-white p-2 rounded">{content}</div>
              <div className="bg-white p-2 rounded">{postId} </div>
              {/* //////////////////////its here the id output */}
            </div>
            {author._id === idAuth && (
            <button className="text-red-500 ml-auto" onClick={handleDeletePost}>
              Delete
            </button>
          )}
          </div>
          <div className="flex flex-row mt-2">
            <p className="text-gray-500 mr-20 ml-7">Comments: {postComments.length}</p>
            <div className="ml-auto">
              <button className="text-blue-500 mr-40" onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Hide Comments' : 'Show Comments'}
              </button>
            </div>
          </div>
          {/* {showComments && (
            <div>
              {postComments.map((comment) => (
              console.log('commentId:', comment.commendId),
              //   <Comment 
              //   key={comment.id} 
              //   content={comment.context} 
              //   // commentId={comment.id} 
              //   commendId={comment.commendId} 
              //   authore={comment.author} 
              //   postId={postId} // Pass postId here
              //   onDeleteComment={onDeleteComment} // Pass onDeleteComment without additional parameters
              // />
                    <Comment 
        key={comment.id} 
        content={comment.context} 
        commentId={comment.commendId} 
        authore={comment.author} 
        postId={postId} 
        onDeleteComment={onDeleteComment}
      /> 
              ))} */}

{showComments && (
  <div>
    {postComments.map((comment) => (
      <Comment 
        key={comment.commendId} // Ensure key is unique
        content={comment.context} 
        commentId={comment.commendId} // Pass commendId as commentId
        authore={comment.author} 
        postId={postId} 
        onDeleteComment={onDeleteComment} 
      />
    ))}
              <div className="mb-4 flex items-center p-4 border-b">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-none outline-none"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button className="p-2 ml-2 bg-blue-500 text-white rounded" onClick={handleComment}>
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
  postId: PropTypes.string.isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    prenom: PropTypes.string.isRequired,
    authorType: PropTypes.string.isRequired,
    isAuthor: PropTypes.bool.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
};

// MessageList component
const MessageList = ({ messages }) => {
  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <div>
              <p>Context: {message.context} </p>
              <p>Author: {message.author.nom} {message.author.prenom}</p>
              <p>Date: {new Date(message.date).toLocaleString()}</p>
              {message.replies.length > 0 && (
                <div>
                  <h3>Replies:</h3>
                  <ul>
                    {message.replies.map((reply) => (
                      <li key={reply._id}>
                        <p>Context: {reply.context}</p>
                        <p>Author: {reply.author.nom.toString()} {reply.author.prenom.toString()}</p>
                        <p>Date: {new Date(reply.date).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      context: PropTypes.string.isRequired,
      author: PropTypes.shape({
        nom: PropTypes.string.isRequired,
        prenom: PropTypes.string.isRequired,
      }).isRequired,
      date: PropTypes.string.isRequired,
      replies: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          context: PropTypes.string.isRequired,
          author: PropTypes.shape({
            nom: PropTypes.string.isRequired,
            prenom: PropTypes.string.isRequired,
          }).isRequired,
          date: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

// Main App component
export const EspaceCollabPr = ( { comments = [] }   , postId, onDeleteComment ) => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [messages] = useState([]);
  const { idAuth, idmod } = useParams();

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post._id === postId) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.commendId !== commentId),
        };
      }
      return post;
    }));
  };

  // const handleDeleteComment = (postId, commentId) => {
  //   setPosts(posts.map(post => {
  //     if (post._id === postId) {
  //       return {
  //         ...post,
  //         replies: post.replies.filter(comment => comment._id !== commentId),
  //       };
  //     }
  //     return post;
  //   }));
  // };

  const handlePost = async () => {
    if (postText.trim() !== '') {
      try {
        const response = await axios.post(`http://localhost:4000/forum/${idmod}/add`, {
          context: postText,
          authorId: idAuth,
        });
        console.log(response.data);

        const newPost = response.data;

        setPosts([...posts, newPost]);
        setPostText('');
      } catch (error) {
        console.error('Error posting:', error);
      }
    }
  };

  // const handleDeleteComment = async (postId, commentId) => {
  //   try {
  //     await axios.delete(`http://localhost:4000/forum/deleteReply`, {
  //       data: { forumId: postId, replyId: commentId }
  //     });
  //     // Update state or perform any other actions after successful deletion
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       console.error('Error deleting reply: Forum not found');
  //     } else {
  //       console.error('Error deleting reply:', error.message);
  //     }
  //   }
  // };

  // const handleDeletePost = async (postId) => {
  //   try {
  //     const response = await axios.delete('http://localhost:4000/forum/deletePost', {
  //       data: { forumId: postId } // Sending forumId in the request body
  //     });
  //     console.log(response.data); // Optionally log the response data
  //     setPosts(posts.filter(post => post.id !== postId));
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:4000/forum/${idmod}/forums`);
  //       if (Array.isArray(response.data)) {
  //         setPosts(response.data.map(post => ({
  //           ...post,
  //           author: post.author,
  //           content: post.context,
  //           comments: post.replies.map(reply => ({
  //             ...reply,
  //             commendId: reply._id,
  //             author: {
  //               _id: reply.author._id,
  //               nom: reply.author.nom,
  //               prenom: reply.author.prenom,
  //               authorType: reply.author.authorType,
  //               isAuthor: reply.author.isAuthor,
  //             },
  //           })),
  //         })));
  //       } else {
  //         setPosts([]);
  //         console.error('Unexpected data format:', response.data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching forums:', error);
  //       setPosts([]);
  //     }
  //   };
  //   fetchPosts();
  // }, [idmod]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/forum/${idmod}/forums`);
        if (Array.isArray(response.data)) {
          const updatedPosts = response.data.map(post => ({
            ...post,
            author: post.author,
            content: post.context,
            comments: post.replies.map(reply => ({
              ...reply,
              commendId: reply._id,
              author: {
                _id: reply.author._id,
                nom: reply.author.nom,
                prenom: reply.author.prenom,
                authorType: reply.author.authorType,
                isAuthor: reply.author.isAuthor,
              },
            })),
          }));
  
          updatedPosts.forEach(post => {
            post.comments.forEach(comment => {
              console.log('commendId:', comment.commendId);
            });
          });
  
          setPosts(updatedPosts);
        } else {
          setPosts([]);
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching forums:', error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, [idmod]);

  return (
    <div className="flex h-screen">
      <div className="w-4/5 p-4">
        <div className="mb-4 flex items-center p-4 border-b">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-none outline-none"
            placeholder="Poser votre question ici"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <button className="p-2 ml-2 bg-blue-500 text-white rounded" onClick={handlePost}>
            Post 
          </button>
        </div>
        <MessageList messages={messages} />
        {posts.map((post) => (
          // <Post
          //   key={post._id}
          //   postId={post._id}
          //   author={post.author}
          //   content={post.content}
          //   comments={post.replies}
          //   onDeletePost={handleDeletePost}
          // />
          <Post
  key={post._id}
  postId={post._id}
  author={post.author}
  content={post.content}
  comments={post.comments}
  onDeletePost={handleDeletePost}
  onDeleteComment={(commentId) => handleDeleteComment(post._id, commentId)} // Pass the correct handler
/> // Make sure this function is defined
        ))}
        {/* {comments && Array.isArray(comments) && comments.map((comment) => (
    <Comment 
    key={comment.id} 
    content={comment.context} 
    // commentId={comment.id}
    commendId={comment.replyId}
    authore={comment.author} 
    postId={postId} 
    onDeleteComment={onDeleteComment} 
  /> 
))} */}
{comments && Array.isArray(comments) && comments.map((comment) => {
  console.log('commendId:', comment.commendId); 
  return (
    // <Comment 
    //   key={comment.id} 
    //   content={comment.context} 
    //   commendId={comment.commendId} // Pass commendId as replyId
    //   authore={comment.author} 
    //   postId={postId} 
    //   onDeleteComment={onDeleteComment} 
    // /> 
//     <Comment 
//   key={comment.id} 
//   content={comment.context} 
//   commendId={comment.commendId} 
//   authore={comment.author} 
//   postId={postId} 
//   onDeleteComment={onDeleteComment} 
// />
<Comment 
  key={comment.id} 
  content={comment.context} 
  commentId={comment.commendId} // Change commendId to commentId
  authore={comment.author} 
  postId={postId} 
  onDeleteComment={onDeleteComment} 
/>
  );
})}
      </div>
    </div>
  );
};

EspaceCollabPr.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nom: PropTypes.string.isRequired,
        prenom: PropTypes.string.isRequired,
        authorType: PropTypes.string.isRequired,
        isAuthor: PropTypes.bool.isRequired,
      }).isRequired,
    })
  ),
};

