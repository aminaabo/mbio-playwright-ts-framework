import { test } from '@playwright/test';
import { ExplorePage } from '../pages/explore.page';

test.describe('Trading functionality', () => {
  test('spot trading section renders with trading pairs and market data', async ({ page }) => {
    const explorePage = new ExplorePage(page);
    await explorePage.gotoExplore();

    await explorePage.expectSpotMarketRegion();
    await explorePage.expectTradingPairEntries();
  });

  test('trading pairs are grouped into expected market categories', async ({ page }) => {
    const explorePage = new ExplorePage(page);
    await explorePage.goto('/');

    await explorePage.expectTradingCategories();
  });
});
