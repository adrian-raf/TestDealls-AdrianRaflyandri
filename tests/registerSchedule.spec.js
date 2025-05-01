import { test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { SelectedMentorPage } from '../pages/SelectedMentorPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/mentoring');
});

test.describe('Register schedule for mentoring without login', () => {
  test('Success register schedule with valid data', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchMentorByName('Benny');

    const registerSchedulePage = new SelectedMentorPage(page);
    await registerSchedulePage.scheduleAvailable();
    await registerSchedulePage.chooseDateRange();
    await registerSchedulePage.chooseDateTime();
    await registerSchedulePage.writeQuestions();
    await registerSchedulePage.personalData();
    await registerSchedulePage.createPasswordAndConfirm();
  });
});
