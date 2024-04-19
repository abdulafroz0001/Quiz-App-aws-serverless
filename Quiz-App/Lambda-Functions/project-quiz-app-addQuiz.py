import uuid
import json
import boto3
import re
from datetime import datetime
import urllib.parse
def lambda_handler(event,context):
    s3_bucket = event['Records'][0]['s3']['bucket']['name']
    s3_key = event['Records'][0]['s3']['object']['key']
    s3_key = s3_key.replace('+', '%20')
    s3_key= urllib.parse.unquote(s3_key)
    print(s3_key)
    # s3_bucket='project-quiz'
    # s3_key='course_1512111f-9231-8cab-fb5b-cf8527705d8d---ALM 4---2024-03-25T01:05---2024-03-29T15:16---2.txt'
    s3_client = boto3.client('s3')
    dynamodb_client = boto3.resource('dynamodb')

    # Read the contents of the uploaded file from S3
    file_data = s3_client.get_object(Bucket=s3_bucket, Key=s3_key)
    content = file_data['Body'].read().decode('utf-8')
    questions = parse_aiken(content)
    quiz_id= generate_unique_quiz_id()
    
    parts = s3_key.split('---')
    
    course_id = parts[0]
    quiz= dict()
    quiz['id']= quiz_id
    quiz['name']=  parts[1]
    quiz['start']= format_datetime(parts[2])
    quiz['end'] =format_datetime(parts[3])
    quiz['marksPerQuestion'] = parts[4][:-4]
    print(course_id)
    response= store_question_in_dynamodb(quiz,questions,dynamodb_client,course_id)
    return response
    

def parse_aiken(content):
    
    lines = content.split('\n')
    questions = []
    current_question = None

    for line in lines:
        line = line.strip()

        if line.startswith('::'):
            # Start of a new question
            if current_question is not None:
                questions.append(current_question)
            current_question = {'question_text': line[2:].strip(), 'options': [], 'answer': ''}
        elif line.upper().startswith('ANSWER:'):
            # Capture the correct answer for the current question
            current_question['answer'] = line[7:].strip()
        elif current_question is not None and line:
            # Collecting options for the current question
            # parts = line.split('.')
            option = line.strip() if len(line) > 1 else ''
            current_question['options'].append(option)

    if current_question is not None:
        questions.append(current_question)

    # for question in questions:
    #     print(question['question_text'])
    #     for option in question['options'] :
    #         print(option)
    #     print(question['answer'])
    return questions


def generate_unique_quiz_id():
    # Generate a UUID (Universally Unique Identifier)
    quiz_id = str(uuid.uuid4())
    return quiz_id

def format_datetime(datetime_str):
    # Parse the datetime string into a datetime object
    datetime_obj = datetime.fromisoformat(datetime_str)
    
    # Format the datetime object into a user-friendly format
    formatted_datetime = datetime_obj.strftime("%B %d, %Y %I:%M %p")  # Example format: March 25, 2024 01:05 AM
    
    return formatted_datetime

def store_question_in_dynamodb(quiz,questions, dynamodb_client,course_id):
    
    quiz_table = dynamodb_client.Table('project_quiz_course_table')
    questions_json = json.dumps(questions)
    print(questions_json)
    quiz_id= "quiz_"+str(quiz['id'])
    
    item = {
        'PK': quiz_id,
        'SK': 'meta',
        'data':json.dumps({ 
            "name": quiz['name'],
            "createdBy":"user_22", 
            "start":quiz['start'],
            "end":quiz['end'], 
            "eachQuestion":quiz['marksPerQuestion']+"M" })
    }
    item2={
        'PK': quiz_id,
        'SK': 'questions',
        'data':questions_json
    }

    # Put the item into the DynamoDB table
    quiz_table.put_item(Item=item)
    quiz_table.put_item(Item=item2)
    
    
    course_table= dynamodb_client.Table('project_quiz_course_table')
    course = course_table.get_item(Key=
    {
        'PK': course_id,
        'SK':'meta'
    })
    course= course.get('Item')
    data = json.loads(course['data'])
    data['quizes'].append(quiz_id)
    course['data']=data
    print(course)
    course_table.put_item(Item={
        'PK':course_id,
        'SK':'meta',
        'data': json.dumps(course['data'])
    })
    return {
        'statusCode': 200,
        'body': json.dumps('Questions stored in DynamoDB successfully!')
    }
    