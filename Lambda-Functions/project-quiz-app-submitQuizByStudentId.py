import json
import boto3
def lambda_handler(event, context):
    # TODO implement
    dynamodb = boto3.resource('dynamodb')
    dynamodb_table= dynamodb.Table('project_quiz_course_table')
    student_id= event['sid']
    quiz_id= event['qid']
    selected_options= event['selected_options']
    
    response = dynamodb_table.get_item(Key={
        'PK':quiz_id,
        'SK':'questions'
    }) 
    
    questions = response.get('Item');
    questions = json.loads(questions['data'])
    score=0
    answer_lst= []
    for i in range(0,len(questions)):
        if questions[i]['answer'] == selected_options[i]:
            score+=1;
    
    cur_quiz_data = dict()
    cur_quiz_data.update({'marks':score})
    cur_quiz_data.update({'time_taken' : '12.07'})
    
    
    #update quiz_data in student record
    response = dynamodb_table.get_item(Key={
        'PK':student_id,
        'SK':'quiz_data'
    }) 
    quiz_data = response.get('Item')
    quiz_data =json.loads(quiz_data['data'])
    quiz_data.update({quiz_id : cur_quiz_data })
    
    # return quiz_data
    
    response = dynamodb_table.put_item(Item={
        'PK':student_id,
        'SK':'quiz_data',
        'data':json.dumps(quiz_data)
    }) 
    
    #update student_data in quiz record
    response = dynamodb_table.get_item(Key={
        'PK':quiz_id,
        'SK':'student_data'
    }) 
    student_data = response.get('Item')
    if student_data is None:
        student_data=[]
    else:
        student_data =json.loads(student_data['data'])
        
    student_data.append(student_id)
    
    response = dynamodb_table.put_item(Item={
        'PK':quiz_id,
        'SK':'student_data',
        'data':json.dumps(student_data)
    }) 
    return response
