describe("User login and profile access", () => {
  it("logs in user and accesses profile", () => {
    const apiLoginUrl = Cypress.env("secrets.API_LOGIN_URL");
    const userEmail = Cypress.env("secrets.TEST_USER_EMAIL");
    const userPassword = Cypress.env("secrets.TEST_USER_PASSWORD");

    // Visit the website
    cy.visit("http://localhost:5500");
    cy.wait(1000);

    // Intercept the authentication request
    // cy.intercept("https://nf-api.onrender.com/api/v1/social/auth/login").as(
    //   "authLogin"
    // );

    cy.intercept(apiLoginUrl).as("authLogin");

    // Click the "login" button
    cy.get("#registerModal .modal-footer button:nth-child(2)").click();
    cy.wait(1000);

    // Fill in login credentials and submit
    // cy.get("input#loginEmail").type("MHerholdt94_test@stud.noroff.no", {
    //   delay: 100,
    // });
    // cy.get("input#loginPassword").type("test1234{enter}", { delay: 100 });
    cy.get("input#loginEmail").type(userEmail, {
      delay: 100,
    });
    cy.get("input#loginPassword").type(userPassword + "{enter}", {
      delay: 100,
    });
    cy.wait(1000);

    // Wait for the authentication request to complete
    cy.wait("@authLogin").its("response.statusCode").should("eq", 200);

    // Verify the user is logged in and is on their profile page
    cy.get("h4").contains("MHerholdt94_test");
    cy.url().should((url) => {
      expect(url).to.include("?view=profile");
    });
  });
});
