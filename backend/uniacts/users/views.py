from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .models import User
import json

def _cors(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response

def _user_to_dict(user: User):
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "profile_picture": user.profile_picture.url if user.profile_picture else "",
        "bio": user.bio or "",
        "student_number": user.student_number or "",
        "department": user.department or "",
    }

@csrf_exempt
def login_view(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method != "POST":
        return _cors(JsonResponse({"error": "Method not allowed"}, status=405))
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except Exception:
        return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))

    username = payload.get("username", "").strip()
    password = payload.get("password", "")

    # Allow login by email as well
    if not username:
        return _cors(JsonResponse({"error": "Username or email is required"}, status=400))

    # Try email lookup
    if "@" in username:
        try:
            user_obj = User.objects.get(email=username)
            username = user_obj.username
        except User.DoesNotExist:
            return _cors(JsonResponse({"error": "Invalid credentials"}, status=401))

    user = authenticate(username=username, password=password)
    if user is None:
        return _cors(JsonResponse({"error": "Invalid credentials"}, status=401))

    return _cors(JsonResponse(_user_to_dict(user)))

@csrf_exempt
def users_collection(request):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    if request.method == "GET":
        qs = User.objects.all().order_by("username")
        role = request.GET.get("role")
        if role:
            qs = qs.filter(role=role)
        data = [_user_to_dict(u) for u in qs]
        return _cors(JsonResponse(data, safe=False))
    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        
        username = payload.get("username")
        email = payload.get("email")
        password = payload.get("password")
        
        if not all([username, email, password]):
            return _cors(JsonResponse({"error": "Missing fields"}, status=400))
        
        if User.objects.filter(username=username).exists():
            return _cors(JsonResponse({"error": "Username already exists"}, status=400))
        if User.objects.filter(email=email).exists():
            return _cors(JsonResponse({"error": "Email already exists"}, status=400))
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=payload.get("first_name", ""),
            last_name=payload.get("last_name", ""),
            role=payload.get("role", "student"),
            bio=payload.get("bio", ""),
            student_number=payload.get("student_number"),
            department=payload.get("department"),
        )
        return _cors(JsonResponse(_user_to_dict(user), status=201))
    return _cors(HttpResponseNotAllowed(["GET", "POST", "OPTIONS"]))

@csrf_exempt
def user_resource(request, id: int):
    if request.method == "OPTIONS":
        return _cors(JsonResponse({}, status=200))
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return _cors(JsonResponse({"error": "Not found"}, status=404))
    if request.method == "GET":
        return _cors(JsonResponse(_user_to_dict(user)))
    if request.method in ("PUT", "PATCH"):
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return _cors(JsonResponse({"error": "Invalid JSON"}, status=400))
        
        if "first_name" in payload:
            user.first_name = payload["first_name"]
        if "last_name" in payload:
            user.last_name = payload["last_name"]
        if "email" in payload:
            user.email = payload["email"]
        if "role" in payload:
            user.role = payload["role"]
        if "bio" in payload:
            user.bio = payload["bio"]
        if "student_number" in payload:
            user.student_number = payload["student_number"]
        if "department" in payload:
            user.department = payload["department"]
        if "password" in payload and payload["password"]:
            user.set_password(payload["password"])
        
        user.save()
        return _cors(JsonResponse(_user_to_dict(user)))
    if request.method == "DELETE":
        user.delete()
        return _cors(JsonResponse({"ok": True}))
    return _cors(HttpResponseNotAllowed(["GET", "PUT", "PATCH", "DELETE", "OPTIONS"]))
