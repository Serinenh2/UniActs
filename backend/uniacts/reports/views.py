from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from .models import Report
from clubs.models import Club
from users.models import User
import json

def _cors(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response

def _report_to_dict(rep: Report):
    return {
        "id": rep.id,
        "title": rep.title,
        "content": rep.content,
        "date": rep.date.strftime("%Y-%m-%d %H:%M"),
        "club": rep.club.name,
        "author": rep.author.username,
    }

@csrf_exempt
def reports_collection(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method == "GET":
        data = [_report_to_dict(r) for r in Report.objects.all().order_by("-date")]
        return _cors(JsonResponse(data, safe=False))
    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        
        club_name = payload.get("club")
        author_username = payload.get("author")
        title = payload.get("title")
        content = payload.get("content")
        
        if not all([club_name, author_username, title, content]):
             return _cors(JsonResponse({"error": "Missing fields"}, status=400))
             
        try:
            club = Club.objects.get(name=club_name)
            author = User.objects.get(username=author_username)
        except (Club.DoesNotExist, User.DoesNotExist):
            return _cors(JsonResponse({"error": "Club or User not found"}, status=404))
            
        rep = Report(
            title=title,
            content=content,
            club=club,
            author=author
        )
        rep.save()
        return _cors(JsonResponse(_report_to_dict(rep), status=201))
    return _cors(HttpResponseNotAllowed(["GET", "POST", "OPTIONS"]))

@csrf_exempt
def report_resource(request, id: int):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    try:
        rep = Report.objects.get(pk=id)
    except Report.DoesNotExist:
        return _cors(JsonResponse({"error": "Not found"}, status=404))
    if request.method == "GET":
        return _cors(JsonResponse(_report_to_dict(rep)))
    if request.method in ("PUT", "PATCH"):
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        if "title" in payload:
            rep.title = payload["title"]
        if "content" in payload:
            rep.content = payload["content"]
        rep.save()
        return _cors(JsonResponse(_report_to_dict(rep)))
    if request.method == "DELETE":
        rep.delete()
        return _cors(JsonResponse({}, status=204))
    return _cors(HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE", "OPTIONS"]))
