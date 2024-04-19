import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    dynamodb_table = dynamodb.Table('project_quiz_course_table')
    quiz_id= event['quiz_id']
    try:
        response = dynamodb_table.get_item(
            Key={
                'PK': quiz_id,
                'SK':'meta'
            })
        
        item = response.get('Item')
        # print(item)
        json_item= json.loads(item['data'])
        
        total_quizes =len( json_item['quizes'])
        
        json_item.update({'total_quizes' : total_quizes})
        
        course_quizes = json_item['quizes']
        print(course_quizes)
        quizes= []
        
        
        return {
        'statusCode': 200,
        'body': json_item
        }
    except Exception as e:  
        print(f"Error fetching item: {e}")
    return json.dumps("error")
    