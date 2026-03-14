from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.utils.dateparse import parse_date, parse_time
from .models import Event, Category
from clubs.models import Club
from users.models import User
import json

def _cors(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response

def _event_to_dict(ev: Event):
    organizer = None
    if ev.organizer_club:
        organizer = ev.organizer_club.name
    elif ev.organizer_user:
        organizer = ev.organizer_user.username
    price_label = "Free" if ev.price == 0 else str(ev.price)
    return {
        "id": ev.id,
        "title": ev.title,
        "date": ev.date.strftime("%B %d, %Y") if ev.date else "",
        "time": ev.time.strftime("%H:%M") if ev.time else "",
        "location": ev.location,
        "category": ev.category.name if ev.category else "",
        "image": ev.image.url if ev.image else "",
        "price": price_label,
        "organizer": organizer or "",
        "attendees": 0,
        "capacity": ev.capacity,
        "tags": [],
        "description": ev.description or "",
    }

@csrf_exempt
def events_collection(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method == "GET":
        data = [_event_to_dict(e) for e in Event.objects.all().order_by("id")]
        return _cors(JsonResponse(data, safe=False))
    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        title = payload.get("title", "")
        description = payload.get("description", "")
        date_str = payload.get("date")  # Expect ISO: YYYY-MM-DD
        time_str = payload.get("time")  # Expect HH:MM
        location = payload.get("location", "")
        category_name = payload.get("category")
        capacity = payload.get("capacity", 0)
        price = payload.get("price", 0)
        organizer_club = payload.get("organizer_club")
        organizer_user = payload.get("organizer_user")
        category = None
        if category_name:
            category, _ = Category.objects.get_or_create(name=category_name)
        ev = Event(
            title=title,
            description=description,
            date=parse_date(date_str) if date_str else None,
            time=parse_time(time_str) if time_str else None,
            location=location,
            category=category,
            capacity=capacity or 0,
            price=0 if price in (0, "Free", "free") else price,
        )
        if organizer_club:
            club = Club.objects.filter(name=organizer_club).first()
            if club:
                ev.organizer_club = club
        if organizer_user:
            user = User.objects.filter(username=organizer_user).first()
            if user:
                ev.organizer_user = user
        ev.save()
        return _cors(JsonResponse(_event_to_dict(ev), status=201))
    return _cors(HttpResponseNotAllowed(["GET", "POST", "OPTIONS"]))

@csrf_exempt
def event_resource(request, id: int):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    try:
        ev = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return _cors(JsonResponse({"error": "Not found"}, status=404))
    if request.method == "GET":
        return _cors(JsonResponse(_event_to_dict(ev)))
    if request.method in ("PUT", "PATCH"):
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        for field in ["title", "description", "location", "capacity"]:
            if field in payload:
                setattr(ev, field, payload[field])
        if "price" in payload:
            price = payload["price"]
            ev.price = 0 if price in (0, "Free", "free") else price
        if "date" in payload:
            ev.date = parse_date(payload["date"])
        if "time" in payload:
            ev.time = parse_time(payload["time"])
        if "category" in payload and payload["category"]:
            cat, _ = Category.objects.get_or_create(name=payload["category"])
            ev.category = cat
        if "organizer_club" in payload and payload["organizer_club"]:
            club = Club.objects.filter(name=payload["organizer_club"]).first()
            ev.organizer_club = club
            ev.organizer_user = None
        if "organizer_user" in payload and payload["organizer_user"]:
            user = User.objects.filter(username=payload["organizer_user"]).first()
            ev.organizer_user = user
            ev.organizer_club = None
        ev.save()
        return _cors(JsonResponse(_event_to_dict(ev)))
    if request.method == "DELETE":
        ev.delete()
        return _cors(JsonResponse({"ok": True}))
    return _cors(HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE", "OPTIONS"]))
