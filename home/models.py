from django.db import models
from django.contrib.auth.models import User

# Create your models here.
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
class Product(models.Model):
    sno=models.AutoField(primary_key=True)
    sellername=models.CharField(default=0,max_length=1000)
    seller=models.ForeignKey(User,default=None,on_delete=models.CASCADE)
    category=models.CharField(default=0,max_length=1000)
    product=models.FileField(upload_to='home/products', null=True, verbose_name="")
    title=models.CharField(default=0,max_length=1000)
    fileformat=models.CharField(default=0,max_length=1000)
    discription=models.CharField(default=0,max_length=1000)
    searchTags=models.CharField(default=0,max_length=1000)
    Price=models.CharField(default=0,max_length=1000)
    isVerified=models.BooleanField(default=False)
    timeStamp=models.DateTimeField(auto_now_add=True,blank=True)

    def __str__(self):
        return self.sellername+'  Verification_Status:'+str(self.isVerified)
