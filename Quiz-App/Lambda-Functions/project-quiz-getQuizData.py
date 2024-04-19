import json
import boto3
def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    dynamodb_table = dynamodb.Table('project_quiz_course_table')
    quiz_id= event['quiz_id']
    
    #get quiz meta data
    item = dynamodb_table.get_item(Key={
        'PK':quiz_id,
        'SK':'meta'
    })
    
    quiz_data = dict()
    
    quiz_meta_data= item.get('Item')
    print(json.loads(quiz_meta_data['data']))
    quiz_meta_data=json.loads(quiz_meta_data['data'])
    
    quiz_data.update({'meta': quiz_meta_data})
    
    #quiz questions
    
    item = dynamodb_table.get_item(Key={
        'PK': quiz_id,
        'SK':'questions'
    })
    
    quiz_questions = item.get('Item')
    quiz_questions = json.loads(quiz_questions['data'])
    
    quiz_data.update({'questions' : quiz_questions});
    print(quiz_data)
    return quiz_data
    
    
    
   
    
