const { test, expect } = require('@playwright/test');
const { loginPage } = require('../pages/loginpage.page');
const { HomePage, expectedItems } = require('../pages/homepage.page');


test.describe('login Page', () => {
    test.use({
        viewport: { width: 1280, height: 720 },
    });

    let hp;
    test.beforeEach(async ({ page }) => {
        test.setTimeout(60000);
        // Navigate to the home page before each test
        const hp = new HomePage(page);
        await hp.goto();
        await page.waitForTimeout(6000);
        await hp.clickOnSkip();
        await page.waitForTimeout(6000);
    })
    test('TC_01 : Validate login/sign-up Page Loads Successfully', async ({ page }) => {
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

    test('TC_03 : Validate logging into the website using invalid credentials', async ({ page }) => {
        test.setTimeout(120000);
        const loginSignup = new loginPage(page);
        await loginSignup.loginSignuplink.click();
        await page.waitForTimeout(4000);
        await page.locator("input[placeholder='Enter Email']").fill('sam@gmail.com');
        await page.locator("button[type='submit']").click();
        await page.waitForTimeout(2000);
        //validate otp send toast is displayed or not
        const invalidToast = page.locator("[class='fixed top-4 right-4 z-[9999] flex flex-col gap-2 items-end']");
        await expect(invalidToast).toBeVisible();

    })

    test("TC_05 : Validate logging into the website using invalid OTP", async ({ page }) => {
    test.setTimeout(120000);
        const loginSignup = new loginPage(page);
        await loginSignup.loginSignuplink.click();
        await page.waitForTimeout(4000);
        await page.locator("input[placeholder='Enter Email']").fill('shubhambandkar7@gmail.com');
        await page.locator("button[type='submit']").click();
        await page.waitForTimeout(20000);
        await page.locator("[id$='otp-0']").fill('1');
        await page.locator("[id$='otp-1']").fill('2');
        await page.locator("[id$='otp-2']").fill('3');
        await page.locator("[id$='otp-3']").fill('4');
        await page.locator("[id$='otp-4']").fill('5');
        await page.getByRole('button', { name: 'VERIFY' }).click();
        await page.waitForTimeout(2000);
        const invalidOtpToast = page.locator("[class='text-xs font-medium text-red-800 leading-tight']");
        await expect(invalidOtpToast).toBeVisible();

    
    })
})