const { expect } = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');

const server = require('../../server');
const Habitacion = require('../../models/habitaciones');

describe ('API', function() {
    describe ('/api/habitaciones', function() {
        before(function() {
            const stubbedObtenerTodasHabitaciones = sinon.stub(Habitacion, 'obtenerTodasHabitaciones');
            stubbedObtenerTodasHabitaciones.resolves([new Habitacion(1, '5 Estrellas', 'imagenes', 'descripcion', '1 Persona', 100, 'comodidades', 'servicios', 50, '2019-12-12')]);
        });

        after(function(){
            Habitacion.obtenerTodasHabitaciones.restore();
        });

        it('debe retornar todas las habitaciones para GET / ', function(done) {
            supertest(server)
            .get("/api/habitaciones")
            .then(response => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('habitaciones');
                expect(response.body.habitaciones).to.be.an('array').that.have.lengthOf(1);
                expect(response.body.habitaciones).to.deep.equal([{numeroHabitacion: 1, valoracion: '5 Estrellas', imagenes: 'imagenes', descripcion: 'descripcion', tipoHabitacion: '1 Persona', precio: 100, comodidades: 'comodidades', servicios: 'servicios', tamañoMetros2: 50, disponibilidad: '2019-12-12'}]);
                done();
            })
            .catch(done);
        });
    });
});
