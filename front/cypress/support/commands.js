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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (url) => {
    cy.visit(url, {
        onBeforeLoad: (win) => {
            win.sessionStorage.clear()
            win.sessionStorage.vuex = '{"token":"e7939ded2e317431f781bfdb2e9a9411b9f1b974"}'
        }
    });
});

Cypress.Commands.add('requestsCount', (alias) =>
    cy
        .wrap()
        .then(() => cy.state('requests').filter(req => req.alias === alias).length),
);
