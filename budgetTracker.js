// lesson4.js — Budget Tracker Homework
// Fill in every TODO below, then open index.html in Chrome (F12 -> Console)

// TODO 1: Create a ValidationError class that extends Error.
// It should set this.name to 'ValidationError'.
class ValidationError extends Error {
constructor(message) {
    super(message);
    this.name = 'ValidationError';
}
}

const BudgetTracker = (() => {
  // TODO 2: Declare a private transactions array.
const transactions = [];

// TODO 3: Write a private validate() function.
const validate = (amount, description) => {
    if (typeof amount !== 'number' || amount <= 0) {
    throw new ValidationError('Amount must be a positive number');
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
    throw new ValidationError('Description is required');
    }
};

return {
    // TODO 4: addIncome(amount, description)
    addIncome(amount, description, category = 'general') {
    try {
        validate(amount, description);
        transactions.push({ type: 'income', amount, description, category });
        return `Income added: R${amount} (${description}) [${category}]`;
    } catch (error) {
        return `Error: ${error.message}`;
    }
    },

    // TODO 5: addExpense(amount, description)
    addExpense(amount, description, category = 'general') {
    try {
        validate(amount, description);
        transactions.push({ type: 'expense', amount, description, category });
        return `Expense added: R${amount} (${description}) [${category}]`;
    } catch (error) {
        return `Error: ${error.message}`;
    }
    },

    // TODO 6: getBalance()
    getBalance() {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return income - expenses;
    },

    // TODO 7: getSummary()
    getSummary() {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    
    return {
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        count: transactions.length
    };
    },

    // TODO 8: getTransactions()
    getTransactions() {
    return [...transactions];
    }};
})();

// ── TEST YOUR TRACKER BELOW ──────────────────────────────
// These lines run automatically when you open index.html in Chrome.
// Open F12 -> Console tab to see the output.
console.log(BudgetTracker.addIncome(5000, 'Monthly salary'));
console.log(BudgetTracker.addIncome(1200, 'Freelance work'));
console.log(BudgetTracker.addExpense(1500, 'Rent'));
console.log(BudgetTracker.addExpense(800, 'Groceries'));
console.log(BudgetTracker.addExpense(300, 'Transport'));
console.log(BudgetTracker.addIncome(-100, 'Bad income'));
console.log(BudgetTracker.addExpense(0, ''));
console.log('Balance: R' + BudgetTracker.getBalance());
console.log(BudgetTracker.getSummary());
console.table(BudgetTracker.getTransactions());

// Part3 - Bonus //
// updated addIncome & addExpense to accept the new parameter // 
console.log(BudgetTracker.addIncome(5000, 'Monthly salary', 'salary'));
console.log(BudgetTracker.addIncome(800, 'Groceries', 'food'));
console.log(BudgetTracker.addExpense(1500,'Rent'));
console.log(BudgetTracker.addExpense(300, 'Transport', 'transport'));

//getReportBy Category()//
//Expected shape:
// { salary: 5000, food: 800, transport: 300 }
function getReportByCategory() {
    const transactions = BudgetTracker.getTransactions();
    return transactions.reduce((report, transaction) => {
        const { category, amount, type } = transaction;
        const value = type === 'income' ? amount : -amount;
        report[category] = (report[category] || 0) + value;
        return report;
    }, {});
}

console.log('Report by Category:', getReportByCategory());

//Rewrite BudgetTracker as ES^ instead of module pattern
//setSavingsGoal(amount) - stores a private savings goal
//checkGoal() -  returns one of two strings:

//If balance >= goal:
// 'Goal reached! You have R(balance), goal was R{goal}.'

// If balance < goal:
// 'R{remaining to o. Balance: R{balance}, Goal: R{goal}.'

class BudgetManager {
    #transactions = []; // Private field
    #savingsGoal = 0;   // Private field

    #validate(amount, description) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new ValidationError('Amount must be a positive number');
        }
        if (!description || description.trim() === '') {
            throw new ValidationError('Description is required');
        }
    }

    setSavingsGoal(amount) {
        if (typeof amount !== 'number' || amount < 0) throw new ValidationError('Invalid goal');
        this.#savingsGoal = amount;
        return true;
    }

    checkGoal() {
        const balance = this.getBalance();
        if (balance >= this.#savingsGoal) {
            return `Goal reached! You have R${balance}, goal was R${this.#savingsGoal}.`;
        }
        return `R${this.#savingsGoal - balance} to go. Balance: R${balance}, Goal: R${this.#savingsGoal}.`;
    }

    addIncome(amount, description, category = 'general') {
        try {
            this.#validate(amount, description);
            this.#transactions.push({ type: 'income', amount, description, category });
            return true;
        } catch (e) {
            throw e;
        }
    }

    addExpense(amount, description, category = 'general') {
        try {
            this.#validate(amount, description);
            this.#transactions.push({ type: 'expense', amount, description, category });
            return true;
        } catch (e) {
            throw e;
        }
    }

    getBalance() {
        return this.#transactions.reduce((sum, t) => 
            t.type === 'income' ? sum + t.amount : sum - t.amount, 0);
    }

    getSummary() {
        return {
            balance: this.getBalance(),
            count: this.#transactions.length
        };
    }

    getTransactions() {
        return [...this.#transactions];
    }
}

// UI Integration Logic
const manager = new BudgetManager();

function handleAdd(type) {
    const desc = document.getElementById('desc').value;
    const amt = parseFloat(document.getElementById('amt').value);
    const cat = document.getElementById('cat').value;
    const status = document.getElementById('status');

    try {
        if (type === 'income') manager.addIncome(amt, desc, cat);
        else manager.addExpense(amt, desc, cat);
        
        status.textContent = "Transaction added successfully!";
        status.className = "success";
        updateUI();
    } catch (error) {
        status.textContent = error.message;
        status.className = "error";
    }
}

function updateUI() {
    const list = document.getElementById('transactionList');
    const summary = document.getElementById('summary');
    const transactions = manager.getTransactions();
    
    list.innerHTML = transactions.map(t => `
        <div class="transaction ${t.type}">
            <span>${t.description} (${t.category})</span>
            <span>${t.type === 'income' ? '+' : '-'} R${t.amount}</span>
        </div>
    `).join('');
    
    summary.innerHTML = `<strong>Total Balance: R${manager.getBalance()}</strong>`;
}

// --- TEST SUITE ---
function runTests() {
    console.group("BudgetManager Test Suite");
    const testManager = new BudgetManager();
    
    // Test 1: Initial Balance
    console.assert(testManager.getBalance() === 0, "Initial balance should be 0");
    
    // Test 2: Error Handling
    try { testManager.addIncome(-10, ""); } 
    catch (e) { console.log("Success: Caught invalid income error"); }
    
    console.groupEnd();
}

runTests();
