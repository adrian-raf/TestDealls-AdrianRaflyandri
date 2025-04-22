# TestDealls-AdrianRaflyandri

This repository contains end-to-end (E2E) automated tests for key functionalities of the Dealls platform, including login, registration, and mentor search. The tests are implemented using Playwright with JavaScript.

**Login**

- Login as mentee
- Login as mentor

  **Register**

  - Register as a mentee
  - Register schedule for mentoring

  **Search Mentor**

  - Select and view mentor details

## 🛠️ Tech Stack

- **Automation Framework**: Playwright
- **Language**: JavaScript (Node.js)
- **Test Runner**: Playwright Test
- **CI/CD**: GitHub Actions

🚀 Getting Started
Prerequisites
Node.js (version 14 or higher)

1. Installation
   Clone the repository:
   ```bash
   git clone https://github.com/adrian-raf/TestDealls-AdrianRaflyandri.git
   ```

3. Install dependencies:
   npm install

4. Install Playwright browsers:
   npx playwright install

🧪 Running Tests

- Run all tests:
  npx playwright test

  - Run a specific test file:
    npx playwright test tests/{file.js}

- Run tests in headed mode (with browser UI):
  npx playwright test --headed

- View HTML report after tests:
  npx playwright show-report
