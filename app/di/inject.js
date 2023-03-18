import { Container } from 'inversify';
import { RoleRepository } from '../domain/repository/roleRepository';
import { UserRepository } from '../domain/repository/userRepository';
import { RoleRepositoryImpl } from '../data_access/repository_impl/RoleRepositoryImpl';
import { UserRepositoryImpl } from '../data_access/repository_impl/UserRepositoryImpl';
import { RoleService } from '../domain/services/roleService';
import { UserService } from '../domain/services/userService';
import { RoleController } from '../api/controllers/roleController';
import { UserController } from '../api/controllers/userController';


import { TYPES } from './types';

const container = new Container();

// Bind repositories
container.bind<RoleRepository>(TYPES.RoleRepository).to(RoleRepositoryImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);

// Bind services
container.bind<RoleService>(TYPES.RoleService).to(RoleService);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<AuthService>(TYPES.UserService).to(AuthService);



//Bind Controller
container.bind<RoleController>(TYPES.RoleController).to(RoleController);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);




export { container };
