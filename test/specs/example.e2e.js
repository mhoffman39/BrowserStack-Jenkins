
describe('My website ', () => {
    it('should be at the right URL', async () => {
        await browser.url(`https://www.mason-hoffman.com`);

        await expect(browser).toHaveUrl('https://www.mason-hoffman.com/')
    });

    // it('should have the correct title', async () => {
    //     await browser.url(`https://www.mason-hoffman.com`);

    //     await expect(browser).toHaveTitle('Mason Hoffman - Software Engineer')
    // });

    // it('should have a picture of me', async () => {
    //     await browser.url(`https://www.mason-hoffman.com`);

    //     await $('span[class="cta-btn cta-btn--hero"]').click();
    //     const picture = await $('picture');

    //     await expect (picture).toBeDisplayed();
    // });
});
