import { expect } from '@playwright/test';

export class RegisterMentee {
  constructor(page) {
    this.page = page;
    this.signupWithEmailBtn = page.getByRole('button', { name: 'Sign Up With Email', exact: true });
    this.inputName = page.locator('#fullName');
    this.nextButton = page.getByRole('button', { name: 'Selanjutnya' });
  }
}
