from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
# from django.contrib.auth import authenticate, login
# from gtts import gTTS
import speech_recognition as sr
# import os
# from playsound import playsound
import pyttsx3
from django.http import JsonResponse
# from com_initializer import pythoncom
import pythoncom
import threading
import json

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
import os
import base64
from email.mime.text import MIMEText
import mimetypes
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
# Define scopes
# SCOPES = ['https://www.googleapis.com/auth/gmail.send']
# Define scopes
SCOPES = ['https://mail.google.com/']

# Initialize pyttsx3 engine outside of the thread
text_speech_engine = None

def init_text_to_speech_engine():
    global text_speech_engine
    if not text_speech_engine:
        try:
             # Initialize the COM component
            pythoncom.CoInitialize()
            text_speech_engine = pyttsx3.init()
            selected_voice = "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_EN-US_ZIRA_11.0"
            text_speech_engine.setProperty('voice', selected_voice)
            text_speech_engine.setProperty('rate', 150)
        except Exception as e:
            print('An error occurred while setting properties:', e)

def text_to_speech(text):
    global text_speech_engine
    if not text_speech_engine:
        init_text_to_speech_engine()
     # Ensure the engine is initialized
    try:
        text_speech_engine.say(text)
        text_speech_engine.runAndWait()
    except Exception as e:
        print('An error occurred while speaking:', e)
    finally:
        stop_text_to_speech_engine()

def speechtotext(duration):
    # global i, addr, passwrd
    r = sr.Recognizer()
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source, duration=1)
        text_to_speech("Speak")
        audio = r.listen(source, phrase_time_limit=duration)
    try:
        response = r.recognize_google(audio)
    except:
        response = 'N'
    return(response)

def telugu_speech_to_text(duration):
    # Initialize the recognizer
    recognizer = sr.Recognizer()

    # Use the default microphone as the audio source
    with sr.Microphone() as source:
        text_to_speech("Speak")
        # Adjust for ambient noise
        recognizer.adjust_for_ambient_noise(source)

        try:
            # Listen to the speech with the specified duration
            audio = recognizer.listen(source, timeout=duration)

            # Use Google Web Speech API to recognize the speech
            text = recognizer.recognize_google(audio, language='te-IN')

        except :
            text='N'
        return text

def stop_text_to_speech_engine():
    global text_speech_engine
    if text_speech_engine:
        text_speech_engine.stop()
        text_speech_engine = None
        # Uninitialize the COM component
        pythoncom.CoUninitialize()

def text_to_speech_threaded(text):
    t = threading.Thread(target=text_to_speech, args=(text,))
    t.start()

def converted_text(text):
    converted_result = convert_special_char(text)
    wrd = converted_result
    wrd = wrd.strip()
    wrd = wrd.replace(' ', '')
    wrd = wrd.lower()
    return(wrd)

