# User Management Transactions Components

This folder contains the refactored components for the User Transactions feature.

## Structure

```
transactions/
├── types.ts                    # TypeScript interfaces and types
├── transactionData.ts          # Mock transaction data
├── ActionButtons.tsx           # Action buttons (Send, Fund, Convert, etc.)
├── FilterDropdowns.tsx        # Filter dropdowns (Tx Type, Country, Status, Buy)
├── TransactionTable.tsx        # Main transaction table component
├── TransactionModal.tsx        # Transaction details modal
└── README.md                   # This file
```

## Components

### ActionButtons
Renders the action buttons (Send, Fund, Convert, Withdraw, P2P, Bill Payments)

### FilterDropdowns
Renders all filter dropdowns:
- Tx Type / Route dropdown
- Country dropdown
- Status dropdown
- Buy dropdown (for P2P and Bill Payments)

### TransactionTable
Renders the main transaction table with:
- Table headers (dynamic based on selected action)
- Table rows with transaction data
- Checkboxes for selection
- Action buttons

### TransactionModal
Renders the transaction details modal with:
- Success/Error icons
- Transaction summary
- Transaction details (varies by transaction type)
- Conversion details (for Convert transactions)
- P2P details (for P2P transactions)

## Usage

Import and use these components in the main UserTransaction component:

```tsx
import ActionButtons from "../../../components/userManagement/transactions/ActionButtons";
import FilterDropdowns from "../../../components/userManagement/transactions/FilterDropdowns";
import TransactionTable from "../../../components/userManagement/transactions/TransactionTable";
import TransactionModal from "../../../components/userManagement/transactions/TransactionModal";
```

