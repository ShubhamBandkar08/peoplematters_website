//class=""
const { expect } = require('@playwright/test');

class loginPage {
  constructor(page) {
    this.page = page;
    this.loginSignuplink = page.locator("[class='hidden lg:flex justify-between items-center flex-row text-background']");



  }
}

module.exports = { loginPage };
