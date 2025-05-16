// cypress/support/pages/HomePage.js
class HomePage {
  getTitle() {
    return cy.title();
  }

  getUserMenuLink() {
    return cy.get("#menuUser");
  }

  getSearchBar() {
    return cy.get("#autoComplete");
  }

  getLogo() {
    return cy.get("div.logo");
  }

  getCategorySelect() {
    return cy.get('select[name="categoryListboxContactUs"]');
  }

  getSelectedCategoryOption() {
    return this.getCategorySelect().find("option:selected");
  }

  getCategoryOptions() {
    return this.getCategorySelect().find("option");
  }
}

export default HomePage;
