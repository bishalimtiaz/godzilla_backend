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










User.hasMany(UserRole);
UserRole.belongsTo(User, { foreignKey: 'user_id' });

Role.hasMany(UserRole);
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

EndUser.hasMany(UserSkills);
UserSkills.belongsTo(EndUser, { foreignKey: 'end_user_id' });

Skills.hasMany(UserSkills);
UserSkills.belongsTo(Skills, { foreignKey: 'skills_id' });

//End User has many Experiences
EndUser.hasMany(UserExperiences);
UserExperiences.belongsTo(EndUser, { foreignKey: 'end_user_id' });

Experience.hasMany(UserExperiences);
UserExperiences.belongsTo(Experience, { foreignKey: 'experience_id' });

//End User has many Educations

EndUser.hasMany(UserEducations);
UserEducations.belongsTo(EndUser, { foreignKey: 'end_user_id' });

Education.hasMany(UserEducations);
UserEducations.belongsTo(Education, { foreignKey: 'education_id' });


//User Has many social networks

EndUser.hasMany(UserSocialNetworks);
UserSocialNetworks.belongsTo(EndUser, { foreignKey: 'end_user_id' });

SocialNetwork.hasMany(UserSocialNetworks);
UserSocialNetworks.belongsTo(SocialNetwork, { foreignKey: 'social_network_id' });

// Each End User will have exactly one card
EndUser.hasOne(Card);
Card.belongsTo(EndUser);
