class LearningAndDevelopmentPage {
  constructor(page) {
    this.page = page;
    this.learningAndDevelopmentLink = page.getByRole('link', { name: 'L&D' }).first();
    this.closePopup = page.locator('#pushengage-opt-in-9-close');
    this.sectionLabels = page.locator(".text-[10px].uppercase.tracking-[0.4em]");
  }
}

module.exports = { LearningAndDevelopmentPage };
