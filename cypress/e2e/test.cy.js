describe("Product Search Flow", () => {
  //id to
  //a[href="/products"
  //"#search_product"
  //#submit_search"

  it("Search Product", () => {
    cy.visit("http://automationexercise.com");
    cy.get("body").should("be.visible");
    cy.get('a[href="/products"]').click();
    cy.url().should("include", "/products");
    cy.contains("All Products").should("be.visible");
    cy.get("#search_product").type("dress");
    cy.get("#submit_search").click();
    cy.contains("Searched Products").should("be.visible");
    cy.get(".productinfo.text-center").should("have.length.greaterThan", 0);
  });
});
