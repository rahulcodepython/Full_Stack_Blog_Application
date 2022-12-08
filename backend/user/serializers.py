from rest_framework import serializers
from user.models import CustomUser
from rest_framework.validators import UniqueValidator


class CustomUserMinimalDataSerializer(serializers.ModelSerializer):

    userImage = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'userImage', 'email', 'userBio', 'profession']

    def get_userImage(self, obj):
        if obj.userImage:
            return obj.userImage.url


class ActiveUserHamburgerData(serializers.ModelSerializer):

    userImage = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'userImage']

    def get_userImage(self, obj):
        if obj.userImage:
            return obj.userImage.url


class LikedAndCommentPersonDetails(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id']


class AddNewUserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True,)

    class Meta:
        model = CustomUser
        fields = '__all__'

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)

        if 'password' in validated_data.keys():
            user.set_password(validated_data['password'])
        user.save()

        return user
