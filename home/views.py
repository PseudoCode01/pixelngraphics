from django.shortcuts import render,redirect
from django.http import JsonResponse
import json
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from home.models import SellerApplication,Product,ProductSample,SellerProfile,Cart,HomePage,CustomProduct,MyOrder,UserProfile
from django.conf import settings
from django.core.mail import EmailMessage
import random
from django.template.loader import render_to_string

# Create your views here.
def home(request):
    h=HomePage.objects.all().order_by('-timeStamp').values()
    products=Product.objects.filter(isVerified=True).order_by('-timeStamp').values()
    l=[]
    b=[]
    so=[]
    for item in products:
        ps=ProductSample.objects.filter(product_id=item['sno']).order_by('id').values()
        if item['category'] == 'logo':
            l.append([item,ps[0]])
        elif item['category'] == 'banner':
            b.append([item,ps[0]])
        else :
            so.append([item,ps[0]])
    return render(request,'home/Home.html',{'product':l,'banner':b,'stream':so,'ht':h})
  
def contact(request):
    return render(request,'home/contactUs.html')

def signup(request):
    return render(request,'home/signup.html')

def signin(request):
    return render(request,'home/signin.html')

def termsofservice(request):
    return render(request,'home/termsofservice.html')

def privacypolicy(request):
    return render(request,'home/privacypolicy.html')

def refundpolicy(request):
    return render(request,'home/refund.html')

def about(request):
    return render(request,'home/about.html')

def brand(request):
    return render(request,'home/brand.html')

def partner(request):
    return render(request,'home/partner.html')



def sendotp(request):
    data=json.loads(request.body)
    username=data['username']
    email=data['email']
    pass1=data['pass']
    pass2=data['conpass']
    r=1111
    if(pass1!=pass2):
        return JsonResponse({'error':'Password do not Match'},safe=False)
    if(pass1==None or pass1==''):
        return JsonResponse({'error':'Password is Mandatory'},safe=False)
    elif len(username)> 20 or len(username)<5:
        return JsonResponse({'error':"Your username can contain 5 to 20 Characters"},safe=False)
    elif not username.isalnum():
        return JsonResponse({'error':"Your username can contain letters and numbers only "},safe=False)
    elif len(User.objects.filter(username=username))>0:
        return JsonResponse({'error':"Username is already taken"},safe=False)
    else:
        r=random.randint(1000,9999)
        template=render_to_string('home/otpvar.html',{'otp':r})
        email = EmailMessage(
            'Verification code for PixelNGraphics.com',
            template,
            settings.EMAIL_HOST_USER,
            [email],
        )
        email.fail_silently=False
        email.send()
    print(r)
    return JsonResponse({'success':r},safe=False)
def ajaxsignup(request):
    data=json.loads(request.body)
    username=data['username']
    email=data['email']
    pass1=data['pass']
    pass2=data['conpass']
    print(username)
    if(pass1!=pass2):
        return JsonResponse({'error':'Password do not Match'},safe=False)
    elif len(username)> 20 or len(username)<5:
        return JsonResponse({'error':"Your username can contain 5 to 20 Characters"},safe=False)
    elif not username.isalnum():
        return JsonResponse({'error':"Your username can contain letters and numbers only "},safe=False)
    elif len(User.objects.filter(username=username))>0:
        return JsonResponse({'error':"Username is already taken"},safe=False)
    else:
        myuser=User.objects.create_user(username,email,pass1)
        user=authenticate(username=username,password=pass1)
        if user is not None:
            login(request,user)
        return JsonResponse({'success':"Account created Successfully"},safe=False)

def ajaxsignin(request):
    data=json.loads(request.body)
    usern=data['user']
    passw=data['pass']
    try:
        user=authenticate(username=User.objects.get(email=usern),password=passw)
    except:
        user=authenticate(username=usern,password=passw)
    if user is not None:
        login(request,user)
        return JsonResponse({'success':"Successfully Loged In"},safe=False)
    else:
        return JsonResponse({'error':"Invalid Credentials, Please Try Again"},safe=False)
       
