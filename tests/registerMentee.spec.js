import { test, expect } from '@playwright/test';
import { RegisterMenteePage } from '../pages/RegisterMenteePage';
import { createNewAccount } from '../data/dataAccount';
import { buttonClickByText } from '../utils/elementActions';

test.beforeEach(async ({ page }) => {
  await page.goto('/sign-up');
});

test.describe('Register Mentee', () => {
  test('Success Sign up as Mentee with valid data', async ({ page }) => {
    const registerMentee = new RegisterMenteePage(page);
    await test.step('Select login option', async () => {
      // Step 1
      await registerMentee.signWithEmail();
    });
    await test.step('Fill data profile', async () => {
      //  Step 2
      await registerMentee.fillName(createNewAccount.name);
      await registerMentee.expectNextButtonEnabled();
      await buttonClickByText(page, 'Selanjutnya');

      await registerMentee.expectNextButtonDisabled();
      await registerMentee.chooseJobSeekingStatus('Actively looking');
      await expect(registerMentee.jobSeekingStatusValue).toHaveText(
        'Actively looking for the next 3 months'
      );

      await registerMentee.fillWa(createNewAccount.wa);
      await registerMentee.fillEmail(createNewAccount.email);
      await registerMentee.chooseCampus('university of indonesia');
      await registerMentee.chooseExpLevel('Freshgrad');
      await registerMentee.expectNextButtonEnabled();
      await buttonClickByText(page, 'Selanjutnya');
    });

    await test.step('Upload CV', async () => {
      // Step 3
      await expect(page).toHaveURL('/onboarding?step=3');
      await registerMentee.uploadFile();
      await registerMentee.expectNextButtonEnabled();
      await buttonClickByText(page, 'Selanjutnya');
    });
    await test.step('Fill work experience', async () => {
      // Step 4
      await expect(page).toHaveURL('/onboarding?step=4');
      await expect(registerMentee.formList).toBeVisible();
      await registerMentee.fillCompanyName('Tokopedia');
      await registerMentee.fillLevel('head');
      await registerMentee.fillRole('QA Software Engineer');
      await registerMentee.fillStartDate('122024');
      await registerMentee.fillEndDate('032025');
      await registerMentee.expectNextButtonEnabled();
      await buttonClickByText(page, 'Selanjutnya');
    });
    await test.step('Finish onboarding', async () => {
      // Step 5
      await expect(page).toHaveURL('/onboarding?step=5');
      await registerMentee.chooseSpesialization('IT', 'QA / Test Engineer');
      await registerMentee.expectNextButtonEnabled();
      await buttonClickByText(page, 'Selanjutnya');

      await test.step('Create password', async () => {
        // Step 6
        await expect(page).toHaveURL('/onboarding?step=6');
        await registerMentee.createPassword('Password0');
        // await buttonClickByText(page, 'Finish');
      });
    });
  });
});
