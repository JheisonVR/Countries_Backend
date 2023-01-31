const { TouristActivity, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
    before(() => conn.authenticate()
        .catch((err) => {
        console.error('Unable to connect to the database:', err);
    }));
    describe('Validators', () => {
        beforeEach(() => TouristActivity.sync({ force: true }));
        describe('name', () => {
            it('should throw an error if name is null', (done) => {
            TouristActivity.create({})
                .then(() => done(new Error('It requires a valid name')))
                .catch(() => done());
    });
        it('should work when its a valid name', () => {
            TouristActivity.create({ name: 'Correr' });
        });
    });
    });
});