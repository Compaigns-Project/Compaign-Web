const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const cors = require('cors');
const sequelize = require('./config/database');
const campaignRouter = require('./Routers/campaignRouter');
const analyticsRouter = require('./Routers/analyticsRouter');
const communicationsRouter = require('./Routers/communicationsRouter');
const userRouter = require('./Routers/userRouter');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration for handling file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Initialize multer with the configured storage
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use('/campaign', upload.single('video'), campaignRouter); // Multer middleware added here
app.use('/analytics', analyticsRouter);
app.use('/communications', communicationsRouter);
app.use('/user', userRouter);

const analyticsModel = require('./Models/Analytics');
const campaignModel = require('./Models/Campaign');
const viewModel = require('./Models/View');
const userModel = require('./Models/User');
const communicationModel = require('./Models/Communication');

viewModel.belongsTo(campaignModel);
viewModel.belongsTo(userModel);
campaignModel.hasMany(viewModel);
userModel.hasMany(viewModel);
communicationModel.belongsTo(userModel);
userModel.hasMany(campaignModel, { foreignKey: 'userId' });
campaignModel.belongsToMany(userModel, {through:'userCompaign', foreignKey: 'userId' }); 




const PORT = process.env.PORT || 8000;

// { force: true }

sequelize.sync().then(result => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.log('Connection not established')
});
