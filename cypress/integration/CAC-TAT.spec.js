/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit("./src/index.html")
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('Enzo')
        cy.get('#lastName').type('Furlan')
        cy.get('#email').type('enzo.furlan@test.com')
        cy.get('#open-text-area').type('studying cypress long text', {delay:0})
        cy.contains('Enviar').click()

        cy.get('[class="success"]').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Enzo')
        cy.get('#lastName').type('Furlan')
        cy.get('#email').type('enzo.furlan@test,com')
        cy.get('#open-text-area').type('studying cypress long text', {delay:0})
        cy.contains('Enviar').click()
        cy.get('[class="error"]').should('be.visible')    
    })

    it('valida campo telefone somente input numeros', function() {
        cy.get('#phone').type('Enzo').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Enzo')
        cy.get('#lastName').type('Furlan')
        cy.get('#email').type('enzo.furlan@test.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('studying cypress long text', {delay:0})
        cy.contains('Enviar').click()

        cy.get('[class="error"]').should('be.visible')    
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Enzo').should('have.value', 'Enzo').clear().should('have.value', '')
        cy.get('#lastName').type('Furlan').should('have.value', 'Furlan').clear().should('have.value', '')
        cy.get('#email').type('enzo.furlan@test.com').should('have.value', 'enzo.furlan@test.com').clear().should('have.value', '')
        cy.get('#phone').type('12312345').should('have.value', '12312345').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('Enviar').click()

        cy.get('[class="error"]').should('be.visible')    
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('[class="success"]').should('be.visible')    
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select("YouTube").should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select("mentoria").should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')
    })

    it.only('marca cada tipo de atendimento', function() {
        cy.get('[type="radio"]').check('feedback').should('have.value', 'feedback')
        cy.get('[type="radio"]')
            .each(($el, index, $list) => {
                cy.wrap($el).check($el).should('be.checked')
            })
    })

})
  