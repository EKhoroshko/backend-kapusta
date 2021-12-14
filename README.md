# AUTH ROUTERS

{
"email":"test2@gmail.com",
"password": "1111111111",
"userName":"KKKK"
}

router.post("/api/auth/users/register");

{
"email":"test2@gmail.com",
"password": "1111111111",
}

router.post("/api/auth/users/login");

token

router.get("/api/auth/users/logout");

router.post("/api/auth/users/verify");
router.get("/api/auth/users/verify:verificationToken");
router.get("/api/auth/users/current");

## TRANSACTIONS ROUTERS

updateBalance

router.patch("/api/transactions/:userId");

addTransaction
/api/transactions/costs;
/api/transactions/incomes;

router.post("/api/transactions/:transType");

getAllTransactions

router.get("/api/transactions/all");

getCostsIncomesTrans

По дефолту прописан текущий год!!!
Для сводка конкретных транзакций (к примеру incomes) за конкретный год (к примеру 2020), то :
api/transactions/incomes/2020

Для сводка конкретных транзакций (к примеру costs) за конкретный месяц(ПО ДЕФОЛТУ ТЕКУЩИЙ МЕСЯЦ) конкретного года (к примеру 2020 год 11 месяц), то:
api/transactions/costs/2020/11

router.get("/api/transactions/:transType/:year?/:month?");

deleteTransaction

router.delete("/api/transactions/:transactionId");

### CATEGORIES ROUTERS

router.get("/api/categories")
