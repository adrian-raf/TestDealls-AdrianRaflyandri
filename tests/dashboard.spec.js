import { test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/mentoring');
});

test.describe('Dashboard Mentoring', () => {
  test('Search mentor', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchMentorByName('cika');
  });

  test('Select category mentor career and choose level', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchByCareerCategory('Business');
    await dashboardPage.selectTingkatan('head');
    await dashboardPage.resetTingkatan();
  });
});
