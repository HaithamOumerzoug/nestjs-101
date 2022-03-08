import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { AuthDto } from 'src/auth';

// Todo : Added e2e tests
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma : PrismaService

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
  });

  describe('Auth', () => {
    // const dto: AuthDto = {
    //   email: 'vlad@gmail.com',
    //   password: '123',
    // };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        
      });
      it('should throw if password empty', () => {
        
      });
      it('should throw if no body provided', () => {
        
      });
      it('should signup', () => {

      });
        
    });
  });
});
