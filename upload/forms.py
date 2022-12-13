from django import forms


# Create Your Forms here
class FileFieldForm(forms.Form):
    file_field = forms.FileField(
        label="",
        widget=forms.ClearableFileInput(
            attrs={"multiple": True, "class": "file-input", "id": "file_input"}
        ),
    )
