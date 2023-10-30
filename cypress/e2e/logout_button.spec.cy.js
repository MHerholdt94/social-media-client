describe("Logout function", () => {
  it("logs out the user", () => {
    // Visit the website
    cy.visit("http://localhost:5500");
    cy.wait(1000);

    // Click the "login" button
    cy.get("#registerModal .modal-footer button:nth-child(2)").click();
    cy.wait(1000);

    // Fill in login credentials and submit
    cy.get("input#loginEmail").type("MHerholdt94_test@stud.noroff.no", {
      delay: 100,
    });
    cy.get("input#loginPassword").type("test1234{enter}", { delay: 100 });
    cy.wait(2000);

    // Click the "logout" button
    cy.get("button[data-auth='logout']").click();
    cy.wait(1000);

    // Expect rediraction to registration form
    cy.url().should("eq", "http://localhost:5500/");
    cy.get("h5").contains("Create Profile");
  });
});