def convert_special_char(text):
    temp = text
    special_chars = ['at the rate','at the rate', 'dot', 'underscore', 'dollar', 'hash', 'star', 'plus', 'minus',
                     'space', 'dash','full stop','fullstop','pullstop','pull stop', 'capital A', 'capital B', 'capital C', 'capital D', 'capital E', 'capital F',
                     'capital G', 'capital H', 'capital I', 'capital J', 'capital K', 'capital L', 'capital M',
                     'capital N', 'capital O', 'capital P', 'capital Q', 'capital R', 'capital S', 'capital T',
                     'capital U', 'capital V', 'capital W', 'capital X', 'capital Y', 'capital Z','JPG','Jpg','one','One']
    for character in special_chars:
        while (True):
            pos = temp.find(character)
            if pos == -1:
                break
            else:
                if character == 'at the rate':
                    temp = temp.replace('at the rate', '@')
                elif character == 'attherate':
                    temp = temp.replace('attherate', '@')
                elif character == 'dot':
                    temp = temp.replace('dot', '.')
                elif character == 'underscore':
                    temp = temp.replace('underscore', '_')
                elif character == 'dollar':
                    temp = temp.replace('dollar', '$')
                elif character == 'hash':
                    temp = temp.replace('hash', '#')
                elif character == 'star':
                    temp = temp.replace('star', '*')
                elif character == 'plus':
                    temp = temp.replace('plus', '+')
                elif character == 'minus':
                    temp = temp.replace('minus', '-')
                elif character == 'space':
                    temp = temp.replace('space', '')
                elif character == 'dash':
                    temp = temp.replace('dash', '-')
                elif character == 'full stop':
                    temp = temp.replace('full stop', '.')
                elif character == 'fullstop':
                    temp = temp.replace('fullstop', '.')
                elif character == 'pull stop':
                    temp = temp.replace('pull stop', '.')
                elif character == 'pullstop':
                    temp = temp.replace('pullstop', '.')
                elif character == 'capital A':
                    temp = temp.replace('capital A', 'A')
                elif character == 'capital B':
                    temp = temp.replace('capital B', 'B')
                elif character == 'capital C':
                    temp = temp.replace('capital C', 'C')
                elif character == 'capital D':
                    temp = temp.replace('capital D', 'D')
                elif character == 'capital E':
                    temp = temp.replace('capital E', 'E')
                elif character == 'capital F':
                    temp = temp.replace('capital F', 'F')
                elif character == 'capital G':
                    temp = temp.replace('capital G', 'G')
                elif character == 'capital H':
                    temp = temp.replace('capital H', 'H')
                elif character == 'capital I':
                    temp = temp.replace('capital I', 'I')
                elif character == 'capital J':
                    temp = temp.replace('capital J', 'J')
                elif character == 'capital K':
                    temp = temp.replace('capital K', 'K')
                elif character == 'capital L':
                    temp = temp.replace('capital L', 'L')
                elif character == 'capital M':
                    temp = temp.replace('capital M', 'M')
                elif character == 'capital N':
                    temp = temp.replace('capital N', 'N')
                elif character == 'capital O':
                    temp = temp.replace('capital O', 'O')
                elif character == 'capital P':
                    temp = temp.replace('capital P', 'P')
                elif character == 'capital Q':
                    temp = temp.replace('capital q', 'Q')
                elif character == 'capital A':
                    temp = temp.replace('capital r', 'R')
                elif character == 'capital S':
                    temp = temp.replace('capital s', 'S')
                elif character == 'capital T':
                    temp = temp.replace('capital T', 'T')
                elif character == 'capital U':
                    temp = temp.replace('capital U', 'U')
                elif character == 'capital V':
                    temp = temp.replace('capital V', 'V')
                elif character == 'capital W':
                    temp = temp.replace('capital W', 'W')
                elif character == 'capital X':
                    temp = temp.replace('capital X', 'X')
                elif character == 'capital Y':
                    temp = temp.replace('capital Y', 'Y')
                elif character == 'capital Z':
                    temp = temp.replace('capital Z', 'Z')
                elif character == 'JPG':
                    temp = temp.replace('JPG','jpg')
                elif character == 'Jpg':
                    temp = temp.replace('Jpg','jpg')
                elif character == 'one':
                    temp = temp.replace('one','1')
                elif character == 'One':
                    temp = temp.replace('One','1')

    return temp

@api_view(['GET'])
def call_text_to_speech(request):
    text_to_speech_threaded("Welcome to our website which is voice based email management system")
    return Response({'message': 'Text-to-speech initiated successfully'})

@api_view(['GET'])
def call_text_to_speech_login(request):
    text_to_speech_threaded("This is login page you need to enter your email and password in order to login")
    return Response({'message': 'Text-to-speech initiated successfully'})



