describe('Login Test', function () {
        beforeEach(() => {
            cy.server();
            cy.visit('/', {
                onBeforeLoad: (win) => {
                    console.log(win.sessionStorage);
                    win.sessionStorage.clear()
                }
            });
        });

        it('Should display errors on login without credentials', function () {

            cy.route({
                method: 'POST', url: '/api/accounts/login/', response: {
                    "login": ["This field may not be blank."],
                    "password": ["This field may not be blank."]
                }, status: 400
            }).as('login');

            cy.get('[data-cy="login"]').click();

            cy.get('[data-cy="login-error"]').should('contain', 'This field may not be blank.');
            cy.get('[data-cy="password-error"]').should('contain', 'This field may not be blank.')

        });

        it('Should display errors on login with invalid credentials', function () {

            cy.route({
                method: 'POST',
                url: '/api/accounts/login/',
                response: {"detail": "Login or password invalid."},
                status: 400
            }).as('login');

            cy.get('[data-cy="login"]').click();

            cy.get('[data-cy="general-login-error"]').should('contain', 'Login or password invalid.')
        });

        it('Should redirect to home page on successful login', function () {

            cy.route({
                method: 'POST',
                url: '/api/accounts/login/',
                response: {"detail": "Login successful", "token": "e7939ded2e317431f781bfdb2e9a9411b9f1b974"},
                status: 200
            }).as('login');

            cy.get('[data-cy="login"]').click();

            cy.url().should('contain', '/index')
        });

        it('Should route to registration page', function () {

            cy.contains('Register').click();

            cy.url().should('contain', '/register')
        })
    }
);
