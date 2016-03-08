var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server'),
    should = chai.should()

chai.use(chaiHttp);

describe('server', function() {
  it('should say hi to me!', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
  })
})
