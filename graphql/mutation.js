const { AuthenticationError, ApolloError } = require("apollo-server");
const { GraphQLString, GraphQLID } = require("graphql");
const { User, Post, Comment } = require("../models");
const { auth } = require("../utils");
const { postType, commentType } = require("./types");

const register = {
  type: GraphQLString,
  description: "register a new user and return a token",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_, { username, email, password, role }) {
    try {
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        throw new Error("user email already exists");
      }
      const saveUser = new User({
        username,
        email,
        password,
        role
      });
      const user = await saveUser.save();
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      const token = auth.createJWTToken(payload);
      return token;
    } catch (error) {
      throw new AuthenticationError("Something went wrong", "BAD_INPUT", {
        status: 400,
        error: true
      });
    }
  }
};

const login = {
  type: GraphQLString,
  description: "login user and return token",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_, { email, password }) {
    try {
      const user = await User.findOne({ email: email }).select("+password");
      if (!user) return null;

      const isValidPassword = await user.isValidPassword(
        password,
        user.password
      );

      if (!isValidPassword) {
        throw new Error("Incorrect email or password!");
      }
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      const token = auth.createJWTToken(payload);
      return token;
    } catch (error) {
      throw new AuthenticationError("Something went wrong", "BAD_INPUT", {
        status: 400,
        error: true
      });
    }
  }
};

const createPost = {
  type: postType,
  description: "Create a new Post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  },
  resolve: async (_, { title, body }, { user }) => {
    try {
      const newPost = new Post({
        title,
        body,
        authorId: user.id
      });
      const post = await newPost.save();
      return post;
    } catch (error) {
      throw new ApolloError("Something went wrong", "BAD_INPUT", {
        status: 400,
        error: true
      });
    }
  }
};

const updatePost = {
  type: postType,
  description: "update a Post",
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  },
  resolve: async (_, { id, title, body }, { user }) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        { _id: id, authorId: user.id },
        { title, body },
        { new: true, runValidators: true }
      );
      if (!updatedPost) throw new Error("No post with the given ID");
      return updatedPost;
    } catch (error) {
      throw new ApolloError("Something went wrong", "BAD_INPUT", {
        status: 400,
        error: true
      });
    }
  }
};

const deletePost = {
  type: postType,
  description: "delete by Id a Post",
  args: {
    id: { type: GraphQLID }
  },
  resolve: async (_, { id }, { user }) => {
    try {
      const post = await Post.findById({ _id: id });

      if (post) {
        await post.remove();
        return post;
      } else {
        throw new Error("post id not found");
      }
    } catch (error) {
      throw error;
    }
  }
};

const addComment = {
  type: commentType,
  description: "Create a new Comment",
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLID }
  },
  resolve: async (_, { postId, comment }, { user }) => {
    try {
      const newComment = new Comment({
        postId,
        comment,
        userId: user.id
      });
      return await newComment.save();
    } catch (error) {
      throw error;
    }
  }
};

const updateComment = {
  type: commentType,
  description: "update a Comment",
  args: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString }
  },
  resolve: async (_, { id, comment }, { user }) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        { _id: id, userId: user.id },
        { comment },
        { new: true, runValidators: true }
      );
      if (!updatedComment) throw new Error("No comment with the given ID");
      return updatedComment;
    } catch (error) {
      throw new ApolloError("Something went wrong", "BAD_INPUT", {
        status: 400,
        error: true
      });
    }
  }
};
const deleteComment = {
  type: commentType,
  description: "delete by Id a comment",
  args: {
    id: { type: GraphQLID }
  },
  resolve: async (_, { id }) => {
    try {
      const comment = await Comment.findById({ _id: id });

      if (comment) {
        await comment.remove();
        return comment;
      } else {
        throw new Error("comment id not found");
      }
    } catch (error) {
      throw error;
    }
  }
};

module.exports = {
  register,
  login,
  createPost,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment
};
