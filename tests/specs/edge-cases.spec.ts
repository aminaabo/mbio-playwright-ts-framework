import { expect, test } from '@playwright/test';
import { expectedNavigationItems } from '../data/navigation';
import { BasePage } from '../pages/base.page';

test.describe('Negative and edge cases', () => {
  test('invalid route returns a non-success page without crashing', async ({ page }) => {
    const response = await page.goto('/route-that-should-not-exist-automation-check', {
      waitUntil: 'domcontentloaded'
    });

    expect(response?.status(), 'invalid routes should return a client or server error').toBeGreaterThanOrEqual(400);
    await expect(page.locator('body')).toBeVisible();
  });

  test('navigation links are not broken', async ({ page, request }) => {
    const basePage = new BasePage(page);
    await basePage.goto('/');
    await basePage.openMobileNavigationIfNeeded();

    for (const item of expectedNavigationItems) {
      const href = await basePage.navLink(item.label).getAttribute('href');
      expect(href, `${item.label} should have an href`).toBeTruthy();

      const response = await request.get(href!, { maxRedirects: 2, timeout: 15_000 });
      expect(response.status(), `${item.label} link ${href} should resolve`).toBeLessThan(400);
    }
  });

  test('mobile breakpoint keeps primary navigation accessible', async ({ page }) => {
    const basePage = new BasePage(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await basePage.goto('/');

    const menuButton = page
      .getByRole('button', { name: /menu|navigation|open/i })
      .or(page.locator('button[aria-label*="menu" i], button:has(svg)').first());

    await expect(menuButton, 'mobile menu trigger should be visible').toBeVisible();
    await menuButton.click();
    await expect(page.getByRole('link', { name: /Explore/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Support/i }).first()).toBeVisible();
  });

  test('content loading timeout is surfaced with a clear assertion', async ({ page }) => {
    await page.route('**/*', async (route) => {
      if (route.request().resourceType() === 'document') {
        await route.continue();
        return;
      }

      await route.abort();
    });

    await page.goto('/explore', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { name: /Spot market/i })).toBeVisible({ timeout: 10_000 });
  });
});
