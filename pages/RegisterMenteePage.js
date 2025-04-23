import { expect } from '@playwright/test';

export class RegisterMentePage {
  constructor(page) {
    this.page = page;
    this.signupWithEmailBtn = page.getByRole('link', { name: 'Sign Up With Email' }).first();
    this.inputName = page.locator('#fullName');
    this.nextButton = page.getByRole('button', { name: 'Selanjutnya' });
    this.backButton = page.getByRole('button', { name: 'Kembali' });
    this.jobSeekingStatus = page.locator('#jobSearchStatus');
  }

  signWithEmail = async () => {
    await this.signupWithEmailBtn.click();
  };

  fillProfile = async (text) => {
    await this.inputName.fill('Bagus Samudera');
    await this.nextButton.click();
    await this.jobSeekingStatus.click();
    let jobStatusText = await this.page.locator('.rc-virtual-list-holder').allTextContents();
    let count = await this.page.locator('.rc-virtual-list-holder').count();
    const dropdownJobStatus = this.page.locator('div.ant-select-item-option', {
      hasText: text,
    });
    await dropdownJobStatus.click();
  };
}
