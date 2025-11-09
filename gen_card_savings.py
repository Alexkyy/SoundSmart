import csv
import json
import os
from constants import CARDS

def load_category_totals(csv_file):
    """Load aggregated spending by category."""
    categories = {}
    total_spent = 0
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            category = row['category']
            spent = float(row['total_spent'])
            categories[category] = spent
            total_spent += spent
    return categories, total_spent

def calculate_card_costs(category_totals, total_spent):
    """Calculate effective cost (spent - rewards) for each card."""
    results = {}

    # Debit card baseline
    results['Debit Card'] = {
        'total_spent': round(total_spent, 2),
        'rewards_earned': 0.00,
        'annual_fee': 0.00,
        'effective_cost': round(total_spent, 2),
        'savings_vs_debit': 0.00,
        'savings_percentage': 0.00
    }

    for card_name, card_info in CARDS.items():
        total_rewards = 0
        for category, spent in category_totals.items():
            reward_rate = card_info['rewards'].get(category, card_info['rewards']['default'])
            total_rewards += spent * reward_rate

        net_rewards = total_rewards - card_info['annual_fee']
        effective_cost = total_spent - net_rewards
        savings_vs_debit = total_spent - effective_cost
        savings_percentage = (savings_vs_debit / total_spent * 100) if total_spent > 0 else 0

        results[card_name] = {
            'total_spent': round(total_spent, 2),
            'rewards_earned': round(total_rewards, 2),
            'annual_fee': card_info['annual_fee'],
            'effective_cost': round(effective_cost, 2),
            'savings_vs_debit': round(savings_vs_debit, 2),
            'savings_percentage': round(savings_percentage, 3)
        }

    return results

def generate_savings_report(user_id, categories_csv):
    """Generate card savings comparison for a specific user."""
    print(f"Loading category data for {user_id} from {categories_csv}...")
    category_totals, total_spent = load_category_totals(categories_csv)

    print(f"✓ Loaded {len(category_totals)} categories")
    print(f"✓ Total spending: ${total_spent:,.2f}\n")

    results = calculate_card_costs(category_totals, total_spent)
    sorted_results = sorted(results.items(), key=lambda x: x[1]['effective_cost'])

    output = {'user_id': user_id, 'cards': results}
    output_file = os.path.join(os.path.dirname(categories_csv), 'card_savings_comparison.json')

    with open(output_file, 'w') as f:
        json.dump(output, f, indent=2)

    print("=" * 70)
    print("CARD SAVINGS COMPARISON")
    print("=" * 70)
    print(f"\nTotal Spending: ${total_spent:,.2f}\n")

    for rank, (card_name, card_data) in enumerate(sorted_results, 1):
        print(f"{rank}. {card_name}")
        print(f"   Effective Cost: ${card_data['effective_cost']:,.2f}")
        print(f"   Rewards Earned: ${card_data['rewards_earned']:,.2f}")
        if card_data['annual_fee'] > 0:
            print(f"   Annual Fee: -${card_data['annual_fee']:,.2f}")
        print(f"   Savings vs Debit: ${card_data['savings_vs_debit']:,.2f} ({card_data['savings_percentage']:.2f}%)\n")

    print("=" * 70)
    print(f"✓ Best card: {sorted_results[0][0]}")
    print(f"✓ Results saved to: {output_file}")
    return output

# gen_card_savings.py
def generate_savings_report(user_id: str, cards: dict) -> dict:
    """Compute and save savings report for the user's top categories."""
    base_path = f"test_data/{user_id}/"
    # load {base_path}top_categories.csv
    # compute savings per card, write to JSON
    return {"path": f"{base_path}card_savings_comparison.json"}