describe("User login and profile access", () => {
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

    // Verify the user is logged in and is on their profile page
    cy.get("span.profile-email").contains(Cypress.env("email"));
    cy.url().should((url) => {
      expect(url).to.include("?view=profile");
    });
  });
});
