var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../../server'),
    should = chai.should(),
    expect = chai.expect,
    Sighting = require('../../Sighting'),
    testData = require('../../sighting2.json');


chai.use(chaiHttp);

var testSighting = {
    "bird": [{
      "name": "red breasted merganser",
      "order": "Anseriformes",
      "status": "least concern"
    },{
      "name": "cedar waxwing",
      "order": "Passeriformes",
      "status": "least concern"
    }],
    "confirmed": true,
    "numberSeen": 2
};

var newSighting = {
  "bird": [{
    "name": "osprey",
    "order": "Accipitriformes",
    "status": "least concern"
  }],
  "confirmed": false,
  "numberSeen": 5
}

describe('server', function() {

var testId;
  beforeEach(function(done) {
    var sighting = new Sighting(testSighting)
    testId = sighting._id;

    sighting.save(function(err) {
      if (err) {
        console.log(err)
      }
      done();
    })
  })

  afterEach(function(done) {
    Sighting.remove({}, function(err) {
      if (err) {
        console.log(err);
      }
      done();
    })
  })


  it('should create a new sighting', function(done) {

    chai.request(server)
      .post('/api/sighting')
      .send(newSighting)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('confirmed');
        res.body.confirmed.should.be.a('boolean');
        done();
      });
  });

  it('should show all sightings', function(done) {

    chai.request(server)
      .get('/api/sighting')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.be.a('array');
        done();
      })
  })

  it('should show one sighting from id', function(done) {

    chai.request(server)
      .get('/api/sighting/?id=' + testId)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.be.a('array');
        res.body[0].should.have.property('bird');
        res.body[0].bird.should.be.a('array');
        res.body[0].should.have.property('confirmed');
        res.body[0].confirmed.should.be.a('boolean');
        done();
      })
  })

  it('should change one sighting from id', function(done) {
    chai.request(server)
      .put('/api/sighting/?id=' + testId)
      .send({numberSeen: 3})
      .end(function(err, res) {
        res.should.have.status(200);


        Sighting.findById(testId, function(err, s) {
          s.should.be.a('object');
          s.should.have.property('numberSeen');
          s.numberSeen.should.equal('3');
          done();
        })
      })
  })

  it('should delete one sighting by id', function(done) {
    chai.request(server)
      .delete('/api/sighting/?id=' + testId)
      .end(function(err, res) {
        res.should.have.status(200);

        Sighting.findById(testId, function(err, s) {
          expect(s).to.equal(null);
          done();
        })
      })
  })


});
