// Handle the uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // prevents Cypress from failing the test
});
const IP = 'localhost:3000';
function scrollUntilFound(selector, attempts = 3) {
  if (attempts <= 0) {
    throw new Error('Max scroll attempts reached');
  }

  return cy.get('body').then($body => {
    if ($body.find(selector).length > 0) {
      // Element found, do nothing
    } else {
      // Scroll by a set amount, let's say 200 pixels down
      cy.window().then(win => {
        win.scrollBy(0, 2000);
      });

      // Wait for the specified time
      cy.wait(500); // waiting for 500 milliseconds
      return scrollUntilFound(selector, attempts - 1);
    }
  });
}

describe('template spec', () => {
  beforeEach(() => {
    cy.visit(IP);
  });

  it('should open trainer modal when clicked', () => {
    cy.wait(3000);
    
    scrollUntilFound(':nth-child(1) > .h-0 > .top-0')
      .then(() => {
        cy.get(':nth-child(1) > .h-0 > .top-0').click();
        cy.get('.max-w-md > .px-6').should('be.visible');
      });
  });
});

describe('Sign in', () => {

  beforeEach(() => {
    cy.visit(IP); // assuming this is the base URL
  });

  it('Login', () => {
    cy.scrollTo('top');
    // 1. Click on the specified element
    cy.get('.ss\\:flex > :nth-child(1) > .w-\\[140px\\] > .items-center > .flex > .font-poppins > .text-white').click();

    // 2. Check if the modal is visible
    cy.get('.relative > .px-6').should('be.visible');

    // 3. Enter data into the email and password fields
    cy.get('#email').type('xopelinu@ai1.lol');
    cy.get('#password').type('12345678');

    // 4. Click a specified button
    cy.get('.space-y-6 > .text-white').click();

    // 5. Wait for a second
    cy.wait(1000);

    // 6. Check if a specific element is present
    cy.get('.text-slate-500').should('be.visible');

  });
});
// describe('Signout', () => {

//   beforeEach(() => {
//     cy.visit(IP);
//   });

//   it('should ensure the element disappears after an action', () => {
//     cy.wait(2000);
//     // 1. Click on the specified element
//     cy.get('.mr-0 > p').click();

//     // 2. Wait for a second
//     cy.wait(1000);

//     // 3. Ensure the element is no longer present
//     cy.get('.text-slate-500').should('not.exist');

//   });
// });
