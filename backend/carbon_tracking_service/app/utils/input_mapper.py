def map_user_answers_to_structure(user_answers: dict) -> dict:
    """
    Map user-friendly answers to the structured input format expected by the carbon calculation logic.

    Args:
        user_answers (dict): User-provided answers to the carbon footprint questions.

    Returns:
        dict: Structured input for carbon calculation.
    """
    structured_input = {
        "home_energy": {
            "electricity_bill": 0.0,
            "heating_type": "",
            "heating_usage": 0,
        },
        "transportation": {
            "car_type": "",
            "weekly_distance": 0,
            "flights": {
                "short_haul": 0,
                "medium_haul": 0,
                "long_haul": 0,
            },
        },
        "diet": {
            "meat_days_per_week": 0,
        },
        "waste": {
            "bags_per_week": 0,
        },
    }

    # Helper function to safely parse numeric values
    def safe_float(value):
        try:
            return float(value)
        except (ValueError, TypeError):
            return 0.0

    def safe_int(value):
        try:
            return int(value)
        except (ValueError, TypeError):
            return 0

    # Home Energy Mapping
    home_energy = user_answers.get("Home Energy", {})
    structured_input["home_energy"]["electricity_bill"] = safe_float(home_energy.get("1", "0").split()[0])  # Extract numeric value
    heating_type = home_energy.get("2", "").lower()
    if "gas" in heating_type:
        structured_input["home_energy"]["heating_type"] = "gas"
        structured_input["home_energy"]["heating_usage"] = 90  # Example usage percentage
    elif "electric" in heating_type:
        structured_input["home_energy"]["heating_type"] = "electric"
        structured_input["home_energy"]["heating_usage"] = 80  # Example usage percentage

    # Transportation Mapping
    transportation = user_answers.get("Transportation", {})
    structured_input["transportation"]["car_type"] = transportation.get("1", "").split()[0].lower()
    structured_input["transportation"]["weekly_distance"] = safe_int(transportation.get("3", "0").split()[0])
    # Map flights (if mentioned)
    structured_input["transportation"]["flights"]["short_haul"] = safe_int(transportation.get("4", "0"))
    structured_input["transportation"]["flights"]["medium_haul"] = safe_int(transportation.get("5", "0"))
    structured_input["transportation"]["flights"]["long_haul"] = safe_int(transportation.get("6", "0"))

    # Diet Mapping
    diet = user_answers.get("Diet", {})
    structured_input["diet"]["meat_days_per_week"] = safe_int(diet.get("1", "0").split()[0])

    # Waste Mapping
    waste = user_answers.get("Waste", {})
    structured_input["waste"]["bags_per_week"] = safe_int(waste.get("5", "0").split()[0])

    return structured_input
