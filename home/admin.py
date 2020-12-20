from django.contrib import admin

# Register your models here.
from .models import SellerApplication,Product,ProductSample,ProductRating,SellerProfile,Cart,HomePage
admin.site.register(SellerApplication),
admin.site.register(Product),
admin.site.register(ProductSample),
admin.site.register(ProductRating),
admin.site.register(SellerProfile),
admin.site.register(Cart),
admin.site.register(HomePage),