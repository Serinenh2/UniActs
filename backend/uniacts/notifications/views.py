from django.shortcuts import render
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from .models import Notification
from users.models import User
import json

def _cors(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response

def _notification_to_dict(notif: Notification):
    return {
        "id": notif.id,
        "user": notif.user.username,
        "user_id": notif.user.id,
        "message": notif.message,
        "is_read": notif.is_read,
        "created_at": notif.created_at.strftime("%Y-%m-%d %H:%M"),
    }

@csrf_exempt
def notifications_collection(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method == "GET":
        qs = Notification.objects.all().order_by("-created_at")
        user_id = request.GET.get("user_id")
        if user_id:
            qs = qs.filter(user_id=user_id)
        is_read = request.GET.get("is_read")
        if is_read is not None:
            qs = qs.filter(is_read=is_read.lower() == "true")
        data = [_notification_to_dict(n) for n in qs]
        return _cors(JsonResponse(data, safe=False))
    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        
        user_id = payload.get("user_id")
        message = payload.get("message")
        
        if not all([user_id, message]):
            return _cors(JsonResponse({"error": "Missing fields"}, status=400))
            
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return _cors(JsonResponse({"error": "User not found"}, status=404))
        
        notif = Notification(
            user=user,
            message=message,
            is_read=False
        )
        notif.save()
        return _cors(JsonResponse(_notification_to_dict(notif), status=201))
    return _cors(HttpResponseNotAllowed(["GET", "POST", "OPTIONS"]))

@csrf_exempt
def notification_resource(request, id: int):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    try:
        notif = Notification.objects.get(pk=id)
    except Notification.DoesNotExist:
        return _cors(JsonResponse({"error": "Not found"}, status=404))
    if request.method == "GET":
        return _cors(JsonResponse(_notification_to_dict(notif)))
    if request.method in ("PUT", "PATCH"):
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        if "is_read" in payload:
            notif.is_read = payload["is_read"]
        if "message" in payload:
            notif.message = payload["message"]
        notif.save()
        return _cors(JsonResponse(_notification_to_dict(notif)))
    if request.method == "DELETE":
        notif.delete()
        return _cors(JsonResponse({"ok": True}))
    return _cors(HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE", "OPTIONS"]))
