# Sound Credit Union Card Definitions and Constants

# Card reward structures
CARDS = {
    "Platinum Rewards Visa": {
        "rewards": {
            "Gas": 0.03,           # 3% back on gas
            "Groceries": 0.02,      # 2% back on groceries
            "default": 0.01         # 1% back on everything else
        },
        "annual_fee": 0,
        "intro_bonus": 0
    },
    "Cash Back Visa": {
        "rewards": {
            "default": 0.015        # 1.5% back on everything
        },
        "annual_fee": 0,
        "intro_bonus": 0
    },
    "Secured Visa": {
        "rewards": {
            "default": 0            # No rewards
        },
        "annual_fee": 0,
        "intro_bonus": 0
    },
    "Classic Visa": {
        "rewards": {
            "default": 0            # No rewards
        },
        "annual_fee": 0,
        "intro_bonus": 0
    }
}

# Merchant categories for transaction generation
# Format: (merchant_name, min_amount, max_amount)
MERCHANTS = {
    'Groceries': [
        ('Whole Foods', 50, 150),
        ('Trader Joe\'s', 30, 100),
        ('Safeway', 40, 120),
        ('Costco', 100, 300),
        ('Target', 30, 80),
    ],
    'Gas': [
        ('Shell', 40, 70),
        ('Costco Gas', 40, 70),
        ('Safeway', 35, 65),
        ('Arco', 30, 60),
    ],
    'Dining': [
        ('Chipotle', 12, 25),
        ('Starbucks', 5, 15),
        ('McDonald\'s', 8, 15),
        ('Olive Garden', 30, 60),
        ('Subway', 8, 15),
        ('Panera Bread', 10, 20),
        ('Local Pizza Place', 15, 35),
    ],
    'Travel': [
        ('Delta Airlines', 200, 800),
        ('United Airlines', 200, 800),
        ('Marriott Hotels', 150, 400),
        ('Hilton', 120, 350),
        ('Airbnb', 100, 300),
        ('Uber', 15, 40),
        ('Lyft', 12, 35),
    ],
    'Entertainment': [
        ('Netflix', 15, 20),
        ('Spotify', 10, 15),
        ('AMC Theaters', 15, 50),
        ('PlayStation Store', 20, 60),
    ],
    'Shopping': [
        ('Amazon', 20, 200),
        ('Walmart', 30, 100),
        ('Target', 25, 80),
        ('Best Buy', 50, 300),
        ('Macy\'s', 40, 150),
    ],
    'Pharmacy': [
        ('CVS Pharmacy', 15, 60),
        ('Walgreens', 15, 60),
        ('Rite Aid', 12, 50),
    ],
    'Utilities': [
        ('PG&E', 80, 150),
        ('Comcast', 70, 120),
        ('AT&T', 60, 100),
    ],
    'Fitness': [
        ('24 Hour Fitness', 30, 80),
        ('Planet Fitness', 20, 40),
        ('Yoga Studio', 15, 30),
    ],
    'Home Improvement': [
        ('Home Depot', 40, 200),
        ('Lowe\'s', 40, 180),
        ('Ace Hardware', 20, 80),
    ]
}

# Category display names
CATEGORY_NAMES = {
    'Groceries': 'Groceries',
    'Gas': 'Gas',
    'Dining': 'Dining',
    'Travel': 'Travel',
    'Entertainment': 'Entertainment',
    'Shopping': 'Shopping',
    'Pharmacy': 'Pharmacy',
    'Utilities': 'Utilities',
    'Fitness': 'Fitness',
    'Home Improvement': 'Home Improvement'
}

# Transaction generation weights (frequency of each category)
CATEGORY_WEIGHTS = {
    'Groceries': 35,
    'Gas': 10,
    'Dining': 30,
    'Shopping': 10,
    'Travel': 3,
    'Entertainment': 8,
    'Pharmacy': 5,
    'Utilities': 3,
    'Fitness': 4,
    'Home Improvement': 5,
}