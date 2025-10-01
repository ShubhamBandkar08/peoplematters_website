const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homepage.page');
const { TechnologyPage } = require('../pages/technologypage.page');
const { VideoPage } = require('../pages/videopage.page');

test.describe('Video Page', () => {
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

    test('TC_01 : Validate video Page Loads Successfully', async ({ page }) => {
        const videoobj = new VideoPage(page);
        await videoobj.videoPageLink.click();
        await expect(page).toHaveURL(/videos/);
    })

    test('TC_02 : Validate video Page Section Labels', async ({ page }) => {
        const videoobj = new VideoPage(page);
        await videoobj.videoPageLink.click();
        await page.waitForTimeout(6000);
        // Correct locator
        const sectionLabels = page.locator("[class='text-[10px] uppercase tracking-[0.4em] lg:px-5 px-4 md:font-bold font-medium text-left bg-foreground text-white py-2.5 rounded-b ']");
        const sectionLebalCount = await sectionLabels.count();
        console.log("Section label count is: " + sectionLebalCount);

        for (let i = 0; i < sectionLebalCount; i++) {
            const labelText = await sectionLabels.nth(i).innerText();
            console.log(`Section Label ${i + 1}: ${labelText}`);
        }
    })

    //     test('TC_03 : Validate video page sub-category navigation', async ({ page }) => {
    //         test.setTimeout(8000000);
    //         await page.goto('https://pmpl-user1:Pmpl@2025!@beta-me.peoplemattersglobal.com/');
    //         await page.waitForTimeout(6000);
    //        for (let i = 0; i <= 50; i++) {
    //         const adBanner = page.locator("[alt='Ad banner']");
    //         await adBanner.waitFor({ state: 'visible', timeout: 10000 });
    //         const [newPage] = await Promise.all([
    //             page.context().waitForEvent('page'),
    //             adBanner.click()
    //         ]);

    //         // Optionally, wait for the new page to load
    //         await newPage.waitForLoadState('domcontentloaded');

    //         // Close the new tab
    //         await newPage.close();

    //         // Short wait if needed
    //         await page.waitForTimeout(1000);
    //     }
    //     })


    //      test('TC_04 : Validate video page sub-category navigation', async ({ page }) => {
    //         test.setTimeout(8000000);
    //         await page.goto('https://pmpl-user1:Pmpl@2025!@beta-me.peoplemattersglobal.com/');
    //         await page.waitForTimeout(6000);
    //         const menuname = page.locator("[class='text-sm font-medium text-background transition-all duration-300 flex items-center']");

    //         const menuCount = await menuname.count();
    //         console.log("Menu count is: " + menuCount);
    //         for (let i = 0; i < menuCount; i++) {
    //             const menuText = await menuname.nth(i).innerText();
    //             console.log(`Clicking on menu: ${menuText}`);       
    //             await Promise.all([
    //                 menuname.nth(i).click(),
    //                 page.waitForLoadState('networkidle') // Wait for the page to load after clicking
    //             ]);
    //             await page.waitForTimeout(6000);  
    //             await page.locator('h3').first().click();
    //             await page.waitForTimeout(6000);
    //         }
    //     })

    //     test('TC_05 : Validate video page ad banner loads 100 times', async ({ browser }) => {
    //          test.setTimeout(8000000);
    //         for (let i = 0; i < 100; i++) {
    //         const context = await browser.newContext();
    //         const page = await context.newPage();
    //         await page.goto('https://pmpl-user1:Pmpl@2025!@beta-me.peoplemattersglobal.com/', { waitUntil: 'load' });
    //         const adBanner = page.locator("[alt='Ad banner']");
    //         await adBanner.waitFor({ state: 'visible', timeout: 20000 });
    //         await context.close(); // This closes the browser context (tab)
    //     }
    // });

    test('TC_03 : Validate video page title and description is displayed ', async ({ page }) => {
        test.setTimeout(8000000);
        const videoobj = new VideoPage(page);
        await videoobj.videoPageLink.click();
        await page.waitForTimeout(6000);
        await page.locator("[class='text-4xl md:text-5xl text-foreground font-bold mb-4']").isVisible();
        await page.locator("[class='text-foreground text-left mb-8 max-w-7xl mx-auto w-full xl:px-0 sm:px-6 lg:px-8 px-4']").isVisible();
    })

    test('TC_04 : Validate video page all articles image contain Video play icon ', async ({ page }) => {
        test.setTimeout(8000000);
        const videoobj = new VideoPage(page);
        await videoobj.videoPageLink.click();
        await page.waitForTimeout(6000);
        //Feature section 
        const videoPageSection = await page.locator("[class='flex flex-col gap-y-10 lg:gap-y-16 relative w-full']");
        const playIcon = videoPageSection.locator('svg');
        const playIconCount = await playIcon.count();
        console.log("Play icon count is: " + playIconCount);
        for (let i = 0; i < playIconCount; i++) {
            await expect(playIcon.nth(i)).toBeVisible();
        }
        //[stroke-linecap="round"]

    });

    test("TC_05 : Validate Footer section is displayed on Video page", async ({ page }) => {
        const videoobj = new VideoPage(page);
        await videoobj.videoPageLink.click();
        await page.waitForTimeout(6000);
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();
        const footerPMLogo = footer.locator("[class='mx-auto']");
        await expect(footerPMLogo).toBeVisible();
    })

    test("TC_06 : Validate video page all article are video articles", async ({ page }) => {
        test.setTimeout(8000000);
        const videoobj = new VideoPage(page);
        await videoobj.videoPageLink.click();
        await page.waitForTimeout(6000);
        const videoPageSection = await page.locator("[class='flex flex-col gap-y-10 lg:gap-y-16 relative w-full']");
        const articles = videoPageSection.locator('h3');
        const articlesCount = await articles.count();
        // console.log("Articles count is: " + articlesCount); 
        for (let i = 0; i < articlesCount; i++) {
            const articleTitle = await articles.nth(i).innerText();
            console.log(`Clicking on article: ${articleTitle}`);
            await Promise.all([
                articles.nth(i).click(),
                page.waitForLoadState('networkidle') // Wait for the page to load after clicking
            ]);
            await expect(page).toHaveURL(/video/);
            await page.waitForTimeout(6000);
            await page.goBack();
            await page.waitForTimeout(6000);


        }

    })

    test("TC_07 : Validate video page all article Navigation", async ({ page }) => {
        test.setTimeout(8000000);
        const videoobj = new VideoPage(page);
        await videoobj.videoPageLink.click();
        await page.waitForTimeout(6000);
        const videoPageSection = await page.locator("[class='flex flex-col gap-y-10 lg:gap-y-16 relative w-full']");
        const articles = videoPageSection.locator('h3');
        const articlesCount = await articles.count();
        // console.log("Articles count is: " + articlesCount); 
        for (let i = 0; i < articlesCount; i++) {
            const articleTitle = await articles.nth(i).innerText();
            console.log(`Clicking on article: ${articleTitle}`);
            await Promise.all([
                articles.nth(i).click(),
                page.waitForLoadState('networkidle') // Wait for the page to load after clicking
            ]);
            await page.waitForTimeout(6000);
            const VideoPageTitle = await page.locator("h1").first().innerText();
            await expect(VideoPageTitle).toContain(articleTitle);
            await page.waitForTimeout(6000);
            await page.goBack();
            await page.waitForTimeout(6000);


        }

    })


 //
});