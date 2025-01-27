from typing import Dict, Any

def calculate_carbon_footprint(user_input: Dict[str, Any]) -> Dict[str, float]:
    emissions = {
        "home_energy": 0.0,
        "transportation": 0.0,
        "diet": 0.0,
        "waste": 0.0,
    }

    # Home Energy calculations
    home_energy_input = user_input.get("home_energy", {})
    
    electricity_bill = home_energy_input.get("electricity_bill", 0)
    emissions["home_energy"] += electricity_bill * 0.5
    
    heating_type = home_energy_input.get("heating_type", "").lower()
    heating_usage = home_energy_input.get("heating_usage", 0)
    
    heating_factors = {
        "gas": 1.5,
        "oil": 2.5,
        "wood": 1.2,
    }
    
    if heating_type in heating_factors:
        emissions["home_energy"] += heating_usage * heating_factors[heating_type]

    # Transportation calculations
    transportation_input = user_input.get("transportation", {})
    
    car_type = transportation_input.get("car_type", "").lower()
    weekly_distance = transportation_input.get("weekly_distance", 0)
    
    car_emission_factors = {
        "gasoline": 0.21,
        "diesel": 0.24,
        "hybrid": 0.15,
        "electric": 0.05,
    }
    
    if car_type in car_emission_factors:
        emissions["transportation"] += (weekly_distance * car_emission_factors[car_type])

    # Flights calculation
    flights = transportation_input.get("flights", {})
    
    if isinstance(flights, dict):  # Ensure flights is a dictionary
        emissions["transportation"] += (
            flights.get("short_haul", 0) * 200 +
            flights.get("medium_haul", 0) * 500 +
            flights.get("long_haul", 0) * 1000
        )

    # Diet calculations
    diet_input = user_input.get("diet", {})
    
    diet_meat_days = diet_input.get("meat_days_per_week", 0)
    
    meat_emission_factor_per_day = 7 * 2.5
    
    emissions["diet"] += diet_meat_days * meat_emission_factor_per_day

    # Waste calculations
    waste_input = user_input.get("waste", {})
    
    waste_bags = waste_input.get("bags_per_week", 0)
    
    waste_emission_factor_per_bag = 1.5
    
    emissions["waste"] += waste_bags * waste_emission_factor_per_bag

    emissions["total"] = round(sum(emissions.values()), 2)

    return emissions
