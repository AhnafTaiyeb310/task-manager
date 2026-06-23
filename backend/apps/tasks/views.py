from rest_framework.viewsets import ModelViewSet
from . import models
from .serializers import TaskSerializer


class TaskModelViewSet(ModelViewSet):
    queryset = models.Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer