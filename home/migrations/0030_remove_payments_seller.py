# Generated by Django 3.1.4 on 2021-01-18 09:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0029_payments'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payments',
            name='seller',
        ),
    ]