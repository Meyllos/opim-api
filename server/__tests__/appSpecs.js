import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Core Tests', () => {
  
  describe('Incoming requests', () => {

    it('should handling bad requests and internal errors', (done) => {
      chai.request(app)
      .get('/opim-ap')
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(403);
        chai.expect(res.body.error.message).to.be.equal('NOT FOUND');
        done();
      });

    });

  });

});
