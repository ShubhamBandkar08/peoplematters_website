const { expect } = require('@playwright/test');

class StrategyPage {
  constructor(page) {
    this.page = page;
    this.strategyLink = page.getByRole('link', { name: 'Strategy' }).first();
    this.closePopup = page.locator('#pushengage-opt-in-9-close');
    this.sectionLabels = page.locator(
      "[class='text-[10px] uppercase tracking-[0.4em] lg:px-5 px-4 md:font-bold font-medium text-left bg-foreground text-white py-2.5 rounded-b ']"
    );
    this.subCatDiv = page.locator("div.flex.flex-wrap.gap-y-4");
    this.pageTitle = page.locator("h1, [class*='text-[32px]']");
    this.articleSection = page.locator("[class='flex flex-col gap-y-10 lg:gap-y-16 relative w-full']");
    this.articles = this.articleSection.locator("h3");

  }
  async validateSubcategories() {
    const subcategories = this.subCatDiv.locator('a');
    const count = await subcategories.count();

    for (let i = 0; i < count; i++) {
      const subCat = subcategories.nth(i);
      const text = (await subCat.textContent()).replace(/\n/g, '').trim();

      console.log(`Subcategory ${i + 1}:`, text);
      await subCat.click();

      // Assert page title contains subcategory text
      await this.page.waitForTimeout(2000);
      await expect(this.pageTitle).toContainText(text);

      await this.page.goBack();
      await this.page.waitForTimeout(2000);
    }
  }

  async validateArticlesNavigation(page) {
    const articleCount = await this.articles.count();
    console.log('Total articles found:', articleCount);

    for (let i = 0; i < articleCount; i++) {
      const article = this.articles.nth(i);
      const articleText = await article.textContent();

      await article.click()
      await page.waitForTimeout(7000);
      const articlePageTitle = await page.locator("h1").first().textContent();
      await expect(articlePageTitle.trim()).toContain(articleText.trim(), { timeout: 1500 });
      await page.waitForTimeout(5000);
      await page.goBack();
      await page.waitForTimeout(5000);
    }
  }

}


module.exports = { StrategyPage }; 