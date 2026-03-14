from django.shortcuts import render
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from .models import Registration
from events.models import Event
from users.models import User
import json

def _cors(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response

def _registration_to_dict(reg: Registration):
    return {
        "id": reg.id,
        "user": reg.user.username,
        "user_id": reg.user.id,
        "event": reg.event.title,
        "event_id": reg.event.id,
        "registration_date": reg.registration_date.strftime("%Y-%m-%d %H:%M"),
        "status": reg.status,
    }

@csrf_exempt
def registrations_collection(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method == "GET":
        qs = Registration.objects.all().order_by("-registration_date")
        event_id = request.GET.get("event_id")
        if event_id:
            qs = qs.filter(event_id=event_id)
        user_id = request.GET.get("user_id")
        if user_id:
            qs = qs.filter(user_id=user_id)
        status = request.GET.get("status")
        if status:
            qs = qs.filter(status=status)
        data = [_registration_to_dict(r) for r in qs]
        return _cors(JsonResponse(data, safe=False))
    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        
        user_id = payload.get("user_id")
        event_id = payload.get("event_id")
        
        if not all([user_id, event_id]):
            return _cors(JsonResponse({"error": "Missing fields"}, status=400))
            
        try:
            user = User.objects.get(pk=user_id)
            event = Event.objects.get(pk=event_id)
        except (User.DoesNotExist, Event.DoesNotExist):
            return _cors(JsonResponse({"error": "User or Event not found"}, status=404))
        
        # Check if already registered
        if Registration.objects.filter(user=user, event=event).exists():
            return _cors(JsonResponse({"error": "Already registered"}, status=400))
        
        reg = Registration(
            user=user,
            event=event,
            status='pending'
        )
        reg.save()
        return _cors(JsonResponse(_registration_to_dict(reg), status=201))
    return _cors(HttpResponseNotAllowed(["GET", "POST", "OPTIONS"]))

@csrf_exempt
def registration_resource(request, id: int):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    try:
        reg = Registration.objects.get(pk=id)
    except Registration.DoesNotExist:
        return _cors(JsonResponse({"error": "Not found"}, status=404))
    if request.method == "GET":
        return _cors(JsonResponse(_registration_to_dict(reg)))
    if request.method in ("PUT", "PATCH"):
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        if "status" in payload:
            reg.status = payload["status"]
        reg.save()
        return _cors(JsonResponse(_registration_to_dict(reg)))
    if request.method == "DELETE":
        reg.delete()
        return _cors(JsonResponse({"ok": True}))
    return _cors(HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE", "OPTIONS"]))
