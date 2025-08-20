const { expect } = require('@playwright/test');

const expectedItems = [
  'Strategy',
  'Talent Acquisition',
  'Rewards & Performance',
  'Culture',
  'Technology',
  'L&D',
  'Events',
  'Podcast',
  'Research',
  'Videos'
];

class HomePage {
  constructor(page) {
    this.page = page;
    this.cookieCloseBtn = 'button#cookie-close';
    this.logo = page.getByAltText('People Matters Logo');
    this.hotTopicsSection = page.locator('.lg\\:w-\\[30\\%\\]').first();
    this.hotTopicLinks = this.hotTopicsSection.locator("[class='text-base font-medium text-inkBlack flex-1 line-clamp-2']");
    this.detailPageTitle = page.locator("[class='text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold capitalize']");
   // this.socialMediaBlock = page.locator("[class='mb-10 flex justify-center space-x-6 lg:flex-row flex-wrap']");
     this.socialMediaBlock = page.locator('footer');

  
  }

  async goto() {
    await this.page.goto('https://www.peoplematters.in');
  }

  async clickOnSkip() {
    const proceedButton = this.page.getByRole('button', { name: 'Skip' })

    // Check if the button is visible and wait for it
    if (await proceedButton.isVisible()) {
      // If the button is visible, click it.
      await proceedButton.click();
    }

  }


  async checkMenuNavigation(menuItems) {
    for (const item of menuItems) {
      const menuLink = this.page.getByRole('link', { name: item }).first();

      await menuLink.click();
      await this.page.waitForLoadState('domcontentloaded');

      // await this.goto();
      // const proceedBtn = this.page.getByRole('button', { name: 'Proceed' });

    }
  }
  async validateHotTopicNavigation() {
    await expect(this.hotTopicsSection).toBeVisible();

    const hotTopicCount = await this.hotTopicLinks.count();
    console.log(`Total hot topics found: ${hotTopicCount}`);

    for (let i = 0; i < hotTopicCount; i++) {
      const hotTopicLink = this.hotTopicLinks.nth(i);
      const hotTopicText = (await hotTopicLink.innerText()).trim();
      console.log(`Checking hot topic: ${hotTopicText}`);

      await hotTopicLink.click();
      await this.page.waitForTimeout(6000);

      await expect(this.detailPageTitle).toContainText(hotTopicText + '.');

      await this.page.waitForTimeout(6000);
      await this.page.goBack();
      await this.page.waitForTimeout(6000);
    }


  }


  
  async validateSocialMediaLinks() {
     
    // Find all anchor tags (links) within the social media block.
    const links = await this.socialMediaBlock.locator('a').all();

    // Loop through each link found.
    for (const link of links) {
      // Get the href attribute to check the URL.
      const href = await link.getAttribute('href');

      // Ensure the link has an 'href' and starts with 'https'.
      if (href && href.startsWith('https')) {
        // Create a promise to wait for the new tab (popup) to open upon clicking.
        const [newPage] = await Promise.all([
          this.page.waitForEvent('popup'),
          link.click()
        ]);

        try {
          // Wait for the new page to load completely.
          await newPage.waitForLoadState('load');

          // Assert that the URL of the new page does not contain common error indicators.
          expect.soft(newPage.url(), `Navigation failed for link: ${href}`).not.toContain('error');
          expect.soft(newPage.url(), `Navigation failed for link: ${href}`).not.toContain('404');
          
          // Log a success message.
          console.log(`Successfully navigated to: ${newPage.url()}`);

        } catch (error) {
          // If any part of the try block fails, a specific error message is logged.
          expect.soft(false, `Navigation to ${href} failed with error: ${error.message}`).toBe(true);
        } finally {
          // Always close the new page to avoid an excessive number of open tabs.
          await newPage.close();
        }
      }
    }
  }




}


module.exports = { HomePage, expectedItems };