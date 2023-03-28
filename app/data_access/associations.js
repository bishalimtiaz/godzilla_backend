const User = require('./entities/user');
const Role = require('./entities/role');
const UserRole = require('./entities/userRole');
const EndUser = require('./entities/endUser');
const Card = require('./entities/card');
const Settings = require('./entities/settings');
const Background = require('./entities/background');
const Foreground = require('./entities/foreground');
const Skills = require('./entities/skills');
const Category = require('./entities/category');
const UserSkills = require('./entities/userSkills');
const Introduction = require('./entities/introduction');
const UserExperiences = require('./entities/userExperiences');
const Experience = require('./entities/experience');
const UserEducations = require('./entities/userEducations');
const Education = require('./entities/education');
const UserSocialNetworks = require('./entities/userSocialNetworks');
const SocialNetwork = require('./entities/socialNetwork');










User.hasMany(UserRole, { foreignKey: 'user_id' });
UserRole.belongsTo(User, { foreignKey: 'user_id' });

Role.hasMany(UserRole, { foreignKey: 'role_id' });
UserRole.belongsTo(Role, { foreignKey: 'role_id' });


///Settings Associations
Settings.belongsTo(Background, { foreignKey: 'background_id' });
Settings.belongsTo(Foreground, { foreignKey: 'foreground_id' });

///End User has one settings.
EndUser.belongsTo(Settings, { foreignKey: 'settings_id' });

//End User jas one introduction
EndUser.belongsTo(Introduction, { foreignKey: 'introduction_id' })


//Skills and Category Associatons
Skills.belongsTo(Category, { foreignKey: 'category_id' });

//End User has many skills

EndUser.hasMany(UserSkills, { foreignKey: 'end_user_id' });
UserSkills.belongsTo(EndUser, { foreignKey: 'end_user_id' });

Skills.hasMany(UserSkills, { foreignKey: 'skills_id' });
UserSkills.belongsTo(Skills, { foreignKey: 'skills_id' });

//End User has many Experiences
EndUser.hasMany(UserExperiences, { foreignKey: 'end_user_id' });
UserExperiences.belongsTo(EndUser, { foreignKey: 'end_user_id' });

Experience.hasMany(UserExperiences, { foreignKey: 'experience_id' });
UserExperiences.belongsTo(Experience, { foreignKey: 'experience_id' });

//End User has many Educations

EndUser.hasMany(UserEducations, { foreignKey: 'end_user_id' });
UserEducations.belongsTo(EndUser, { foreignKey: 'end_user_id' });

Education.hasMany(UserEducations, { foreignKey: 'education_id' });
UserEducations.belongsTo(Education, { foreignKey: 'education_id' });


//User Has many social networks

EndUser.hasMany(UserSocialNetworks, { foreignKey: 'end_user_id' });
UserSocialNetworks.belongsTo(EndUser, { foreignKey: 'end_user_id' });

SocialNetwork.hasMany(UserSocialNetworks, { foreignKey: 'social_network_id' });
UserSocialNetworks.belongsTo(SocialNetwork, { foreignKey: 'social_network_id' });

// Each End User will have exactly one card
EndUser.hasOne(Card, { foreignKey: 'card_id' });
Card.belongsTo(EndUser, { foreignKey: 'card_id' });
