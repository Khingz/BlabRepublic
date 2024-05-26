const img = ('../uploads/users/server/uploads/users/1713100628747-Screenshot (15).jpg');

// Format user data returned
const formatUser = (user) => {
    // user_copy = { ...user };
    data = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      img: user.img,
      role: user.role,
      createdAt: user.createdAt,
      email: user.email
    }
    return data;
}

module.exports = { formatUser }