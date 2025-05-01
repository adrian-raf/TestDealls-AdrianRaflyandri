import { expect } from '@playwright/test';
export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.mentorCards = page.locator('//a[contains(@class, "MentorCard")]');
    this.tingkatanButton = page.locator('//input[@aria-controls="rc_select_0_list"]');
    this.tingkatanDropdown = page.locator('label.ant-checkbox-wrapper > span:nth-child(2)');
    this.imageEmptyMentor = page.getByRole('img', { name: 'Empty Mentor' });
    this.emptyMentorText = page.getByRole('heading', { name: 'Mentor yang terkait dengan' });
    this.emptySearchText = page.getByRole('heading', {
      name: 'Tidak ada hasil pencarian ditemukan',
    });
    this.resetTingkatanButton = page.getByRole('button', { name: 'Reset' });
    this.allCheckboxTingkatan = page.locator('//input[@type="checkbox"]');
    this.searchMentorInput = page.locator("//input[@id='searchMentor']");
    this.filterButton = page
      .locator('div')
      .filter({ hasText: /^Ketersediaan Terdekat$/ })
      .nth(2);
    this.academicLevel = page.getByRole('link', { name: 'Akademik (S1 & S2)' });
  }

  mentorCardsDisplayed = async () => {
    await this.page.waitForLoadState('networkidle');
    await this.mentorCards.first().waitFor({ timeout: 7000 });

    const count = await this.mentorCards.count();
    expect(count).toBeGreaterThan(0);

    await expect(this.mentorCards.first()).toBeVisible();
  };

  mentorCardsNotDisplayed = async () => {
    await expect(this.imageEmptyMentor).toBeVisible();
  };

  searchMentorByName = async (name) => {
    await this.searchMentorInput.fill(name);
    await this.page.waitForLoadState('networkidle');

    const hasMentorCards = await this.mentorCards
      .first()
      .isVisible()
      .catch(() => false);

    if (hasMentorCards) {
      await this.mentorCardsDisplayed();
      const matchedCards = await this.mentorCards.filter({ hasText: name });
      const matchedCount = await matchedCards.count();
      expect(matchedCount).toBeGreaterThan(0);
      await matchedCards.first().click();
    } else {
      await this.mentorCardsNotDisplayed();
    }
  };

  searchByCareerCategory = async (text) => {
    const careerOption = await this.page.locator('//div[contains(@class, "swiper-slide")]', {
      hasText: text,
    });
    await careerOption.click();
    expect(careerOption).toHaveText(text);
  };

  searchByAcademyCategory = async () => {
    await this.academicLevel.click();
    const academicMenu = await this.page.locator('//div[contains(@class, "swiper-slide")]');
    await expect(academicMenu.filter({ hasText: 'Beasiswa S2' })).toBeVisible();
  };

  selectTingkatan = async (tingkatan) => {
    await this.tingkatanButton.click();
    await expect(this.resetTingkatanButton).toBeHidden();

    await this.page.waitForLoadState('networkidle');

    const count = await this.tingkatanDropdown.count();
    let optionFound = false;

    for (let i = 0; i < count; i++) {
      const option = await this.tingkatanDropdown.nth(i);
      const text = await option.textContent();

      if (text && text.trim().toLowerCase().includes(tingkatan.toLowerCase())) {
        await option.click();
        optionFound = true;

        await this.page.waitForLoadState('networkidle');

        const hasMentorCards = await this.mentorCards
          .first()
          .isVisible()
          .catch(() => false);

        if (hasMentorCards) {
          await this.mentorCardsDisplayed();
        } else {
          await this.mentorCardsNotDisplayed();
        }
        break;
      }
    }
    if (!optionFound) {
      throw new Error(`Tingkatan "${tingkatan}" tidak ditemukan dalam dropdown`);
    }
  };

  resetTingkatan = async () => {
    await this.resetTingkatanButton.click();
    const count = await this.allCheckboxTingkatan.count();
    for (let i = 0; i < count; i++) {
      await expect(this.allCheckboxTingkatan.nth(i)).not.toBeChecked();
    }
  };

  selectFilter = async (sequence) => {
    await this.filterButton.click();
    const filterOption = this.page.locator(`//div[@title="${sequence}"]`);
    const filterOptionsText = await filterOption.innerText();
    if (filterOptionsText === sequence) {
      await filterOption.click();
    } else if (filterOptionsText === sequence && sequence === 'Ketersediaan Terdekat') {
      await expect(this.mentorCards).toContainText('Bisa Request');
    } else {
      throw new Error(`Filter "${sequence}" tidak ditemukan`);
    }
  };
}
