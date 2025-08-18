const { expect } = require('@playwright/test');

class PodcastPage {
    constructor(page) {
        this.page = page;
        this.podcastLink = page.getByRole('link', { name: 'Podcast' })
        this.closePopup = page.locator('#pushengage-opt-in-9-close');
        this.episodeCards = page.locator("[class='border border-inactiveGray rounded-lg py-[23px] px-3 flex flex-col h-full transition-shadow hover:shadow-lg']");
    }
}
module.exports = { PodcastPage };