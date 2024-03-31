// app.js
const express = require('express');
const app = express();
const cors = require('cors')
const sequelize = require('./config/database');
const campaignRouter = require('./Routers/campaignRouter');
const analyticsRouter = require('./Routers/analyticsRouter');
const communicationsRouter = require('./Routers/communicationsRouter');

app.use(express.json());
app.use(cors());
app.use('/api/campaign', campaignRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/communications', communicationsRouter);

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
// {force:true}
sequelize.sync().then(result=>{
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err=>{
    console.log('Connection not established')
})

