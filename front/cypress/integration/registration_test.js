describe('Registration Test', function () {
        beforeEach(() => {
            cy.server();
            cy.visit('/#register', {
                onBeforeLoad: (win) => {
                    console.log(win.sessionStorage);
                    win.sessionStorage.clear()
                }
            });
        });

        it('Should display errors on login without credentials', function () {
            cy.route({
                method: 'POST',
                url: '/api/accounts/register/',
                response: {
                    "username": ["This field may not be blank."],
                    "password": ["This field may not be blank."],
                    "password_confirm": ["This field may not be blank."]
                },
                status: 400
            }).as('login');

            cy.get('[data-cy="register"]').click();
            cy.get('[data-cy="name-error"]').should('contain', 'This field may not be blank.');
            cy.get('[data-cy="password-error"]').should('contain', 'This field may not be blank.');
            cy.get('[data-cy="password-confirm-error"]').should('contain', 'This field may not be blank.')
        });

        it('Should log the user in redirect to home page on successful registration', function () {
            cy.route({
                method: 'POST',
                url: '/api/accounts/register/',
                response: {"id": 16, "username": "ergergeg"},
                status: 200
            });
            cy.route({
                method: 'POST',
                url: '/api/accounts/login/',
                response: {"detail": "Login successful", "token": "e7939ded2e317431f781bfdb2e9a9411b9f1b974"},
                status: 200
            }).as('login');

            cy.get('[data-cy="register"]').click();

            cy.url().should('contain', '/index')
        })
    }
);
