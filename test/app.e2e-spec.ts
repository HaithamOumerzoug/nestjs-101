import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma';
import { AuthDto, AuthLoginDto } from '../src/auth';
import { ConfigService } from '@nestjs/config';

// Todo : Added e2e tests
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma : PrismaService;
  let configService : ConfigService;
  let baseUrl: string;
  let port: number;

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
    // ? Thanks to IOC ;)
    prisma = app.get(PrismaService);
    configService = app.get(ConfigService);
    // ? Clean DB
    prisma.cleanDB();
    app.setGlobalPrefix('api');

    // ? Get env variables
    baseUrl=configService.get('BASE_URL');
    port=configService.get('PORT') | 3333;

    await app.init();
    await app.listen(port);
  });
  afterAll(() => {
    app.close();
  });

  // *SignUp
  describe('SignUp', () => {
    const dto: AuthDto = {
      name: 'John Doe',
      email: 'john.doe@demo.com',
      password: '1234',
    };
    it('Should throw if email empty', (done) => {
      request(baseUrl)
      .post('/api/auth/signUp')
      .send({name : dto.name , password : dto.password}) 
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res)=>{
        if (err) return done(err);
        return done();
      });
    });
    it('Should throw if password empty', (done) => {
      request(baseUrl)
      .post('/api/auth/signUp')
      .send({name : dto.name , email : dto.email}) 
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res)=>{
        if (err) return done(err);
        return done();
      });
    });
    it('Should throw if name empty', (done) => {
      request(baseUrl)
      .post('/api/auth/signUp')
      .send({email:dto.email , password : dto.password}) 
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res)=>{
        if (err) return done(err);
        return done();
      });
    });
    it('should throw if no body provided', (done) => {
      request(baseUrl)
      .post('/api/auth/signUp')
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res)=>{
        if (err) return done(err);
        return done();
      });
    });
    it('should signup', (done) => {
      request(baseUrl)
      .post('/api/auth/signUp')
      .set('Accept', 'application/json')
      .send({name : dto.name , email : dto.email , password : dto.password}) 
      .expect(201)
      .end((err, res)=>{
        if (err) return done(err);
        return done();
      });
    }); 
    it('should throw if email unique', (done) => {
      request(baseUrl)
      .post('/api/auth/signUp')
      .set('Accept', 'application/json')
      .send({name : dto.name , email : dto.email , password : dto.password}) 
      .expect(403)
      .end((err, res)=>{
        if (err) return done(err);
        return done();
      });
    }); 
  });

  // *SignIn
  describe('SignIn',()=>{
    const dto: AuthLoginDto = {
      email: 'john.doe@demo.com',
      password: '1234',
    };
    it('should throw if email empty',(done)=>{
      request(baseUrl)
      .post('/api/auth/signIn')
      .set('Accept','application/json')
      .send({password : dto.password})
      .expect(400)
      .end((err,res)=>{
        if(err)return done(err);
        return done();
      })
    })
    it('should throw if password empty',(done)=>{
      request(baseUrl)
      .post('/api/auth/signIn')
      .set('Accept','application/json')
      .send({email : dto.email})
      .expect(400)
      .end((err,res)=>{
        if(err)return done(err);
        return done();
      })
    })
    it('should throw if email is invalide',(done)=>{
      request(baseUrl)
      .post('/api/auth/signIn')
      .set('Accept','application/json')
      .send({email : dto.email+'m' , password : dto.password})
      .expect(403)
      .end((err,res)=>{
        if(err)return done(err);
        return done();
      })
    })
    it('should throw if password is invalide',(done)=>{
      request(baseUrl)
      .post('/api/auth/signIn')
      .set('Accept','application/json')
      .send({email : dto.email , password : dto.password+"2"})
      .expect(403)
      .end((err,res)=>{
        if(err)return done(err);
        return done();
      })
    })
    it('should signin',(done)=>{
      request(baseUrl)
      .post('/api/auth/signIn')
      .set('Accept','application/json')
      .send(dto)
      .expect(200)
      .end((err,res)=>{
        if(err)return done(err);
        return done();
      })
    })
  });
});
