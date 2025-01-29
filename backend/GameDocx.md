# BACKEND ARCHITECTURE

## Consist of these services:
- core service (PORT 8000) 
- auth service (PORT 8001)
- carbon tracking service (PORT 8002)
- *game service* (PORT 8003)


***Core Service*** works as the API Gateway, therefore, the rest of the service are able to use the PORT 8000. 


### game service routes: localhost:8000/game


1. GET - /quiz/start
uses token and get this quiz:

    {
    "user_id": 17,
    "questions": [
        {
        "id": 41,
        "category": "Food Systems",
        "question": "What percentage of food waste occurs at the consumer level?",
        "options": [
            "17%",
            "27%",
            "37%",
            "47%"
        ],
        "difficulty": "hard"
        },
        {
        "id": 46,
        "category": "Energy Efficiency",
        "question": "What percentage of home energy use goes to heating and cooling?",
        "options": [
            "30%",
            "40%",
            "50%",
            "60%"
        ],
        "difficulty": "medium"
        },
        {
        "id": 28,
        "category": "Energy",
        "question": "What is the average payback period for home solar panel installation?",
        "options": [
            "5-7 years",
            "7-9 years",
            "9-11 years",
            "11-13 years"
        ],
        "difficulty": "medium"
        },
        {
        "id": 11,
        "category": "Ocean Conservation",
        "question": "By what year is the ocean predicted to contain more plastic than fish by weight?",
        "options": [
            "2040",
            "2045",
            "2050",
            "2055"
        ],
        "difficulty": "medium"
        },
        {
        "id": 3,
        "category": "Waste Management",
        "question": "How long does it take for a plastic bottle to decompose in a landfill?",
        "options": [
            "100 years",
            "250 years",
            "450 years",
            "Never fully decomposes"
        ],
        "difficulty": "medium"
        },
        {
        "id": 29,
        "category": "Food Systems",
        "question": "How much water does it take to produce one almond?",
        "options": [
            "0.5 gallon",
            "1.1 gallons",
            "1.5 gallons",
            "2.0 gallons"
        ],
        "difficulty": "hard"
        },
        {
        "id": 54,
        "category": "Biodiversity",
        "question": "What percentage of the Amazon Rainforest has been deforested?",
        "options": [
            "5%",
            "10%",
            "15%",
            "20%"
        ],
        "difficulty": "hard"
        },
        {
        "id": 37,
        "category": "Climate Science",
        "question": "What percentage of CO2 emissions are absorbed by the ocean?",
        "options": [
            "15%",
            "25%",
            "30%",
            "40%"
        ],
        "difficulty": "hard"
        },
        {
        "id": 43,
        "category": "Renewable Energy",
        "question": "What is the main component of solar panels?",
        "options": [
            "Silicon",
            "Aluminum",
            "Copper",
            "Glass"
        ],
        "difficulty": "medium"
        },
        {
        "id": 10,
        "category": "Energy Efficiency",
        "question": "What percentage of home energy is typically lost through poorly insulated windows and doors?",
        "options": [
            "10-15%",
            "15-20%",
            "25-30%",
            "30-35%"
        ],
        "difficulty": "medium"
        },
        {
        "id": 8,
        "category": "Biodiversity",
        "question": "What percentage of Earth's species are estimated to be at risk of extinction?",
        "options": [
            "10%",
            "25%",
            "33%",
            "50%"
        ],
        "difficulty": "hard"
        },
        {
        "id": 20,
        "category": "Biodiversity",
        "question": "How many species go extinct every day?",
        "options": [
            "50",
            "100",
            "150",
            "200"
        ],
        "difficulty": "hard"
        }
    ]
    }


2. POST - /quiz/submit
uses token and this is how to submit (example):

    [
    "27%",
    "50%",
    "7-9 years",
    "2050",
    "450 years",
    "1.1 gallons",
    "20%",
    "30%",
    "Silicon",
    "25-30%",
    "33%",
    "100"
    ]


