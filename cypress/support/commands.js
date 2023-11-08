// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('[data-test="firtsName"]').type('text', { delay: 0 }).should('have.value', 'text')
  cy.get('[data-test="lastName"]').type('text', { delay: 0 }).should('have.value', 'text')
  cy.get('[data-test="email"]').type('text@example.com', { delay: 0 }).should('have.value', 'text@example.com')
  cy.get('[data-test="text_area"]').type('text', { delay: 0 }).should('have.value', 'text')
  cy.get('[data-test="button"]').click()
  cy.get('[data-test="sucess_message"]').should('be.visible').and('contain.text', 'Mensagem enviada com sucesso.')
})