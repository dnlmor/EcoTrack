from typing import Dict, Any
def calculate_carbon_footprint(user_input: Dict[str, Any]) -> Dict[str, float]:
    """
    Calculate carbon footprint based on the user's responses.
    This function now returns a breakdown of emissions per category.
    Args:
        user_input (dict): User-provided input categorized into sections.
    Returns:
        dict: A breakdown of carbon footprint contributions.
    """
    # Initialize category emissions
    emissions = {
        "home_energy": 0.0,
        "transportation": 0.0,
        "diet": 0.0,
        "waste": 0.0,
    }
    # Home Energy calculations
    home_energy_input = user_input.get("home_energy", {})
    
    # Calculate emissions from electricity usage
    electricity_bill = home_energy_input.get("electricity_bill", 0)
    emissions["home_energy"] += electricity_bill * 0.5  # Hypothetical factor for kWh to CO2 conversion
    
    # Calculate emissions from heating
    heating_type = home_energy_input.get("heating_type", "").lower()
    heating_usage = home_energy_input.get("heating_usage", 0)
    
    # Adjust factors based on heating type
    heating_factors = {
        "gas": 1.5,
        "oil": 2.5,  # Higher factor for oil
        "wood": 1.2,  # Lower factor for wood
    }
    
    if heating_type in heating_factors:
        emissions["home_energy"] += heating_usage * heating_factors[heating_type]
    # Transportation calculations
    transportation_input = user_input.get("transportation", {})
    
    # Calculate emissions based on car type and distance traveled
    car_type = transportation_input.get("car_type", "").lower()
    weekly_distance = transportation_input.get("weekly_distance", 0)
    
    car_emission_factors = {
        "gasoline": 0.21,
        "diesel": 0.24,  # Slightly higher for diesel
        "hybrid": 0.15,   # Lower for hybrid vehicles
        "electric": 0.05, # Minimal direct emissions but consider indirect factors
    }
    
    if car_type in car_emission_factors:
        emissions["transportation"] += (weekly_distance * car_emission_factors[car_type])
    # Flights calculation
    flights = transportation_input.get("flights", {})
    
    emissions["transportation"] += (
        flights.get("short_haul", 0) * 200 +
        flights.get("medium_haul", 0) * 500 +
        flights.get("long_haul", 0) * 1000
    )
    # Diet calculations
    diet_input = user_input.get("diet", {})
    
    diet_meat_days = diet_input.get("meat_days_per_week", 0)
    
    # Adjusting the factor to be more realistic based on average meat consumption
    meat_emission_factor_per_day = 7 * 2.5  # kg CO2 equivalent per day if consuming meat
    
    emissions["diet"] += diet_meat_days * meat_emission_factor_per_day
    # Waste calculations
    waste_input = user_input.get("waste", {})
    
    waste_bags = waste_input.get("bags_per_week", 0)
    
    # Adjusting the factor based on average waste generation per bag
    waste_emission_factor_per_bag = 1.5  # kg CO2 equivalent per bag
    
    emissions["waste"] += waste_bags * waste_emission_factor_per_bag
    # Calculate total footprint and add to the result
    emissions["total"] = round(sum(emissions.values()), 2)
    return emissions