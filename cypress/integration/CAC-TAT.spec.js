/// <reference types="Cypress" />

const variavel ="teste teste teste teste teste teste teste teste teste";

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html') //vamos abrir a aplicação index.html
    })

    it('Teste 1 - verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')  //Vamos comparar titulo
    })

    it('Teste 2 - Preenche os campos e enviar formulário', function(){
      cy.get('#firstName').type("Leonardo")
      cy.get('#lastName').type('Recco')
      cy.get('#email').type('pereleorec@gmail.com')
      cy.get('#open-text-area').type('Meu primeiro teste em cypress - Leonardo')
      cy.get('.button').click()

      cy.get('.success').should('be.visible')
    })

    it('Teste 3 - Preenche os campos com delay', function(){
      cy.get('#firstName').type("Leonardo")
      cy.get('#lastName').type('Recco')
      cy.get('#email').type('pereleorec@gmail.com')
      cy.get('#open-text-area').type(variavel, { delay: 0 })
      cy.get('.button').click()

      cy.get('.success').should('be.visible')
    })

    it('Teste 4 - Validar feedback ao não digitar campo', function(){
      cy.get('#firstName').type('Leonardo')
      cy.get('#lastName').type('Recco')
      cy.get('#email').type('pereleorec@gmail,com')
      cy.get('#open-text-area').type(variavel)
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')
    })

    it('Teste 5 - Validar campo telefone digitado incorretamente', function(){
      cy.get('#firstName').type('Leonardo')
      cy.get('#lastName').type('Recco')
      cy.get('#email').type('pereleorec@gmail,com')
      cy.get('#open-text-area').type(variavel)
      cy.get('#phone').type('Leonardo').should('not.have.value') //Aqui o should verifica se ter valor no campo
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')
      //Outra forma de fazer a verificação do campo vazio é:
      cy.get('#phone').should('have.value', '')
      //Ou seja, comparamos o valor have.value com o valor vazio ''
    })

    it('Teste 6 - Validar campo de telefone obrigatório em branco', function(){
      cy.get('#firstName').type('Leonardo')
      cy.get('#lastName').type('Recco')
      cy.get('#email').type('pereleorec@gmail.com')
      cy.get('#open-text-area').type(variavel, { delay: 0 })
      cy.get('#phone-checkbox').click()
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible') //Aqui validamos a mensagem de feedback de erro
    })

    it('Teste 7 - Preencher e apagar campos com clear', function(){
      cy.get('#firstName').type('Leonardo')
      cy.get('#lastName').type('Recco')
      cy.get('#email').type('pereleorec@gmail.com')
      cy.get("#firstName").clear()
      cy.get('#lastName').clear()
      cy.get('#email').clear()
      cy.get('#firstName').should("have.value",'')
      cy.get('#lastName').should("have.value",'')
      cy.get('#email').should("have.value",'')
    })

    it('Teste 7.2 - Preencher e apagar campos com clear- segunda forma', function(){
      //Essa á forma reduzida do mesmo teste 7 acima.
      cy.get('#firstName').type('Leonardo').clear().should("have.value",'')
      cy.get('#lastName').type('Recco').clear().should("have.value",'')
      cy.get('#email').type('pereleorec@gmail.com').clear().should("have.value",'')
    })

    it('Teste 8 - Não preencher campo obrigatório e verificar mensagem de erro', function(){
      cy.get('button[type="submit"]').click()
      cy.get('.error').should("be.visible")
    })

    it('Teste 9 - Enviar formulario com sucesso via função customizada', function(){
      cy.preenchaTransacao()
      cy.get('.success').should('be.visible')
    })

    it('Teste 10 - Enviar formulario com sucesso com função contains no botão', function(){
      cy.preenchaTransacao()
      cy.get('.success').should('be.visible')
    })

    it('Teste 11 - Seleciona produto pelo seu texto', function(){
      cy.preencha_sem_enviar()
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
      cy.contains('button','Enviar').click()
      cy.get('.success').should('be.visible')
    })

    it('Teste 12 - Seleciona produto pelo seu value', function(){
      cy.preencha_sem_enviar()
      cy.get('#product').select('youtube').should('have.value', 'youtube')
      cy.contains('button','Enviar').click()
      cy.get('.success').should('be.visible')
    })

    it('Teste 13 - Seleciona produto pelo seu índice', function(){
      cy.preencha_sem_enviar()
      cy.get('#product').select(1).should('have.value', 'blog')
      cy.contains('button','Enviar').click()
      cy.get('.success').should('be.visible')
    })

    it('Teste 14 - Selecione uma opção do tipo radio e marque', function(){
      cy.preencha_sem_enviar()
      cy.get('input[type=radio][value="feedback"]').check().should('have.value', 'feedback')
      cy.contains('button','Enviar').click()
      cy.get('.success').should('be.visible')
    })

    it('Teste 15 - Marca todo tipo de radio button', function(){
      cy.preencha_sem_enviar()
      cy.get('input[type="radio"]')
       .should('have.length', 3)  
      .each(function($radio){
				cy.wrap($radio).check()				
				cy.wrap($radio).should('be.checked')			
      })
    })

    it('Teste 16 - Marca todo tipo de checkbox e desmarca o último', function(){
      cy.preencha_sem_enviar()
      cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })

    it('Teste 17 - Validar campo de telefone obrigatório em branco com check', function(){
      cy.preencha_sem_enviar()
      cy.get('#phone-checkbox').check()
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible') //Aqui validamos a mensagem de feedback de erro
    })

    it('Teste 18 - Envio de arquivo com o cypress', function(){
      cy.preencha_sem_enviar()
      cy.get('#file-upload').should('not.have.value')
      cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should('have.value',"C:\\fakepath\\example.json")
      //No código acima o should pegou o caminho junto com o nome do arquivo, validamos amboss
      cy.get('button[type="submit"]').click()
      cy.get('.success').should('be.visible') //Aqui validamos a mensagem de feedback de erro
    })

    it('Teste 19 - Envio de arquivo com o cypress e valide o caminho', function(){
      cy.preencha_sem_enviar()
      cy.get('#file-upload').should('not.have.value')
      cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
      //no código acima pegamos apenas o nome do arquivo e validamos só o nome do arquivo
      cy.get('button[type="submit"]').click()
      cy.get('.success').should('be.visible') //Aqui validamos a mensagem de feedback de erro
    })

    it('Teste 20 - Envio de arquivo com drag-and-drop', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('Teste 21 - Envio de arquivo com alias', function(){
      cy.fixture('example.json').as('file_example')
      cy.get('input[type="file"]').selectFile('@file_example')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('Teste 22 - Verificar política de privacidade que abre em outra aba', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it.only('Teste 23 - Na política de privacidade remover abertura em nova aba', function(){
      cy.get('#privacy a').invoke('removeAttr', 'target', '_blank').click()
      cy.contains('Talking About Testing').should('be.visible')
    })

    it('Teste 24 - Testar a página de política de privacidade', function(){
      cy.get('#privacy a').invoke('removeAttr', 'target', '_blank').click()
      cy.contains('Talking About Testing').should('be.visible')
    })

    it.only('Teste 25- Testar a simulação de viewport', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })



    })









