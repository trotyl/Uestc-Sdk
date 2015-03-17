var assert = require('assert');
var Promise = require('promise');
var _ = require('lodash');
var User = require('../src/user');

describe('User ', function () {
    var user, util, carrier;

    beforeEach(function () {
        user = new User('number', 'password');
        util = {
            url: 'someUrl',
            data: {0: 1},
            wait: false
        };
    });

    describe('#.ctor()', function () {
        it('should create the right object', function () {
            assert.equal('number', user.number);
            assert.equal('password', user.password);
            assert.equal(User.status.idle, user.status);
            assert.equal(1, _.keys(user.jar).length);
        });
    });

    describe('#login()', function () {
        var url, data;

        beforeEach(function () {
            url = 'https://uis.uestc.edu.cn/amserver/UI/Login';
            data = {
                'IDToken0': '',
                'IDToken1': '2012019050020',
                'IDToken2': '',
                'IDButton': 'Submit',
                'goto': 'aHR0cDovL3BvcnRhbC51ZXN0Yy5lZHUuY24vbG9naW4ucG9ydGFs',
                'encoded': true,
                'gx_charset': 'UTF-8'
            };
        });

        it('should send the post request and login success', function (done) {
            data['IDToken2'] = '811073';
            var meta = {
                url: url,
                jar: user.jar,
                data: data
            };
            user.login(meta).nodeify(function (err, httpResponse) {
                assert.equal(302, httpResponse.statusCode);
                done();
            });
       });

        it('should send the post request and login fail', function (done) {
            data['IDToken2'] = '811074';
            var meta = {
                url: url,
                jar: user.jar,
                data: data
            };
            user.login(meta).nodeify(function (err, httpResponse) {
                assert.equal(true, !!err);
                done();
            });
        });
    });

});