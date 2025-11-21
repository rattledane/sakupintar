# SakuPintar Project TODO

## Core Features

### Landing Page & Authentication
- [x] Landing page with creative design and Get Started button
- [x] Login/Sign up page with email and password fields
- [x] Forgot password functionality
- [x] Demo credentials (demo@gmail.com / 123)
- [x] Authentication state management

### Dashboard
- [x] Dashboard layout with sidebar navigation
- [x] Total balance card with percentage change
- [x] Income card with percentage change
- [x] Expense card with percentage change
- [x] Total savings card with percentage change
- [ ] Money flow chart (bar chart with income/expense by month)
- [ ] Budget widget (donut chart with categories)
- [x] Recent transactions table
- [ ] Saving goals widget
- [ ] Add/manage widgets functionality
- [x] Dashboard data updates when transactions/goals change

### Transactions
- [x] Transactions page with list view
- [x] Add new transaction (income/expense)
- [x] Edit transaction
- [x] Delete transaction
- [ ] Filter transactions by category, date, type
- [x] Transaction data persisted to local storage
- [x] Updates dashboard when transactions change

### Goals
- [x] Goals page with list of saving goals
- [x] Add new goal with target amount and deadline
- [x] Edit goal details
- [x] Delete goal
- [x] Add savings to goal (progress tracking)
- [x] Goal progress visualization
- [x] Goals data persisted to local storage
- [ ] Donut chart with goal categories and different colors
- [x] Updates dashboard when goals change

### Budgeting
- [x] Budget page with category-based budgets
- [x] Add new budget for category
- [x] Edit budget amount
- [x] Delete budget
- [x] Budget vs actual spending comparison
- [x] Budget data persisted to local storage
- [x] Updates dashboard when budget changes

### Analytics
- [x] Analytics page with financial overview
- [ ] Total balance overview chart
- [x] Income statistics
- [x] Expense statistics
- [x] Budget vs expense comparison chart
- [ ] Expense breakdown by category (donut chart)
- [ ] Manage widgets functionality
- [ ] Add new widget option

### Calculator Section
- [x] Financial calculator for income/expense calculations
- [x] Goal achievement calculator (time to reach goal with salary/bonus/tax)
- [x] Data analysis features
- [x] Integrated into analytics page

### Settings & Profile
- [x] Profile page with user information
- [x] Edit profile (name, email, avatar)
- [x] Currency settings (IDR)
- [ ] Theme settings
- [x] Help section
- [x] Log out functionality

### AI Chatbot (SakuBot)
- [x] Integrate Gemini 2.0 API
- [x] SakuBot chatbot on dashboard
- [x] SakuBot on goals page
- [x] SakuBot on budgeting page
- [x] SakuBot on analytics page
- [x] SakuBot on transactions page
- [x] Financial advice and guidance responses
- [x] Exclude SakuBot from settings page

### Data Management
- [x] All user data stored in local storage
- [x] Data persistence across sessions
- [x] Data synchronization across pages
- [x] Clear data option in settings

### UI/UX
- [x] Responsive design (mobile, tablet, desktop)
- [x] Icons from Boxicons/Iconify (no emoji)
- [x] Color scheme matching design reference
- [x] Smooth animations and transitions
- [x] Loading states
- [x] Error handling and validation
- [x] Toast notifications for actions

## Design References
- Dashboard layout with sidebar
- Goals page with goal cards and progress
- Analytics page with charts and statistics
- Color palette: Purple/Blue theme
- Currency: IDR (Indonesian Rupiah)

## Notes
- No wallet/digital wallet feature
- Demo account only for testing
- All data in local storage (no backend)
- Charts should update dynamically when data changes
- Money flow chart updates when transactions added
- Goal donut chart updates when goals added/modified
