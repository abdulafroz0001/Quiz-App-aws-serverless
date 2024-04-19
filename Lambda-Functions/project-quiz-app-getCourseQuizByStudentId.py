import json
import boto3
def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    dynamodb_table = dynamodb.Table('project_quiz_course_table')
    student_id= event['id']
    course_id = event['cid']
    response = dynamodb_table.get_item(
        Key={
            'PK': student_id,
            'SK':'enrolled_courses'
        }
    )
    
    response = dynamodb_table.get_item(
        Key={
            'PK': student_id,
            'SK':'quiz_data'
        }
    )
    quiz_data = response.get('Item')
    quiz_data = quiz_data['data']
    quiz_data = json.loads(quiz_data)
    
    attended_quizes_list=[]
    for quiz, status in quiz_data.items():
        attended_quizes_list.append(quiz)
    
    
    print(attended_quizes_list)
    
    
    
    
    # print(event)
    # print(course_id)
    try:
        response = dynamodb_table.get_item(
            Key={
                'PK': course_id,
                'SK':'meta'
            }
        )
        # print(response)
        item = response.get('Item')
        # print(item)
        json_item= json.loads(item['data'])
        
        total_quizes =len( json_item['quizes'])
        json_item.update({'PK':course_id})
        
        json_item.update({'total_quizes' : total_quizes})
        
        course_quizes = json_item['quizes']
        # print(course_quizes)
        quizes= []
        
        for quiz_id in course_quizes:
            get_quiz = dynamodb_table.get_item( Key ={
                'PK' : quiz_id,
                'SK' : 'meta'
            })
            quiz_dict=dict()
            get_quiz =get_quiz.get('Item')
            # print(get_quiz)
            # print(type(get_quiz))
            for key, value in get_quiz.items():
                if key not in 'SK':
                    quiz_dict.update({key : value})
                if key in 'data':
                    quiz_dict.update({key:json.loads(value)})
                    
            # print(get_quiz)
                    # data = get_quiz['data']
            # print(data)
                    # quiz_item = json.loads(data)
                    # quiz_dict.update({'data' : quiz_item })
            # print(quiz_item)
            if quiz_id in attended_quizes_list:
                quiz_dict.update({'attended_status': True})
                quiz_dict.update({'quiz_data' : quiz_data[quiz_id]})
            else :
                quiz_dict.update({'attended_status': False})
            print(quiz_dict)
            quizes.append(quiz_dict)
            
        # print(quizes)
        json_item.update({'quizes': quizes})
        
        # print(json_item)
        
        
        
        return json_item
    except Exception as e:  
        print(f"Error fetching item: {e}")
        return json.dumps("error")
        
            
    
