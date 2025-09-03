const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homepage.page');
const { ResearchPage } = require('../pages/research.page');

test.describe('Research Page', () => {
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

    test('TC_01 : Validate Research Page Loads Successfully', async ({ page }) => {
        const research = new ResearchPage(page);
        await research.researchlink.click();
        await expect(page).toHaveURL(/research/);
    });

    test('TC_03: Validate each section label is visible', async ({ page }) => {
        const research = new ResearchPage(page);
        await research.researchlink.click();
        await page.waitForTimeout(6000);
        const labelCount = await research.sectionLabels.count();
        console.log(`Total section labels found: ${labelCount}`);
        for (let i = 0; i < labelCount; i++) {
            const label = research.sectionLabels.nth(i);
            await expect(label).toBeVisible();
            const labelText = (await label.innerText()).trim();
            console.log(`Section Label ${i + 1}: ${labelText}`);
        }
    })
    //class='flex flex-col gap-y-10 lg:gap-y-16 relative w-full'
    test('TC_04: Validate Research Page all article navigation', async ({ page }) => {
        test.setTimeout(600000);

        const research = new ResearchPage(page);
        await research.researchlink.click();
        await page.waitForTimeout(6000);
        const peoplemattersSection = page.locator("[class='flex flex-col gap-y-10 lg:gap-y-16 relative w-full']");
        const peoplemattersSectionArticles = await peoplemattersSection.locator("h3").count()

        for (let i = 0; i < peoplemattersSectionArticles; i++) {
            const article = peoplemattersSection.locator("h3").nth(i);
            const articleTitle = (await article.innerText()).trim();
            console.log(`Navigating to article: ${articleTitle}`);
            await article.click();
            await page.waitForTimeout(4000);

            const reseachDetailPageTitle = (await (await page.locator("h1")).innerText()).trim();
            await expect(reseachDetailPageTitle).toBe(articleTitle);

            await page.goBack();
            await page.waitForTimeout(4000);



        }

    })

   
});
