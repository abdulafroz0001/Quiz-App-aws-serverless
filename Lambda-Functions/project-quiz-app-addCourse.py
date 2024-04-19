import json
import boto3
import uuid
import hashlib


def generate_random_id(name):
    hashed_string = hashlib.md5(name.encode()).digest()
    return str(uuid.UUID(bytes=hashed_string))

def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    dynamodb_table = dynamodb.Table('project_quiz_course_table')
    
    data = event.get('body')
    course_id= 'course_' + generate_random_id(data['name']) 
    response = dynamodb_table.get_item(Key={
        'PK' : course_id,
        'SK': 'meta'
    })
    if 'Item' in response:
        return json.dumps("Course Already Exists")
    else :
        quizes=[]
        data.update({'quizes':quizes})
        print(data)
        item={
            'PK':course_id,
            'SK':'meta',
            'data':json.dumps(data)
        }
        response = dynamodb_table.put_item(Item=item)
        return json.dumps("Course Added Successfully !")
        
