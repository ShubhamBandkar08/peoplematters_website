const { expect } = require('@playwright/test');

class PodcastPage {
  constructor(page) {
    this.page = page;
    this.podcastLink = page.getByRole('link', { name: 'Podcast' })
    this.closePopup = page.locator('#pushengage-opt-in-9-close');
    this.episodeCards = page.locator("[class='border border-inactiveGray rounded-lg py-[23px] px-3 flex flex-col h-full transition-shadow hover:shadow-lg']");
    this.episodeCards = page.locator("[class='border border-inactiveGray rounded-lg py-[23px] px-3 flex flex-col h-full transition-shadow hover:shadow-lg']");


  }

  async validateEpisodeCardStructure() {
    const cardCount = await this.episodeCards.count();

    for (let i = 0; i < cardCount; i++) {
      const card = this.episodeCards.nth(i);

      // Scroll into view
      await card.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(2000);

      // Validate Episode title
      const title = card.locator("[class='text-lg md:text-xl font-meidum mb-4 text-gray-900 leading-tight line-clamp-2']");
      await expect(title).toBeVisible();
      const titleText = (await title.innerText()).trim();
      expect(titleText.includes('EP') || titleText.includes('Trailer')).toBeTruthy();

      // Validate Image
      const image = card.locator("img");
      await expect(image).toBeVisible();

      // Validate "GO TO EPISODE" button
      const button = card.getByText("GO TO EPISODE");
      await expect(button).toBeVisible();

      // VAlidate Episode Duration is visible 
      const duration = card.locator("[class='text-foreground font-medium text-[10px] md:text-xs']")
      await expect(duration).toHaveText(/\d{2}:\d{2}/);

    }
  }



}
module.exports = { PodcastPage };