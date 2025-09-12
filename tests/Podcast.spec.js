const { test, expect } = require('@playwright/test');
const { PodcastPage } = require('../pages/Podcast.page');
const { HomePage, expectedItems } = require('../pages/homepage.page');

test.describe('Podcast Page', {}, () => {
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
    const podcastPage = new PodcastPage(page);
    await podcastPage.podcastLink.click();
    await expect(page).toHaveURL(/podcast/);
  });

  test('TC_02 : Validate Podcast Intro Text and Image are visible', async ({ page }) => {
    const podcastPage = new PodcastPage(page);
    podcastPage.podcastLink.click()
    const podcastIntroText = page.locator("[class ='text-foreground text-base md:text-lg leading-relaxed']")
    await expect(podcastIntroText).toBeVisible();
    console.log(`'Podcast Intro Text:',${podcastIntroText.textContent()}`);

    const podcastIntroImage = page.locator("[class='relative w-64 h-64']")
    await expect(podcastIntroImage).toBeVisible();

  })

  test('TC_03 : Validate Season Blocks are Present and Seasons navigation', async ({ page }) => {
    const podcastPage = new PodcastPage(page);

    // Open podcast page (default opens with Season 3 active)
    await podcastPage.podcastLink.click();

    // Season blocks container
    const seasonBlocks = page.locator("[class='w-full md:w-1/4 pr-4 lg:border-r border-inkBlack/40 h-[90%] lg:block hidden']");
    await expect(seasonBlocks).toBeVisible();

    await expect(page).toHaveURL(/.*from-inspiration-to-action/);


    //season 2 navigation
    await page.getByRole('link', { name: 'Season 2: Kaleidoscope of' }).click();
    await expect(page).toHaveURL(/.*kaleidoscope-of-cultures/);

    //  Season 3 navigation

    await page.getByRole('link', { name: 'Season 1: The Art of the' }).click()
    await expect(page).toHaveURL(/.*the-art-of-the-possible/);

  });

  test('TC_04 : Validate Episode Card details are visible for all Seasons', async ({ page }) => {
    test.setTimeout(3000000);
    const podcastPage = new PodcastPage(page);
    await podcastPage.podcastLink.click();
    await page.waitForTimeout(4000)
    //Checking Season 3 episode cards details
    await podcastPage.validateEpisodeCardStructure()

    //Checking Season 2 episode cards
    await page.getByRole('link', { name: 'Season 2: Kaleidoscope of' }).click();
    await page.waitForTimeout(4000)
    await podcastPage.validateEpisodeCardStructure()
    //Checking Season 2 episode cards details
    await page.getByRole('link', { name: 'Season 1: The Art of the' }).click()
    await page.waitForTimeout(4000)
    await podcastPage.validateEpisodeCardStructure()

  })

  test('TC_05: Validate each GO TO EPISODE button navigation from each card For All Seasons', async ({ page }) => {
    test.setTimeout(3000000);
    const podcastPage = new PodcastPage(page);
    await podcastPage.podcastLink.click();
    await page.waitForTimeout(4000);

    const episodeCards = page.locator("[class='border border-inactiveGray rounded-lg py-[23px] px-3 flex flex-col h-full transition-shadow hover:shadow-lg']");
    const cardCount = await episodeCards.count();

    for (let i = 0; i < cardCount; i++) {
      const card = episodeCards.nth(i);
      await card.scrollIntoViewIfNeeded();


      const EpisodeTitle = (await card.locator("h3").innerText()).trim();

      await page.waitForTimeout(2000);

      const GoToEpisode = card.locator("[class='text-gray-900 font-medium text-[10px] md:text-xs hover:text-orange-500 transition-colors']");
      await GoToEpisode.click();
      await page.waitForTimeout(2000);
      const EpisodePageTitle = (await page.locator("[class='text-4xl md:text-5xl font-medium text-gray-900 mb-6']").innerText()).trim();
      await page.waitForTimeout(2000);

      await expect(EpisodePageTitle).toBe(EpisodeTitle);

      await page.waitForTimeout(4000);
      await page.goBack();
      await page.waitForTimeout(4000);
    }
  });

  //Pending
  test("TC_06: Validate podcast details page 'More Episode' section navigation", async ({ page }) => {
    test.setTimeout(3000000);
    const podcastPage = new PodcastPage(page);
    await podcastPage.podcastLink.click();
    await page.waitForTimeout(4000);

    const fistEpisodeCard = page.locator("[class='border border-inactiveGray rounded-lg py-[23px] px-3 flex flex-col h-full transition-shadow hover:shadow-lg']").first();
    await fistEpisodeCard.locator("[class='text-gray-900 font-medium text-[10px] md:text-xs hover:text-orange-500 transition-colors']").click();
    await page.waitForTimeout(4000);






  })



  
});
