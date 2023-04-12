const { sequelize,connect, disconnect } = require('../config/database');
require('./associations');

const User = require('./entities/user');
const Role = require('./entities/role');
const UserRole = require('./entities/userRole');
const EndUser = require('./entities/endUser');
const Card = require('./entities/card');
const Background = require('./entities/background');
const Category = require('./entities/category');
const Education = require('./entities/education');
const Experience = require('./entities/experience');
const Foreground = require('./entities/foreground');
const Introduction = require('./entities/introduction');
const Settings = require('./entities/settings');
const Skills = require('./entities/skills');
const SocialNetwork = require('./entities/socialNetwork');
const UserEducations = require('./entities/userEducations');
const UserExperiences = require('./entities/userExperiences');
const UserSkills = require('./entities/userSkills');
const UserSocialNetworks = require('./entities/userSocialNetworks');
const PublicProfile = require('./entities/publicProfile');








const db = {
  User,
  Role,
  UserRole,
  EndUser,
  Card,
  Background,
  Category,
  Education,
  Experience,
  Foreground,
  Introduction,
  Settings,
  Skills,
  SocialNetwork,
  UserEducations,
  UserExperiences,
  UserSkills,
  UserSocialNetworks,
  PublicProfile,
  sequelize,
  connect,
  disconnect
};

module.exports = db;