def calculate_carbon_footprint(user_input: dict) -> float:
    """
    Calculate carbon footprint based on the user's responses.
    Each section is weighted using hypothetical factors to estimate CO2 emissions.
    """
    transportation = 0.0
    home_energy = 0.0
    diet = 0.0
    waste = 0.0

    # Home Energy calculations
    home_energy += user_input.get("electricity_bill", 0) * 0.5  # Cost-based estimate
    heating_type = user_input.get("heating", {}).get("type", "").lower()
    heating_usage = user_input.get("heating", {}).get("usage", 0)
    if heating_type in ["gas", "oil", "wood"]:
        home_energy += heating_usage * 1.5  # Hypothetical factor for heating CO2

    # Travel calculations
    car_type = user_input.get("car", {}).get("type", "").lower()
    weekly_distance = user_input.get("car", {}).get("weekly_distance_km", 0)
    if car_type in ["gasoline", "diesel", "hybrid", "electric"]:
        transportation += weekly_distance * 0.21  # Placeholder emissions factor per km

    flights = user_input.get("flights", {})
    transportation += (
        flights.get("short_haul", 0) * 200 +
        flights.get("medium_haul", 0) * 500 +
        flights.get("long_haul", 0) * 1000
    )

    # Diet calculations
    diet_meat_days = user_input.get("diet", {}).get("meat_days_per_week", 0)
    diet += diet_meat_days * 7 * 0.15  # Placeholder emissions factor per day

    # Waste calculations
    waste_bags = user_input.get("waste", {}).get("bags_per_week", 0)
    waste += waste_bags * 0.05  # Placeholder emissions per bag

    # Total footprint
    total_footprint = round(home_energy + transportation + diet + waste, 2)
    return total_footprint
