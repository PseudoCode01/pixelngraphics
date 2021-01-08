from home.models import UserProfile
def add_variable_to_context(request):
    up=UserProfile.objects.filter(user=request.user).values()
    print(up)
    return {'profile':up}