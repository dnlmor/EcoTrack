# ai_service.py
from typing import Dict, Any, Optional
from openai import OpenAI
from openai import APIError, APIConnectionError, RateLimitError, BadRequestError
from app.config import settings
from app.utils.input_mapper import map_user_answers_to_structure

class SustainabilityAI:
    def __init__(self):
        self.client = OpenAI(api_key=settings.openai_api_key)

    def _call_ai(self, messages: list, max_tokens: Optional[int] = None) -> str:
        """Base method to interact with OpenAI API"""
        try:
            params = {
                "messages": messages,
                "model": "gpt-4",
            }
            if max_tokens:
                params["max_tokens"] = max_tokens

            response = self.client.chat.completions.create(**params)
            return response.choices[0].message.content.strip()
        except (APIError, APIConnectionError, RateLimitError, BadRequestError) as e:
            raise Exception(f"OpenAI API error: {str(e)}")
        except Exception as e:
            raise Exception(f"Error communicating with AI: {str(e)}")

    def calculate_emissions(self, structured_input: Dict[str, Any]) -> dict:
        """Calculate carbon emissions using AI"""
        prompt = f"""
        As a carbon emissions calculator, analyze this user data and provide precise calculations:
        {structured_input}
        
        Calculate their annual carbon emissions in CO2e for each category:
        1. Home Energy (based on electricity bill, heating type and usage)
        2. Transportation (based on vehicle type, distance, and flights)
        3. Diet (based on meat consumption, dairy usage, and local food percentage)
        4. Waste (based on waste bags, recycling percentage, and composting habits)
        
        Provide the results in this exact format:
        {{
            "home_energy": [number],
            "transportation": [number],
            "diet": [number],
            "waste": [number],
            "total": [sum of all numbers],
            "unit": "kg CO2e/year"
        }}
        
        Be precise and realistic with the calculations. Return ONLY the JSON result, no explanations.
        """
        
        try:
            result = self._call_ai([
                {"role": "system", "content": "You are a precise carbon footprint calculator that returns only JSON results."},
                {"role": "user", "content": prompt}
            ])
            
            # Convert string result to dict (assuming AI returns valid JSON)
            import json
            emissions = json.loads(result)
            return emissions
        except Exception as e:
            raise Exception(f"Error calculating emissions: {str(e)}")

    def analyze_footprint(self, emissions: dict) -> dict:
        """Analyze emissions and provide recommendations"""
        prompt = f"""
        As a sustainability consultant, analyze these annual carbon emissions:
        Home Energy: {emissions['home_energy']} kg CO2e
        Transportation: {emissions['transportation']} kg CO2e
        Diet: {emissions['diet']} kg CO2e
        Waste: {emissions['waste']} kg CO2e
        Total: {emissions['total']} kg CO2e

        Provide analysis in this JSON format:
        {{
            "summary": "Brief overview of their carbon footprint compared to average",
            "major_contributors": ["List top 2 contributing categories"],
            "recommendations": [
                {{
                    "category": "Category name",
                    "action": "Specific action",
                    "potential_impact": "Estimated CO2e reduction"
                }},
                // 2 more recommendations
            ],
            "positive_habits": "One identified positive habit",
            "reduction_goal": "Realistic 6-month reduction target"
        }}

        Return ONLY the JSON result, no explanations.
        """
        
        try:
            result = self._call_ai([
                {"role": "system", "content": "You are a sustainability consultant that returns structured JSON analyses."},
                {"role": "user", "content": prompt}
            ])
            
            # Convert string result to dict
            import json
            analysis = json.loads(result)
            return analysis
        except Exception as e:
            raise Exception(f"Error analyzing footprint: {str(e)}")

    def process_user_data(self, user_answers: dict) -> dict:
        """Process user answers and return both calculations and analysis"""
        structured_input = map_user_answers_to_structure(user_answers)
        emissions = self.calculate_emissions(structured_input)
        analysis = self.analyze_footprint(emissions)
        
        return {
            "emissions": emissions,
            "analysis": analysis
        }