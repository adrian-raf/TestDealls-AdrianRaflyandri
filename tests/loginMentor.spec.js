import { test } from '@playwright/test';
import { LoginPageMentorPage } from '../pages/LoginPageMentorPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/sign-in');
});

test.describe('Login Mentor', () => {
  test('Success login as Mentor', async ({ page }) => {
    const loginPageMentor = new LoginPageMentorPage(page);
    await loginPageMentor.login();
  });
});
