const resetValue = () => {
    const transparentSliderInputDiv = document.getElementById('transparent_slider')
    document.getElementById('pause_icon').classList.add('is-hidden')
    transparentSliderInputDiv.value = 0;
}

onDomLoadFunction(resetValue)
