def map_user_answers_to_structure(user_answers: dict) -> dict:
    """
    Maps user answers to structured input format based on the data.json schema
    """
    structured_input = {
        "home_energy": {
            "electricity_bill": 0.0,
            "heating_type": "None",
            "heating_usage": 0
        },
        "transportation": {
            "car_type": "None",
            "weekly_distance": 0,
            "flights": {
                "short_haul": 0,
                "medium_haul": 0,
                "long_haul": 0
            }
        },
        "diet": {
            "meat_days": 0,
            "dairy_consumption": "None",
            "local_food_percentage": 0
        },
        "waste": {
            "waste_bags": 0,
            "recycling_percentage": 0,
            "composting": "No"
        }
    }

    def safe_float(value):
        try:
            if isinstance(value, str):
                value = value.split()[0]  # Handle units in string
            return float(value)
        except (ValueError, TypeError):
            return 0.0

    # Map Home Energy
    if "home_energy" in user_answers:
        he = user_answers["home_energy"]
        structured_input["home_energy"].update({
            "electricity_bill": safe_float(he.get("electricity_bill", 0)),
            "heating_type": he.get("heating_type", "None"),
            "heating_usage": safe_float(he.get("heating_usage", 0))
        })

    # Map Transportation
    if "transportation" in user_answers:
        trans = user_answers["transportation"]
        structured_input["transportation"].update({
            "car_type": trans.get("car_type", "None"),
            "weekly_distance": safe_float(trans.get("weekly_distance", 0)),
            "flights": {
                "short_haul": safe_float(trans.get("flights_short", 0)),
                "medium_haul": safe_float(trans.get("flights_medium", 0)),
                "long_haul": safe_float(trans.get("flights_long", 0))
            }
        })

    # Map Diet
    if "diet" in user_answers:
        diet = user_answers["diet"]
        structured_input["diet"].update({
            "meat_days": safe_float(diet.get("meat_days", 0)),
            "dairy_consumption": diet.get("dairy_consumption", "None"),
            "local_food_percentage": safe_float(diet.get("local_food", 0))
        })

    # Map Waste
    if "waste" in user_answers:
        waste = user_answers["waste"]
        structured_input["waste"].update({
            "waste_bags": safe_float(waste.get("waste_bags", 0)),
            "recycling_percentage": safe_float(waste.get("recycling", 0)),
            "composting": waste.get("composting", "No")
        })

    return structured_input