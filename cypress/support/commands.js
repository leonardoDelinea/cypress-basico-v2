Cypress.Commands.add('preenchaTransacao', function() {
    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Recco')
    cy.get('#email').type('leonardo@exemplo.com.br')
    cy.get('#open-text-area').type('Esse é um comentário gerado dentro do cypress')
    cy.contains('button', 'Enviar').click()
}) 

Cypress.Commands.add('preencha_sem_enviar', function() {
    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Recco')
    cy.get('#email').type('leonardo@exemplo.com.br')
    cy.get('#open-text-area').type('Esse é um comentário gerado dentro do cypress')
}) 