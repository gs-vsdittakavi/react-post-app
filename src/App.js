import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // const [showRegister, setShowRegister] = useState(true);
  // const [showLogin, setShowLogin] = useState(false);
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [token, setToken] = useState('');
  // const [posts, setPosts] = useState([]);
  // const [newPost, setNewPost] = useState('');
  // const [editPost, setEditPost] = useState('');
  // const [editPostId, setEditPostId] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [editPost, setEditPost] = useState('');
  const [editPostId, setEditPostId] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);


  useEffect(() => {
    // getPosts();
  }, [token]);

  // const handleRegister = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:3001/user/register', {
  //       name,
  //       email,
  //       password,
  //     });

  //     console.log('Registration successful');
  //     console.log('Response:', response.data);
  //   } catch (error) {
  //     console.error('Registration failed');
  //     console.error('Error:', error.response.data);
  //   }
  // };
  const handleRegister = async (event) => {
    event.preventDefault();

    // try {
    //   const response = await axios.post('http://localhost:3001/user/register', {
    //     name,
    //     email,
    //     password,
    //   });

    //   console.log('Registration successful');
    //   console.log('Response:', response.data);

    //   setShowRegister(false); // Hide registration form
    //   setShowLogin(true); // Show login form
    // } catch (error) {
    //   console.error('Registration failed');
    //   console.error('Error:', error.response.data);
    // }

    try {
      const response = await axios.post('http://localhost:3001/user/register', {name, email, password});

      console.log("Registration Successful");
      console.log('Response:', response.data);
      setShowRegister(false);
      setShowLogin(true);

    } catch(error) {
      console.error('Registration failed');
      console.error('Error:', error.response.data);

    }
  };
  

  // const handleLogin = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:3001/user/login', {
  //       email,
  //       password,
  //     });

  //     const token = response.data.token;
  //     setToken(token);
  //     localStorage.setItem('token', token);
  //     console.log('Login successful');
  //   } catch (error) {
  //     console.error('Login failed');
  //     console.error('Error:', error.response.data);
  //   }
  // };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        email,
        password,
      });

      const token = response.data.token;
      setToken(token);
      sessionStorage.setItem('token', token);
      setShowCreatePost(false); // Set showCreatePost to true
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed');
      console.error('Error:', error.response.data);
    }
  };

  const getPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/post/getPosts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data.data);
      console.log(response.data.data);
      // console.log(this.posts.length);
    } catch (error) {
      console.error('Failed to fetch posts');
      console.error('Error:', error.response.data);
    }
  };

  const handleCreatePost = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/post/createPost',
        {
          title: newPost.title,
          content: newPost.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Post created');
      console.log('Response:', response.data);
      setNewPost('');
      getPosts();
    } catch (error) {
      console.error('Failed to create post');
      console.error('Error:', error.response.data);
    }
  };

  const editPostById = async (postId) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/post/updatePost/${postId}`,
        {
          title: editPost.title,
          content: editPost.content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Post edited');
      console.log('Response:', response.data);
      setEditPost('');
      setEditPostId('');
      getPosts();
    } catch (error) {
      console.error('Failed to edit post');
      console.error('Error:', error.response.data);
    }
  };

  const deletePostById = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/post/deletePost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Post deleted');
      console.log('Response:', response.data);
      getPosts();
    } catch (error) {
      console.error('Failed to delete post');
      console.error('Error:', error.response.data);
    }
  };
  console.log(process.env)
  return (
    <div className="App">
      {showRegister && (
        <div className="container">
          <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
            <label>
                Name:
                <input className="input-field" type="name" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                Email:
                <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <br />
              <label>
                Password:
                <input
                  className="input-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
              <button className="button" type="submit">Register</button>
            </form>
            <p>Already have an account? <button className="button" onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}>Login</button></p>
          </div>
        </div>
      )}

      {!token && showLogin && (
        <div className="container">
          <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <label>
                Email:
                <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <br />
              <label>
                Password:
                <input
                  className="input-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
              <button className="button" type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {/* {token && (
        <div className="container">
          <div className="form-container">
            <h2>Create Post</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreatePost();
            }}>
              <label>
                Content:
                <input className="input-field" type="text" value={newPost} onChange={(e) => setNewPost(e.target.value)} />
              </label>
              <br />
              <button className="button" type="submit">Create Post</button>
            </form>
          </div>
        </div>
      )} */}

      {/* {token && (
        <div className="container">
          <div className="form-container">
            <h2>Edit Post</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              editPostById(editPostId);
            }}>
              <label>
                Post ID:
                <input
                  className="input-field"
                  type="text"
                  value={editPostId}
                  onChange={(e) => setEditPostId(e.target.value)}
                />
              </label>
              <br />
              <label>
                Content:
                <input className="input-field" type="text" value={editPost} onChange={(e) => setEditPost(e.target.value)} />
              </label>
              <br />
              <button className="button" type="submit">Edit Post</button>
            </form>
          </div>
        </div>
      )} */}

      {token && showCreatePost && (
        <div className="container">
          <div className="form-container">
            <h2>Create Post</h2>
            <form onSubmit={handleCreatePost}>
              <label>
                Title:
                <input
                  className="input-field"
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
              </label>
              <br />
              <label>
                Content:
                <input
                  className="input-field"
                  type="text"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
              </label>
              <br />
              <button className="button" type="submit">Create Post</button>
            </form>
          </div>
        </div>
      )}

      
      {token && !showCreatePost  && posts && posts.length === 0 && (
      <div className="container">
        <h2>No posts found</h2>
      </div>
    )}

      {token && !showCreatePost && posts && posts.length > 0 && (
        <div className="posts-container">
          <h2>Posts</h2>
          {posts.map((post) => (
            <div key={post._id} className="post">
              <h3>{post.title}</h3>
              <p className="post-content">{post.content}</p>
              <div className="post-buttons">
                <button className="post-button" onClick={() => deletePostById(post._id)}>Delete</button>
                <button className="post-button" onClick={() => {
                  setEditPost(post.content);
                  setEditPostId(post.id);
                  editPostById(post.id);
                }}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}

export default App;
