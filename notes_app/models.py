from django.conf import settings
from django.db import models


class Note(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=255)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    expiration_date = models.DateTimeField()

    def __str__(self):
        return self.name
