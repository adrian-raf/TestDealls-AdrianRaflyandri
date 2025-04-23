import { test } from '@playwright/test';
import { RegisterMentePage } from '../pages/RegisterMenteePage';

test.beforeEach(async ({ page }) => {
  await page.goto('/sign-up');
});

test.describe('Register Mentee', () => {
  test('Success Sign up as Mentee', async ({ page }) => {
    const registerMentee = new RegisterMentePage(page);
    await registerMentee.signWithEmail();
    await registerMentee.fillProfile('Hired, but open for opportunities');
  });
});
