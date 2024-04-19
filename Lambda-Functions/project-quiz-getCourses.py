import json
import boto3
def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    dynamodb_table = dynamodb.Table('project_quiz_course_table')
    
    response = dynamodb_table.scan()
    
    # for item in response['Items']:
    #     print(item)
    courses = []
    for item in response['Items']:
        if 'course_' in item['PK']:
            course = dict()
            for key,value in item.items():
                if key  not in 'SK' and key not in 'data':
                    course.update({key:value})
                if key in 'data':
                    for key2,value2 in json.loads(value).items():
                        course.update({key2:value2})
                        
            print(item)
            json_item= json.loads(item['data'])
            total_quizes =len(json_item['quizes'])
            course.update({'total_quizes' : total_quizes})
            courses.append(course)
    return courses
