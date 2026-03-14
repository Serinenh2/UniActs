from django.db import models
from django.conf import settings
from clubs.models import Club

class Report(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='reports')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    # Optional: If reports need a file attachment
    # file = models.FileField(upload_to='reports/', null=True, blank=True)

    def __str__(self):
        return self.title
