from django.contrib import admin

# Register your models here.
from .models import SellerApplication,Product
admin.site.register(SellerApplication),
admin.site.register(Product),