from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from main.contants import CommonErrorcode
from main.tools import decodeToken


class CheckAccessToken(MiddlewareMixin):

    def process_request(self, request):
        try:
            pathInfo = request.path_info.replace(
                '/api/v1/teamup/', '').split('/')[0]

            requestMethods = str(request.method)

            allowPath = []

            if requestMethods == 'GET':
                allowPath = ['login', 'sendcode', 'room',
                             'team', 'handler', 'connect_paynofity_sse', 'activity']

            if requestMethods == 'POST':
                allowPath = ['login', 'register', 'accountorder']
                pass

            if requestMethods == 'PUT':
                allowPath = ['paynotify']
                pass

            if requestMethods == 'DELETE':
                pass

            if pathInfo in allowPath:
                return None

            authorization_header = request.META.get('HTTP_AUTHORIZATION', None)

            if authorization_header is None or authorization_header == '' or authorization_header == 'Bearer':
                return JsonResponse(CommonErrorcode.authError)

            payload = decodeToken(authorization_header.replace('Bearer ', ''))

            if payload['username'] is None or payload['username'] == '':
                return JsonResponse(CommonErrorcode.authError)

            data = {}
            for key, value in payload.items():
                data[key] = value

            request.payload_data = data

            return None
        except Exception as e:
            # print(str(e))
            return JsonResponse(CommonErrorcode.authError)
