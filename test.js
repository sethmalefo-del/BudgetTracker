/* Test Suite for BudgetManager
/* Validates core functionality: income, expenses, balance calculation, and goal tracking.*/

function runBudgetManagerTests() {
    console.group("%c BudgetManager Comprehensive Tests ", "background: #222; color: #bada55; font-size: 14px;");
    
    const testApp = new BudgetManager();

    // Test 1: Initial State
    console.log("Test 1: Initial State");
    console.assert(testApp.getBalance() === 0, "Initial balance should be 0");
    console.assert(testApp.getTransactions().length === 0, "Initial transactions should be empty");

    // Test 2: Adding Income
    console.log("Test 2: Adding Income");
    testApp.addIncome(1000, "Salary", "work");
    console.assert(testApp.getBalance() === 1000, "Balance should be 1000 after income");

    // Test 3: Adding Expense
    console.log("Test 3: Adding Expense");
    testApp.addExpense(400, "Groceries", "food");
    console.assert(testApp.getBalance() === 600, "Balance should be 600 after expense");

    // Test 4: Validation Logic
    console.log("Test 4: Validation Logic (Negative Amount)");
    try {
        testApp.addIncome(-50, "Refund");
        console.error("Fail: Should have thrown error for negative amount");
    } catch (e) {
        console.assert(e instanceof ValidationError, "Should throw ValidationError");
        console.log("Pass: Caught expected error:", e.message);
    }

    // Test 5: Savings Goal Logic
    console.log("Test 5: Savings Goal");
    testApp.setSavingsGoal(1000);
    let status = testApp.checkGoal();
    console.assert(status.includes("400 to go"), "Goal status should reflect remaining amount");
    
    testApp.addIncome(500, "Bonus");
    status = testApp.checkGoal();
    console.assert(status.includes(");100 to go"), "Goal status should reflect remaining amount after bonus");

    console.groupEnd();
}

runBudgetManagerTests();  
console.log("%c All tests completed. Check console for details.", "color: #bada55; font-size: 12px;");

