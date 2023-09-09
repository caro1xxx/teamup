from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from main.response import CommonResponse
from main.models import User


class BandMail(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '绑定成功'}
        try:
            email = request.GET.get('email', None)
            username = request.payload_data['username']
            if email is None or email == '':
                return JsonResponse(CommonResponse.parmasErrpr)

            User.objects.filter(username=username).update(email=email)
            return JsonResponse(ret)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonResponse.serverError)
