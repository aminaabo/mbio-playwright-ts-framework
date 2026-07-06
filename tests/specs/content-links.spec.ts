import { expect, test } from '@playwright/test';
import { CompanyPage } from '../pages/company.page';
import { HomePage } from '../pages/home.page';

test.describe('Content and links', () => {
  test('marketing banners render in expected page regions', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto('/');

    await homePage.expectHeroAndMarketingRegions();
  });

  test('download link resolves to the mobile app deep-link provider', async ({ page, request }) => {
    const homePage = new HomePage(page);
    await homePage.goto('/');

    const downloadLink = await homePage.appDownloadLink();
    const href = await downloadLink.getAttribute('href');

    expect(href).toBeTruthy();
    expect(href).toMatch(/mbio\.go\.link/i);

    const response = await request.get(href!, { maxRedirects: 0, timeout: 15_000 });
    expect([200, 301, 302, 307, 308]).toContain(response.status());
    expect(response.headers().location ?? href).toMatch(/app|play|store|go\.link/i);
  });

  test('About Us / Why MultiBank page renders expected components', async ({ page }) => {
    const companyPage = new CompanyPage(page);
    await companyPage.gotoCompany();

    await companyPage.expectWhyMultibankContent();
    await companyPage.expectStatsAndTrustComponents();
  });
});
