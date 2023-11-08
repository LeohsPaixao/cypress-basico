/// <reference types="Cypress" />

describe('Centra de Atendimento ao Cliente TAT', () => {
  beforeEach(() => cy.visit('../../src/index.html'))

  const THREE_SECONDS_IN_MS = 3000;
  
  it('Deveria ser possivel visualizar o titulo da pagina', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Não deveria ser possivel colocar letras no campo telefone', () => {
    cy.get('[data-test="phone"]').type('test').should('have.text', '')
  })

  it('Deveria ser possivel limpar os campos após preenche-los', () => {
    cy.get('[data-test="firtsName"]').type('text', { delay: 0 }).should('have.value', 'text')
    cy.get('[data-test="lastName"]').type('text', { delay: 0 }).should('have.value', 'text')
    cy.get('[data-test="email"]').type('text@example.com', { delay: 0 }).should('have.value', 'text@example.com')
    cy.get('[data-test="text_area"]').type('text', { delay: 0 }).should('have.value', 'text')
    cy.get('[data-test="firtsName"]').clear().should('have.value', '')
    cy.get('[data-test="lastName"]').clear().should('have.value', '')
    cy.get('[data-test="email"]').clear().should('have.value', '')
    cy.get('[data-test="text_area"]').clear().should('have.value', '')
  })

  it('Deveria ser possivel visualizar uma mensagem de aviso após preencher um email incorreto', () => {
    cy.get('[data-test="firtsName"]').type('text', { delay: 0 })
    cy.get('[data-test="lastName"]').type('text', { delay: 0 })
    cy.get('[data-test="email"]').type('text', { delay: 0 })
    cy.get('[data-test="text_area"]').type('text', { delay: 0 })
    cy.get('[data-test="button"]').click()
    cy.get('[data-test="error_message"]').should('be.visible').and('contain.text', 'Valide os campos obrigatórios!')
  })

  it('Deveria ser possivel visualizar uma mensagem de aviso quando o campo telefone é obrigário', () => {
    cy.get('[data-test="firtsName"]').type('text', { delay: 0 })
    cy.get('[data-test="lastName"]').type('text', { delay: 0 })
    cy.get('[data-test="email"]').type('text', { delay: 0 })
    cy.get('[data-test="phone_preferential"]').check().should('be.checked')
    cy.get('[data-test="text_area"]').type('text', { delay: 0 })
    cy.get('[data-test="button"]').click()
    cy.get('[data-test="error_message"]').should('be.visible').and('contain.text', 'Valide os campos obrigatórios!')
  })

  it('Deveria ser possivel preencher os campos obrigatórios e envia o formulário', () => {
    cy.get('[data-test="firtsName"]').type('text', { delay: 0 })
    cy.get('[data-test="lastName"]').type('text', { delay: 0 })
    cy.get('[data-test="email"]').type('text@gmail.com', { delay: 0 })
    cy.get('[data-test="text_area"]').type('text', { delay: 0 })
    cy.get('[data-test="button"]').click()
    cy.get('[data-test="sucess_message"]').should('be.visible').and('contain.text', 'Mensagem enviada com sucesso.')
  })

  it('Deveria ser possivel enviar o formulário com comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
  })

  it('Deveria ser possivel selecionar uma opção do produto', () => {
    cy.get('[data-test="product"]').select('cursos').should('contain.text', 'Cursos')
  })

  it('Deveria ser possivel selecionar o tipo de atendimento e a forma de contato', () => {
    cy.get('[data-test="service_type"] input').check('feedback').should('be.checked')
    cy.get('[data-test="email_preferential"]').check().should('be.checked')
  })

  it('Deveria ser possivel selecionar um arquivo do computador', () => {
    cy.get('[data-test="upload"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should('have.value', 'C:\\fakepath\\example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Deveria ser possivel selecionar um arquivo do computador com movimento de drag-drop', () => {
    cy.get('[data-test="upload"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should('have.value', 'C:\\fakepath\\example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Deveria ser possivel selecionar um arquivo atráves do fixtures', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('[data-test="upload"]').selectFile('@sampleFile')
      .should('have.value', 'C:\\fakepath\\example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Deveria ser possivel visualizar a politica de privacidade', () => {
    cy.get('[data-test="privacy"]').invoke('removeAttr', 'target').click()
    cy.get('#title').should('contain.text' ,'CAC TAT - Política de privacidade')
  })

  it('Deveria ser possivel exibir a mensagem de erro por 3 segundos', () => {
    cy.clock()
    cy.get('[data-test="button"]').click()
    cy.get('[data-test="error_message"]').should('be.visible').and('contain.text', 'Valide os campos obrigatórios!')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('[data-test="error_message"]').should('not.be.visible')

  })

  it('Deveria ser possivel exibir a mensagem de sucesso por 3 segundos', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('[data-test="sucess_message"]').should('be.visible').and('contain.text', 'Mensagem enviada com sucesso.')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('[data-test="sucess_message"]').should('not.be.visible')

  })

  Cypress._.times(5, () => {
    it.only('Deveria ser possivel rodar este teste 5 vezes', () => {
      cy.clock()
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('[data-test="sucess_message"]').should('be.visible').and('contain.text', 'Mensagem enviada com sucesso.')
      cy.tick(THREE_SECONDS_IN_MS)
      cy.get('[data-test="sucess_message"]').should('not.be.visible')
  
    })
  })
})