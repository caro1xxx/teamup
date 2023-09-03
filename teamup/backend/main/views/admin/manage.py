from django.http import JsonResponse
from rest_framework.views import APIView
from main.contants import CommonErrorcode
from main.models import User, Order, Flow
from django.core import serializers
import json


class AllOrder(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            admin = request.payload_data['admin']
            if admin == 0:
                return JsonResponse({'code': 500, 'message': '非法'})
            ret['data'] = json.loads(
                serializers.serialize('json', Order.objects.order_by('-create_time')[:20]))
            return JsonResponse(ret)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


class AllUser(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            admin = request.payload_data['admin']
            if admin == 0:
                return JsonResponse({'code': 500, 'message': '非法'})
            ret['data'] = json.loads(
                serializers.serialize('json', User.objects.order_by('-create_time')[:20]))
            return JsonResponse(ret)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)


class AllFlow(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            admin = request.payload_data['admin']
            if admin == 0:
                return JsonResponse({'code': 500, 'message': '非法'})
            ret['data'] = json.loads(
                serializers.serialize('json', Flow.objects.order_by('-visit_time')[:50]))
            return JsonResponse(ret)
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
