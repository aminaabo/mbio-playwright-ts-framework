import { expect, type Page } from '@playwright/test';
import { expectedWhyMultibankSections } from '../data/navigation';
import { BasePage } from './base.page';

export class CompanyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async gotoCompany() {
    await this.goto('/company');
  }

  async expectWhyMultibankContent() {
    for (const section of expectedWhyMultibankSections) {
      await expect(this.page.getByRole('heading', { name: section.heading })).toBeVisible();
      await expect(this.page.getByText(section.text).first()).toBeVisible();
    }
  }

  async expectStatsAndTrustComponents() {
    await expect(this.page.getByText(/\$2 trillion/i)).toBeVisible();
    await expect(this.page.getByText(/2,000,000\+/i)).toBeVisible();
    await expect(this.page.getByText(/25\+/i)).toBeVisible();
    await expect(this.page.getByText(/Regulation at our core/i)).toBeVisible();
    await expect(this.page.getByText(/Proven track record/i)).toBeVisible();
    await expect(this.page.getByText(/Secure & trusted/i)).toBeVisible();
  }
}
