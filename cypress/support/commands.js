// cypress/support/commands.js
import HomePage from "./POM/HomePage";
const homePage = new HomePage();

Cypress.Commands.add("checkPageTitle", (expectedTitle) => {
  homePage.getTitle().should("include", expectedTitle);
});

Cypress.Commands.add("verifyUserMenuVisible", () => {
  homePage.getUserMenuLink().should("be.visible");
});

Cypress.Commands.add("verifySearchBarEnabled", () => {
  homePage.getSearchBar().should("exist").and("be.enabled");
});

Cypress.Commands.add("verifyLogoVisible", () => {
  cy.wait(30000); // Replace with smarter wait if possible
  homePage.getLogo().should("be.visible");
});

Cypress.Commands.add("verifyDefaultSelectedCategory", (expectedText) => {
  cy.wait(30000); // Replace with smarter wait if possible
  homePage.getSelectedCategoryOption().should("have.text", expectedText);
});

Cypress.Commands.add("verifyCategoryOptions", (expectedCategories) => {
  cy.wait(30000);
  homePage.getCategoryOptions().then((options) => {
    const actual = Array.from(options, (o) => o.innerText);
    expect(actual).to.include.members(expectedCategories);
  });
});
