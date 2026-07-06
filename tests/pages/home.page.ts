import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectHeroAndMarketingRegions() {
    await expect(this.page.getByRole('heading', { name: /Crypto for everyone/i })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /Securely build your portfolio/i })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /Unblemished\. Unstoppable\. United\./i })).toBeVisible();
  }

  async appDownloadLink() {
    return this.page.getByRole('link', { name: /Download the app/i }).first();
  }
}
