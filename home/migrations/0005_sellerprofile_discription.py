# Generated by Django 3.1.1 on 2020-12-17 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_product_issold'),
    ]

    operations = [
        migrations.AddField(
            model_name='sellerprofile',
            name='discription',
            field=models.CharField(default='Graphic Designer', max_length=500),
        ),
    ]