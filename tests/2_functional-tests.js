const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
let assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Valid input 10L', function(done){
    chai.request(server)
      .get('/api/convert')
      .query({input:'10L'})
      .end((err,res)=>{
        assert.equal(res.status,200);
        assert.equal(res.body.initNum,10);
        assert.equal(res.body.initUnit,'L');
        done();
      });
  });
  test('Invalid input unit 32g', function(done){
    chai.request(server)
      .get('/api/convert')
      .query({input:'32g'})
      .end((err,res)=>{
        assert.equal(res.status,200);
        assert.equal(res.text,'invalid unit');
        done();
      });
  });
  test('Invalid number 3/7.2/4kg', function(done){
    chai.request(server)
      .get('/api/convert')
      .query({input:'3/7.2/4kg'})
      .end((err,res)=>{
        assert.equal(res.status,200);
        assert.equal(res.text,'invalid number');
        done();
      });
  });
  test('Invalid number AND unit 3/7.2/4kilomegagram', function(done){
    chai.request(server)
      .get('/api/convert')
      .query({input:'3/7.2/4kilomegagram'})
      .end((err,res)=>{
        assert.equal(res.status,200);
        assert.equal(res.text,'invalid number and unit');
        done();
      });
  });
  test('No number input, kg', function(done){
    chai.request(server)
      .get('/api/convert')
      .query({input:'kg'})
      .end((err,res)=>{
        assert.equal(res.status,200);
        assert.equal(res.body.initNum,1);
        assert.equal(res.body.initUnit,'kg');
        done();
      });
  });
});