def signout(request):
    logout(request)
    messages.success(request,"Successfully Loged Out")
    return redirect('/')

def sell(request):
    app=SellerApplication.objects.filter(username=request.user.username).values()
    return render(request,'home/sell.html',{'check':app})

def applyforseller(request):
    name = request.POST.get('name')
    email = request.POST.get('email')
    link = request.POST.get('link')
    app  =SellerApplication(username=request.user.username,name=name,email=email,Portfolio=link)
    app.save()
    return redirect('/')
def sellerProfile(request):
    Sp=SellerProfile.objects.filter(seller_id=request.user.id).values()
    app=SellerApplication.objects.filter(username=request.user.username).values()
    if len(app)<1:
        return render(request,'home/sell.html',{'check':app})
    
    if app[0]['isVerified']==False:
        return render(request,'home/sell.html',{'check':app})
    if len(Sp)<1:
        Sp=SellerProfile(sellername=request.user.username,seller=request.user)
        Sp.save()
    products=Product.objects.filter(seller=request.user).values()
    l=[]
    for item in products:
        ps=ProductSample.objects.filter(product_id=item['sno']).values()
        l.append([item,ps[0]])
    return render(request,'home/profile.html',{'profile':Sp,'pr':l})
def addProduct(request):
    times = request.POST.get('times')
    if times=='first':
        sp=SellerProfile.objects.get(seller_id=request.user.id)
        sp.products+=1
        sp.save()
        title= request.POST['title']
        disc= request.POST['disc']
        tags= request.POST['searchTags']
        filefor= request.POST['fileformats']
        samples = request.FILES.get('samples')
        Price= request.POST['price']
        cat= request.POST['category']
        v=str(samples).split('.')[-1].lower()
        tp=''
        if v=='mp4' or v=='m4v' or v=='aep' or v=='mov' or v=='flv' or v=='f4v' or v=='avi':
            tp='video'
        else:
            tp='image'
        pr=Product(sellername=request.user.username,seller=request.user,category=cat,title=title,fileformat=filefor,discription=disc,searchTags=tags,Price=Price)
        pr.save()
        ps=ProductSample(samplesfile=samples,product=pr,filetype=tp)
        ps.save()
    elif times=='last':
        samples = request.FILES.get('samples')
        title= request.POST['title']
        disc= request.POST['disc']
        v=str(samples).split('.')[-1].lower()
        tp=''
        # print(v)
        if v=='mp4' or v=='m4v' or v=='aep' or v=='mov' or v=='flv' or v=='f4v' or v=='avi':
            tp='video'
        else:
            tp='image'
        pr=Product.objects.filter(title=title).filter(discription=disc).order_by('-timeStamp')[0]
        ps=ProductSample(samplesfile=samples,product=pr,filetype=tp)
        ps.save()
    return JsonResponse('OK',safe=False)

def editProfile(request):
    title= request.POST.get('title')
    sno= request.POST.get('sno')
    samples = request.FILES.get('img')
    fullname= request.POST.get('fullname')
    sellername= request.POST.get('sname')
    country= request.POST.get('country')
    state= request.POST.get('state')
    city= request.POST.get('city')
    postalcode= request.POST.get('postal')
    address1= request.POST.get('add1')
    address2= request.POST.get('add2')
    desc= request.POST.get('desc')
    invoice= request.POST.get('invoice')
    ad= request.POST.get('ad')
    sp=SellerProfile.objects.get(sno=sno)
    if title != None:
        sp.tag=title
    if fullname != None:
        sp.Fullname=fullname
    if sellername != None:
        sp.sellername=sellername
    if country != None:
        sp.Country=country
    if state != None:
        sp.State=state
    if city != None:
        sp.City=city
    if postalcode != None:
        sp.PostalCode=postalcode
    if address1 != None:
       sp.Address=address1
    if address2 != None:
       sp.Address2=address2
    if desc != None:
        sp.discription=desc
    if invoice== 'true':
        sp.SendInvoices=True
    else:
        sp.SendInvoices=False
    if ad != None:
        sp.accountdetails=ad
    if samples != None:
        sp.profileImage=samples
    sp.save()
    return JsonResponse('OK',safe=False)

