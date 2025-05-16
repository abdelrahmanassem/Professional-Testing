Feature: Advantage Online Shopping Home Page

  Scenario: Page title contains "Advantage"
    Given I open the Advantage Online Shopping home page
    Then the page title should include "Advantage"

  Scenario: User menu link visibility
    Given I open the Advantage Online Shopping home page
    Then the user menu link should be visible

  Scenario: Search bar presence and enabled
    Given I open the Advantage Online Shopping home page
    Then the search bar should exist and be enabled

  Scenario: Site logo visibility
    Given I open the Advantage Online Shopping home page
    Then the site logo should be visible

  Scenario: Default category selection
    Given I open the Advantage Online Shopping home page
    Then the default selected category should be "Select Category"

  Scenario: All categories exist
    Given I open the Advantage Online Shopping home page
    Then the category options should include:
      | Select Category |
      | Laptops         |
      | Headphones      |
      | Tablets         |
      | Speakers        |
      | Mice            |
