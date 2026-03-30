// Reactive Budget Tracker - Fixed DOM queries + Event Listeners

// Initialize BudgetManager from budgetTracker.js
const budgetApp = new BudgetManager();

// Wait for DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements - now safe
  const descriptionInput = document.getElementById('desc');
  const amountInput = document.getElementById('amt');
  const categoryInput = document.getElementById('cat');
  const statusMessage = document.getElementById('status');
  const transactionList = document.getElementById('transactionList');
  const summaryDisplay = document.getElementById('summary');

  /* Reactive UI Update */
  function updateUI() {
    const transactions = budgetApp.getTransactions();
    const summary = budgetApp.getSummary();         
    
    // Transaction List - reactive update
    transactionList.innerHTML = transactions.map(t => `
      <div class="transaction ${t.type}" data-category="${t.category}">
        <span class="desc">${t.description} <small>(${t.category})</small></span>
        <span class="amt">${t.type === 'income' ? '+' : '-'} R${t.amount.toFixed(2)}</span>
      </div>
    `).join('');    

    // Summary - reactive
    summaryDisplay.innerHTML = `
      <strong class="balance-display">Balance: R${summary.balance.toFixed(2)}</strong>
      <p>Transactions: ${summary.count}</p>
    `;
  }

  /**
   * Reactive transaction handler
   */
  window.handleAdd = function(type) {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value || 'general';

    if (!description || isNaN(amount) || amount <= 0) {
      statusMessage.textContent = 'Please enter valid description and positive amount';
      statusMessage.className = 'status error';
      return;
    }

    try {
      if (type === 'income') {
        budgetApp.addIncome(amount, description, category);
      } else {
        budgetApp.addExpense(amount, description, category);
      }

      // Clear + success feedback
      descriptionInput.value = '';
      amountInput.value = '';
      statusMessage.textContent = `Added ${type === 'income' ? 'income' : 'expense'}!`;
      statusMessage.className = `status ${type === 'income' ? 'success' : 'error'}`;

      // Reactive UI update
      updateUI();
      
      // Auto-hide status after 3s
      setTimeout(() => {
        statusMessage.className = 'status';
        statusMessage.textContent = '';
      }, 3000);

    } catch (error) {
      statusMessage.textContent = error.message;
      statusMessage.className = 'status error';
    }
  };

  // Initial load
  updateUI();
});

/*Updates the visual representation of the budget*/
function updateUI() {
    const transactions = budgetApp.getTransactions();
    const summary = budgetApp.getSummary();         
    // Update Transaction List
    transactionList.innerHTML = transactions.map(t => `
        <div class="transaction-item ${t.type}">
            <span class="desc">${t.description} <small>(${t.category})</small></span>
            <span class="amt">${t.type === 'income' ? '+' : '-'} R${t.amount.toFixed(2)}</span>
        </div>
    `).join('');    

    // Update Summary
    summaryDisplay.innerHTML = `
        <p>Total Transactions: ${summary.count}</p>
        <h3>Current Balance: R${summary.balance.toFixed(2)}</h3>
    `;

    // Update Goal Status if a goal exists
    goalStatus.textContent = budgetApp.checkGoal();
}   

/**
 * Handles adding a new transaction
 * @param {string} type - 'income' or 'expense'
 * */
function handleTransaction(type) {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value || 'general';  

    try {
        if (type === 'income') {
            budgetApp.addIncome(amount, description, category);
        } else {
            budgetApp.addExpense(amount, description, category);
        }

        // Clear inputs on success
        descriptionInput.value = '';
        amountInput.value = ''; 

        statusMessage.textContent = "Transaction added successfully!";
    } catch (error) {       
        statusMessage.textContent = error.message;      
    }
    statusMessage.className = "status " + (type === 'income' ? 'success' : 'error');
    updateUI();
}   
/**
 * Handles setting a new financial goal
 */ 
function handleSetGoal() {
    const goalAmount = parseFloat(goalInput.value);
    try {
        budgetApp.setGoal(goalAmount);
        statusMessage.textContent = "Goal set successfully!";
        statusMessage.className = "status success";
        updateUI();
    } catch (error) {
        statusMessage.textContent = error.message;
        statusMessage.className = "status error";
    }   

    goalInput.value = '';
}   
// Event Listeners
document.getElementById('addIncome').addEventListener('click', () => handleTransaction('income'));
document.getElementById('addExpense').addEventListener('click', () => handleTransaction('expense'));
document.getElementById('setGoal').addEventListener('click', handleSetGoal);    
// Initial UI Update
updateUI(); 


