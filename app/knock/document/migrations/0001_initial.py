# Generated by Django 4.0.4 on 2022-06-06 07:08

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'document',
            },
        ),
        migrations.CreateModel(
            name='Keyword',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=12)),
                ('left', models.IntegerField(default=0, max_length=800)),
                ('top', models.IntegerField(default=0, max_length=600)),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='keywords', to='document.document')),
                ('link_to', models.ManyToManyField(null=True, to='document.keyword')),
            ],
            options={
                'db_table': 'keyword',
            },
        ),
    ]
