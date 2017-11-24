-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-11-24 18:23:16.706

-- foreign keys
ALTER TABLE categories
    DROP FOREIGN KEY categories_budget;

ALTER TABLE transactions
    DROP FOREIGN KEY transactions_accounts_source;

ALTER TABLE transactions
    DROP FOREIGN KEY transactions_accounts_target;

ALTER TABLE transactions
    DROP FOREIGN KEY transactions_categories;

-- tables
DROP TABLE accounts;

DROP TABLE budgets;

DROP TABLE categories;

DROP TABLE transactions;

-- End of file.

