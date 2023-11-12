describe("User login and profile access", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  })

  it("logs in user and accesses profile", () => {
    // Visit the website
    cy.visit(Cypress.env("baseUrl"));
    cy.wait(2000);

    cy.intercept(`${Cypress.env("apiLoginUrl")}`).as("authLogin");

    // Click the "login" button
    cy.get("#registerModal .modal-footer button:nth-child(2)").click();
    cy.wait(1000);

    // Fill in login credentials and submit
    cy.get("input#loginEmail").type(`${Cypress.env("email")}`, {
      delay: 100,
    });
    cy.get("input#loginPassword").type(
      `${Cypress.env("password")}` + "{enter}",
      {
        delay: 100,
      },
    );
    cy.wait(2000);

    // Wait for the authentication request to complete
    cy.wait("@authLogin").its("response.statusCode").should("eq", 200);

    // Verify that token exists in local storage
    // + user is logged in and on their profile page
    cy.window().its("localStorage.token").should("exist");
    cy.get("span.profile-email").contains(Cypress.env("email"));
    cy.url().should("include", "?view=profile");
  });
});
