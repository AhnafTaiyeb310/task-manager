from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({
        "status": "healthy",
        "message": "Task Manager API is running!",
        "endpoints": {
            "tasks": "/api/tasks/",
            "admin": "/admin/"
        }
    })

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include("apps.tasks.urls"))
]
