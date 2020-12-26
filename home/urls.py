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
    path("cart",views.cart,name="cart"),
    path("addtoCart",views.AddtoCart,name="addtoCart"),
    path("removeCart",views.removeCart,name="removeCart"),
    path("editProfile",views.editProfile,name="editProfile"),
    path("customlogo",views.customlogo,name="customlogo"),
    path("addcustom",views.addcustom,name="addcustom"),
    path("filters",views.filters,name="filters"),
    path("search",views.search,name="search"),
    path("getprice",views.getprice,name="getprice"),
    path("additems",views.additems,name="additems"),
    path("myProfile",views.myProfile,name="myProfile"),
]