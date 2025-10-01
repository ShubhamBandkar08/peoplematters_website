const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homepage.page');
const { StrategyPage } = require('../pages/strategy.page');

test.describe('Strategy Page', () => {
    test.use({
        viewport: { width: 1280, height: 720 },
    });

    test.beforeEach(async ({ page }) => {
        const hp = new HomePage(page);
        await hp.goto();
        await page.waitForTimeout(6000);
        await hp.clickOnSkip();
        await page.waitForTimeout(6000);
    });

    test('TC_01 : Validate Strategy Page Loads Successfully', async ({ page }) => {
        const strategyPage = new StrategyPage(page);
        await strategyPage.strategyLink.click();
        await expect(page).toHaveURL(/strategy/);
    })

    test('TC_02 : Validate Strategy Page Section Labels', async ({ page }) => {
        const strategyPage = new StrategyPage(page);

        // Click Strategy link
        await strategyPage.strategyLink.click();
        await page.waitForTimeout(6000);

        // Correct locator
        const sectionLabels = page.locator("[class='text-[10px] uppercase tracking-[0.4em] lg:px-5 px-4 md:font-bold font-medium text-left bg-foreground text-white py-2.5 rounded-b ']");

        // Get how many labels are found
        const count = await sectionLabels.count();

        for (let i = 0; i < count; i++) {
            const label = sectionLabels.nth(i);
            const text = await label.textContent();
            console.log(`Label ${i + 1}:`, text?.trim());

            await expect(label).toBeVisible();
        }
    });

    test('TC_03 : Validate Strategy page sub-category navigation', async ({ page }) => {
        test.setTimeout(160000);
        const strategyPage = new StrategyPage(page);

        // Click Strategy link
        await strategyPage.strategyLink.click();
        await page.waitForTimeout(6000);
        const subCatDiv = await page.locator("[class='flex flex-wrap gap-y-4 gap-x-6 md:gap-x-12 items-center snap-x snap-mandatory scroll-smooth touch-pan-x']");
        const subcategory = await subCatDiv.locator('a');
        const subcategoryCount = await subcategory.count();
        // console.log('Total subcategories found:', subcategoryCount);
        for (let i = 0; i < subcategoryCount; i++) {
            const subCat = subcategory.nth(i);
            const subCatText = await subCat.textContent();
            const cleanedSubCatText = subCatText.replace(/\n/g, '').trim();
            console.log(`Subcategory ${i + 1}:`, cleanedSubCatText);
            await subCat.click();
            await page.waitForTimeout(6000);

            const subcatPageTitle = await page.locator("[class='text-[32px] md:text-6xl font-medium capitalize lg:whitespace-nowrap whitespace-normal text-ellipsis']");
            const cleanedTitle = (await subcatPageTitle.textContent()).replace(/\n/g, '').trim();
            // Assert after cleaning
            await expect(cleanedTitle).toContain(cleanedSubCatText, { timeout: 15000 });
            //check api response 

            await page.waitForTimeout(5000);
            await page.goBack();
            await page.waitForTimeout(5000);

        }

    })

    test('TC_04 : Validate Strategy page Sticky header subcategory navigation', async ({ page }) => {
        test.setTimeout(200000);
        const strategyPage = new StrategyPage(page);
        // Click Strategy link
        await strategyPage.strategyLink.click();
        await page.waitForTimeout(6000);
        //scolldown
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(6000);
        await page.locator("ul[class='flex items-center space-x-8'] a[class='text-sm font-medium text-orange underline transition-all duration-300']").hover();
        await page.waitForTimeout(6000);
        const stickyHeaderMenu = await page.locator("[class='text-sm text-gray-700 hover:text-orange-500 transition-colors']");
        const stickyHeaderMenuCount = await stickyHeaderMenu.count();
        console.log('Total subcategories found:', stickyHeaderMenuCount);
        for (let i = 0; i < stickyHeaderMenuCount; i++) {
            const menu = stickyHeaderMenu.nth(i);
            const menuText = await menu.textContent();
            const cleanedMenuText = menuText.replace(/\n/g, '').trim();
            console.log(`Subcategory ${i + 1}:`, cleanedMenuText);
            await menu.click();
            await page.waitForTimeout(6000);
            const menuPageTitle = await page.locator("[class='text-[32px] md:text-6xl font-medium capitalize lg:whitespace-nowrap whitespace-normal text-ellipsis']");
            const cleanedTitle = (await menuPageTitle.textContent()).replace(/\n/g, '').trim();
            // Assert after cleaning
            await expect(cleanedTitle).toContain(cleanedMenuText, { timeout: 15000 });
            await page.waitForTimeout(5000);
            await page.goBack();
            await page.waitForTimeout(5000);
            await page.mouse.wheel(0, 600);
            await page.waitForTimeout(6000);
            await page.locator("ul[class='flex items-center space-x-8'] a[class='text-sm font-medium text-orange underline transition-all duration-300']").hover();
            await page.waitForTimeout(6000);
           

        }

    })

    test('TC_05 : Validate Strategy Page Articles navigation and load successfully', async ({ page }) => {
        test.setTimeout(40000000);
        // Click Strategy link
        const strategyPage = new StrategyPage(page);
        await strategyPage.strategyLink.click();
        await page.waitForTimeout(6000);
        // const articleSection = page.locator("[class='flex flex-col gap-y-10 lg:gap-y-16 relative w-full']");
        // const articles = articleSection.locator("h3");
        // const articleCount = await articles.count();
        // console.log('Total articles found:', articleCount);
        // for (let i = 0; i < articleCount; i++) {
        //     const article = articles.nth(i);
        //     const articleText = await article.textContent();
        //     await article.click()
        //     await page.waitForTimeout(7500);
        //     const articlePageTitle = await page.locator("h1").textContent();
        //     await expect(articlePageTitle.trim()).toContain(articleText.trim(), { timeout: 15000 });
        //     await page.waitForTimeout(5000);
        //     await page.goBack();
        //     await page.waitForTimeout(5000);
        // }
        await strategyPage.validateArticlesNavigation(page);
    })

   



})
