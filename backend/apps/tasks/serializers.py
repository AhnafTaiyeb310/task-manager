from rest_framework import serializers
from . import models

class TaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Task
        fields = [
            'id',
            'title', 
            'description', 
            'status', 
            'created_at',
            'updated_at'
        ]
        read_only_fields = [
            'id', 
            'created_at', 
            'updated_at'
            ]
        
    def validate_title(self, value):
        if not (value.strip()):
            raise serializers.ValidationError("Title cannot be empty")
        
        return value