
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCommenting } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import NavBar from './navbar';

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
        window.href.reload()
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
    <div className="rounded-md p-2  mt-2">
      <div className="flex items-start">
        <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full mr-4">
          {/* <FontAwesomeIcon icon={faCheck} className="text-white" /> */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
</svg>









        </div>
        <div>
          <p className="mb-1"> Commented by <strong>{authore ? `${authore.nom} ${authore.prenom}` : 'Anonymous'}</strong></p>
          <div className="bg-white p-2 rounded">{content}</div>
        </div>
        <button className="text-red-500 ml-auto" onClick={handleDeleteComment}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
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
      window.href.reload()
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
    <div className="bg-white flex-grow shadow-md rounded-md p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-1">
          <div className="flex items-start">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full mr-3">
              <FontAwesomeIcon icon={faCommenting} className="text-white" />
            </div>
            <div>
              <p className="mb-3"> Posted By <strong>{author.nom}  {author.prenom}</strong></p>
              <div className="bg-white p-2 rounded">{content}</div>
              {/* //////////////////////its here the id output */}
            </div>
            {author._id === idAuth && (
            <button className="text-red-500 ml-auto" onClick={handleDeletePost}>
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
</svg> */}

{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg> */}

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>






            </button>
          )}
          </div>
          <div className="flex flex-row mt-2">

            <p className="text-gray-500 mr-20 ml-3  flex">
              <div className='mr-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
</svg>
</div>
 : {postComments.length} </p>
            <div className="ml-auto">
              <button className="text-blue-500 mr-10" onClick={() => setShowComments(!showComments)}>
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
                  className="flex-1 p-4 border rounded-lg border-gray-400 outline-none"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button className="p-2 ml-2 flex bg-blue-600 text-white rounded-lg" onClick={handleComment}>
                  <div className='mr-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
</div>
                  Reply
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
      window.href.reload()
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
    <div className=' w-5/5 ml-10 '>
      <NavBar/>
    <div className=" min-h-screen  bg-gray-100 flex flex-col ">
      <div className="w-5/5 p-4 ">
        <div className='ml-4'>
      <p className='mr-2 mt-2 text-bold text-blue-900 text-3xl'> Welcome back  !</p>
      <h1 className='text-l text-gray-700 mt-2' > what's up with you ? would u like to share something with community? </h1>
      </div>
        <div className="mb-4 flex items-center p-4 border-b">
          <input
            type="text"
            className="flex-1 p-5 ml-3 border border-gray-300 outline-none rounded-lg"
            placeholder=" create your post"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            style={{
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px',
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              borderRight: 'none',
              position: 'relative',
              flex: '3'
            }}
          />
          <button className="py-2 ml-3 bg-blue-600 rounded-lg text-bold px-3 text-white " onClick={handlePost}>
            <div className='flex flex-row'>
              <div className='mr-2'>
Publish
</div>  
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
</svg> 
            </div>
          </button>
        </div>
        <MessageList messages={messages} />
        {posts.map((post) => (
          <Post
  key={post._id}
  postId={post._id}
  author={post.author}
  content={post.content}
  comments={post.comments}
  onDeletePost={handleDeletePost}
  onDeleteComment={(commentId) => handleDeleteComment(post._id, commentId)} 
/> // Make sure this function is defined
        ))}
{comments && Array.isArray(comments) && comments.map((comment) => {
  console.log('commendId:', comment.commendId); 
  return (
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
