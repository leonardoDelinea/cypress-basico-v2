/// <reference types="Cypress" />

describe('Teste automatizado Prova fácil', function() {

    beforeEach(function(){
        cy.visit('https://sgp-homolog.provafacilnaweb.com.br/demo/logincandidate/')
    })

    it('Teste 1 - verifica a tela de login', function() {
        cy.get('[name="login"]').type("Aluno5")
        cy.get('[name="password"]').type('123')
        cy.get('.login-btn > button:nth-child(1)').click()
        cy.get('html body div#app div#page-wrapper.theme-light.custom-demo div#side-menu div#side-menu-profile-container span').should('be.visible')
        cy.visit('https://front-end-aluno-hmg.provafacilnaweb.com.br/#/online-tests')
        cy.get(':nth-child(5) > div > .col-xs-12').click()
        cy.get('#informations-container > .card').should('be.visible')
        cy.get('#accept-instructions').check()
        cy.get('#accept-terms').check()
        cy.get('#btnContinue').should('be.visible').click()

    })



})




