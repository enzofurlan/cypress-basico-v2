Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (  ) => {
    cy.get('#firstName').type('Enzo')
    cy.get('#lastName').type('Furlan')
    cy.get('#email').type('enzo.furlan@test.com')
    cy.get('#open-text-area').type('studying cypress long text', {delay:0})
    cy.get('button[type="submit"]').click()
})
