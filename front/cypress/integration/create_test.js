describe('Note creation test', function () {
        beforeEach(() => {
            cy.server();
            cy.login('#/create/');
        });
        it('Should load the form', function () {
            cy.get('[data-cy="name"]').should('have.value', '');
            cy.get('[data-cy="text"]').should('have.value', '');
            cy.get('#tj-datetime-input').should('have.value', '')
        });
        it('Should display errors if form is submitted incorrectly', function () {
            cy.route({
                method: 'POST', url: '/api/notes/', response: {
                    "name": ["This field may not be blank."],
                    "expiration_date": ["The date cannot be in the past!"],
                    "text": ["This field may not be blank."]
                }, status: 400
            });

            cy.get('[data-cy="submit"]').click();
            cy.get('[data-cy="name-error"]').should('contain', 'This field may not be blank.');
            cy.get('[data-cy="date-error"]').should('contain', 'The date cannot be in the past!');
            cy.get('[data-cy="text-error"]').should('contain', 'This field may not be blank.')
        });

        it('Should save note correctly', function () {
            cy.fixture('note').then(note => {
                cy.route('/api/notes/', [note]);
                cy.route('POST', '/api/notes/', note)
            });
            cy.get('[data-cy="submit"]').click();
            cy.url().should('contain', '/index');
            cy.get('[data-cy="container"]').should('contain', 'Note 1');
        });
    }
);
