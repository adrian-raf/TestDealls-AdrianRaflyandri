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
- **Language**: JavaScript 
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

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

🧪 Running Tests

- Run all tests:
  ```bash
  npx playwright test
  ```

  - Run a specific test file:
    ```bash
    npx playwright test tests/{file.js}
    ```

- Run tests in headed mode (with browser UI):
  ```bash
  npx playwright test --headed
  ```

- View HTML report after tests:
  ```bash
  npx playwright show-report
  ```
