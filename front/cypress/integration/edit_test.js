describe('Note update test', function () {
        beforeEach(() => {
            cy.server();
            cy.fixture('note').as('note');
            cy.route('/api/notes/1/', '@note');
            cy.login('#/edit/1');
        });
        it('Should load a note', function () {
            cy.get('[data-cy="name"]').should('have.value', 'Note 1');
            cy.get('[data-cy="text"]').should('have.value', 'Some text');
            cy.get('#tj-datetime-input').should('have.value', '2020-03-20 07:53')
        });
        it('Should display errors if form is submitted incorrectly', function () {
            cy.route({
                method: 'PATCH', url: '/api/notes/1/', response: {
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

        it('Should update note correctly', function () {
            cy.get('[data-cy="name"]').type(' renamed!');

            cy.fixture('editedNote').then(editedNote => {
                cy.route('/api/notes/', [editedNote]);
                cy.route('PATCH', '/api/notes/1/', editedNote)
            });

            cy.get('[data-cy="submit"]').click();
            cy.url().should('contain', '/index');

            cy.get('[data-cy="container"]').should('contain', 'Note 1 renamed!');
        });
    }
);
