from rest_framework.views import APIView
from user.models import CustomUser
from user.serializers import AddNewUserSerializer, ActiveUserHamburgerData
from rest_framework.response import Response
from api.views import DefaultResponse
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_200_OK, HTTP_202_ACCEPTED, HTTP_201_CREATED, HTTP_406_NOT_ACCEPTABLE, HTTP_304_NOT_MODIFIED
from rest_framework.permissions import IsAuthenticated


class UserInitialDataView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        try:
            user = CustomUser.objects.get(email=request.user)
            serialized = ActiveUserHamburgerData(user)

            return Response(serialized.data, status=HTTP_200_OK)

        except Exception as e:
            return Response(DefaultResponse(e, True), status=HTTP_404_NOT_FOUND)


class EditUserView(APIView):

    def patch(self, request, format=None):
        try:
            if request.user.is_authenticated():
                serialized = AddNewUserSerializer(
                    request.user, data=request.data, partial=True)

                if serialized.is_valid():
                    serialized.save()

                    return Response(DefaultResponse("Your data is modified.", False), status=HTTP_202_ACCEPTED)

                return Response(DefaultResponse("Requested data is not valid.", True), status=HTTP_304_NOT_MODIFIED)

            return Response(DefaultResponse("Requested user does not exist.", True), status=HTTP_406_NOT_ACCEPTABLE)

        except Exception as e:
            return Response(DefaultResponse(e, True), status=HTTP_404_NOT_FOUND)

    def delete(self, request, format=None):
        try:
            if request.user.is_authenticated():
                user = CustomUser.objects.get(email=request.user)

                user.delete()

                return Response(DefaultResponse("Your data is deleted.", False), status=HTTP_202_ACCEPTED)

            return Response(DefaultResponse("Requested user does not exist.", True), status=HTTP_406_NOT_ACCEPTABLE)

        except Exception as e:
            return Response(DefaultResponse(e, True), status=HTTP_404_NOT_FOUND)


class AddNewUserView(APIView):

    def post(self, request, format=None):
        try:
            serialized = AddNewUserSerializer(data=request.data)

            if serialized.is_valid():
                serialized.save()

                return Response(DefaultResponse(f"New account of {serialized.data['email']} is created.", False), status=HTTP_201_CREATED)

            return Response(DefaultResponse("Requested data is not valid.", True), status=HTTP_304_NOT_MODIFIED)

        except Exception as e:
            return Response(DefaultResponse(e, True), status=HTTP_404_NOT_FOUND)
