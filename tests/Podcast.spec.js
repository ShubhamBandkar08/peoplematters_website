const { test, expect } = require('@playwright/test');
const { PodcastPage } = require('../pages/Podcast.page');
const { HomePage, expectedItems } = require('../pages/homepage.page');

test.describe('Podcast Page', () => {
  test('TC_01 : Validate Podcast Page Loads Successfully', async ({ page }) => {
    const hp = new HomePage(page);
    await hp.goto();
    await page.waitForTimeout(6000);
    await hp.clickOnSkip();
    await page.waitForTimeout(6000);
    const podcastPage = new PodcastPage(page);

    // Click podcast link and wait for navigation
    
      podcastPage.podcastLink.click()

    // Validate URL and intro text
    await expect(page).toHaveURL(/podcast/);
  });
});
