// controllers/userController.js

const  User  = require('../Models/User'); // Assuming your User model is defined in a file called models.js

exports.deleteUser = async (req, res) => {
  const { userId } = req.body; // Assuming the user ID is passed in the request body
  
  try {
    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await user.destroy();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateUserById = async (req, res) => {
  try {
    // Extract user ID from the request parameters

    // Extract updated data from the request body
    const {userId,  userName, userEmail, location, Type, password } = req.body;

    // Find the user by ID in the database
    const user = await User.findByPk(userId);

    // If user with given ID doesn't exist, return error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user data
    user.userName = userName;
    user.userEmail = userEmail;
    user.location = location;
    user.Type = Type;
    user.password = password;

    // Save the updated user data
    await user.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
};


exports.postCreateUser = async (req, res) => {
  try {
      // Extract data from the request body
      const { userName, userEmail, location, Type, password } = req.body;

      // Create a new user in the database
      const newUser = await User.create({
          userName,
          userEmail,
          location,
          Type,
          password
      });

      // Respond with the newly created user
      res.status(201).json({
          success: true,
          message: 'User created successfully',
          user: newUser
      });
  } catch (error) {
      // If an error occurs, respond with an error message
      console.error('Error creating user:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to create user',
          error: error.message
      });
  }
};


exports.postUserLogin = async (req, res) => {
  try {
    // Extract username and password from the request body
    const { userName, password } = req.body;

    // Find the user by username and password in the database
    const user = await User.findOne({ where: { userName, password, Type: 'admin' } });

    // If user not found or password incorrect, return error
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // User found, return user data
    return res.status(200).json({ success: true, user });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error logging in user:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};