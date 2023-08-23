from django.http import JsonResponse
from rest_framework.views import APIView
from main.contants import CommonErrorcode
from main.models import Activity
from django.core import serializers
import json
from main.config import ACTIVITY_CACHETIME


class Activitys(APIView):
    def get(self, request, *args, **kwargs):
        try:
            count = request.GET.get('count', None)

            CommonCode = CommonErrorcode()
            if count == 'all':
                CommonCode.success['data'] = json.loads(
                    serializers.serialize('json', Activity.objects.all()))

                response = JsonResponse(CommonCode.success)

                response['Cache-Control'] = 'max-age=' + \
                    str(ACTIVITY_CACHETIME)

                return response
            else:
                newAcitvity = Activity.objects.last()
                data = {"begin_time": newAcitvity.begin_time,
                        "end_time": newAcitvity.end_time, "image": newAcitvity.image}
                CommonCode.success['data'] = data

                response = JsonResponse(CommonCode.success)

                response['Cache-Control'] = 'max-age=' + \
                    str(ACTIVITY_CACHETIME)

                return response

        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.serverError)
