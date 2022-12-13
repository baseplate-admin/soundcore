from django import forms
from django.core.exceptions import ValidationError


class LoginForm(forms.Form):
    username = forms.CharField(
        label="",
        max_length=50,
        widget=forms.TextInput(attrs={"class": "input ", "placeholder": "Username"}),
    )

    password = forms.CharField(
        label="",
        min_length=8,
        max_length=1024,
        widget=forms.PasswordInput(
            attrs={"class": "input ", "placeholder": "Password"}
        ),
    )


class RegisterForm(forms.Form):
    first_name = forms.CharField(
        label="",
        min_length=3,
        max_length=50,
        widget=forms.TextInput(attrs={"class": "input", "placeholder": "First Name"}),
    )
    last_name = forms.CharField(
        label="",
        min_length=3,
        max_length=50,
        widget=forms.TextInput(attrs={"class": "input", "placeholder": "Last Name"}),
    )
    username = forms.CharField(
        label="",
        min_length=3,
        max_length=128,
        widget=forms.TextInput(attrs={"class": "input", "placeholder": "Username"}),
    )
    email = forms.EmailField(
        label="",
        min_length=5,
        max_length=200,
        widget=forms.EmailInput(attrs={"class": "input", "placeholder": "Email"}),
    )
    password_1 = forms.CharField(
        label="",
        min_length=8,
        max_length=1024,
        widget=forms.PasswordInput(attrs={"class": "input", "placeholder": "Password"}),
    )
    password_2 = forms.CharField(
        label="",
        min_length=8,
        max_length=1024,
        widget=forms.PasswordInput(
            attrs={"class": "input", "placeholder": "Confirm Password"}
        ),
    )

    def clean(self):
        cleaned_data = super().clean()
        # Checks if passwords are same
        if cleaned_data.get("password_1") != cleaned_data.get("password_1"):
            raise ValidationError("Passwords are not same")


class ForgetPasswordForm(forms.Form):
    username = forms.CharField(
        label="",
        min_length=3,
        max_length=128,
        widget=forms.TextInput(attrs={"class": "input", "placeholder": "Username"}),
    )


class ResetPasswordForm(forms.Form):
    password_1 = forms.CharField(
        label="",
        min_length=8,
        max_length=1024,
        widget=forms.PasswordInput(attrs={"class": "input", "placeholder": "Password"}),
    )
    password_2 = forms.CharField(
        label="",
        min_length=8,
        max_length=1024,
        widget=forms.PasswordInput(attrs={"class": "input", "placeholder": "Password"}),
    )
