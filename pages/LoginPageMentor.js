import { expect } from '@playwright/test';
import { mentorAccount } from '../data/dataAccount';

export class LoginPageMentor {
  constructor(page) {
    this.page = page;
    this.inputEmail = page.locator('#basic_email');
    this.inputPassword = page.locator('#basic_password');
    this.loginButton = page.getByRole('button', { name: 'Sign In', exact: true });
    this.successLoginAlert = page.locator('.ant-message-notice-content');
  }

  login = async () => {
    await this.inputEmail.fill(mentorAccount.email);
    await this.inputPassword.fill(mentorAccount.password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL('/');
    await expect(this.successLoginAlert).toHaveText('Sign in success');
  };
}
