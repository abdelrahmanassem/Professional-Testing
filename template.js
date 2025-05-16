describe("Sauce Demo Test Suite", () => {
  it("should log in with valid credentials", () => {
    cy.visit("https://www.saucedemo.com/", {
      timeout: 60000,
      failOnStatusCode: false,
      waitUntil: "domcontentloaded",
    });
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get(".inventory_list").should("be.visible");
    cy.get(".title").should("contain.text", "Products");
  });
  it("should show error on invalid login", () => {
    cy.visit("https://www.saucedemo.com/", {
      timeout: 60000,
      failOnStatusCode: false,
      waitUntil: "domcontentloaded",
    });
    cy.get('[data-test="username"]').type("wrong_user");
    cy.get('[data-test="password"]').type("wrong_pass");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should("exist");
    cy.get('[data-test="error"]').should(
      "contain.text",
      "Username and password do not match"
    );
    cy.url().should("include", "https://www.saucedemo.com/");
  });
  it("should display all products after login", () => {
    cy.login();
    cy.get(".inventory_item").should("have.length", 6);
    cy.get(".inventory_item_name").first().should("be.visible");
    cy.get(".inventory_item_price").each(($el) => {
      expect($el.text()).to.match(/\$\d+\.\d{2}/);
    });
  });
  it("should add one item to the cart", () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("contain.text", "1");
    cy.get('[data-test="remove-sauce-labs-backpack"]').should("be.visible");
    cy.get(".shopping_cart_link").should("be.visible");
  });
  it("should remove item from the cart", () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_badge").should("not.exist");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should("exist");
    cy.get(".inventory_item_name").first().should("be.visible");
  });
  it("should add multiple items to cart and update badge", () => {
    cy.login();
    cy.get('[data-test^="add-to-cart"]').each(($btn, index) => {
      if (index < 3) cy.wrap($btn).click();
    });
    cy.get(".shopping_cart_badge").should("contain.text", "3");
    cy.get('[data-test^="remove"]').should("have.length", 3);
    cy.get(".shopping_cart_link").should("be.visible");
  });
  it("should navigate to cart and show selected items", () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "cart.html");
    cy.get(".cart_item").should("have.length", 1);
    cy.get(".inventory_item_name").should(
      "contain.text",
      "Sauce Labs Bike Light"
    );
  });
  it("should proceed to checkout from cart", () => {
    cy.login();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "checkout-step-one.html");
    cy.get(".title").should("contain.text", "Checkout: Your Information");
    cy.get("form").should("exist");
  });
  it("should fill out checkout form and continue", () => {
    cy.login();
    cy.addToCart("sauce-labs-backpack");
    cy.visit("/cart.html");
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.url().should("include", "checkout-step-two.html");
    cy.get(".cart_item").should("have.length", 1);
    cy.get(".title").should("contain.text", "Checkout: Overview");
  });
  it("should complete the checkout process", () => {
    cy.completeCheckout();
    cy.url().should("include", "checkout-complete.html");
    cy.get(".complete-header").should("contain.text", "Thank you");
    cy.get(".pony_express").should("be.visible");
  });
  it("should show error for missing checkout info", () => {
    cy.login();
    cy.addToCart("sauce-labs-backpack");
    cy.visit("/cart.html");
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("be.visible");
    cy.get('[data-test="error"]').should(
      "contain.text",
      "First Name is required"
    );
    cy.url().should("include", "checkout-step-one.html");
  });
  it("should log out successfully", () => {
    cy.login();
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();
    cy.url().should("include", "https://www.saucedemo.com/");
    cy.get('[data-test="login-button"]').should("be.visible");
    cy.get('[data-test="username"]').should("be.visible");
  });
  it("should sort products by price (low to high)", () => {
    cy.login();
    cy.get('[data-test="product_sort_container"]').select("lohi");
    cy.get(".inventory_item_price").then(($prices) => {
      const priceValues = [...$prices].map((el) =>
        parseFloat(el.innerText.replace("$", ""))
      );
      expect(priceValues).to.deep.equal([...priceValues].sort((a, b) => a - b));
    });
    cy.get('[data-test="product_sort_container"]').should("have.value", "lohi");
    cy.get(".inventory_item").should("have.length", 6);
  });
  it("should open and close burger menu", () => {
    cy.login();
    cy.get("#react-burger-menu-btn").click();
    cy.get(".bm-item-list").should("be.visible");
    cy.get("#about_sidebar_link").should("exist");
    cy.get("#react-burger-cross-btn").click();
    cy.get(".bm-item-list").should("not.be.visible");
  });
  it("should verify product item UI elements", () => {
    cy.login();
    cy.get(".inventory_item")
      .first()
      .within(() => {
        cy.get(".inventory_item_name").should("be.visible");
        cy.get(".inventory_item_desc").should("be.visible");
        cy.get(".inventory_item_price").should("contain.text", "$");
      });
  });
});
