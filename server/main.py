import secrets
from gen_data import generate_user_data
from gen_card_savings import generate_savings_report

def main():
    user_id = "U002"

    # Step 1: generate mock data for the user
    data_paths = generate_user_data(user_id, n_transactions=200)
    print("Generated user data:", data_paths)

    # Step 2: define a test card dataset (simplified)
    cards = {
        "SCU Visa Signature": {
            "issuer": "Sound Credit Union",
            "rewards": {"default": 0.015, "gas": 0.03, "groceries": 0.02},
            "annual_fee": 0,
            "reward_type": "cashback"
        },
        "Generic 2% Cashback": {
            "issuer": "Other Bank",
            "rewards": {"default": 0.02},
            "annual_fee": 0,
            "reward_type": "cashback"
        }
    }

    # Step 3: generate savings report for the user
    report = generate_savings_report(user_id, cards)
    print("Generated savings report:", report)

if __name__ == "__main__":
    main()