const db = require('../../services/db-connection');
const Habitacion = require('../../models/habitaciones');
const sinon = require('sinon');
const {expect} = require('chai');


describe ('#obtenerHabitacionPorNumero()', function() {
    before (function () {
        const stubbedDbQuery = sinon.stub(db, 'query');

        stubbedDbQuery
            .withArgs('SELECT * FROM habitaciones WHERE numeroHabitacion = ?', ['test-habitaciones'])
            .callsArgWith(2, null, [{numeroHabitacion: 1, valoracion: '5 Estrellas', imagenes: 'imagenes', descripcion: 'descripcion', tipoHabitacion: '1 Persona', precio: 100, comodidades: 'comodidades', servicios: 'servicios', tamañoMetros2: 50, disponibilidad: '2019-12-12'}]);

        stubbedDbQuery
            .withArgs('SELECT * FROM habitaciones WHERE numeroHabitacion = ?', ['habitacion-no-existe'])
            .callsArgWith(2, null, []);
    
    });

    after (function() {
        db.query.restore();
    })

    it ('con error', function(done) {
        Habitacion.obtenerHabitacionPorNumero('habitacion-no-existe')
        .then((habitacion) => {
            done(new Error('deberia fallar'));
        })

        .catch((err) => {
            expect(err).to.not.be.undefined;
            expect(err.message).to.be.equal('No hay resultados');
            done();
        });

    });

    it ('sin error', function(done) {
        Habitacion.obtenerHabitacionPorNumero('test-habitaciones')
        .then((habitacion) => {
            expect(habitacion).to.not.be.undefined;
            expect(habitacion.numeroHabitacion).to.equal(1);
            expect(habitacion.valoracion).to.equal('5 Estrellas');
            expect(habitacion.imagenes).to.equal('imagenes');
            expect(habitacion.descripcion).to.equal('descripcion');
            expect(habitacion.tipoHabitacion).to.equal('1 Persona');
            expect(habitacion.precio).to.equal(100);
            expect(habitacion.comodidades).to.equal('comodidades');
            expect(habitacion.servicios).to.equal('servicios');
            expect(habitacion.tamañoMetros2).to.equal(50);
            expect(habitacion.disponibilidad).to.equal('2019-12-12');
            done();
        })

        .catch((err) => {
            done(err);
        });

    });
});