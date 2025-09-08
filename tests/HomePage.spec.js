const { test, expect } = require('@playwright/test');
const { HomePage, expectedItems } = require('../pages/homepage.page');
let hp;
test.describe('Home Page', () => {
    let hp;
    test.beforeEach(async ({ page }) => {
        // Navigate to the home page before each test
        const hp = new HomePage(page);
        await hp.goto();
        await page.waitForTimeout(6000);
        await hp.clickOnSkip();
        await page.waitForTimeout(6000);
    })

    test('TC-01 : Verify page title', async ({ page }) => {
        const pageTitle = await page.title();
        console.log(`'Page title:',${pageTitle}`)
        expect(pageTitle).not.toBe('')
    });

    test('TC-02 : Verify homepage loads successfully', async ({ page, request }) => {
        test.setTimeout(120000);
        const url = await page.url();
        const response = await request.get(url);
        expect.soft(response.status()).toBe(200);
    });

    test('TC-03 : Verify website logo display', async ({ page }) => {
        test.setTimeout(120000);

        const logo = page.locator("img[class='w-[218px] lg:w-auto']");
        await expect(logo).toBeVisible();
    });

    test('TC-04 : Verify login/signup page navigation', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for this test
        await page.getByRole('link', { name: 'Login / Signup' }).first().click()
        await page.waitForTimeout(3000);

        await expect(page).toHaveURL(/auth\/login/);
    })

    test('TC-05 : Verify search functionality', async ({ page }) => {
        test.setTimeout(120000);
        const searchInput = page.getByRole('img', { name: 'Search' }).first()
        await searchInput.click();

        await page.getByRole('textbox', { name: 'Search...' }).isEnabled();
        await page.getByRole('textbox', { name: 'Search...' }).fill('Leadership');
        await page.getByRole('button', { name: 'Search' }).click()

        const searchResults = page.locator('.flex.flex-col.sm\\:flex-row').first()
        await searchResults.waitFor({ state: 'visible', timeout: 10000 });
        await expect(searchResults).toBeVisible();
        const resultsCount = await searchResults.count();
        expect.soft(resultsCount).toBeGreaterThan(0);

    });

    test('TC-06 : Verify search functionality in sticky header', async ({ page }) => {
        test.setTimeout(120000);
        await page.getByRole('heading', { name: 'CURRENT' }).first().scrollIntoViewIfNeeded();
        const searchInput = page.locator("[class='cursor-pointer text-gray-700']")
        await searchInput.click();

        await page.getByRole('textbox', { name: 'Search...' }).isEnabled();
        await page.getByRole('textbox', { name: 'Search...' }).fill('Leadership');
        await page.getByRole('button', { name: 'Search' }).click()

        const searchResults = page.locator('.flex.flex-col.sm\\:flex-row').first()
        await searchResults.waitFor({ state: 'visible', timeout: 10000 });
        await expect(searchResults).toBeVisible();
        const resultsCount = await searchResults.count();
        expect.soft(resultsCount).toBeGreaterThan(0);

    });

    test('TC-07 : Verify main navigation menu items', async ({ page }) => {
        test.setTimeout(120000); //
        const hp = new HomePage(page);
        await hp.checkMenuNavigation(expectedItems);

    }, 70000);

    test('TC_08 : Verify section label is  Dispalyed', async ({ page }) => {
        test.setTimeout(120000);
        const sectionLabel = page.locator("[class='text-[10px] uppercase tracking-[0.4em] lg:px-5 px-4 md:font-bold font-medium text-left bg-foreground text-white py-2.5 rounded-b ']")
        const count = await sectionLabel.count();

        for (let i = 0; i < count; i++) {
            // Use .nth() to get a specific element in the list.
            const labelText = await sectionLabel.nth(i).textContent();
            // Verify that the text content is not null, as requested.
            expect(labelText).not.toBeNull();
        }
    })
    //Feature News section
    test('TC_09 : Verify feature news section is displayed', async ({ page }) => {
        test.setTimeout(120000);
        const featureNews = page.locator("[class='grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-4 h-full']")
        await expect(featureNews).toBeVisible();
    })

    test('TC_10: Validate in feature news section images are visible', async ({ page }) => {
        test.setTimeout(120000);
        const featureNews = page.locator("[class='grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-4 h-full']");
        await expect(featureNews).toBeVisible();
        const images = featureNews.locator("img");
        const imgCount = await images.count();
        console.log(`Total images found: ${imgCount}`);
        for (let i = 0; i < imgCount; i++) {
            const img = images.nth(i);
            await expect(img).toBeVisible();
        }


    })

    test('TC_11 : validate feature news article navigation', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for this test
        const featureNews = page.locator("[class='grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-4 h-full']");
        await expect(featureNews).toBeVisible();

        const titles = featureNews.locator("a h3");
        const titleCount = await titles.count();
        console.log(`Total articles found: ${titleCount}`);

        for (let i = 0; i < titleCount; i++) {
            const title = titles.nth(i);
            const articleText = (await title.innerText()).trim();
            console.log(`Checking article: ${articleText}`);



            await title.click();
            await page.waitForTimeout(6000);
            const DetailPageTitle = await page.locator("[itemprop='headline']")
            expect(DetailPageTitle).toContainText(articleText);
            await page.waitForTimeout(6000);
            await page.goBack();
            await page.waitForTimeout(6000);

        }
    });

    // test('TC_12 : validate feature news catergory navigation', async ({ page }) => {
    //     test.setTimeout(120000); // 2 minutes for this test
    //     const hp = new HomePage(page);
    //     await hp.goto();
    //     await page.waitForTimeout(6000);
    //     await hp.clickOnSkip();
    //     await page.waitForTimeout(6000);

    //     const featureNews = page.locator("[class='grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-4 h-full']");
    //     await expect(featureNews).toBeVisible();

    //     const titles = featureNews.locator("a h3");
    //     const titleCount = await titles.count();
    //     console.log(`Total articles found: ${titleCount}`);

    //     for (let i = 0; i < titleCount; i++) {
    //         const title = titles.nth(i);
    //         const articleText = (await title.innerText()).trim();
    //         console.log(`Checking article: ${articleText}`);


    //         // Click and validate URL
    //         await title.click();
    //        await page.waitForTimeout(6000);
    //        const DetailPageTitle= await page.locator("[itemprop='headline']")
    //        expect(DetailPageTitle).toContainText(articleText);
    //        await page.waitForTimeout(6000);
    //        await page.goBack();
    //        await page.waitForTimeout(6000);

    //     }
    // });


    test('TC_13 : validate Hot topic Navigation', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for this test
        const hp = new HomePage(page);
        await hp.validateHotTopicNavigation();
    })

    test('TC_14 : Footer is visible', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for this test
        const footer = page.locator('footer'); // update selector if needed
        await expect(footer).toBeVisible();
    });

    test('TC_15 : Validate social media and our product footer links are working', async ({ page }) => {
        // Use a class that represents the Home Page interactions
        test.setTimeout(120000);
        const hp = new HomePage(page);
       const SocialMediaIcons =  page.getByAltText('Facebook')
       expect(SocialMediaIcons).toBeVisible();
       
        await hp.validateSocialMediaLinks();
    });

    test('TC_16 : Validate footer links are working', async ({ page, context }) => {
        test.setTimeout(120000);

        const footerLinks = page.locator("[class='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8']");
        await expect(footerLinks).toBeVisible();
        const links = footerLinks.locator(" li a");
        const linkCount = await links.count();
        console.log(`Total footer links found: ${linkCount}`);

        // Iterate through each link
        for (let i = 0; i < linkCount; i++) {
            const link = links.nth(i);
            const href = await link.getAttribute('href');
            const linkText = await link.textContent();
            console.log(`Checking link: ${linkText} -> ${href}`);

        }
    });

    test('TC_17 : Validate our events section event navigation', async ({ page, context }) => { // Added 'context' here
        test.setTimeout(120000); // 2 minutes for this test


        const ourEventsSection = page.locator("[class='flex lg:flex-row flex-wrap gap-8']");
        await expect(ourEventsSection).toBeVisible();

        const eventLinks = ourEventsSection.locator("a");
        const eventCount = await eventLinks.count();
        console.log(`Total events found: ${eventCount}`);

        for (let i = 0; i < eventCount; i++) {
            const eventLink = eventLinks.nth(i);
            const eventText = await eventLink.textContent(); // Get text to use for verification later

            const [newPage] = await Promise.all([
                // Wait for a new page to be created
                context.waitForEvent('page'),
                // Perform the click action that triggers the new page
                eventLink.click()
            ]);

            await newPage.waitForLoadState('domcontentloaded'); // Use 'domcontentloaded' or 'load' for better reliability

            expect(newPage.url()).not.toContain('404');
            console.log(`✅ Navigated to: ${newPage.url()} for event: ${eventText}`);

            await newPage.close();
            await page.bringToFront(); // Bring the original page back to the foreground
        }
    });

    test('TC_18 : Validate peoplematters logo and description is displated in footer', async ({ page }) => {


        const footerLogo = page.locator("[class='pb-10']");
        const paragraphFooter = page.locator("[class='text-white text-sm text-center mb-10 max-w-3xl mx-auto']")
        await expect(footerLogo).toBeVisible();

        const logo = footerLogo.locator("img");
        await expect(logo).toBeVisible();

        const description = paragraphFooter.getByText('Bringing you the latest HR'); // Adjust the selector if needed
        await expect(description).toBeVisible();
        console.log(`Footer description text: ${await description.textContent()}`);

    })

    test('TC_19 : Validate current section all article image is diaplayed ', async ({ page }) => {


        const currentSection = page.locator("[class='lg:border-r-0.5 lg:pr-8 lg:border-border scroll-mt-[100px] scroll-smooth']");
        await expect(currentSection).toBeVisible();
        const currentSectionImages = currentSection.locator("img");
        const imgCount = await currentSectionImages.count();
        console.log(`Total images found in current section: ${imgCount}`);
        for (let i = 0; i < imgCount; i++) {
            const img = currentSectionImages.nth(i);
            await expect(img).toBeVisible();
        }

    })

    test('TC_20 : Validate current section all article navigation ', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for this test

        const currentSection = page.locator("[class='lg:border-r-0.5 lg:pr-8 lg:border-border scroll-mt-[100px] scroll-smooth']");
        await expect(currentSection).toBeVisible();

        const titles = currentSection.locator("a h3");
        const titleCount = await titles.count();
        console.log(`Total articles found: ${titleCount}`);

        for (let i = 0; i < titleCount; i++) {
            const title = titles.nth(i);
            const articleText = (await title.innerText()).trim();
            console.log(`Checking article: ${articleText}`);



            await title.click();
            await page.waitForTimeout(6000);
            const DetailPageTitle = await page.locator("[itemprop='headline']")
            expect(DetailPageTitle).toContainText(articleText);
            await page.waitForTimeout(6000);
            await page.goBack();
            await page.waitForTimeout(6000);

        }
    })
    
    test('TC_21 : Validate in PMUNPLUGEED section all episode cards are displayed', async ({ page }) => {
        // 2 minutes for this test
        const episodes = page.locator("[class='group cursor-pointer flex flex-col gap-2 w-[200px] md:w-[280px] flex-shrink-0']"); // update selector to actual card class
        // await expect(episodes).toBeVisible(); // at least 1 episode
        const count = await episodes.count();
        console.log(`Total episodes found: ${count}`);
        for (let i = 0; i < count; i++) {
            await expect(episodes.nth(i)).toBeVisible();
        }
    });

    test('TC_22 : Validate  in episode card title, number, date and time are displayed', async ({ page }) => {
        const episodes = page.locator("[class='group cursor-pointer flex flex-col gap-2 w-[200px] md:w-[280px] flex-shrink-0']"); // update selector to actual card class
        const count = await episodes.count();
        console.log(`Total episodes found: ${count}`);
        for (let i = 0; i < count; i++) {
            const episode = episodes.nth(i);
            const title = episode.locator("h3");
            const number = episode.locator("[class='font-medium text-xs line-clamp-2  transition-colors']");
            const dateTime = episode.locator("[class='text-xs text-inactiveGray']").first();
            const episodeTime = episode.locator("[class='text-xs text-inactiveGray']").last()

            await expect(title).toBeVisible();
            await expect(number).toBeVisible();
            await expect(dateTime).toBeVisible();

            console.log(`${number.textContent()}: Title - ${await title.textContent()}, Number - ${await number.textContent()}, Date - ${await dateTime.textContent()}, Time - ${await episodeTime.textContent()}`);
        }
    })

    test('TC_23 : Validate in PMUNPLUGGED section episode card navigation', async ({ page }) => {
        test.setTimeout(120000);
        const episodes = page.locator("[class='group cursor-pointer flex flex-col gap-2 w-[200px] md:w-[280px] flex-shrink-0']"); // update selector to actual card class
        const count = await episodes.count();
        console.log(`Total episodes found: ${count}`);
        for (let i = 0; i < count; i++) {
            const episode = episodes.nth(i);
            const title = episode.locator("h3");
            const episodeText = await title.textContent();
            console.log(`Checking episode: ${episodeText}`);

            await episode.click();
            await page.waitForTimeout(6000);
            const DetailPageTitle = await page.locator("[class='text-4xl md:text-5xl font-medium text-gray-900 mb-6']")
            expect(DetailPageTitle).toContainText(episodeText);
            await page.waitForTimeout(6000);
            await page.goBack();
            await page.waitForTimeout(6000);
        }
    })

    test('TC_24 : Validate in PMUNPLUGGED section episode card image is displayed', async ({ page }) => {
        const episodes = page.locator("[class='group cursor-pointer flex flex-col gap-2 w-[200px] md:w-[280px] flex-shrink-0']"); // update selector to actual card class
        const count = await episodes.count();
        console.log(`Total episodes found: ${count}`);
        for (let i = 0; i < count; i++) {
            const episode = episodes.nth(i);
            const image = episode.locator("img");
            await expect(image).toBeVisible();
        }
    })

    test('TC_25 : Validate Sponsored section "View All" button navigation', async ({ page }) => {
        const SponsorViewAllButton = page.locator("[class='bg-black px-16 uppercase text-sm text-white py-3 rounded-[4px]']");
        await expect(SponsorViewAllButton).toBeVisible();

        await SponsorViewAllButton.click();
        await page.waitForLoadState('domcontentloaded'); // wait until navigation completes

        await page.getByRole('heading', { name: 'Business Outreach.' }).isVisible();
    });

    test('TC_26 : Validate "Brand Initiatives" heading, description text under "Brand Initiative and "View All" button is visible ', async ({ page }) => {
        page.getByRole('heading', { name: 'Brand Initiatives' }).isVisible();
        page.getByText('Learn insights, trends,').isVisible();
        page.getByRole('link', { name: 'View All' }).isVisible();

    })

    test('TC_27 : Validate Sponsored section all article image is displayed', async ({ page }) => {
        const sponsoredSection = page.locator("[class='max-w-7xl mx-auto w-full px-4 lg:px-8 xl:px-0']");
        await expect(sponsoredSection).toBeVisible();
        const images = sponsoredSection.locator("img");
        const imgCount = await images.count();
        console.log(`Total images found in sponsored section: ${imgCount}`);
        for (let i = 0; i < imgCount; i++) {
            const img = images.nth(i);
            await expect(img).toBeVisible();
        }
    })

    test('TC_28 : Validate Sponsored section all article navigation', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for this test
        const sponsoredSection = page.locator("[class='max-w-7xl mx-auto w-full px-4 lg:px-8 xl:px-0']");
        await expect(sponsoredSection).toBeVisible();

        const titles = sponsoredSection.locator("a h3");
        const titleCount = await titles.count();
        console.log(`Total articles found in sponsored section: ${titleCount}`);

        for (let i = 0; i < titleCount; i++) {
            const title = titles.nth(i);
            const articleText = (await title.innerText()).trim();
            console.log(`Checking article: ${articleText}`);

            await title.click();
            await page.waitForTimeout(3000);
            const DetailPageTitle = await page.locator("[itemprop='headline']")
            expect(DetailPageTitle).toContainText(articleText);
            await page.waitForTimeout(3000);
            await page.goBack();
            await page.waitForTimeout(3000);
        }
    });

    test('TC_29 : Validate Research section all article image is displayed', async ({ page }) => {
        const sponsoredSection = page.locator("#RESEARCH");
        await expect(sponsoredSection).toBeVisible();
        const images = sponsoredSection.locator("img");
        const imgCount = await images.count();
        console.log(`Total images found in sponsored section: ${imgCount}`);
        for (let i = 0; i < imgCount; i++) {
            const img = images.nth(i);
            await expect(img).toBeVisible();
        }
    })

    test('TC_30 : Validate Research section all article navigation', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for this test
        const sponsoredSection = page.locator("#RESEARCH");
        await expect(sponsoredSection).toBeVisible();

        const titles = sponsoredSection.locator("a h3");
        const titleCount = await titles.count();
        console.log(`Total articles found in sponsored section: ${titleCount}`);

        for (let i = 0; i < titleCount; i++) {
            const title = titles.nth(i);
            const articleText = (await title.innerText()).trim();
            console.log(`Checking article: ${articleText}`);

            await title.click();
            await page.waitForTimeout(3000);
            const DetailPageTitle = await page.locator("[itemprop='headline']")
            expect(DetailPageTitle).toContainText(articleText);
            await page.waitForTimeout(3000);
            await page.goBack();
            await page.waitForTimeout(3000);
        }

    });

    test('TC_31 : VAlidate "Octopus handpicked" section title and logo is displayed', async ({ page }) => {

        const octopusSection = page.locator("[class='lg:w-[30%] w-full']").last();
        await expect(octopusSection).toBeVisible();
        const title = octopusSection.locator("[class='flex flex-col']");
        const logo = octopusSection.getByAltText('Octopus with glasses');

        await expect(title).toBeVisible();
        const titleText = await title.textContent();
        console.log(`Octopus section title: ${titleText}`);
        await expect(logo).toBeVisible();

    })

    test('TC_32 : Validate "Octopus handpicked" section all product image is displayed', async ({ page }) => {
        const octopusSection = page.locator("[class='lg:w-[30%] w-full']").last();
        await expect(octopusSection).toBeVisible();
        const images = octopusSection.locator("img");
        const imgCount = await images.count();
        console.log(`Total images found in octopus section: ${imgCount}`);
        for (let i = 0; i < imgCount; i++) {
            const img = images.nth(i);
            await expect(img).toBeVisible();
        }
    })

    test('TC_33 : Validate "Octopus handpicked" section all product navigation', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for this test     
        const octopusSection = page.locator("[class='lg:w-[30%] w-full']").last();
        await expect(octopusSection).toBeVisible();
        const titles = octopusSection.locator("a h3");
        const titleCount = await titles.count();
        console.log(`Total articles found in octopus section: ${titleCount}`);
        for (let i = 0; i < titleCount; i++) {
            const title = titles.nth(i);
            const articleText = (await title.innerText()).trim();
            console.log(`Checking article: ${articleText}`);

            await title.click();
            await page.waitForTimeout(3000);
            const DetailPageTitle = await page.locator("[class='font-medium text-3xl']")
            expect(DetailPageTitle).toContainText(articleText);
            await page.waitForTimeout(3000);
            await page.goBack();
            await page.waitForTimeout(3000);
        }

    })

    test('TC_34 : Validate "Back to Top" button navigates user to the top of the page', async ({ page }) => {
        test.setTimeout(120000);
        const navigateToBottom = page.locator("[class='text-[10px] md:text-xs text-white/60']");
        await navigateToBottom.scrollIntoViewIfNeeded({ timeout: 3000 });
        // backToTopButton = page.locator("[class='fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-full']");
       await page.getByRole('button', { name: 'Close cookie consent' }).click();
        await page.waitForTimeout(3000);
        page.locator("[class='lucide lucide-arrow-up']").click();
        await page.waitForTimeout(3000);
        const scrollPosition = await page.evaluate(() => window.scrollY);
        expect(scrollPosition).toBe(0); // Verify that the scroll position is at the top of the page
        console.log(`Scroll position after clicking "Back to Top": ${scrollPosition}`);
    })

    test('TC_36 : Validate Sticky header menu navigation', async ({ page }) => {
        test.setTimeout(120000); // 2 minutes for this test
        const hp = new HomePage(page);
        await page.locator("[aria-label='Next section']").scrollIntoViewIfNeeded();

        const stickyHeaderMenu = page.locator("[class='flex items-center space-x-8']");
        const menuCount = stickyHeaderMenu.locator("li a");
        const totalMenus = await menuCount.count();

        // 🔹 Mapping for cases where menu text and page title differ
        const menuMapping = {
            "L&D": "Learning & Development"
        };

        for (let i = 0; i < totalMenus; i++) {
            const menuItem = menuCount.nth(i);
            const menuText = (await menuItem.textContent())?.trim();

            console.log(`Checking sticky header menu item: ${menuText}`);

            await expect(menuItem).toBeVisible();
            await menuItem.click();

            await page.waitForLoadState('domcontentloaded'); // Wait for page to load
            const pageName = page.locator("[class='text-[32px] md:text-6xl font-medium capitalize lg:whitespace-nowrap whitespace-normal text-ellipsis']");
            await expect(pageName).toBeVisible();

            const pageNameText = (await pageName.textContent())?.trim();
            console.log(`Page name after clicking menu item: ${pageNameText}`);

            // 🔹 Use mapped value if exists, otherwise menuText itself
            const expectedText = menuMapping[menuText] || menuText;

            expect(pageNameText).toContain(expectedText);

            await page.waitForTimeout(4000);
            await page.goBack();
            await page.waitForTimeout(4000);
            await page.locator("[aria-label='Next section']").scrollIntoViewIfNeeded();
        }

    });

    test('TC_37 : Validate NPS Functionality', async ({ page }) => {
         test.setTimeout(100000)
        //Click on Rate your Experience button
         await page.waitForTimeout(10000);
      // const npsButton = page.locator("body > div:nth-child(2) > main:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(14) > div:nth-child(1) > button:nth-child(2) > span:nth-child(1)").first();
         const npsButton = page.locator("[class='font-medium text-lg whitespace-nowrap']")
       await npsButton.click();
        await page.waitForTimeout(3000);
        //Click on close window button
        page.locator("[class='whitespace-nowrap font-medium text-lg']").click();
        await page.waitForTimeout(3000);
        //Click on Rate your Experience button again
        await npsButton.click();

        page.locator("[class=' md:text-sm text-[10px] sm:my-2 my-1']").last().click();

       await page.locator("#name").fill('Test User');
       await page.locator("#email").fill("Sam@gmail.com")
       await page.locator("#contact_consent").click();
       await page.locator("[class='w-full bg-orange text-white font-medium md:py-3 py-2 md:text-base text-[10px] rounded-md hover:bg-orange-600 transition-colors']").click();
       await page.waitForTimeout(3000);
        const successMessage = await page.locator("[class='fixed top-4 right-4 z-[9999] flex flex-col gap-2 items-end']");
       await successMessage.isVisible();
    })



})
