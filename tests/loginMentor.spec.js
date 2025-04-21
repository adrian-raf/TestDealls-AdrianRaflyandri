import { test } from '@playwright/test';
import { LoginPageMentor } from '../pages/LoginPageMentor';

test.beforeEach(async ({ page }) => {
  await page.goto('/sign-in');
});

test.describe('Login Mentee', () => {
  test('Success login', async ({ page }) => {
    const loginPageMentor = new LoginPageMentor(page);
    await loginPageMentor.login();
  });
});
