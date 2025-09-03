const { test, expect } = require('@playwright/test');
const { loginPage } = require('../pages/loginpage.page');
const { HomePage, expectedItems } = require('../pages/homepage.page');


test.describe('login Page', {}, () => {
    test.use({
        viewport: { width: 1280, height: 720 },
    });

    let hp;
    test.beforeEach(async ({ page }) => {
        // Navigate to the home page before each test
        const hp = new HomePage(page);
        await hp.goto();
        await page.waitForTimeout(6000);
        await hp.clickOnSkip();
        await page.waitForTimeout(6000);
    })
    test('TC_01 : Validate Podcast Page Loads Successfully', async ({ page }) => {
        const loginSignup = new loginPage(page);
        await loginSignup.loginSignuplink.click();
        await expect(page).toHaveURL(/login/);
    })

    test('TC_02 : Validate logging into the website using valid credentials', async ({ page }) => {
        test.setTimeout(120000);

        const loginSignup = new loginPage(page);
        await loginSignup.loginSignuplink.click();
        await page.waitForTimeout(4000);
        await page.locator("input[placeholder='Enter Email']").fill('shubhambandkar08@gmail.com');
        await page.locator("button[type='submit']").click();
        await page.waitForTimeout(20000);
        //validate otp send toast is displayed or not
        await page.locator("[class='w-full py-3 rounded-md bg-orange text-white font-medium hover:bg-orange/90 transition-colors']").click();



    })
})