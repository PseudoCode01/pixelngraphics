# Generated by Django 3.1.1 on 2020-12-17 05:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0006_auto_20201217_0547'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sellerprofile',
            name='productType',
        ),
    ]