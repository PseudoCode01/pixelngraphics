from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class HomePage(models.Model):
    sno=models.AutoField(primary_key=True)
    top=models.FileField(upload_to='home/homescreenDesign',null=True,blank=True, verbose_name="")
    toppremadelogo=models.FileField(upload_to='home/homescreenDesign',null=True,blank=True, verbose_name="")
    banner=models.FileField(upload_to='home/homescreenDesign',null=True,blank=True, verbose_name="")
    streamoverlays=models.FileField(upload_to='home/homescreenDesign',null=True,blank=True, verbose_name="")
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
class SellerApplication(models.Model):
    sno=models.AutoField(primary_key=True)
    username=models.CharField(default=0,max_length=1000)
    email=models.CharField(default=0,max_length=1000)
    name=models.CharField(default=0,max_length=1000)
    Portfolio=models.CharField(default=0,max_length=1000)
    isVerified=models.BooleanField(default=False)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return self.username+'  Verification_Status:'+str(self.isVerified)
class SellerProfile(models.Model):
    sno=models.AutoField(primary_key=True)
    profileImage=models.FileField(upload_to='home/profileimg', null=True,blank=True, verbose_name="")
    sellername=models.CharField(default=0,max_length=1000)
    seller=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    Fullname=models.CharField(default='',max_length=1000)
    Country=models.CharField(default='',max_length=1000)
    State=models.CharField(default='',max_length=1000)
    City=models.CharField(default='',max_length=1000)
    PostalCode=models.CharField(default='',max_length=1000)
    Address=models.CharField(default='',max_length=1000)
    Address2=models.CharField(default='',max_length=1000)
    SendInvoices=models.BooleanField(default=False)
    accountdetails=models.TextField(default='')
    tag=models.CharField(default='Graphic Designer',max_length=500)
    discription=models.CharField(default='',max_length=500)
    sellerRating=models.IntegerField(default=0,blank=True)
    products=models.IntegerField(default=0)
    sells=models.IntegerField(default=0)
    earned=models.IntegerField(default=0)
    transferred=models.IntegerField(default=0)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
    def __str__(self):
        return 'No.'+str(self.sno)+'  '+self.sellername+'  Rating:'+str(self.sellerRating)+' Sells: '+str(self.sells)+' Earned : '+str(self.earned)

class UserProfile(models.Model):
    sno=models.AutoField(primary_key=True)
    profileImage=models.FileField(upload_to='home/profileimg', null=True,blank=True, verbose_name="")
    username=models.CharField(default=0,max_length=1000)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    Fullname=models.CharField(default='',max_length=1000)
    Country=models.CharField(default='',max_length=1000)
    State=models.CharField(default='',max_length=1000)
    City=models.CharField(default='',max_length=1000)
    PostalCode=models.CharField(default='',max_length=1000)
    Address=models.CharField(default='',max_length=1000)
    SendInvoices=models.BooleanField(default=False)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)
    def __str__(self):
        return 'No.'+str(self.sno)+'  '+self.username


class Product(models.Model):
    sno=models.AutoField(primary_key=True)
    sellername=models.CharField(default=0,max_length=1000)
    seller=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    category=models.CharField(default=0,max_length=1000)
    title=models.CharField(default=0,max_length=1000)
    fileformat=models.CharField(default=0,max_length=1000)
    discription=models.TextField(default='')
    searchTags=models.CharField(default=0,max_length=1000)
    Price=models.CharField(default=0,max_length=1000)
    isVerified=models.BooleanField(default=False)
    isSold=models.BooleanField(default=False)
    rating=models.IntegerField(default=0)
    rated_by=models.IntegerField(default=0)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return 'No.'+str(self.sno)+'  '+self.sellername+'  Verification_Status:'+str(self.isVerified)
class ProductSample(models.Model):
    filetype=models.CharField(default=0,max_length=1000)
    samplesfile=models.FileField(upload_to='home/products', null=True, verbose_name="")
    product=models.ForeignKey(Product,default=None,on_delete=models.CASCADE)
class ProductRating(models.Model):
    product=models.ForeignKey(Product,default=None,on_delete=models.CASCADE)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    rating=models.IntegerField(default=0)

class Cart(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    username=models.CharField(default=0,max_length=1000)
    changes=models.CharField(default='No',max_length=1000)
    product=models.ForeignKey(Product,default=None,on_delete=models.CASCADE)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return 'No.'+str(self.sno)+'  '+self.username

class CustomProduct(models.Model):
    sno=models.AutoField(primary_key=True)
    name=models.CharField(default=0,max_length=1000)
    email=models.CharField(default=0,max_length=1000)
    brief=models.CharField(default=0,max_length=1000)
    budget=models.CharField(default=0,max_length=1000)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return 'No.'+str(self.sno)+'  '+self.name+' '+self.email
class MyOrder(models.Model):
    sno=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    product=models.ForeignKey(Product,default=None,on_delete=models.CASCADE)
    quantity=models.IntegerField(default=0)
    isProcessed=models.BooleanField(default=False)
    changes=models.CharField(default='No',max_length=1000)
    order_id=models.CharField(default='000',max_length=1000)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)


