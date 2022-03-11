import { Test, TestingModule } from '@nestjs/testing';

import { AuthLoginDto , AuthDto } from './../dtos';
import { AuthService } from './auth.service';


class ApiServiceMock {
  signIn(dto : AuthLoginDto){
      return null;
  }
  signUp(dto : AuthDto){
      return null;
  }
}
describe.only("AuthService Unit Tests", () => {

  let authService: AuthService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: AuthService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, ApiServiceProvider
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  })

  it('should call signIn method with expected payload', async () => {
    const signInSpy = jest.spyOn(authService, 'signIn');
    const dto = new AuthLoginDto();
    authService.signIn(dto);
    expect(signInSpy).toHaveBeenCalledWith(dto);
  });

  it('should call signUp method with expected payload', async () => {
    const signUpSpy = jest.spyOn(authService, 'signUp');
    const signUpDto = new AuthDto();
    authService.signUp(signUpDto);
    expect(signUpSpy).toHaveBeenCalledWith(signUpDto);
  });
})