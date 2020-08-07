/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        cy.server()
        cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**').as('postNewtable');
        cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**').as('postUsertable');
        cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**').as('getNewtable');

        cy.visit('Register.html');
        
        cy.get('input[placeholder="First Name"]').type(chance.first())
        cy.get('input[ng-model^=Last]').type(chance.last())
        cy.get('input[ng-model^=Email]').type(chance.email())
        cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false }))

        cy.get('input[value=FeMale]').check()
        cy.get('input[type=checkbox]').check('Cricket')
        cy.get('input[type=checkbox]').check('Hockey')

        cy.get('select#Skills').select('Javascript')
        cy.get('select#countries').select('Brazil')
        cy.get('select#country').select('Australia', {force: true})
        cy.get('select#yearbox').select('1995')
        cy.get('select[ng-model^=month]').select('January')
        cy.get('select#daybox').select('30')
        cy.get('input#firstpassword').type('Agilizei@2020')
        cy.get('input#secondpassword').type('Agilizei@2020')

        cy.get('input#imagesrc').attachFile('imagem-foto.png')

        cy.get('button#submitbtn').click()

        cy.wait('@postNewtable').then((resNewTable) => {
            expect(resNewTable.status).to.eq(200)
        })
        cy.wait('@postUsertable').then((resUserTable) => {
            expect(resUserTable.status).to.eq(200)
        })
        cy.wait('@getNewtable').then((resNewTable) => {
            expect(resNewTable.status).to.eq(200)
        })

        cy.url().should('contain', 'WebTable')
    });
});