import { expect } from '@playwright/test';
import { createNewAccount } from '../data/dataAccount';

export class SelectedMentorPage {
  constructor(page) {
    this.page = page;
    this.submitSchedule = page.getByRole('button', { name: 'Ajukan Jadwal' });
    this.exploreOtherMentors = page.getByRole('link', { name: 'Explore Other Mentors' });
    this.popupRegisterMentoring = page.locator('.ant-modal-content');
    this.nextButtonModalContent = page.getByRole('button', { name: 'Selanjutnya' });
    this.dateRange = page.locator('(//div[@class="ant-form-item"])[1]');
    this.inputTimeStart = page.locator('(//input[@placeholder="HH:MM"])[1]');
    this.inputTimeEnd = page.locator('(//input[@placeholder="HH:MM"])[2]');
    this.textAreaQuestion = page.locator('(//textarea)[1]');
    this.bodyPopup = page
      .locator('#book-session-modal div')
      .filter({ hasText: 'Langkah 2 dari 4Propose a' })
      .first();
    this.inputName = page.locator('#fullName');
    this.inputEmail = page.locator('#email');
    this.inputWA = page.locator('#whatsapp');
    this.birthDate = page.locator('#birthDate');
    this.password = page.locator('#password');
    this.confirmPassowrd = page.locator('#confirmPassword');
    this.checkboxRepost = page.locator("//input[@value='1']");
    this.checkboxCommit = page.locator("//input[@value='3']");
    this.finishButtonModalContent = page.getByRole('button', { name: 'Selesai' });
  }

  scheduleAvailable = async () => {
    await this.submitSchedule.click();
    await expect(this.popupRegisterMentoring).toBeVisible();
    await this.chooseAllTopic();
    await this.nextButtonModalContent.click();
  };

  chooseTopic = async (number) => {
    await this.page.getByRole(`(//li//button)[${number}]`);
  };
  chooseAllTopic = async () => {
    const items = await this.page.$$('//li//button');
    for (const item of items) {
      await item.click();
    }
  };

  chooseDateRange = async () => {
    await this.chooseStartDate('Monday', 'April', '28', '2025');
    await this.chooseEndDate('Wednesday', 'April', '30', '2025');
    await this.bodyPopup.click();
  };

  chooseStartDate = async (day, month, date, year) => {
    await this.dateRange.click();
    const formatDate = await this.page.locator(
      `//div[@aria-label="Choose ${day} ${month} ${date} of ${year}"]`
    );
    await formatDate.click();
  };
  //div[@aria-label="Choose Monday April 28 of 2025"]
  chooseEndDate = async (day, month, date, year) => {
    const formatDate = await this.page.locator(
      `//div[@aria-label="Choose ${day} ${month} ${date} of ${year}"]`
    );
    await formatDate.click();
  };

  chooseDateTime = async () => {
    await this.inputTimeStart.fill('08:00');
    await this.inputTimeEnd.fill('12:00');
  };

  writeQuestions = async () => {
    await this.textAreaQuestion.clear();
    await this.textAreaQuestion.fill(
      ` Halo semua salam kenal semoga saya bisa lolos tes ini, tapi kalalu tidak lolos ya.. ya jangan laa, pengen nya lolos ehe
       Hidup Jokowi!!! *Gebrak Meja`
    );
    await expect(this.nextButtonModalContent).toBeEnabled();
    await this.nextButtonModalContent.click();
  };

  personalData = async () => {
    await this.inputName.fill(createNewAccount.name);
    await this.inputWA.fill(createNewAccount.wa);
    await this.inputEmail.fill(createNewAccount.email);
    await this.birthDate.fill(createNewAccount.birthDate);
    await expect(this.nextButtonModalContent).toBeEnabled();
    await this.nextButtonModalContent.click();
  };

  createPasswordAndConfirm = async () => {
    await this.password.fill('apaajatest');
    await this.confirmPassowrd.fill('apaajatest');
    await this.checkboxRepost.check();
    await this.checkboxCommit.check();
    await expect(this.checkboxRepost).toBeChecked();
    await expect(this.checkboxCommit).toBeChecked();
    await expect(this.finishButtonModalContent).toBeEnabled();
    await this.finishButtonModalContent.click();
  };
}
