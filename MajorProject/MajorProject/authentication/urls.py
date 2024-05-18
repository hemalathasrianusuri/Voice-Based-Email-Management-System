from django.urls import path
from .views import register, user_login
# call_text_to_speech

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', user_login, name='login'),
    # path('call_text_to_speech/', call_text_to_speech, name='call_text_to_speech'),
   

]
