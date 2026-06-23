from rest_framework import routers
from . views import TaskModelViewSet

router = routers.DefaultRouter()

router.register('tasks', TaskModelViewSet)

urlpatterns = router.urls