import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { signupCredentials, explicitCredentials, dump } from '../logs/user';
import route from '../logs/routes';
import { drop } from '../models/index';
import { JSON_TYPE } from '../logs/protocols';
import { CREATED_CODE, RESOURCE_CONFLICT } from '../constantes/statusCodes';

chai.use(chaiHttp);
const { expect, request } = chai;

before(()=>{
    drop.table('DROP TABLE IF EXISTS users');
});

describe('Test case: User authentification', () => {
    describe('Base case: create user account', () => {
        
        it('Should recognize unprocessable entities if required fields are not well formed', (done) => {
            request(app)
            .post(route.signup)
            .send(dump)
            .end((err, res) => {
                expect(res).to.have.status(422);
                done();
            });
        });

        it('Should recognize body explicit values', (done) => {
            request(app)
            .post(route.signup)
            .send(explicitCredentials)
            .end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.type).to.be.equal(JSON_TYPE);
                expect(res.body.error).to.contain('is not allowed');
                done();
            });
        });

        it('Should create a user account', (done) => {
            request(app)
            .post(route.signup)
            .send(signupCredentials)
            .set('Accept', JSON_TYPE)
            .end((err, res) => {
                expect(res).to.have.status(CREATED_CODE);
                expect(res.type).to.be.equal(JSON_TYPE);
                expect(res.body).to.be.an('object');
                done();
            });
        });

        it('Should recognize duplicated entry on the email entity', (done) => {
            request(app)
            .post(route.signup)
            .send(signupCredentials)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(RESOURCE_CONFLICT);
                expect(res.type).to.be.equal(JSON_TYPE);
                done();
            });
        });

    });
});