def productDetail(request,slug,id):
    p=Product.objects.filter(sno=id).values()
    ps=ProductSample.objects.filter(product_id=id).order_by('id').values()
    sp=SellerProfile.objects.filter(seller=p[0]['seller_id'])
    s=set()
    il=0
    l=[]
    for it in p[0]['searchTags'].split(','):
        if(il==len(p[0]['searchTags'].split(','))-1):
            break
        r=Product.objects.filter(isVerified=True)
        for item in r:
            print(item)
            if(searchfun(item.searchTags.split(','),it)):
                l.append([item,ProductSample.objects.filter(product_id=item.sno)])
        
        il+=1
    try:
        c=Cart.objects.filter(user=request.user).filter(product_id=id).values()
    except:
        c=[]
    return render(request,'home/productDetail.html',{'pr':p,'ps':ps,'l':len(c),'rec':l,'sp':sp})
def profileview(request,slug,id):
    Sp=SellerProfile.objects.filter(seller_id=id).values()
    products=Product.objects.filter(isVerified=True).filter(seller_id=id).values()
    l=[]
    for item in products:
        ps=ProductSample.objects.filter(product_id=item['sno']).values()
        l.append([item,ps[0]])
    return render(request,'home/ProfilePublic.html',{'profile':Sp,'pr':l})

def cart(request):
    c=Cart.objects.filter(user=request.user).values()
    l=[]
    for item in c:
        l.append([Product.objects.filter(sno=item['product_id']).values(),ProductSample.objects.filter(product_id=item['product_id']).values()])
    return render(request,'home/cart.html',{'cart':l})

def AddtoCart(request):
    data=json.loads(request.body)
    sno = data['sno']
    ch = data['changes']
    cart=Product.objects.get(sno=int(sno))
    c=Cart(user=request.user,username=request.user.username,product=cart,changes=ch)
    c.save()
    return JsonResponse('OK',safe=False)
def removeCart(request):
    data=json.loads(request.body)
    sno = data['sno']
    c=Cart.objects.filter(product_id=int(sno))
    c.delete()
    return JsonResponse('OK',safe=False)
def customlogo(request):
    return render(request,'home/customlogo.html')
def addcustom(request):
    data=json.loads(request.body)
    name = data['name']
    email = data['email']
    brief = data['brief']
    budget = data['budget']
    c=CustomProduct(name=name,email=email,brief=brief,budget=budget)
    c.save()
    return JsonResponse('OK',safe=False)
