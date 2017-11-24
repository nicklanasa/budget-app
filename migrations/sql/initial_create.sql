-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-11-24 18:23:16.706

-- tables
-- Table: accounts
CREATE TABLE accounts (
    account_id bigint NOT NULL,
    name text DEFAULT NULL,
    CONSTRAINT accounts_pk PRIMARY KEY (account_id)
);

-- Table: budgets
CREATE TABLE budgets (
    budget_id int NOT NULL,
    type int DEFAULT NULL,
    name text DEFAULT NULL,
    amount decimal(15,2) NOT NULL,
    CONSTRAINT budgets_pk PRIMARY KEY (budget_id)
);

-- Table: categories
CREATE TABLE categories (
    category_id bigint NOT NULL,
    name text DEFAULT NULL,
    budget_budget_id int NOT NULL,
    CONSTRAINT categories_pk PRIMARY KEY (category_id)
);

-- Table: transactions
CREATE TABLE transactions (
    transaction_id bigint NOT NULL,
    name text DEFAULT NULL,
    amount double(15,2) DEFAULT NULL,
    date date DEFAULT NULL,
    categories_category_id bigint NOT NULL,
    accounts_source_account_id bigint NOT NULL,
    accounts_target_account_id bigint NOT NULL,
    CONSTRAINT transactions_pk PRIMARY KEY (transaction_id)
);

-- foreign keys
-- Reference: categories_budget (table: categories)
ALTER TABLE categories ADD CONSTRAINT categories_budget FOREIGN KEY categories_budget (budget_budget_id)
    REFERENCES budgets (budget_id);

-- Reference: transactions_accounts_source (table: transactions)
ALTER TABLE transactions ADD CONSTRAINT transactions_accounts_source FOREIGN KEY transactions_accounts_source (accounts_source_account_id)
    REFERENCES accounts (account_id);

-- Reference: transactions_accounts_target (table: transactions)
ALTER TABLE transactions ADD CONSTRAINT transactions_accounts_target FOREIGN KEY transactions_accounts_target (accounts_target_account_id)
    REFERENCES accounts (account_id);

-- Reference: transactions_categories (table: transactions)
ALTER TABLE transactions ADD CONSTRAINT transactions_categories FOREIGN KEY transactions_categories (categories_category_id)
    REFERENCES categories (category_id);

-- End of file.
