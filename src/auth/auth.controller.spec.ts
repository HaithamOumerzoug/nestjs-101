import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './services';
import { AuthController } from './auth.controller';
import { AuthDto, AuthLoginDto } from './dtos';


describe("AuthController Unit Tests", () => {
  let authController: AuthController;
  let authService: AuthService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        signIn: jest.fn(() => []),
        signUp: jest.fn(() => []),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, ApiServiceProvider],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  })

  it("calling signIn method", () => {
    const dto = new AuthLoginDto();
    expect(authController.signIn(dto)).not.toEqual(null);
  })

  it("calling signIn method", () => {
    const dto = new AuthLoginDto();
    authController.signIn(dto);
    expect(authService.signIn).toHaveBeenCalled();
    expect(authService.signIn).toHaveBeenCalledWith(dto);
  })

  it("calling signUp method", () => {
    const signUpDto = new AuthDto();
    authController.signUp(signUpDto);
    expect(authService.signUp).toHaveBeenCalled();
    expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
  })
});