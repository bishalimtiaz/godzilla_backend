class Role {
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
    }
  }

class RoleResponse{
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}
  
module.exports = {Role, RoleResponse};
  