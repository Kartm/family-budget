# Generated by Django 3.1 on 2022-01-20 13:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Category',
            new_name='EntryCategory',
        ),
    ]
