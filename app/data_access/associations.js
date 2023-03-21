const User = require('./entities/user');
const Role = require('./entities/role');
const UserRole = require('./entities/userRole');
const DefaultPortfolio = require('./entities/defaultPortfolio');
const PortfolioCategory = require('./entities/portfolioCategory');
const EndUser = require('./entities/endUser');
const Portfolio = require('./entities/portfolio');
const Card = require('./entities/card');



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

// Each End User will have exactly one card
EndUser.hasOne(Card);
Card.belongsTo(EndUser);


//Each portfolio will have exactly one portfolio category
DefaultPortfolio.belongsTo(PortfolioCategory);


Portfolio.belongsTo(DefaultPortfolio);
DefaultPortfolio.hasMany(Portfolio);
