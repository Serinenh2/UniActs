from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from .models import Club, ClubMember
from users.models import User
import json

def _cors(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@csrf_exempt
def join_club(request, id: int):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method != "POST":
        return _cors(HttpResponseNotAllowed(["POST", "OPTIONS"]))
    try:
        club = Club.objects.get(pk=id)
    except Club.DoesNotExist:
        return _cors(JsonResponse({"error": "Club not found"}, status=404))
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except Exception:
        return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
    username = payload.get("username")
    if not username:
        return _cors(JsonResponse({"error": "username is required"}, status=400))
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return _cors(JsonResponse({"error": "User not found"}, status=404))
    if ClubMember.objects.filter(club=club, user=user).exists():
        return _cors(JsonResponse({"message": "Already a member"}, status=200))
    ClubMember.objects.create(club=club, user=user, role_in_club="Member")
    return _cors(JsonResponse({"message": "Joined successfully"}, status=201))

@csrf_exempt
def club_members(request, id: int):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method != "GET":
        return _cors(HttpResponseNotAllowed(["GET", "OPTIONS"]))
    try:
        club = Club.objects.get(pk=id)
    except Club.DoesNotExist:
        return _cors(JsonResponse({"error": "Club not found"}, status=404))
    members = ClubMember.objects.filter(club=club).select_related('user')
    data = [
        {
            "id": m.id,
            "user_id": m.user.id,
            "username": m.user.username,
            "email": m.user.email,
            "role_in_club": m.role_in_club,
            "joined_at": m.joined_at.strftime("%Y-%m-%d %H:%M"),
        }
        for m in members
    ]
    return _cors(JsonResponse(data, safe=False))

def _club_to_dict(club: Club):
    return {
        "id": club.id,
        "name": club.name,
        "description": club.description,
        "logo": club.logo.url if club.logo else "",
        "president": club.president.username if club.president else None,
        "budget": float(club.budget),
        "created_at": club.created_at.strftime("%Y-%m-%d"),
        "members_count": club.members.count(),
    }

@csrf_exempt
def clubs_collection(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method == "GET":
        data = [_club_to_dict(c) for c in Club.objects.all().order_by("name")]
        return _cors(JsonResponse(data, safe=False))
    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        name = payload.get("name", "")
        description = payload.get("description", "")
        # Note: Image uploads via JSON payload are not standard; skipping logo for now.
        club = Club(name=name, description=description)
        club.save()
        return _cors(JsonResponse(_club_to_dict(club), status=201))
    return _cors(HttpResponseNotAllowed(["GET", "POST", "OPTIONS"]))

@csrf_exempt
def club_resource(request, id: int):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    try:
        club = Club.objects.get(pk=id)
    except Club.DoesNotExist:
        return _cors(JsonResponse({"error": "Not found"}, status=404))
    if request.method == "GET":
        return _cors(JsonResponse(_club_to_dict(club)))
    if request.method in ("PUT", "PATCH"):
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        club.name = payload.get("name", club.name)
        club.description = payload.get("description", club.description)
        club.save()
        return _cors(JsonResponse(_club_to_dict(club)))
    if request.method == "DELETE":
        club.delete()
        return _cors(JsonResponse({}, status=204))
    return _cors(HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE", "OPTIONS"]))
