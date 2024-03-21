import chai, {expect} from 'chai';
import {Done} from 'mocha';
import chaiHttp from 'chai-http';
import RunController from '../src/controllers/run.controller';

//var RunController = require('../src/controllers/run.controller').RunController;

//const chai = require('chai');
const sinon = require('sinon');
const console = require('console').console;
//const request = require('supertest');

chai.use(chaiHttp);


describe('Testing app controller', () => {
    let controller: RunController;

    const response = {
        sendStatus: (status: any) => Promise.resolve(status),
        status: (status:any ) => {
            debugger;
            return Promise.resolve(status)
        }
    };

    before((done) => {
        sinon.stub(console, 'error');
        sinon.stub(console, 'log');
        sinon.stub(console, 'info');

        /*sinon.stub(Service.prototype, 'xxx').callsFake(() => {
            return Promise.resolve(true);
        });*/

       done();
    });

    beforeEach((done) => {
        sinon.resetHistory();
        controller = new RunController();
        done();
    });

    after((done) => {
        sinon.restore();
        delete require.cache[require.resolve('../src/server')];
        done();
    });

    context('Testing RunController.signup', () => {
        it('signup response with status 200', (done) => {
            const request:any = {
                body: {
                    "name": "John Doe",
                    "age": 50,
                    "city": "London"
                  }
            };
            const response:any = {};
            
            controller.create(request, response).then((status) => {
                expect(status).to.equals(200);
                done();
            });
        });

        it('parseSendMail response with status 500', (done) => {
            const request:any = {
                "name": "John Dummy"
            };
            const response:any = {};

            controller.create(request, response).then((status) => {
                expect(status).to.equals(500);
                done();
            });
        });
    });

    /*context('Testing RunController.update', () => {
        it('update response with status 200', (done) => {
            const request = {
                body: {
                    "xxx": 3014
                }
            };

            controller.parseSendTest(request, response).then((status) => {
                expect(status).to.equals(200);
                done();
            });
        });

        it('update response with status 500', (done) => {
            const request = {
                "xxx": 3014
            };

            controller.parseSendTest(request, response).then((status) => {
                expect(status).to.equals(500);
                done();
            });
        });
    });

    context('Testing RunController.myStats', () => {
        it('myStats response with status 200', (done) => {
            const request = {
                body: {
                    xxx: 1
                },
                params: {
                    engager: 'sparkpost'
                }
            };

            controller.myStats(request, response).then((status) => {
                expect(status).to.equals(200);
                done();
            });
        });

        it('myStats response with status 500', (done) => {
            const request = {
                xxx: 1
            };

            controller.myStats(request, response).then((status) => {
                expect(status).to.equals(500);
                done();
            });
        });
    });*/
});
