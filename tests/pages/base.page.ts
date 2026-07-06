import { expect, type Locator, type Page } from '@playwright/test';
import { expectedNavigationItems } from '../data/navigation';

export class BasePage {
  readonly page: Page;
  readonly nav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = page.locator('header, nav').first();
  }

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  navLink(label: string) {
    return this.page.getByRole('link', { name: label, exact: true }).first();
  }

  async expectDesktopNavigationVisible() {
    await expect(this.nav).toBeVisible();

    for (const item of expectedNavigationItems) {
      await expect(this.navLink(item.label), `${item.label} should be visible in top navigation`).toBeVisible();
    }
  }

  async expectNavigationDestinations() {
    for (const item of expectedNavigationItems) {
      const link = this.navLink(item.label);
      await expect(link).toHaveAttribute(
        'href',
        item.external ? /token\.multibankgroup\.com/ : new RegExp(`${(item.path)}$`)
      );
    }
  }

  async openMobileNavigationIfNeeded() {
    const exploreLink = this.navLink('Explore');

    if (await exploreLink.isVisible().catch(() => false)) {
      return;
    }

    const menuButton = this.page
      .getByRole('button', { name: /menu|navigation|open/i })
      .or(this.page.locator('button[aria-label*="menu" i], button:has(svg)').first());

    await menuButton.click();
    await expect(exploreLink).toBeVisible();
  }
}