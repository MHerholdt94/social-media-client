describe("Login form validation", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  })
  
  it("fails with wrong credentials", () => {
    // Visit the website
    cy.visit(Cypress.env("baseUrl"));
    cy.wait(2000);

    // Intercept the authentication request
    cy.intercept(Cypress.env("apiLoginUrl")).as("authLogin");

    // Click the "login" button
    cy.get("#registerModal .modal-footer button:nth-child(2)").click();
    cy.wait(1000);

    // Fill in "wrong" login credentials and submit
    cy.get("input#loginEmail").type("wrong-email@stud.noroff.no", {
      delay: 100,
    });
    cy.get("input#loginPassword").type("wrong-password{enter}", { delay: 100 });
    cy.wait(1000);

    // Wait for the authentication request to complete
    cy.wait("@authLogin").its("response.statusCode").should("eq", 401);

    // Expect an alert to pop up with text
    cy.on("window:alert", (text) => {
      expect(text).to.exist;
    });
  });

  it("fails with invalid email credentials", () => {
    // Visit the website
    cy.visit(Cypress.env("baseUrl"));
    cy.wait(2000);

    // Click the "login" button
    cy.get("#registerModal .modal-footer button:nth-child(2)").click();
    cy.wait(1000);

    // Fill in password and submit with no email
    cy.get("input#loginPassword").type("password{enter}", { delay: 100 });
    cy.wait(1000);

    // Expect error message (please enter email)
    cy.get("input#loginEmail:invalid").should("have.length", 1);

    // Fill in invalid email credentials and submit
    cy.get("input#loginEmail").type("invalid-email", {
      delay: 100,
    });
    cy.get("input#loginPassword").type("{enter}");
    cy.wait(1000);

    // Expect error message (invalid email credentials)
    cy.get("input#loginEmail:invalid").should("have.length", 1);
    cy.wait(1000);

    // Fill in invalid email address domain and submit
    cy.get("input#loginEmail").type("@gmail.com", { delay: 100 });
    cy.get("input#loginPassword").type("{enter}");
    cy.wait(1000);

    // Expect error message (must be valid Noroff email)
    cy.get("input#loginEmail:invalid").should("have.length", 1);
  });
});
