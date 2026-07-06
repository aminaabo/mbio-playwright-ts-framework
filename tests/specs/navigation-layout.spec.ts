import { expect, test } from '@playwright/test';
import { expectedNavigationItems } from '../data/navigation';
import { BasePage } from '../pages/base.page';

test.describe('Navigation and desktop layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test('top navigation renders all expected items', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.goto('/');

    await basePage.expectDesktopNavigationVisible();
  });

  test('top navigation items point to correct destinations', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.goto('/');

    await basePage.expectNavigationDestinations();
  });

  for (const item of expectedNavigationItems.filter((navItem) => !navItem.external)) {
    test(`${item.label} navigation opens ${item.path}`, async ({ page }) => {
      const basePage = new BasePage(page);
      await basePage.goto('/');
      await basePage.navLink(item.label).click();
      await expect(page).toHaveURL(new RegExp(`${item.path}$`));
      await expect(page.locator('body')).toBeVisible();
    });
  }
});
