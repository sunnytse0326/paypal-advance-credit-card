const should = require('should')
let chai = require("chai");
let chaiHttp = require("chai-http");
const server = require("../app");
chai.use(chaiHttp);

describe('#API Calls', () => {
    it('should return the access token after oauth API is called', done => {
        chai.request(server)
                .post("/ucc-api/")
                .send({})
                .end((err, res)=>{
                    res.body.order_id.should.not.null;
                    done()
                })
    })
})
