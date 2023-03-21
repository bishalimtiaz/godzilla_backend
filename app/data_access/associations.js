const User = require('./entities/user');
const Role = require('./entities/role');
const UserRole = require('./entities/userRole');
const DefaultPortfolio = require('./entities/defaultPortfolio');
const PortfolioCategory = require('./entities/portfolioCategory');
const EndUser = require('./entities/end_user');
const Portfolio = require('./entities/portfolio');



User.hasMany(UserRole);
UserRole.belongsTo(User);

Role.hasMany(UserRole);
UserRole.belongsTo(Role);

//Each End User will have exactly one portfolio
EndUser.hasOne(Portfolio);
Portfolio.belongsTo(EndUser);
EndUser.belongsTo(PortfolioCategory, {
    foreignKey: 'selected_portfolio_category_id',
  });


//Each portfolio will have exactly one portfolio category
DefaultPortfolio.belongsTo(PortfolioCategory);


Portfolio.belongsTo(DefaultPortfolio);
DefaultPortfolio.hasMany(Portfolio);
