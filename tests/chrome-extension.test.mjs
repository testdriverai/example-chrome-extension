/**
 * Loads the Dark Reader extension into Chrome, opens a light website, and
 * checks that switching the extension off and on from its popup changes the page.
 */
import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Dark Reader (Chrome extension)", () => {
  it("turns a light page dark from the extension popup", async (context) => {
    const testdriver = TestDriver(context);

    // Download Dark Reader from the Chrome Web Store and start Chrome with it loaded.
    await testdriver.provision.chromeExtension({ extensionId: "eimadpbcbfnmbkopoojfekhnkhdbieeh" });

    // Open a plain, light website.
    await testdriver.pressKeys(["ctrl", "l"]);
    await testdriver.type("https://example.com");
    await testdriver.pressKeys(["enter"]);
    await testdriver.find('the "Example Domain" heading on the page', { timeout: 30000 });

    // Open the Dark Reader popup from the Extensions menu.
    await testdriver.find("the puzzle-piece Extensions button at the right end of the Chrome toolbar").click();
    await testdriver.find('"Dark Reader" in the Extensions menu').click();
    await testdriver.find("the Dark Reader popup window", { timeout: 15000 });

    // Switch the extension off. The page should go back to its normal light colors.
    await testdriver.find('the "Off" option of the On/Off switch at the top of the Dark Reader popup').click();
    await testdriver.pressKeys(["escape"]);
    const lightPage = await testdriver.assert(
      'the "Example Domain" page has a light background with dark text',
    );
    expect(lightPage).toBeTruthy();

    // Open the popup again and switch the extension on.
    await testdriver.find("the puzzle-piece Extensions button at the right end of the Chrome toolbar").click();
    await testdriver.find('"Dark Reader" in the Extensions menu').click();
    await testdriver.find('the "On" option of the On/Off switch at the top of the Dark Reader popup').click();
    await testdriver.pressKeys(["escape"]);

    // The same page is now dark.
    const darkPage = await testdriver.assert(
      'the "Example Domain" page has a dark background with light text',
    );
    expect(darkPage).toBeTruthy();
  });
});
