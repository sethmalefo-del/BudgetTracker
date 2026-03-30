# 💰 Advanced Budget Tracker

A modern, interactive budget management application built with vanilla JavaScript. This project demonstrates advanced JS patterns, robust error handling, and a high-performance UI with neon and rainbow aesthetic enhancements.

## 🚀 Features

- **Transaction Management**: Easily add income and expenses with descriptions and amounts.
- **Categorization**: Organize your spending with categories like Food, Transport, Salary, and Rent.
- **Real-time Calculations**: Automatic balance updates and transaction summaries.
- **Savings Goals**: Set a private savings goal and track your progress with the `checkGoal()` logic.
- **Advanced Logic**:
  - **Encapsulation**: Uses ES6 Private Class fields (`#transactions`, `#savingsGoal`) to ensure data integrity.
  - **Custom Error Handling**: Implements a dedicated `ValidationError` class to provide meaningful feedback.
  - **Validation**: Strict validation ensures amounts are positive and descriptions are provided.
- **Modern UI**:
  - **Glassmorphism**: Sleek backdrop filters and translucent surfaces.
  - **Animations**: Smooth slide-in effects for new transactions.
  - **Dynamic Styling**: Eye-catching Neon and Rainbow button effects.

## 🛠️ Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Advanced animations, Flexbox, and CSS Variables.
- **JavaScript (ES6+)**:
  - Classes & Private Fields.
  - Module Pattern.
  - Array Methods (`reduce`, `filter`, `map`).
  - DOM Manipulation.

## 📂 Project Structure

- `index.html`: The main interface structure.
- `budgetTracker.js`: The core business logic containing the `BudgetManager` class.
- `styles.css`: (In innovated version) Modern dark-theme styling and animations.

## 📖 How to Use

1. **Add Income**: Enter a description (e.g., "Freelance Work"), an amount, and select a category. Click the **Add Income** (Neon) button.
2. **Add Expense**: Enter the details and click the **Add Expense** (Rainbow) button.
3. **View Summary**: The balance box at the top updates automatically to show your current financial standing.
4. **Review History**: Scroll through the transaction list to see your categorized entries.

## 🧪 Technical Highlights

The project includes a built-in test suite in `budgetTracker.js` that verifies:
- Initial state management.
- Accurate balance calculations.
- Error catching for invalid inputs.

---
*Developed as part of the TechBridle Foundation Cohort 2026.*
