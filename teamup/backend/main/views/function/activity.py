from django.http import JsonResponse
from rest_framework.views import APIView
from main.contants import CommonErrorcode
from main.models import Activity
from django.core import serializers
import json
from main.config import ACTIVITY_CACHETIME


class Activitys(APIView):
    def get(self, request, *args, **kwargs):
        ret = {'code': 200, 'message': '获取成功'}
        try:
            count = request.GET.get('count', None)
            if count == 'all':
                ret['data'] = json.loads(
                    serializers.serialize('json', Activity.objects.all()))

                response = JsonResponse(ret)

                response['Cache-Control'] = 'max-age=' + \
                    str(ACTIVITY_CACHETIME)

                return response
            else:
                newAcitvity = Activity.objects.last()
                data = {"begin_time": newAcitvity.begin_time,
                        "end_time": newAcitvity.end_time, "image": newAcitvity.image}
                ret['data'] = data

                response = JsonResponse(ret)

                response['Cache-Control'] = 'max-age=' + \
                    str(ACTIVITY_CACHETIME)

                return response

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
