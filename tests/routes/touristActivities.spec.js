/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { TouristActivity, conn } = require('../../src/db.js');

const agent = session(app);
const touristActivity = {
    id:   1,
    name: 'Correr'
};

describe('Country routes', () => {
    before(() => conn.authenticate()
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
}));
    beforeEach(() => TouristActivity.sync({ force: true })
        .then(() => TouristActivity.create(touristActivity)));
    describe('GET /touristActivities', () => {
    it('should get 200', () =>
    agent.get('/touristActivities').expect(200)
    );
    });
});
