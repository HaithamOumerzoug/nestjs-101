import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './services';
import { UserUpdateDto } from './dtos';


describe("UserController Unit Tests", () => {
  let userController: UserController;
  let userService: UserService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        getUser       : jest.fn(() => []),
        editUser      : jest.fn(() => []),
        deleteUser    : jest.fn(() => []),
        getCurrentUser: jest.fn(() => []),
        updateUser    : jest.fn(() => []),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService , ApiServiceProvider],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  })

  it("calling getUser method", () => {
    const userId : number = 1;
    userController.getUser(userId);
    expect(userService.getCurrentUser).toHaveBeenCalled();
    expect(userService.getCurrentUser).toHaveBeenCalledWith(userId);
  })

  it("calling editUser method", () => {
    const userId : number = 1;
    const userUpdateDto = new UserUpdateDto();
    userController.editUser(userId,userUpdateDto);
    expect(userService.updateUser).toHaveBeenCalled();
    expect(userService.updateUser).toHaveBeenCalledWith(userId,userUpdateDto);
  })

  it("calling deleteUser method", () => {
    const userId : number = 1;
    userController.deleteUser(userId);
    expect(userService.deleteUser).toHaveBeenCalled();
    expect(userService.deleteUser).toHaveBeenCalledWith(userId);
  })
});