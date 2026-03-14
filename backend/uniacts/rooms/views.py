from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.utils.dateparse import parse_date
from .models import Room, RoomReservation
from users.models import User
import json

def _cors(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response

def _room_to_dict(room: Room):
    return {
        "id": room.id,
        "name": room.name,
        "capacity": room.capacity,
        "is_available": room.is_available,
    }

def _reservation_to_dict(res: RoomReservation):
    return {
        "id": res.id,
        "room": res.room.id,
        "room_name": res.room.name,
        "requester": res.requester.username,
        "date": res.date.strftime("%Y-%m-%d"),
        "time_slot": res.time_slot,
        "status": res.status,
        "created_at": res.created_at.strftime("%Y-%m-%d %H:%M"),
    }

@csrf_exempt
def rooms_collection(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method == "GET":
        data = [_room_to_dict(r) for r in Room.objects.all().order_by("name")]
        return _cors(JsonResponse(data, safe=False))
    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        room = Room(
            name=payload.get("name", ""),
            capacity=payload.get("capacity", 0),
            is_available=payload.get("is_available", True)
        )
        room.save()
        return _cors(JsonResponse(_room_to_dict(room), status=201))
    return _cors(HttpResponseNotAllowed(["GET", "POST", "OPTIONS"]))

@csrf_exempt
def room_resource(request, id: int):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    try:
        room = Room.objects.get(pk=id)
    except Room.DoesNotExist:
        return _cors(JsonResponse({"error": "Not found"}, status=404))
    if request.method == "GET":
        return _cors(JsonResponse(_room_to_dict(room)))
    if request.method in ("PUT", "PATCH"):
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        room.name = payload.get("name", room.name)
        room.capacity = payload.get("capacity", room.capacity)
        room.is_available = payload.get("is_available", room.is_available)
        room.save()
        return _cors(JsonResponse(_room_to_dict(room)))
    if request.method == "DELETE":
        room.delete()
        return _cors(JsonResponse({}, status=204))
    return _cors(HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE", "OPTIONS"]))

@csrf_exempt
def reservations_collection(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method == "GET":
        qs = RoomReservation.objects.all().order_by("-date", "-created_at")
        room_id = request.GET.get("room_id")
        if room_id:
            qs = qs.filter(room_id=room_id)
        requester = request.GET.get("requester")
        if requester:
            qs = qs.filter(requester__username=requester)
        data = [_reservation_to_dict(r) for r in qs]
        return _cors(JsonResponse(data, safe=False))
    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        
        room_id = payload.get("room_id")
        requester_username = payload.get("requester") # Username for MVP
        date_str = payload.get("date")
        time_slot = payload.get("time_slot")
        
        if not all([room_id, requester_username, date_str, time_slot]):
             return _cors(JsonResponse({"error": "Missing fields"}, status=400))
             
        try:
            room = Room.objects.get(pk=room_id)
            requester = User.objects.get(username=requester_username)
        except (Room.DoesNotExist, User.DoesNotExist):
            return _cors(JsonResponse({"error": "Room or User not found"}, status=404))
            
        res = RoomReservation(
            room=room,
            requester=requester,
            date=parse_date(date_str),
            time_slot=time_slot,
            status='pending'
        )
        res.save()
        return _cors(JsonResponse(_reservation_to_dict(res), status=201))
    return _cors(HttpResponseNotAllowed(["GET", "POST", "OPTIONS"]))

@csrf_exempt
def reservation_resource(request, id: int):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    try:
        res = RoomReservation.objects.get(pk=id)
    except RoomReservation.DoesNotExist:
        return _cors(JsonResponse({"error": "Not found"}, status=404))
    if request.method == "GET":
        return _cors(JsonResponse(_reservation_to_dict(res)))
    if request.method in ("PUT", "PATCH"):
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        if "status" in payload:
            res.status = payload["status"]
        if "date" in payload:
            res.date = parse_date(payload["date"])
        if "time_slot" in payload:
            res.time_slot = payload["time_slot"]
        res.save()
        return _cors(JsonResponse(_reservation_to_dict(res)))
    if request.method == "DELETE":
        res.delete()
        return _cors(JsonResponse({"ok": True}))
    return _cors(HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE", "OPTIONS"]))
