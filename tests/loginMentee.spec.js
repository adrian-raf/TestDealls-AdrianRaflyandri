import { test } from '@playwright/test';
import { LoginPageMentee } from '../pages/LoginPageMentee';
test.beforeEach(async ({ page }) => {
  await page.goto('/sign-in');
});

test.describe('Login Mentee', () => {
  test('Success login', async ({ page }) => {
    const loginPageMentee = new LoginPageMentee(page);
    await loginPageMentee.login();
  });
});
