from home.models import UserProfile,SellerProfile
def add_variable_to_context(request):
    up=[]
    spr=[]
    if request.user.is_authenticated:
        up=UserProfile.objects.filter(user=request.user).values()
        spr=SellerProfile.objects.filter(seller=request.user).values()
    return {'profile':up,'spr':spr}
    