from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.conf.urls import url,include
urlpatterns = [
    path("",views.home,name="home"),
    path("contact",views.contact,name="contact"),
    path("signup",views.signup,name="signup"),
    path("signin",views.signin,name="signin"),
    path("termsofservice",views.termsofservice,name="termsofservice"),
    path("privacypolicy",views.privacypolicy,name="privacypolicy"),
    path("refundpolicy",views.refundpolicy,name="refundpolicy"),
    path("about",views.about,name="about"),
    path("ajaxsignup",views.ajaxsignup,name="ajaxsignup"),
    path("ajaxlogin",views.ajaxlogin,name="ajaxlogin"),
    path("sell",views.sell,name="sell"),
    path("signout",views.signout,name="signout"),
    path("applyforseller",views.applyforseller,name="applyforseller"),
    path("sellerProfile",views.sellerProfile,name="sellerProfile"),
    path("addProduct",views.addProduct,name="addProduct"),
    path("productDetail/<int:id>",views.productDetail,name="productDetail"),
    path("profileview/<int:id>",views.profileview,name="profileview"),
]