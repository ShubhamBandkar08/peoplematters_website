const { expect } = require('@playwright/test');

class RewardsAndPerformancePage {
  constructor(page) {
    this.page = page;
    this.rewardsAndPerformanceLink = page.getByRole('link', { name: 'Rewards & Performance' }).first()

  }
}

module.exports = { RewardsAndPerformancePage }; 