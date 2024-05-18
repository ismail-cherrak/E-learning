const mongoose = require('mongoose');
const Forum = require('../models/forumSchema');
const Etudiant = require('../models/etudiantSchema');
const Enseignant = require('../models/enseignantSchema');
const Admin = require('../models/adminSchema');
const Authentication = require('../models/AuthenticationSchema'); // Assuming 'authentication' model is exported from '../models/authentication'

async function getAllForums(req, res) {
    try {
        // Extract the module ID from request parameters
        const moduleId = req.params.moduleId;
        // Extract the user ID from the request body
        const userId = req.body.userId;

        // Retrieve all forums related to the specified module from the database
        const forums = await Forum.find({ module: moduleId })
            .populate('author')
            .populate({
                path: 'replies',
                populate: { path: 'author' }
            });

        // If there are no forums for the specified module, return an empty array
        if (!forums || forums.length === 0) {
            return res.status(200).json([]);
        }

        // Iterate through forums and enrich data with user info
        const enrichedForums = await Promise.all(forums.map(async (forum) => {
            // Enrich main forum author's info
            let userInfo = await enrichUserInfo(forum.author);

            // Enrich replies with user info
            const enrichedReplies = await Promise.all(forum.replies.map(async (reply) => {
                const replyUserInfo = await enrichUserInfo(reply.author);
                return {
                    _id: reply._id,
                    context: reply.context,
                    author: {
                        _id: reply.author._id,
                        nom: replyUserInfo ? replyUserInfo.nom : null,
                        prenom: replyUserInfo ? replyUserInfo.prenom : null,
                        authorType: reply.author.type,
                        isAuthor: reply.author._id.equals(userId)
                    },
                    module: reply.module,
                    date: reply.date
                };
            }));

            return {
                _id: forum._id,
                context: forum.context,
                author: {
                    _id: forum.author._id,
                    nom: userInfo ? userInfo.nom : null,
                    prenom: userInfo ? userInfo.prenom : null,
                    authorType: forum.author.type,
                    isAuthor: forum.author._id.equals(userId)
                },
                replies: enrichedReplies,
                module: forum.module,
                date: forum.date
            };
        }));

        // Return the enriched forums
        return res.status(200).json(enrichedForums);
    } catch (error) {
        // If an error occurs, return an error response
        console.error('Error fetching forums:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Helper function to enrich user info
async function enrichUserInfo(author) {
    if (!author) return null;

    let userInfo = null;
    const authorType = author.type.toLowerCase();

    switch (authorType) {
        case 'etudiant':
            userInfo = await Etudiant.findOne({ user_id: author._id });
            break;
        case 'enseignant':
            userInfo = await Enseignant.findOne({ user_id: author._id });
            break;
        case 'admin':
            userInfo = await Admin.findOne({ user_id: author._id });
            break;
    }

    return userInfo;
}





async function addPost(req, res) {
  try {
      // Extract required data from the request body
      const { context, authorId } = req.body;
      // Extract the module ID from request parameters
      const moduleId = req.params.moduleId;

      // Fetch the authType from the Auth schema using the authorId
      const author = await Authentication.findById(authorId);
      if (!author) {
          return res.status(404).json({ error: 'Author not found' });
      }

      // Create a new forum instance
      const newForum = new Forum({
          context: context,
          author: authorId,
          module: moduleId,
          authType: author.type // Assuming you want to include the authType in the Forum model
      });

      // Save the new forum to the database
      const savedForum = await newForum.save();

      // Return the newly created forum as a JSON response
      return res.status(201).json(savedForum);
  } catch (error) {
      // If an error occurs, return an error response
      console.error('Error adding forum:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function addReply(req, res) {
    try {
        const { forumId, context, authorId } = req.body;

        // Find the original forum post
        const originalForum = await Forum.findById(forumId);
        if (!originalForum) {
            return res.status(404).json({ error: 'Forum not found' });
        }

        // Create a new reply forum document
        const newReply = new Forum({
            context,
            author: authorId,
        });

        // Save the new reply forum document
        const savedReply = await newReply.save();

        // Add the reply to the original forum's replies array
        originalForum.replies.push(savedReply._id);
        await originalForum.save();

        return res.status(201).json(savedReply);
    } catch (error) {
        console.error('Error adding reply:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};





async function deleteReply(req, res) {
    try {
        const { forumId, replyId } = req.body;

        // Find the forum post that contains the reply
        const forum = await Forum.findById(forumId);
        if (!forum) {
            return res.status(404).json({ error: 'Forum not found' });
        }

        // Check if the reply exists in the forum's replies array
        const replyIndex = forum.replies.indexOf(replyId);
        if (replyIndex === -1) {
            return res.status(404).json({ error: 'Reply not found in forum' });
        }

        // Remove the reply from the replies array
        forum.replies.splice(replyIndex, 1);
        await forum.save();

        // Delete the reply document from the forum collection
        await Forum.findByIdAndDelete(replyId);

        return res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
        console.error('Error deleting reply:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



async function deletePost(req, res) {
    try {
        const { forumId } = req.body;

        // Find the forum post
        const forum = await Forum.findById(forumId);
        if (!forum) {
            return res.status(404).json({ error: 'Forum not found' });
        }

        // Delete all replies associated with the forum post
        await Forum.deleteMany({ _id: { $in: forum.replies } });

        // Delete the forum post itself
        await Forum.findByIdAndDelete(forumId);

        return res.status(200).json({ message: 'Forum post and its replies deleted successfully' });
    } catch (error) {
        console.error('Error deleting forum post:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    addPost,
    getAllForums,
    addReply,
    deleteReply,
    deletePost
};