which you will get the response like this:

    {
    "quiz_details": {
        "total_questions": 12,
        "correct_answers": 9,
        "wrong_answers": 3,
        "score": 75,
        "question_results": [
        {
            "question": "What percentage of food waste occurs at the consumer level?",
            "user_answer": "27%",
            "correct_answer": "37%",
            "is_correct": false,
            "category": "Food Systems"
        },
        {
            "question": "What percentage of home energy use goes to heating and cooling?",
            "user_answer": "50%",
            "correct_answer": "50%",
            "is_correct": true,
            "category": "Energy Efficiency"
        },
        {
            "question": "What is the average payback period for home solar panel installation?",
            "user_answer": "7-9 years",
            "correct_answer": "7-9 years",
            "is_correct": true,
            "category": "Energy"
        },
        {
            "question": "By what year is the ocean predicted to contain more plastic than fish by weight?",
            "user_answer": "2050",
            "correct_answer": "2050",
            "is_correct": true,
            "category": "Ocean Conservation"
        },
        {
            "question": "How long does it take for a plastic bottle to decompose in a landfill?",
            "user_answer": "450 years",
            "correct_answer": "450 years",
            "is_correct": true,
            "category": "Waste Management"
        },
        {
            "question": "How much water does it take to produce one almond?",
            "user_answer": "1.1 gallons",
            "correct_answer": "1.1 gallons",
            "is_correct": true,
            "category": "Food Systems"
        },
        {
            "question": "What percentage of the Amazon Rainforest has been deforested?",
            "user_answer": "20%",
            "correct_answer": "20%",
            "is_correct": true,
            "category": "Biodiversity"
        },
        {
            "question": "What percentage of CO2 emissions are absorbed by the ocean?",
            "user_answer": "30%",
            "correct_answer": "30%",
            "is_correct": true,
            "category": "Climate Science"
        },
        {
            "question": "What is the main component of solar panels?",
            "user_answer": "Silicon",
            "correct_answer": "Silicon",
            "is_correct": true,
            "category": "Renewable Energy"
        },
        {
            "question": "What percentage of home energy is typically lost through poorly insulated windows and doors?",
            "user_answer": "25-30%",
            "correct_answer": "25-30%",
            "is_correct": true,
            "category": "Energy Efficiency"
        },
        {
            "question": "What percentage of Earth's species are estimated to be at risk of extinction?",
            "user_answer": "33%",
            "correct_answer": "25%",
            "is_correct": false,
            "category": "Biodiversity"
        },
        {
            "question": "How many species go extinct every day?",
            "user_answer": "100",
            "correct_answer": "150",
            "is_correct": false,
            "category": "Biodiversity"
        }
        ]
    },
    "analysis": {
        "overall_assessment": "You achieved a solid score of 75.0%, showing a good understanding of sustainability concepts, however there is room for improvement.",
        "strengths": [
        "Energy Efficiency",
        "Energy",
        "Ocean Conservation",
        "Waste Management",
        "Climate Science",
        "Renewable Energy"
        ],
        "improvement_areas": [
        "Food Systems",
        "Biodiversity"
        ],
        "learning_resources": {
        "Food Systems": "Consider reading up more about sustainable agricultural practices, food waste, and impact of dietary choices on environment.",
        "Biodiversity": "Focus on topics like the importance of biodiversity, threats to biodiversity, and conservation efforts."
        },
        "encouragement": "Remember that every step forward in learning about sustainability not only benefits you, but contributes to a more sustainable and aware world. Keep going!"
    }
    }


3. GET - /quiz/results
uses token and get the top 5 players:

    [
    {
        "quiz_id": 33,
        "user_id": "17",
        "username": "han",
        "total_score": 75
    },
    {
        "quiz_id": 12,
        "user_id": "18",
        "username": "SilverLight",
        "total_score": 38.46
    },
    {
        "quiz_id": 25,
        "user_id": "19",
        "username": "HUTA",
        "total_score": 75
    },
    {
        "quiz_id": 20,
        "user_id": "20",
        "username": "changgo",
        "total_score": 91.67
    },
    {
        "quiz_id": 28,
        "user_id": "22",
        "username": "caokhanh",
        "total_score": 60
    }
    ]


### THE END ###