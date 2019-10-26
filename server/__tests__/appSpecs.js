import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect, request } = chai;

describe('Test case: Core App', () => {
  
  describe('Base case: Incoming requests', () => {

    it('should handle bad requests and internal errors - define as 404 ', (done) => {
      request(app)
      .get('/opim-ap')
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body.error.message).to.be.equal('NOT FOUND');
        done();
      });

    });

    

  });

});
