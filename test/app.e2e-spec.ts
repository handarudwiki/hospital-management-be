import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TestService } from './test.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    testService = app.get(TestService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /register', () => {
    beforeEach(async () => {
      await testService.deleteAll();
    });

    it('should register user', async () => {
      const response = await request(app.getHttpServer())
        .post('/register')
        .send({
          email: 'test@gmail.com',
          first_name: 'test',
          last_name: 'test',
          password: 'password',
          birth_date: '1999-01-01',
        });

      expect(response.status).toBe(201);
      expect(response.body.data.email).toBe('test@gmail.com');
      expect(response.body.data.first_name).toBe('test');
      expect(response.body.data.last_name).toBe('test');
    });

    it('should reject if email exists', async () => {
      await testService.createUser();
      const response = await request(app.getHttpServer())
        .post('/register')
        .send({
          email: 'test@gmail.com',
          first_name: 'test',
          last_name: 'test',
          password: 'password',
          birth_date: '1999-01-01',
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('POST /login', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
    });

    it('should login user', async () => {
      const response = await request(app.getHttpServer()).post('/login').send({
        email: 'test@gmail.com',
        password: 'password',
      });
      console.log(response.body.data.accessToken);
      expect(response.status).toBe(200);
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.refreshToken).toBeDefined();
    });

    it('should reject if username or password is wrong', async () => {
      const response = await request(app.getHttpServer()).post('/login').send({
        email: 'xxxx@gmail.com',
        password: 'xxxxx',
      });
      expect(response.status).toBe(401);
    });
  });

  describe('GET /me', () => {
    let accessToken: string;

    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();

      const response = await request(app.getHttpServer()).post('/login').send({
        email: 'test@gmail.com',
        password: 'password',
      });
      accessToken = response.body.data.accessToken; // Store the access token for further requests
    });

    it('should get user', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', `Bearer ${accessToken}`); // Set the authorization header
      expect(response.status).toBe(200);
      expect(response.body.data.email).toBe('test@gmail.com');
    });

    it('should reject if not authenticated', async () => {
      const response = await request(app.getHttpServer()).get('/users/me');
      expect(response.status).toBe(401);
    });
  });
});