def filters(request):
    data=json.loads(request.body)
    fil = data['filter']
    fil=int(fil)
    if fil == 0:
        products=Product.objects.filter(isVerified=True).order_by('-Price').values()
        l=[]
        b=[]
        so=[]
        for item in products:
            ps=ProductSample.objects.filter(product_id=item['sno']).values()
            if item['category'] == 'logo':
                l.append([item,ps[0]])
            elif item['category'] == 'banner':
                b.append([item,ps[0]])
            else :
                so.append([item,ps[0]])
    elif fil == 1:
        products=Product.objects.filter(isVerified=True).order_by('Price').values()
        l=[]
        b=[]
        so=[]
        for item in products:
            ps=ProductSample.objects.filter(product_id=item['sno']).values()
            if item['category'] == 'logo':
                l.append([item,ps[0]])
            elif item['category'] == 'banner':
                b.append([item,ps[0]])
            else :
                so.append([item,ps[0]])
    elif fil == 2:
        products=Product.objects.filter(isVerified=True).order_by('-number_sell').values()
        l=[]
        b=[]
        so=[]
        for item in products:
            ps=ProductSample.objects.filter(product_id=item['sno']).values()
            if item['category'] == 'logo':
                l.append([item,ps[0]])
            elif item['category'] == 'banner':
                b.append([item,ps[0]])
            else :
                so.append([item,ps[0]])
    elif fil == 3:
        products=Product.objects.filter(isVerified=True).order_by('-rating').values()
        l=[]
        b=[]
        so=[]
        for item in products:
            ps=ProductSample.objects.filter(product_id=item['sno']).values()
            if item['category'] == 'logo':
                l.append([item,ps[0]])
            elif item['category'] == 'banner':
                b.append([item,ps[0]])
            else :
                so.append([item,ps[0]])
    elif fil == 4:
        products=Product.objects.filter(isVerified=True).order_by('-timeStamp').values()
        l=[]
        b=[]
        so=[]
        for item in products:
            ps=ProductSample.objects.filter(product_id=item['sno']).values()
            if item['category'] == 'logo':
                l.append([item,ps[0]])
            elif item['category'] == 'banner':
                b.append([item,ps[0]])
            else :
                so.append([item,ps[0]])
    elif fil == 5:
        products=Product.objects.filter(isVerified=True).order_by('-timeStamp').values()
        l=[]
        b=[]
        so=[]
        for item in products:
            ps=ProductSample.objects.filter(product_id=item['sno']).values()
            if item['category'] == 'logo':
                l.append([item,ps[0]])
            elif item['category'] == 'banner':
                b.append([item,ps[0]])
            else :
                so.append([item,ps[0]])
    return JsonResponse({'product':l,'banner':b,'stream':so})
def searchfun(list, platform):
    for i in range(len(list)-1):
        # print(list[i],platform)
        if list[i].lower().strip() == platform.lower().strip():
            return True
    return False   
def search(request):
    data=request.POST.get('stext')
    r=Product.objects.filter(isVerified=True)
    l=[]
    if len(data) < 1 :
        return redirect('/')

    for item in r:
        if(searchfun(item.searchTags.split(','),data)):
            l.append([item,ProductSample.objects.filter(product_id=item.sno)])
    return render(request,'home/search.html',{'result':l})


def getprice(request):
    data=json.loads(request.body)
    snos = data['sno'].split('+')
    qn = data['qns'].split('+')
    i=0
    price=0;
    for item in snos:
        if(i==len(snos)-1):
            break
        P=Product.objects.filter(sno=int(item)).values()
        if len(P)>0:
            price+=int(P[0]['Price'])*int(qn[i])
        i+=1
    return JsonResponse({'price':price},safe=False)
def additems(request):
    data=json.loads(request.body)
    snos = data['sno'].split('+')
    qn = data['qns'].split('+')
    i=0
    oid=str(len(MyOrder.objects.all())+1)
    oid='#PNG-'+oid
    for item in snos:
        if(i==len(snos)-1):
            break
        P=Product.objects.filter(sno=int(item)).values()
        c=Cart.objects.filter(product_id=int(item)).filter(user=request.user)[0]
        changes=c.changes
        
        c.delete()
        if len(P)>0:
            q=MyOrder(product=Product.objects.get(sno=int(item)),quantity=qn[i],changes=changes,user=request.user,order_id=oid)
            q.save()
            po=Product.objects.get(sno=int(item))
            if(po.category=='logo'):
                po.isSold=True
            sn=po.seller_id
            po.save()
            s=SellerProfile.objects.get(seller_id=sn)
            s.sells+=1
            s.earned+=int(P[0]['Price'])*int(qn[i])   
            s.save()
        i+=1
    return JsonResponse({'price':'ok'},safe=False)
