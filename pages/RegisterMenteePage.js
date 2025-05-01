import { selectDropdownByText, fillAndSelectDropdown } from '../utils/elementActions';
import { expect } from '@playwright/test';

export class RegisterMenteePage {
  constructor(page) {
    this.page = page;
    this.signupWithEmailBtn = page.getByRole('link', { name: 'Sign Up With Email' }).first();
    this.signupWithGmailBtn = page.getByRole('button', { name: 'Sign Up With Google' });

    this.inputName = page.locator('#fullName');
    this.jobSeekingStatus = page.locator('#jobSearchStatus');
    this.jobSeekingStatusValue = page.locator('.ant-select-selection-item');
    this.inputWA = page.locator('#whatsapp');
    this.inputEmail = page.locator('#email');
    this.inputCampus = page.locator('#campus');
    this.ExpLevel = page.locator('#eligibility');
    this.inputLinkedin = page.locator('#linkedInUrl');
    this.skipCVbtn = page.getByRole('button', { name: 'Skip for now, my CV is not' });
    this.formList = page.locator('#experience-form-list');
    this.workBtn = page.getByRole('button', { name: 'Work' });
    this.organizatinBtn = page.getByRole('button', { name: 'Organizational' });
    this.certificationBtn = page.getByRole('button', { name: 'Certification/Achievement' });
    this.addBtn = page.getByRole('button', { name: 'Add' });
    this.inputCompany = page.locator('#companyName');
    this.levelInput = page.locator('#roleLevel');
    this.roleInput = page.locator('#roleName');
    this.startDateInput = page.locator('#startDate');
    this.endDateInput = page.locator('#endDate');
    this.occupiedCheckbox = page.locator("input[value='occupied']");
    this.spesializationOption = page.locator("(//div[@class='ant-select-selector'])[1]");
    this.addAnotherSpecializationBtn = page.getByRole('button', { name: 'Organizational' });
    this.inputPassword = page.locator('#password');
    this.inputConfirmPassowrd = page.locator('#passwordConfirmation');
    this.privacyPolicyCheckbox = page.locator('#checkPrivacyPolicy');
  }

  signWithEmail = async () => {
    await this.signupWithEmailBtn.click();
  };

  signWithGmail = async () => {
    await this.signupWithGmailBtn.click();
  };

  fillName = async (name) => {
    await this.inputName.fill(name);
  };

  chooseJobSeekingStatus = async (status) => {
    await this.jobSeekingStatus.click();
    await selectDropdownByText(this.page, status);
  };

  fillWa = async (wa) => {
    await this.inputWA.fill(wa);
  };

  fillEmail = async (email) => {
    await this.inputEmail.fill(email);
  };

  chooseCampus = async (campus) => {
    await fillAndSelectDropdown({
      page: this.page,
      inputLocator: this.inputCampus,
      text: campus,
    });
  };

  chooseExpLevel = async (level) => {
    await this.ExpLevel.click();
    await selectDropdownByText(this.page, level);
  };

  async getSelectedJobSeekingStatus() {
    return this.jobSeekingStatusValue.textContent();
  }

  async expectNextButtonEnabled() {
    await expect(this.page.getByRole('button', { name: 'Selanjutnya' })).toBeEnabled();
  }

  async expectNextButtonDisabled() {
    await expect(this.page.getByRole('button', { name: 'Selanjutnya' })).toBeDisabled();
  }

  uploadFile = async () => {
    await this.page.locator('#cv').setInputFiles('uploadFiles/file1.pdf');
  };

  // fillCompanyName = async (company) => {
  //   await this.inputCompany.fill(company);
  //   const selectCompany = await this.page.locator('.ant-select-dropdown', { hasText: company });
  //   if (company === (await selectCompany.textContent())) {
  //     await selectCompany.click();
  //   } else {
  //     await selectCompany.first().click();
  //   }
  // };

  fillCompanyName = async (company) => {
    await fillAndSelectDropdown({
      page: this.page,
      inputLocator: this.inputCompany,
      text: company,
    });
  };

  fillRole = async (role) => {
    await fillAndSelectDropdown({
      page: this.page,
      inputLocator: this.roleInput,
      text: role,
    });
  };

  fillLevel = async (level) => {
    await this.levelInput.fill(level);
    await selectDropdownByText(this.page, level);
  };

  fillStartDate = async (startDate) => {
    await this.startDateInput.fill(startDate);
  };

  fillEndDate = async (endDate) => {
    await this.endDateInput.fill(endDate);
  };

  fillOccupied = async () => {
    await this.occupiedCheckbox.check();
  };

  chooseSpesialization = async (spesialization, relevantJob) => {
    await this.spesializationOption.click();
    await selectDropdownByText(this.page, spesialization);
    await this.page.getByLabel(relevantJob).check();
  };

  createPassword = async (password) => {
    await this.inputPassword.fill(password);
    await this.inputConfirmPassowrd.fill(password);
    await this.privacyPolicyCheckbox.check();
  };
}
