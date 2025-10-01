const { expect } = require('@playwright/test');

class VideoPage {
  constructor(page) {
    this.page = page;
    this.videoPageLink = page.getByRole('link', { name: 'Videos' }).first();
    this.closePopup = page.locator('#pushengage-opt-in-9-close');
    this.sectionLabels = page.locator(
      "[class='text-[10px] uppercase tracking-[0.4em] lg:px-5 px-4 md:font-bold font-medium text-left bg-foreground text-white py-2.5 rounded-b ']"
    );
  }
}

module.exports = { VideoPage }; 