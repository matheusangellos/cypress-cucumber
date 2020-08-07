/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();


When(/^informar meus dados$/, () => {
    cy.get('input[placeholder="First Name"]').type(chance.first())
    cy.get('input[ng-model^=Last]').type(chance.last())
    cy.get('input[ng-model^=Email]').type(chance.email())
    cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false }))

    cy.get('input[value=FeMale]').check()
    cy.get('input[type=checkbox]').check('Cricket')
    cy.get('input[type=checkbox]').check('Hockey')

    cy.get('select#Skills').select('Javascript')
    cy.get('select#countries').select('Brazil')
    cy.get('select#country').select('Australia', { force: true })
    cy.get('select#yearbox').select('1995')
    cy.get('select[ng-model^=month]').select('January')
    cy.get('select#daybox').select('30')
    cy.get('input#firstpassword').type('Agilizei@2020')
    cy.get('input#secondpassword').type('Agilizei@2020')

    cy.get('input#imagesrc').attachFile('imagem-foto.png')
});

When(/^salvar$/, () => {
    cy.get('button#submitbtn').click()
});

Then(/^devo ser cadastrado com sucesso$/, () => {
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
