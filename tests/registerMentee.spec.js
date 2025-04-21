import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/sign-up');
});

test.describe('Login Mentee', () => {
  test('Success Sign up', async ({ page }) => {
    
  });
});
