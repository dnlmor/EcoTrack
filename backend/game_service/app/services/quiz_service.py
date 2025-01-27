def calculate_results(quiz_data: dict, user_answers: list) -> dict:
    total_questions = len(quiz_data['questions'])
    correct_answers = 0
    true_answers = []
    
    for question, user_answer in zip(quiz_data['questions'], user_answers):
        correct_answer = question['correct_answer'].lower()
        true_answers.append(correct_answer)
        if user_answer.lower() == correct_answer:
            correct_answers += 1

    wrong_answers = total_questions - correct_answers
    score = (correct_answers / total_questions) * 100

    return {
        "total_questions": total_questions,
        "correct_answers": correct_answers,
        "wrong_answers": wrong_answers,
        "score": round(score, 2),
        "true_answers": true_answers
    }
