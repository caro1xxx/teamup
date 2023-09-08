from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from django.core.cache import cache
from main.response import CommonResponse
from main.tools import randomString, getClientIp, checkParams, toMD5, sendMessageToChat, encrypteToken
import json
from main.config import loginRoomMemoryExsitTime
from main.models import AccountType


class GoodsPrice(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            allGoods = AccountType.objects.all()

            ret['data'] = []
            for goods in allGoods:
                ret['data'].append({"type": goods.type, "price": [goods.experience_price, goods.month_price,
                                                                  goods.two_month_price, goods.three_month_price, goods.half_year_price, goods.year_price]})
            return JsonResponse(ret)
        except Exception as e:
            print(str(e))
            return JsonResponse(CommonResponse.serverError)