@api_view(['POST'])
def register(request):
    text_to_speech("please enter your details")
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    if not (username and email and password):
        return Response({'error': 'Please provide username, email, and password'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def handle_speech_input(request):
    text_to_speech("welcome to our website ,  do you want to login say login or else say no to stay back")
    # Get input from the speech-to-text
    input_text = speechtotext(7)

    # Determine which page to open based on the input
    if "Login" in input_text or "login" in input_text :
            page_to_open = "/login"
    else:
        # If none of the conditions are met, set a default page
        text_to_speech("Thank You for visiting")
    # elif "compose" in input_text:
    #     page_to_open = "/compose"
    # Add more conditions based on your requirements

    # Send the response to the frontend
    # page_to_open = "/login"
    return Response({'page_to_open': page_to_open})

@api_view(['GET'])
def user_login(request):
    
    text1 = "you are redirecting to sign in with google page "
    text_to_speech(text1)
    # text_to_speech("Login with your google account ")
    text_to_speech("now select your gmail ")
    # username=speechtotext(15)
    text_to_speech("now click allow to login into our website")
    text_to_speech("you can close the authentication tab ")
    # password=speechtotext(15)
    # username = "latha"
    # password = "hema123"
    # password = password.strip()
    # password = convert_special_char(password)
    # password = password.replace(' ', '')
    # password = password.lower()
    
    # username = request.data.post('username')
    # password = request.data.post('password')
    # username = request.POST.get('username')  # Assuming you're using Django or Flask
    # password = request.POST.get('password')
    # data = {'username': username, 'password': password}
    data='sucess'
    return Response(data)
       
    # if not (username and password):
    #     return Response({'error': 'Please provide username and password'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def authenticate(request):  
    os.remove('token.json')
    SCOPES = ['https://mail.google.com/']
    global creds
    creds= None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json')
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "C:\\Users\\user\\Downloads\\client_secret_503372928540-3k4pat469mustekn632lp5ksc5buioni.apps.googleusercontent.com.json", SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return Response({'message': 'Authentication successful'})
        # if not creds or not creds.valid:
        #     return Response({'error': 'Authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)
        # else:
        #     # Authentication successful, return success response
        # return Response({'message': 'Authentication successful'})
    

# clientsecrets_location = settings.CLIENT_SECRETS_LOCATION
# Redirect_uri = settings.REDIRECT_URI
# Scopes = settings.SCOPES
# Function to load credentials from token.json file
def load_credentials():
    with open('token.json', 'r') as token_file:
        token_data = json.load(token_file)
    credentials = Credentials.from_authorized_user_info(token_data)
    return credentials

# # Function to fetch sender's Gmail account
def fetch_sender_email():
    credentials = load_credentials()
    service = build('gmail', 'v1', credentials=credentials)
    profile = service.users().getProfile(userId='me').execute()
    sender_email = profile['emailAddress']
    return sender_email


def create_message_with_attachment(sender, to, subject, message_text, file_path):
    message = MIMEMultipart()
    message['to'] = ', '.join(to)
    message['from'] = sender
    message['subject'] = subject

    msg = MIMEText(message_text)
    message.attach(msg)

    # content_type, encoding = mimetypes.guess_type(file_path)
    # if content_type is None or encoding is not None:
    #     content_type = 'application/octet-stream'
    # main_type, sub_type = content_type.split('/', 1)
    # file_path = find_file(file_path)
    if file_path:
        # Determine MIME type and subtype
        content_type, encoding = mimetypes.guess_type(file_path)
        if content_type is None or encoding is not None:
            content_type = 'application/octet-stream'
        main_type, sub_type = content_type.split('/', 1)

        with open(file_path, 'rb') as file:
            attachment = MIMEBase(main_type, sub_type)
            attachment.set_payload(file.read())
            encoders.encode_base64(attachment)
            attachment.add_header('Content-Disposition', f'attachment; filename="{os.path.basename(file_path)}"')
            message.attach(attachment)
        return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}
    else:
        print(f"File '{file_path}' not found.")
        return None

    # raw_message = base64.urlsafe_b64encode(message.as_bytes())
    # raw_message = raw_message.decode()
    # return {'raw': raw_message}
def create_message(sender, to, subject, message_text):
    message = MIMEMultipart()
    message['to'] = ', '.join(to)
    message['from'] = sender
    message['subject'] = subject

    msg = MIMEText(message_text)
    message.attach(msg)

    # Encode the message as base64url
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {'raw': raw_message}

# Function to send the email
def send_message(user_id, message):
    try:
        credentials = load_credentials()
        service = build('gmail', 'v1', credentials=credentials)
        message = service.users().messages().send(userId=user_id, body=message).execute()
        print('Message sent successfully!')
        return message
    except Exception as e:
        print('An error occurred:', e)
        return None

# Authenticate and authorize using OAuth 2.0


@api_view(['GET'])
def GiveData(request):
    flag=True
    sender= fetch_sender_email()
    text_to_speech("You have reached the page where you can compose and send an email")
    recipients = []  # Initialize an empty list for recipients
    desktop_path = 'C:/Users/user/Desktop/'
    while flag:
        text_to_speech("Enter recipient's email address: ")
        recipient_email = converted_text(speechtotext(19))
        print(recipient_email)
        recipients.append(recipient_email)

        text_to_speech("Do you mean "+recipient_email+"Say confirm to Confirm recipient's email address and no to enter again ")
        confirm =speechtotext(5)
        print(confirm)
        if confirm.lower() != 'confirm':
            recipients.remove(recipient_email)
        
        text_to_speech("Do you want to add another recipient or re enter the recipient email? say enter to confirm and no to continue ")
        add_more = speechtotext(3)
        print(add_more)
        if add_more.lower() != 'enter':
            flag=False
    text_to_speech("select the language for subject English or Telugu")
    c=speechtotext(6)
    if c=="Telugu" or c=="telugu":
        text_to_speech("Enter the email subject in telugu: ")
        subject = telugu_speech_to_text(13)
    else:
        text_to_speech("Enter the email subject in english: ")
        subject = convert_special_char(speechtotext(13))
    text_to_speech("select the language for meassage English or Telugu")
    d=speechtotext(6)
    if c=="Telugu" or c=="telugu":
        text_to_speech("Enter the email message in telugu: ")
        message_text =telugu_speech_to_text(17)
    else:
        text_to_speech("Enter the email message in english: ")
        message_text =convert_special_char(speechtotext(17))
    # recipients=['study101mode@gmail.com','hemalathaanusuri597@gmail.com']
    # subject='hello this hema'
    # message_text='testing my major project'


    text_to_speech("Do you want to add an attachment to this mail? (attach/no): ")
    attachment_choice =speechtotext(3)
    print(attachment_choice)
    # # try:
    if attachment_choice.lower() == 'attach':
        text_to_speech("Enter the path of the file you want to attach: ")
        attachment_path =converted_text(speechtotext(10))
        attachment_path = os.path.join(desktop_path, attachment_path)
        # attachment_path = find_file(attachment_path)
    else:
        attachment_path = None
        # except Exception as e:
        #     print("Error occurred:", e)
        #     attachment_path = None
    # attachment_path=r"C:\Users\user\Desktop\Anusuri Hemalatha Sri Resume.pdf"
    if attachment_path:
        message = create_message_with_attachment(sender, recipients, subject, message_text, attachment_path)
    else:
        message = create_message(sender, recipients, subject, message_text)
    text_to_speech("Sending the Email")
    send_message('me', message)
    return Response({'reciever': recipients,'subject':subject,'message':message_text})

@api_view(['GET'])
def fetch_emails(request):
    # text_to_speech("this Inbox emails page")
    # SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

    # creds = Credentials.from_authorized_user_file('token.json')  # Ensure token.json exists with Gmail API credentials
    creds=load_credentials()
    service = build('gmail', 'v1', credentials=creds)

    results = service.users().messages().list(userId='me', labelIds=['INBOX'], maxResults=10).execute()
    messages = results.get('messages', [])

    emails = []
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        payload = msg['payload']
        headers = payload['headers']
        sender = next((header['value'] for header in headers if header['name'] == 'From'), None)
        subject = next((header['value'] for header in headers if header['name'] == 'Subject'), None)
        snippet = msg.get('snippet', '')

        # Get the date of the email
        date = next((header['value'] for header in headers if header['name'] == 'Date'), None)

        emails.append({'sender': sender, 'subject': subject, 'snippet': snippet, 'date': date})
        #emails.append({'sender': sender, 'subject': subject})
    return JsonResponse(emails,safe=False)

@api_view(['GET'])
def fetch_sent_emails(request):
    # text_to_speech("this sent emails page")
    creds = load_credentials()
    service = build('gmail', 'v1', credentials=creds)

    results = service.users().messages().list(userId='me', labelIds=['SENT'], maxResults=10).execute()
    messages = results.get('messages', [])

    emails = []
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        payload = msg['payload']
        headers = payload['headers']

        recipient_header = next((header['value'] for header in headers if header['name'] == 'to'), None)
        if recipient_header:
            recipients = [email.strip() for email in recipient_header.split(',')]
            recipient = ', '.join(recipients)
        else:
            recipient = None

        subject = next((header['value'] for header in headers if header['name'] == 'subject'), None)
        snippet = msg.get('snippet', '')

        # Get the date of the email
        date = next((header['value'] for header in headers if header['name'] == 'date'), None)

        emails.append({'recipient': recipient, 'subject': subject, 'snippet': snippet, 'date': date})

        # # Print email details for debugging
        # print("Recipient:", recipient)
        # print("Subject:", subject)
        # print("Snippet:", snippet)
        # print("Date:", date)
        # print("------------------------------------")

    return JsonResponse(emails, safe=False)

@api_view(['GET'])
def fetch_starred_emails(request):
    creds = load_credentials()
    service = build('gmail', 'v1', credentials=creds)

    results = service.users().messages().list(userId='me', labelIds=['STARRED'], maxResults=10).execute()
    messages = results.get('messages', [])

    starred_emails = []
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        payload = msg['payload']
        headers = payload['headers']
        sender = next((header['value'] for header in headers if header['name'] == 'From'), None)
        subject = next((header['value'] for header in headers if header['name'] == 'Subject'), None)
        snippet = msg.get('snippet', '')

        # Get the date of the email
        date = next((header['value'] for header in headers if header['name'] == 'Date'), None)

        starred_emails.append({'sender': sender, 'subject': subject, 'snippet': snippet, 'date': date})

    return JsonResponse(starred_emails, safe=False)

@api_view(['GET'])
def fetch_snoozed_emails(request):
    creds = load_credentials()
    service = build('gmail', 'v1', credentials=creds)

    # Fetch messages from INBOX label
    results = service.users().messages().list(userId='me', labelIds=['INBOX'], maxResults=10).execute()
    messages = results.get('messages', [])

    snoozed_emails = []
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        payload = msg['payload']
        headers = payload['headers']
        subject = next((header['value'] for header in headers if header['name'] == 'Subject'), None)

        # Check if the email meets snooze criteria (e.g., unread and has custom snooze label)
        if msg['labelIds'] == ['UNREAD', 'SNOOZED']:  # Adjust criteria based on your snooze implementation
            sender = next((header['value'] for header in headers if header['name'] == 'From'), None)
            snippet = msg.get('snippet', '')
            date = next((header['value'] for header in headers if header['name'] == 'Date'), None)
            snoozed_emails.append({'sender': sender, 'subject': subject, 'snippet': snippet, 'date': date})

    return JsonResponse(snoozed_emails, safe=False)

@api_view(['GET'])
def fetch_draft_emails(request):
    creds = load_credentials()
    service = build('gmail', 'v1', credentials=creds)

    results = service.users().messages().list(userId='me', labelIds=['DRAFT'], maxResults=10).execute()
    messages = results.get('messages', [])

    draft_emails = []
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        payload = msg['payload']
        headers = payload['headers']
        sender = next((header['value'] for header in headers if header['name'] == 'From'), None)
        subject = next((header['value'] for header in headers if header['name'] == 'Subject'), None)
        snippet = msg.get('snippet', '')

        # Get the date of the email
        date = next((header['value'] for header in headers if header['name'] == 'Date'), None)

        draft_emails.append({'sender': sender, 'subject': subject, 'snippet': snippet, 'date': date})

    return JsonResponse(draft_emails, safe=False)


# Function to fetch the total number of emails in the inbox
def fetch_total_emails():
    credentials = load_credentials()
    service = build('gmail', 'v1', credentials=credentials)
    response = service.users().messages().list(userId='me', labelIds=['INBOX']).execute()
    total_emails = response['resultSizeEstimate']
    return total_emails

# Function to fetch the total number of unread emails in the inbox
def fetch_unread_emails():
    credentials = load_credentials()
    service = build('gmail', 'v1', credentials=credentials)
    response = service.users().messages().list(userId='me', labelIds=['INBOX', 'UNREAD']).execute()
    unread_emails = response['resultSizeEstimate']
    return unread_emails

# Function to fetch the total number of read emails in the inbox
def fetch_read_emails():
    total_emails = fetch_total_emails()
    unread_emails = fetch_unread_emails()
    read_emails = total_emails - unread_emails
    return read_emails

# Function to fetch the list of emails in the inbox
def fetch_emails_list():
    credentials = load_credentials()
    service = build('gmail', 'v1', credentials=credentials)
    response = service.users().messages().list(userId='me', labelIds=['INBOX'], maxResults=5).execute()
    messages = response.get('messages', [])
    return messages

# # Function to read emails
@api_view(['GET'])
def read_emails(request):
    total_emails = fetch_total_emails()
    unread_emails = fetch_unread_emails()
    read_emails = fetch_read_emails()

    text_to_speech(f"Total emails in your inbox: {total_emails}")
    text_to_speech(f"Total unread emails: {unread_emails}")
    text_to_speech(f"Total read emails: {read_emails}")

    messages = fetch_emails_list()
    email_count = 0
    credentials = load_credentials()
    service = build('gmail', 'v1', credentials=credentials)
    for message in messages:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        payload = msg['payload']
        headers = payload['headers']
        sender = next((header['value'] for header in headers if header['name'] == 'From'), None)
        subject = next((header['value'] for header in headers if header['name'] == 'Subject'), None)
        email_count += 1
        text_to_speech(f"Email number {email_count}. The mail is from {sender} to you. The subject of the mail is: {subject}")

    flag = True
    while flag:
        text_to_speech("Enter the email number of the mail you want to read.")
        # email_number = speechtotext(5)
        # email_number = int(convert_special_char(email_number))
        email_number=1
        msg = service.users().messages().get(userId='me', id=messages[email_number - 1]['id']).execute()
        snippet = msg['snippet']
        text_to_speech(snippet)
        text_to_speech("Do you want to read more emails?")
        response = speechtotext(2)
        if response.lower() != "yes":
            flag = False

    return Response({'message': 'Email reading completed.'})
# def find_file(file_name):
#     for root, dirs, files in os.walk('.'):  # Search recursively from current directory
#         if file_name in files:
#             return os.path.join(root, file_name)
#     return None
# @api_view(['GET'])
# def GiveData(request):
#     #sender = speechtotext(10) # Change to your Gmail address
#     text_to_speech("You have reached the page where you can compose and send an email")
#     # sender = converted_text(speechtotext(25))# Change to your Gmail address
#     text_to_speech("enter recipient gmail id")
#     recipient = converted_text(speechtotext(25)) 
#     print(recipient) # Change to recipient's email address
#     text_to_speech("now enter the subject")
#     subject = convert_special_char(speechtotext(12))
#     text_to_speech("now enter the message")
#     message_text = convert_special_char(speechtotext(20))
#     SendEmail(recipient,subject,message_text)
#     return Response({'reciever': recipient,'subject':subject,'message':message_text})
    
# # @api_view(['POST'])
# def SendEmail(recipient,subject,message_text):
#     # Replace the following variables with your actual email details
#     # sender = 'n180597@rguktn.ac.in'  # Change to your Gmail address
#     # recipient = 'hemalathaanusuri597@gmail.com'  # Change to recipient's email address
#     # subject = 'Test Email'
#     # message_text = 'Hello, this is a test email.'
#     # text_to_speech("You have reached the page where you can compose and send an email")
#     # # sender = converted_text(speechtotext(25))# Change to your Gmail address
#     # text_to_speech("enter recipient gmail id")
#     # recipient = converted_text(speechtotext(25)) 
#     # print(recipient) # Change to recipient's email address
#     # text_to_speech("now enter the subject")
#     # subject = converted_text(speechtotext(12)) 
#     # text_to_speech("now enter the message")
#     # message_text = converted_text(speechtotext(20))
#     # text_to_speech("now click send")
#     try:
#         # Send email
#         service = build('gmail', 'v1', credentials=creds)
#         sender=fetch_sender_email()
#         message = create_message(sender,recipient, subject, message_text)

#     # Send the message
#         send_message(service, 'me', message)
#         # create_message(subject, message_text, sender, [recipient])
#         response = {'message': 'Email sent successfully'}
#         return Response(response)
#     except Exception as e:
#         response = {'error': str(e)}
#         return Response(response, status=500)
    
# def create_message(sender, to, subject, message_text):
#     message = MIMEText(message_text)
#     message['to'] = to
#     message['from'] = sender
#     message['subject'] = subject
#     raw_message = base64.urlsafe_b64encode(message.as_bytes())
#     raw_message = raw_message.decode('utf-8')
#     return {'raw': raw_message}

# def send_message(service, user_id, message):
#     try:
#         message = (service.users().messages().send(userId=user_id, body=message)
#                    .execute())
#         print('Message Id: %s' % message['id'])
#         return message
#     except Exception as error:
#         print('An error occurred: %s' % error)
#         return None

# @api_view(['POST'])
# def SendEmail(request):
#     # Replace the following variables with your actual email details
#     sender = 'n180597@rguktn.ac.in'  # Change to your Gmail address
#     recipient = 'hemalathaanusuri597@gmail.com'  # Change to recipient's email address
#     subject = 'Test Email'
#     message_text = 'Hello, this is a test email.'
#     # text_to_speech("enter your gmail id")
#     # sender = speechtotext(10) # Change to your Gmail address
#     # text_to_speech("enter recipient gmail id")
#     # recipient = speechtotext(10)  # Change to recipient's email address
#     # text_to_speech("now enter the subject")
#     # subject = speechtotext(6) 
#     # text_to_speech("now enter the message")
#     # message_text = speechtotext(14)

#     try:
#         # Send email
#         service = build('gmail', 'v1', credentials=creds)
#         message = create_message(sender,recipient, subject, message_text)

#     # Send the message
#         send_message(service, 'me', message)
#         create_message(subject, message_text, sender, [recipient])
#         response = {'message': 'Email sent successfully'}
#         return Response(response)
#     except Exception as e:
#         response = {'error': str(e)}
#         return Response(response, status=500)
    
# def create_message(sender, to, subject, message_text):
#     message = MIMEText(message_text)
#     message['to'] = to
#     message['from'] = sender
#     message['subject'] = subject
#     raw_message = base64.urlsafe_b64encode(message.as_bytes())
#     raw_message = raw_message.decode('utf-8')
#     return {'raw': raw_message}

# def send_message(service, user_id, message):
#     try:
#         message = (service.users().messages().send(userId=user_id, body=message)
#                    .execute())
#         print('Message Id: %s' % message['id'])
#         return message
#     except Exception as error:
#         print('An error occurred: %s' % error)
#         return None