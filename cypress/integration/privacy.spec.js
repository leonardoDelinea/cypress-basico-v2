
it('Teste 35 - Teste na página de privacidade', function(){
    cy.visit('./src/privacy.html')    
    cy.contains('Talking About Testing').should('be.visible')
})