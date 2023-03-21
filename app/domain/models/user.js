class User {
  constructor(id, userName, email, password, isActive) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
    this.roles = [];
  }
}

class UserRequest {
  constructor(userName, email, password, roleIds) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.roleIds = roleIds;
  }
}

class UserResponse {
  constructor(id, userName, email, isActive, roles) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.isActive = isActive;
    this.roles = roles;
  }
}

class UserUpdateRequest {
  constructor({ name, email, password }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}


module.exports = {User, UserRequest, UserResponse, UserUpdateRequest};