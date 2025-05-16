// cypress/e2e/homePage.spec.js

describe("Advantage Online Shopping - Home Page Tests with POM + Custom Commands", () => {
  beforeEach(() => {
    cy.visit("https://advantageonlineshopping.com/#/");
  });

  it('1. Page title contains "Advantage"', () => {
    cy.checkPageTitle("Advantage");
  });

  it("2. User menu link is visible", () => {
    cy.verifyUserMenuVisible();
  });

  it("3. Search bar is present and enabled", () => {
    cy.verifySearchBarEnabled();
  });

  it("4. Should display the site logo", () => {
    cy.verifyLogoVisible();
  });

  it('5. Should have default selected option as "Select Category"', () => {
    cy.verifyDefaultSelectedCategory("Select Category");
  });

  it("6. Should contain all category options", () => {
    const categories = [
      "Select Category",
      "Laptops",
      "Headphones",
      "Tablets",
      "Speakers",
      "Mice",
    ];
    cy.verifyCategoryOptions(categories);
  });
});
