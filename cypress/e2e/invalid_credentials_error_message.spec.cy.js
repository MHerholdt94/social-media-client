describe("Login form validation", () => {
  it("fails with wrong credentials", () => {
    // Visit the website
    cy.visit("http://localhost:5500");
    cy.wait(1000);

    // Intercept the authentication request
    cy.intercept("https://nf-api.onrender.com/api/v1/social/auth/login").as(
      "authLogin",
    );

    // Click the "login" button
    cy.get("#registerModal .modal-footer button:nth-child(2)").click();
    cy.wait(1000);

    // Fill in "wrong" login credentials and submit
    cy.get("input#loginEmail").type("wrong-email@stud.noroff.no", {
      delay: 100,
    });
    cy.get("input#loginPassword").type("password123{enter}", { delay: 100 });
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
    cy.visit("http://localhost:5500");
    cy.wait(1000);

    // Click the "login" button
    cy.get("#registerModal .modal-footer button:nth-child(2)").click();
    cy.wait(1000);

    // Fill in password and submit
    cy.get("input#loginPassword").type("password123{enter}", { delay: 100 });
    cy.wait(1000);

    // Expect error message (please enter e-mail)
    cy.get("input#loginEmail:invalid").should("have.length", 1);

    // Fill in "wrong" email credentials and submit
    cy.get("input#loginEmail").type("invalid-email", {
      delay: 100,
    });
    cy.get("input#loginPassword").type("{enter}");
    cy.wait(1000);

    // Expect error message (wrong email credentials)
    cy.get("input#loginEmail:invalid").should("have.length", 1);
    cy.wait(1000);

    // Fill in wrong email address domain and submit
    cy.get("input#loginEmail").type("@gmail.com", { delay: 100 });
    cy.get("input#loginPassword").type("{enter}");

    // Expect error message (must be valid Noroff email)
    cy.get("input#loginEmail:invalid").should("have.length", 1);
  });
});
