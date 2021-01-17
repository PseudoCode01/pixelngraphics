from home.models import UserProfile,SellerProfile
def add_variable_to_context(request):
    up=[]
    sp=[]
    if request.user.is_authenticated:
        up=UserProfile.objects.filter(user=request.user).values()
        sp=SellerProfile.objects.filter(seller=request.user).values()
    return {'profile':up,'spr':sp}