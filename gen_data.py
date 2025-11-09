import random
from datetime import datetime, timedelta
import csv
import os
from collections import defaultdict
from constants import MERCHANTS, CATEGORY_WEIGHTS

def generate_transactions(num_transactions=300, days_back=365):
    transactions = []
    transaction_id = 1

    end_date = datetime.now()
    start_date = end_date - timedelta(days=days_back)

    for _ in range(num_transactions):
        category = random.choices(
            list(CATEGORY_WEIGHTS.keys()),
            weights=list(CATEGORY_WEIGHTS.values())
        )[0]

        merchant_data = random.choice(MERCHANTS[category])
        merchant_name = merchant_data[0]
        min_amount, max_amount = merchant_data[1], merchant_data[2]

        amount = round(random.uniform(min_amount, max_amount), 2)
        random_days = random.randint(0, days_back)
        transaction_date = end_date - timedelta(days=random_days)

        transaction = {
            'transaction_id': f'txn_{transaction_id:04d}',
            'date': transaction_date.strftime('%Y-%m-%d'),
            'name': merchant_name,
            'amount': amount,
            'category': category,
            'merchant_name': merchant_name,
        }

        transactions.append(transaction)
        transaction_id += 1

    transactions.sort(key=lambda x: x['date'], reverse=True)
    return transactions

def save_transactions_csv(transactions, output_path):
    """Save transactions to CSV file."""
    with open(output_path, 'w', newline='') as f:
        if transactions:
            fieldnames = ['transaction_id', 'date', 'name', 'amount', 'category', 'merchant_name']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(transactions)

def save_category_analysis(transactions, output_path):
    """Save category spending analysis to CSV."""
    spending_by_category = defaultdict(float)
    transaction_count_by_category = defaultdict(int)

    for t in transactions:
        spending_by_category[t['category']] += t['amount']
        transaction_count_by_category[t['category']] += 1

    with open(output_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['rank', 'category', 'total_spent', 'transaction_count', 'average_per_transaction'])

        rank = 1
        for category, total in sorted(spending_by_category.items(), key=lambda x: x[1], reverse=True):
            count = transaction_count_by_category[category]
            avg = total / count
            writer.writerow([rank, category, round(total, 2), count, round(avg, 2)])
            rank += 1

    return spending_by_category, transaction_count_by_category

def save_merchant_analysis(transactions, output_path):
    """Save merchant spending analysis to CSV."""
    spending_by_merchant = defaultdict(float)
    merchant_transaction_count = defaultdict(int)

    for t in transactions:
        spending_by_merchant[t['merchant_name']] += t['amount']
        merchant_transaction_count[t['merchant_name']] += 1

    with open(output_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['rank', 'merchant', 'total_spent', 'transaction_count'])

        rank = 1
        for merchant, total in sorted(spending_by_merchant.items(), key=lambda x: x[1], reverse=True):
            count = merchant_transaction_count[merchant]
            writer.writerow([rank, merchant, round(total, 2), count])
            rank += 1

    return spending_by_merchant, merchant_transaction_count

def generate_user_data(user_id: str, n_transactions: int = 200) -> dict:
    """Generate and save mock transaction data for a specific user."""
    path = f"test_data/{user_id}/"
    os.makedirs(path, exist_ok=True)

    # 1. Generate mock transactions
    transactions = generate_transactions(num_transactions=n_transactions)

    # 2. Save all generated data
    transactions_path = os.path.join(path, "transactions.csv")
    top_categories_path = os.path.join(path, "top_categories.csv")
    top_merchants_path = os.path.join(path, "top_merchants.csv")

    save_transactions_csv(transactions, transactions_path)
    save_category_analysis(transactions, top_categories_path)
    save_merchant_analysis(transactions, top_merchants_path)

    # 3. Return paths for downstream processing
    return {
        "transactions_path": transactions_path,
        "top_categories_path": top_categories_path,
        "top_merchants_path": top_merchants_path,
    }
