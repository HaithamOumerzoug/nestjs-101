import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AuthDto } from '../../auth';
import { UserUpdateDto } from '../dtos';



class ApiServiceMock {
  getCurrentUser(userId : number){
    return null;
  }
  findUserByEmail(email : string){
    return null;
  }
  getUserById(userId : number){
    return null;
  }
  createUser(dto : AuthDto){
    return null;
  }
  updateUser(userId : number , userUpdateDto : UserUpdateDto){
    return null;
  }
  deleteUser(userId : number){
    return null;
  }
}
describe.only("UserService Unit Tests", () => {

  let userService: UserService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, ApiServiceProvider
      ],
    }).compile();
    userService = module.get<UserService>(UserService);
  })

  it('should call getCurrentUser method', async () => {
    const getCurrentUserSpy = jest.spyOn(userService, 'getCurrentUser');
    const userId = 1;
    userService.getCurrentUser(userId);
    expect(getCurrentUserSpy).toHaveBeenCalled();
    expect(getCurrentUserSpy).toHaveBeenCalledWith(userId);
  });
  
  it('should call findUserByEmail method', async () => {
    const findUserByEmailSpy = jest.spyOn(userService, 'findUserByEmail');
    const email = 'john.doe@demo.com';
    userService.findUserByEmail(email);
    expect(findUserByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should call getUserById method', async () => {
    const getUserByIdSpy = jest.spyOn(userService, 'getUserById');
    const userId = 1;
    userService.getUserById(userId);
    expect(getUserByIdSpy).toHaveBeenCalled();
    expect(getUserByIdSpy).toHaveBeenCalledWith(userId);
  });

  it('should call createUser method with expected payload', async () => {
    const createUserSpy = jest.spyOn(userService, 'createUser');
    const dto = new AuthDto();
    userService.createUser(dto);
    expect(createUserSpy).toHaveBeenCalled();
    expect(createUserSpy).toHaveBeenCalledWith(dto);
  });

  it('should call updateUser method with expected payload', async () => {
    const updateUserSpy = jest.spyOn(userService, 'updateUser');
    const userId = 1;
    const userUpdateDto = new UserUpdateDto();
    userService.updateUser(userId , userUpdateDto);
    expect(updateUserSpy).toHaveBeenCalled();
    expect(updateUserSpy).toHaveBeenCalledWith(userId , userUpdateDto);
  });

  it('should call deleteUser method with expected payload', async () => {
    const deleteUserSpy = jest.spyOn(userService, 'deleteUser');
    const userId = 1;
    userService.deleteUser(userId);
    expect(deleteUserSpy).toHaveBeenCalled();
    expect(deleteUserSpy).toHaveBeenCalledWith(userId);
  });
})