import { expect } from '@playwright/test';

export async function selectDropdownByText(page, text) {
  await page.locator('div.ant-select-item-option', { hasText: text }).click();
}

export async function buttonClickByText(page, text) {
  await page.getByRole('button', { name: text }).click();
}

export const fillAndSelectDropdown = async ({ page, inputLocator, text }) => {
  // Klik dan bersihkan input
  await inputLocator.click();
  await inputLocator.clear();
  await inputLocator.fill(text);

  // Tunggu dropdown muncul
  await page.waitForTimeout(500);

  // Dapatkan semua opsi dalam dropdown
  const options = page.locator('.ant-select-item-option');
  const count = await options.count();

  // Jika tidak ada opsi, lempar error
  if (count === 0) {
    throw new Error(`Tidak ada opsi dropdown untuk "${text}"`);
  }

  // Cari opsi yang cocok persis dengan text
  let exactMatchFound = false;
  let addOptionFound = false;

  for (let i = 0; i < count; i++) {
    const optionText = await options.nth(i).innerText();

    // Cek apakah ada yang cocok persis
    if (optionText.trim().toLowerCase() === text.toLowerCase()) {
      await options.nth(i).click();
      exactMatchFound = true;
      break;
    }

    // Cek apakah ada opsi "Add"
    if (optionText.includes(`Add "${text}"`)) {
      addOptionFound = true;
      // Simpan indeks tapi jangan klik dulu, prioritaskan exact match
      addOptionIndex = i;
    }
  }

  // Jika tidak ada yang cocok persis, tetapi ada opsi "Add", klik opsi "Add"
  if (!exactMatchFound && addOptionFound) {
    await options.nth(addOptionIndex).click();
    return;
  }

  // Jika tidak ada yang cocok persis dan tidak ada opsi "Add", klik opsi pertama
  if (!exactMatchFound && !addOptionFound) {
    await options.nth(0).click();
  }
};
