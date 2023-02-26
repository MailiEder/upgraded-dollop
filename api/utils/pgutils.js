const pool = require("./get-client");

function insertUser(user){
  
  return new Promise((resolve, reject) => {
  
    console.log(user.username)
    const query = 'INSERT INTO users (username, email, password, profilepic) values($1, $2, $3, $4)  RETURNING *';
    pool.query(query, [user.username, user.email, user.password, user.profilepic], (error, results) => {
      if (error) {
        reject(error);
      } else {
      resolve(results.rows[0]);
      }
    });

  })

}

function getOneUserbyUsername(username) {
  return new Promise((resolve, reject) => {	   
   const query = 'SELECT userid, username, email, password, profilepic FROM users WHERE username = $1';
   pool.query(query, [username], (error, results) => {
     if (error) {
     reject(error);
     } else {
     resolve(results.rows[0]);
     }		
     });
  }); 
 }

 function renewUserbyId(user) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET username = $1, email = $2, password = $3, profilepic = $4 WHERE userid = $5 RETURNING *';
    pool.query(query, [user.username, user.email, user.password, user.profilepic, user.userid], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows[0]);
      }
    });
  });	
}

function removeUser(id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM users WHERE userid = $1';
    pool.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });	
}

function getOneUserId(id) {
  return new Promise((resolve, reject) => {	   
   const query = 'SELECT userid, username, email, password, profilepic FROM users WHERE userid = $1';
   pool.query(query, [id], (error, results) => {
     if (error) {
     reject(error);
     } else {
     
     resolve(results.rows[0]);
     
     }		
     });
  }); 
 }

function removePosts(username) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM posts WHERE username = $1';
    pool.query(query, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });	
}


function insertPost(post) {
  
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO posts (title, description, photo, username) values($1, $2, $3, $4) RETURNING *';
    pool.query(query, [post.title, post.description, post.photo, post.username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows[0]);
      }
    });
  });	
}

function getOnePost(id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT postid, title, description, photo, username, timestamps FROM posts WHERE postid = $1 ORDER BY postid';   
    pool.query(query, [id], (error, results) => {
     if (error) {
     reject(error);
     } else {
     resolve(results.rows[0]);
     }
     });
  }); 
 }

 function renewPost(post) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE posts SET title = $1, description = $2 WHERE postid = $3 RETURNING *';
    pool.query(query, [post.title, post.description, post.id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows[0]);
      }
    });
  });	
}

function removePost(id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM posts WHERE postid = $1';
    pool.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });	
}


function readPosts() {
  return new Promise((resolve, reject) => {
  // const query = 'SELECT postid, title, description, photo, username, timestamps FROM posts ORDER BY postid';
    const query = 'SELECT posts.postid, posts.title, posts.description, posts.photo, posts.username, posts.timestamps, array_agg(categories.name ORDER BY categories.name) as name FROM posts LEFT JOIN post_has_categories ON post_has_categories.postid = posts.postid LEFT JOIN categories ON categories.categoryid = post_has_categories.categoryid GROUP BY posts.postid ORDER BY posts.postid DESC'; 
  // const query = 'SELECT posts.postid, posts.title, posts.description, posts.photo, posts.username, posts.timestamps, categories.name FROM posts LEFT JOIN post_has_categories ON post_has_categories.postid = posts.postid LEFT JOIN categories ON categories.categoryid = post_has_categories.categoryid ORDER BY posts.postid';
  pool.query(query, (error, results) => {
     if (error) {
     reject(error);
     } else {
     resolve(results.rows);
     }
   });
   });
 }

function readPostsByUser(username) {
  return new Promise((resolve, reject) => { 
  // const query = 'SELECT postid, title, description, username FROM posts WHERE username = $1 ORDER BY postid';
  const query = 'SELECT posts.postid, posts.title, posts.description, posts.photo, posts.username, posts.timestamps, array_agg(categories.name ORDER BY categories.name) as name FROM posts LEFT JOIN post_has_categories ON post_has_categories.postid = posts.postid LEFT JOIN categories ON categories.categoryid = post_has_categories.categoryid  WHERE posts.username = $1 GROUP BY posts.postid ORDER BY posts.postid DESC'; 
  pool.query(query, [username], (error, results) => {
     if (error) {
     reject(error);
     } else {
     resolve(results.rows);
     }
   });
   });
 }

 function readPostsByCategory(category) {
  return new Promise((resolve, reject) => {
 // const query = 'SELECT postid, title, description, username FROM posts WHERE username = $1 ORDER BY postid';
 const query = 'SELECT posts.postid, posts.title, posts.description, posts.photo, posts.username, posts.timestamps, array_agg(categories.name ORDER BY categories.name) as name FROM posts LEFT JOIN post_has_categories ON post_has_categories.postid = posts.postid LEFT JOIN categories ON categories.categoryid = post_has_categories.categoryid  WHERE categories.name = $1 GROUP BY posts.postid ORDER BY posts.postid DESC'; 
 pool.query(query, [category], (error, results) => {
     if (error) {
     reject(error);
     } else {
     resolve(results.rows);
     }
   });
   });
 }

 function insertCategory(category) {
  return new Promise((resolve, reject) => {
  
  const query = 'INSERT INTO categories (name) values($1) RETURNING *';
	pool.query(query, [category.name], (error, results) => {
	  if (error) {
	    reject(error);
	  } else {
    
		resolve(results.rows[0]);
	  }
	});
  });	
}

function readAllCategories() {
  return new Promise((resolve, reject) => {
   const query = 'SELECT categoryid, name FROM categories ORDER BY categoryid';  
   pool.query(query, (error, results) => {
     if (error) {
     reject(error);
     } else {
     resolve(results.rows);
     }	
   });
   });
 }


  module.exports = {

  saveUser(user) {
        return insertUser(user);  
      },

  getUserbyUsername(username) {
        return getOneUserbyUsername(username);  
      },
      
  updateUserbyId(user) {
        return renewUserbyId(user);  
     },
     
  deleteUser(id) {
      return removeUser(id);  
    },
    
  getUserbyId(id) {
      return getOneUserId(id);  
    },

  deletePosts(username) {
      return removePosts(username);  
    },
    
  savePost(post) {
      return insertPost(post);  
  },
  
  getPost(id) {
    return getOnePost(id);
    },

  updatePost(post) {
      return renewPost(post);  
   },
   
   deletePost(id) {
    return removePost(id);  
  },

  getAll() {
    return readPosts();  
  },

  getAllByUser(username) {
    return readPostsByUser(username);  
  },

  getAllByCategory(category) {
    return readPostsByCategory(category);  
  },

  saveCategory(category) {
    return insertCategory(category);  
  },

  getAllCategories() {
    return readAllCategories();  
  }

  };