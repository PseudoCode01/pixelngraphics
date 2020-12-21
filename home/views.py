from django.shortcuts import render,redirect
from django.http import JsonResponse
import json
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from home.models import SellerApplication,Product,ProductSample,SellerProfile,Cart,HomePage
# Create your views here.
def home(request):
    h=HomePage.objects.all().order_by('-timeStamp').values()
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
    print(h[0])
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
    else:
        myuser=User.objects.create_user(username,email,pass1)
        user=authenticate(username=username,password=pass1)
        if user is not None:
            login(request,user)
        return JsonResponse({'success':"Account created Successfully"},safe=False)

def ajaxlogin(request):
    data=json.loads(request.body)
    username=data['username']
    password=data['password']   
    
    try:
        user=authenticate(username=User.objects.get(email=username),password=password)
    except:
        user=authenticate(username=username,password=password)
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
    products=Product.objects.filter(isVerified=True).values()
    l=[]
    for item in products:
        ps=ProductSample.objects.filter(product_id=item['sno']).values()
        l.append([item,ps[0]])
    return render(request,'home/profile.html',{'profile':Sp,'pr':l})
def addProduct(request):
    times = request.POST.get('times')
    if times=='first':
        title= request.POST['title']
        disc= request.POST['disc']
        tags= request.POST['searchTags']
        filefor= request.POST['fileformats']
        samples = request.FILES.get('samples')
        Price= request.POST['price']
        cat= request.POST['category']
        pr=Product(sellername=request.user.username,seller=request.user,category=cat,title=title,fileformat=filefor,discription=disc,searchTags=tags,Price=Price)
        pr.save()
        ps=ProductSample(samplesfile=samples,product=pr)
        ps.save()
    elif times=='last':
        samples = request.FILES.get('samples')
        title= request.POST['title']
        disc= request.POST['disc']
        pr=Product.objects.filter(title=title).filter(discription=disc).order_by('-timeStamp')[0]
        ps=ProductSample(samplesfile=samples,product=pr)
        ps.save()
    return JsonResponse('OK',safe=False)
def editProfile(request):
    title= request.POST.get('title')
    sno= request.POST.get('sno')
    samples = request.FILES.get('img')
    sp=SellerProfile.objects.get(sno=sno)
    sp.tag=title
    if samples != None:
        sp.profileImage=samples
    sp.save()
    return JsonResponse('OK',safe=False)
def productDetail(request,id):
    p=Product.objects.filter(sno=id).values()
    ps=ProductSample.objects.filter(product_id=id).values()
    c=Cart.objects.filter(user=request.user).filter(product_id=id).values()
    return render(request,'home/productDetail.html',{'pr':p,'ps':ps,'l':len(c)})
def profileview(request,id):
    Sp=SellerProfile.objects.filter(seller_id=id).values()
    products=Product.objects.filter(isVerified=True).values()
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
    cart=Cart.objects.get(product_id=int(sno))
    cart.delete()
    return JsonResponse('OK',safe=False)