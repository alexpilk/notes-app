describe('My First Test', function () {
        beforeEach(() => {
            cy.server()
        });
        it('Should display message when no notes are available', function () {
            cy.route('/api/notes/', []);

            cy.login('/');

            cy.get('[data-cy="container"]').should('contain', 'No notes')
        });
        it('Should display message when nohgn notes are available', function () {
            const now = new Date(2017, 3, 14).getTime();

            cy.clock(now);
            cy.route('/api/notes/', [{
                "id": 1,
                "name": "Note 1",
                "author": 7,
                "expiration_date": "2020-03-20T07:53:00Z",
                "created_at": "2020-03-22T07:53:47.869400Z",
                "text": "Some text"
            }]);

            cy.login('/');

            cy.get('[data-cy="container"]').should('contain', 'Note 1');
            cy.get('[data-cy="container"]').should('contain', 'Some text');
            cy.get('[data-cy="container"]').should('contain', 'Expires in 3 years')
        });

        it('Should be able to logout', function () {
            cy.route('/api/notes/', []);
            cy.route('POST', '/api/accounts/logout/', {"detail": "Logout successful"});

            cy.login('/');
            cy.get('[data-cy="logout"]').click();

            cy.url().should('contain', '/login');

            cy.visit('/');

            cy.url().should('contain', '/login')

        });

        it('Should be able to create a new note', function () {
            cy.route('/api/notes/', []);

            cy.login('/');
            cy.get('[data-cy="new-note"]').click();

            cy.url().should('contain', '/create');

        });

        it('Should be able to edit a note', function () {
            cy.fixture('note').then(note => {
                cy.route('/api/notes/', [note]);
                cy.route('/api/notes/1/', note)
            });

            cy.login('/');
            cy.contains('Edit').click();

            cy.url().should('contain', '/edit')
        });

        it('Should be able to delete a note', function () {
            cy.fixture('note').then(note => {
                cy.route('/api/notes/', [note]);
            });
            cy.route('DELETE', '/api/notes/1/', '').as('deleteRequest');

            cy.login('/');

            cy.route('/api/notes/', []);

            cy.contains('Delete').click();

            cy.get('[data-cy="container"]').should('contain', 'No notes');
            cy.requestsCount('deleteRequest').should('eq', 1);
        });
    }
);
