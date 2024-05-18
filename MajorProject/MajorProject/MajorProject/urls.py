"""
URL configuration for MajorProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
 
# urls.py

from authentication.views import call_text_to_speech,call_text_to_speech_login, handle_speech_input,authenticate,GiveData,fetch_emails,fetch_sent_emails,fetch_snoozed_emails,fetch_starred_emails,fetch_draft_emails,read_emails
# SendEmail
    

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/',include('authentication.urls')),
    path('api/call_text_to_speech/', call_text_to_speech, name='call_text_to_speech'),
    path('api/call_text_to_speech_login/', call_text_to_speech_login, name='call_text_to_speech_login'),
    path('api/handle_speech_input/', handle_speech_input, name='handle_speech_input'),
    path('api/authenticate/', authenticate, name='authenticate'),
    # path('api/SendEmail/', SendEmail, name='SendEmail'),
    path('api/GiveData/',GiveData,name='GiveData'),
    path('api/fetch_emails/',fetch_emails,name='fetch_emails'),
    path('api/fetch_sent_emails/',fetch_sent_emails,name='fetch_sent_emails'),
    path('api/fetch_snoozed_emails/',fetch_snoozed_emails,name='fetch_snoozed_emails'),
    path('api/fetch_starred_emails/',fetch_starred_emails,name='fetch_starred_emails'),
    path('api/fetch_draft_emails/', fetch_draft_emails, name='fetch_draft_emails'),
    path('api/read_emails/',read_emails, name='read_emails'),
    

]
