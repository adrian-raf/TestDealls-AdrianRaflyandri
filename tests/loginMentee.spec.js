import { test } from '@playwright/test';
import { LoginPageMenteePage } from '../pages/LoginPageMenteePage';

test.beforeEach(async ({ page }) => {
  await page.goto('/sign-in');
});

test.describe('Login Mentee', () => {
  test('Success login as Mentee', async ({ page }) => {
    const loginPageMentee = new LoginPageMenteePage(page);
    await loginPageMentee.login();
  });
});
