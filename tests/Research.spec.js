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

test.describe('Research article detail Page', () => {
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

    test('TC_05: Validate Article Headline and image visible', async ({ page }) => {
        test.setTimeout(600000);
        const research = new ResearchPage(page);
        await research.researchlink.click();
        await page.waitForTimeout(6000);
        await page.locator("[class='text-2xl lg:text-4xl font-normal mb-2.5']").first().click();
        await page.waitForTimeout(6000);
        const headline = page.locator('h1');
        await expect(headline).toBeVisible({ timeout: 15000 });
        const articleImage = page.locator("[alt='Article cover image']");
        await expect(articleImage).toBeVisible();
    });

    test('TC_06: Validate Author Name and image is visible', async ({ page }) => {
        test.setTimeout(600000);
        const research = new ResearchPage(page);
        await research.researchlink.click();
        await page.waitForTimeout(6000);

        page.locator("[class='relative w-full mb-4 overflow-hidden rounded aspect-video']").first().click();
        await page.waitForTimeout(6000);
        const AuthorName = page.locator("[class='whitespace-nowrap']")
        await AuthorName.isVisible();
        const authandImgSec = page.locator("[class='flex items-center space-x-3']");
        const authorImage = authandImgSec.locator("[class='object-contain']")
        await authorImage.isVisible();

    })

    test('TC_07:Validate publish date is visible', async ({ page }) => {
        test.setTimeout(600000);
        const research = new ResearchPage(page);
        await research.researchlink.click();
        await page.waitForTimeout(6000);

        page.locator("[class='relative w-full mb-4 overflow-hidden rounded aspect-video']").first().click();
        await page.waitForTimeout(6000);
        // Publish date
        await expect(page.locator('time').first()).toBeVisible();
    })

    test('TC_08 :Validate Validate WhatsApp button works', async ({ page }) => {
        test.setTimeout(600000);
        const research = new ResearchPage(page);
        await research.researchlink.click();
        await page.waitForTimeout(6000);
        page.locator("[class='relative w-full mb-4 overflow-hidden rounded aspect-video']").first().click();
        await page.waitForTimeout(6000);
        const whatsappBtn = page.getByRole('link', { name: 'Join Us' })
        await expect(whatsappBtn).toBeVisible();
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            whatsappBtn.click()
        ]);
        await expect(newPage).toHaveURL(/whatsapp/);
    })

    test('TC_09 :Validate Validate Follow us button works', async ({ page }) => {
        test.setTimeout(600000);
        const research = new ResearchPage(page);
        await research.researchlink.click();
        await page.waitForTimeout(6000);
        page.locator("[class='relative w-full mb-4 overflow-hidden rounded aspect-video']").first().click();
        await page.waitForTimeout(6000);
        const followUSBtn = page.getByRole('main').getByRole('link', { name: 'Google News' })
        await expect(followUSBtn).toBeVisible();
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            followUSBtn.click()
        ]);
        await page.waitForTimeout(10000);
        await expect(newPage).toHaveURL(/publications/);
    })

    test('TC_10 : Validate social share icons open correct tabs', async ({ page }) => {
        test.setTimeout(100000);
        const research = new ResearchPage(page);
        await research.researchlink.click();
        await page.waitForTimeout(6000);
        page.locator("[class='relative w-full mb-4 overflow-hidden rounded aspect-video']").first().click();
        await page.waitForTimeout(6000);

        const socialShares = [
            { name: 'Facebook', locator: 'button[title="Share on Facebook"]', urlPattern: /facebook/ },
            { name: 'LinkedIn', locator: 'button[title="Share on LinkedIn"]', urlPattern: /linkedin/ },
            { name: 'X', locator: 'button[title="Share on Twitter"]', urlPattern: /x.com/ }
        ];

        for (const share of socialShares) {
            const [newPage] = await Promise.all([
                page.waitForEvent('popup'),
                page.locator(share.locator).click()
            ]);
            await expect(newPage).toHaveURL(share.urlPattern);
            console.log(`✅ ${share.name} share opened: ${await newPage.url()}`);
            await newPage.close(); // close popup after validation
        }
    });

   






})   