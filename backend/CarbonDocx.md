# BACKEND ARCHITECTURE

## Consist of these services:
- core service (PORT 8000) 
- auth service (PORT 8001)
- *carbon tracking service* (PORT 8002)
- game service (PORT 8003)

***Core Service*** works as the API Gateway, therefore, the rest of the service are able to use the PORT 8000. 


### carbon tracking service routes: localhost:8000/api/v1/carbon

1. GET - /carbon-footprint/questions
use token and get this:

    {
    "questions": {
        "home_energy": {
        "title": "Home Energy",
        "description": "Questions about your household energy consumption",
        "questions": [
            {
            "id": "electricity_bill",
            "question": "What is your average monthly electricity bill in euros?",
            "type": "number",
            "unit": "EUR"
            },
            {
            "id": "heating_type",
            "question": "What type of heating system do you use?",
            "type": "select",
            "options": [
                "Gas",
                "Electric",
                "Oil",
                "Wood",
                "None"
            ]
            },
            {
            "id": "heating_usage",
            "question": "How many months per year do you use heating?",
            "type": "number",
            "unit": "months"
            }
        ]
        },
        "transportation": {
        "title": "Transportation",
        "description": "Questions about your travel and commuting habits",
        "questions": [
            {
            "id": "car_type",
            "question": "What type of vehicle do you primarily use?",
            "type": "select",
            "options": [
                "Gasoline",
                "Diesel",
                "Hybrid",
                "Electric",
                "Public Transport"
            ]
            },
            {
            "id": "weekly_distance",
            "question": "How many km do you drive per week?",
            "type": "number",
            "unit": "km"
            },
            {
            "id": "flights_short",
            "question": "How many short-haul flights (under 3 hours) do you take per year?",
            "type": "number",
            "unit": "flights"
            },
            {
            "id": "flights_medium",
            "question": "How many medium-haul flights (3-6 hours) do you take per year?",
            "type": "number",
            "unit": "flights"
            },
            {
            "id": "flights_long",
            "question": "How many long-haul flights (over 6 hours) do you take per year?",
            "type": "number",
            "unit": "flights"
            }
        ]
        },
        "diet": {
        "title": "Diet",
        "description": "Questions about your eating habits",
        "questions": [
            {
            "id": "meat_days",
            "question": "How many days per week do you eat meat?",
            "type": "number",
            "unit": "days"
            },
            {
            "id": "dairy_consumption",
            "question": "How would you describe your dairy consumption?",
            "type": "select",
            "options": [
                "High",
                "Medium",
                "Low",
                "None"
            ]
            },
            {
            "id": "local_food",
            "question": "What percentage of your food is locally sourced (within 100 miles)?",
            "type": "number",
            "unit": "percentage"
            }
        ]
        },
        "waste": {
        "title": "Waste",
        "description": "Questions about your waste management",
        "questions": [
            {
            "id": "waste_bags",
            "question": "How many bags of garbage do you dispose of weekly?",
            "type": "number",
            "unit": "bags"
            },
            {
            "id": "recycling",
            "question": "What percentage of your waste do you recycle?",
            "type": "number",
            "unit": "percentage"
            },
            {
            "id": "composting",
            "question": "Do you compost organic waste?",
            "type": "select",
            "options": [
                "Yes",
                "Sometimes",
                "No"
            ]
            }
        ]
        }
    }
    }


2. POST - /carbon-footprint/submit
use token and input this format (this is just an example):

    {
            "home_energy": {
                "electricity_bill": 95,
                "heating_type": "Gas",
                "heating_usage": 5
            },
            "transportation": {
                "car_type": "Public Transport",
                "weekly_distance": 35,
                "flights": {
                    "short_haul": 5,
                    "medium_haul": 4,
                    "long_haul": 0
                }
            },
            "diet": {
                "meat_days": 7,
                "dairy_consumption": "Low",
                "local_food_percentage": 100
            },
            "waste": {
                "waste_bags": 10,
                "recycling_percentage": 50,
                "composting": "No"
            }
    }

which soon you will get this result (result based on the example):

    {
    "emissions": {
        "home_energy": 3002,
        "transportation": 920,
        "diet": 2190,
        "waste": 750,
        "total": 6862,
        "unit": "kg CO2e/year"
    },
    "analysis": {
        "summary": "Your annual total carbon emission is 6862.0 kg CO2e. This is higher than the global average of about 5000 kg CO2e per person.",
        "major_contributors": [
        "Home Energy",
        "Diet"
        ],
        "recommendations": [
        {
            "category": "Home Energy",
            "action": "Switch to energy-efficient appliances",
            "potential_impact": "Reduction of up to 500 kg CO2e annually"
        },
        {
            "category": "Diet",
            "action": "Reduce meat consumption",
            "potential_impact": "Reduction of up to 300 kg CO2e annually"
        },
        {
            "category": "Transportation",
            "action": "Utilize public transportation more often",
            "potential_impact": "Reduction of up to 200 kg CO2e annually"
        }
        ],
        "positive_habits": "Your waste creation contributes relatively less to your total carbon footprint.",
        "reduction_goal": "Aim to reduce your carbon footprint by 1000 kg CO2e in the next 6 months."
    }
    }


3. GET - /carbon-footprint/results
uses token and get this tracklist (example user):

    {
    "results": [
        {
        "id": 7,
        "user_id": 17,
        "username": "han",
        "total": 2858,
        "timestamp": "2025-01-27T04:25:13.235974+00:00"
        },
        {
        "id": 6,
        "user_id": 17,
        "username": "han",
        "total": 6300,
        "timestamp": "2025-01-27T01:54:35.386740+00:00"
        },
        {
        "id": 5,
        "user_id": 17,
        "username": "han",
        "total": 0,
        "timestamp": "2025-01-27T01:34:54.565586+00:00"
        },
        {
        "id": 4,
        "user_id": 17,
        "username": "han",
        "total": 3652.5,
        "timestamp": "2025-01-26T16:52:14.266540+00:00"
        },
        {
        "id": 3,
        "user_id": 17,
        "username": "han",
        "total": 87.5,
        "timestamp": "2025-01-26T16:48:24.194908+00:00"
        },
        {
        "id": 2,
        "user_id": 17,
        "username": "han",
        "total": 5.25,
        "timestamp": "2025-01-26T16:42:54.860350+00:00"
        },
        {
        "id": 1,
        "user_id": 17,
        "username": "han",
        "total": 0,
        "timestamp": "2025-01-26T16:24:04.956979+00:00"
        }
    ]
    }


### THE END ###