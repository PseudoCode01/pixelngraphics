from home.models import UserProfile
def add_variable_to_context(request):
    up=[]
    if request.user.is_authenticated:
        up=UserProfile.objects.filter(user=request.user).values()
    return {'profile':up}