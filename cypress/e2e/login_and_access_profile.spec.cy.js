describe("User login and profile access", () => {
  it("logs in user and accesses profile", () => {
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
    cy.wait(1000);

    // Verify the user is logged in and is on their profile page
    cy.get("h4").contains("MHerholdt94_test");
    cy.url().should((url) => {
      expect(url).to.include("?view=profile");
    });
  });
});
