from django.http import JsonResponse
from rest_framework.views import APIView
from main.contants import CommonErrorcode
from main.models import Question
import json


class Check(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body).get('data', None)

            if data is None or data == '':
                return JsonResponse(CommonErrorcode.paramsError)

            username = request.payload_data['username']

            questionFields = Question.objects.filter(username=username).first()

            if questionFields is not None:
                return JsonResponse({'message': "已参与过", 'code': 201})

            Question.objects.create(username=username, email=data['email'], use_type=data['useType'],
                                    question=data['question'], suggestion=data['suggestion'], score=data['score'])

            return JsonResponse({'message': "感谢参与", 'code': 200})

        except Exception as e:
            print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