def myProfile(request):
    mp=MyOrder.objects.filter(user=request.user).values()
    up=UserProfile.objects.filter(user=request.user).values()
    sp=SellerProfile.objects.filter(seller=request.user).values()
    bal=0
    if len(sp)>0:
        bal=sp[0]['earned']-sp[0]['transferred']
    if len(up)<1:
        up=UserProfile(username=request.user.username,user=request.user)
        up.save()
    
    email=request.user.email
    l=[]
    
    sproducts=Product.objects.filter(seller=request.user).values()
    product=[]
    prd=[]
    for item in sproducts:
        order=MyOrder.objects.filter(product_id=item['sno']).values()
        if len(order)>0:
            ps=ProductSample.objects.filter(product_id=item['sno']).values()
            prd.append([item,ps[0],order])

    for item in mp:
        l.append([Product.objects.filter(sno=item['product_id']),ProductSample.objects.filter(product_id=item['product_id']),item])
    return render(request,'home/MyProfile.html',{'result':l,'email':email,'profile':up,'product':prd,'sp':sp,'bal':bal})

def edituserProfile(request):
    sno= request.POST.get('sno')
    samples = request.FILES.get('img')
    fullname= request.POST.get('fullname')
    country= request.POST.get('country')
    state= request.POST.get('state')
    city= request.POST.get('city')
    postalcode= request.POST.get('postalcode')
    address= request.POST.get('address')
    invoice= request.POST.get('invoice')
    sp=UserProfile.objects.get(sno=sno)
    if fullname!= None:
        sp.Fullname=fullname
    if country!= None:
        sp.Country=country
    if state != None:
       sp.State=state
    if city != None:
       sp.City=city
    if postalcode != None:
       sp.PostalCode=postalcode
    if address != None:
       sp.Address=address
    if invoice== 'true':
        sp.SendInvoices=True
    else:
        sp.SendInvoices=False
    if samples != None:
        sp.profileImage=samples
    sp.save()
    return JsonResponse('OK',safe=False)
    
def changepass(request):
    cp=request.POST.get('cp')
    np=request.POST.get('np')
    cnp=request.POST.get('cnp')
    u=request.user
    usern=request.user.username
    if cp == np:
            return JsonResponse({'error':"New password can't be same as current password"},safe=False)
    if u.check_password(cp):
        if np != cnp:
            return JsonResponse({'error':"Password do not match"},safe=False)
        else:
            u.set_password(np)
            u.save()
            user=authenticate(username=usern,password=np)
            login(request,user)
            return JsonResponse({'success':"Password changed"},safe=False)
    else:
        return JsonResponse({'error':"Wrong Password"},safe=False)

    return JsonResponse('OK',safe=False)

def changeemail(request):
    cp=request.POST.get('email')
    cnf=request.POST.get('confirm')
    print(cnf)
    u=request.user
    usern=request.user.username
    if cp==u.email:
        return JsonResponse({'error':"New email can't be same as email password"},safe=False)
    r=1111 
    if int(cnf) == 0:
        r=random.randint(1000,9999)
        template=render_to_string('home/otpvar.html',{'otp':r})
        email = EmailMessage(
            'Verification code for PixelNGraphics.com',
            template,
            settings.EMAIL_HOST_USER,
            [cp],
        )
        email.fail_silently=False
        email.send()
    else:
        u.email=cp
        u.save()
    return JsonResponse({'success':r},safe=False)
# def random(request,slug):
#     if slug != 'admin':
#         h=HomePage.objects.all().order_by('-timeStamp').values()
#         products=Product.objects.filter(isVerified=True).order_by('-timeStamp').values()
#         l=[]
#         b=[]
#         so=[]
#         for item in products:
#             ps=ProductSample.objects.filter(product_id=item['sno']).order_by('id').values()
#             if item['category'] == 'logo':
#                 l.append([item,ps[0]])
#             elif item['category'] == 'banner':
#                 b.append([item,ps[0]])
#             else :
#                 so.append([item,ps[0]])
#         return render(request,'home/Home.html',{'product':l,'banner':b,'stream':so,'ht':h})