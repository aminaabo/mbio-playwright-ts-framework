import { expect, type Locator, type Page } from '@playwright/test';
import { expectedMarketCategories } from '../data/navigation';
import { BasePage } from './base.page';

export class ExplorePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async gotoExplore() {
    await this.goto('/explore');
  }

  async expectSpotMarketRegion() {
    await expect(this.page.getByRole('heading', { name: /Spot market/i })).toBeVisible();
    await expect(this.page.getByText(/cryptocurrency spot market data/i)).toBeVisible();
  }

  async expectTradingCategories() {
    for (const category of expectedMarketCategories) {
      await expect(this.page.getByRole('heading', { name: category }).or(this.page.getByText(category)).first()).toBeVisible();
    }
  }

  async expectTradingPairEntries() {
    const entries = this.tradingPairEntries();
    await expect(entries.first(), 'at least one trading pair/asset row or card should render').toBeVisible();

    const firstEntryText = await entries.first().innerText();
    expect(firstEntryText, 'entry should include a recognizable asset/pair symbol').toMatch(/[A-Z0-9]{2,10}(\/|-)?(USD|USDT|AED|BTC|ETH)?/);
    expect(firstEntryText, 'entry should include price or performance data').toMatch(/[$%]|AED|USD|USDT|[0-9]+(\.[0-9]+)?/);
  }

  private tradingPairEntries(): Locator {
    const tableRows = this.page.locator('table tbody tr').filter({ hasText: /[A-Z0-9]{2,10}/ });
    const assetCards = this.page
      .locator('[data-testid*="asset"], [data-testid*="market"], article, li, div')
      .filter({ hasText: /BTC|ETH|USDT|Bitcoin|Ethereum|Tether|USD|\d+\.\d+%/i });

    return tableRows.or(assetCards);
  }
}
