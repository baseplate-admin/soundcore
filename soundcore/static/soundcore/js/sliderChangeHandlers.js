const handleSliderInputChange = async (value) => {
    try {
        const sliderProgressBar = document.getElementById('slider_progress')
        sliderProgressBar.value = value
        sound = _.first(howlerArray)
        const duration = (sound.duration() * sliderProgressBar.value) / 100
        sound.seek(duration)
        updateFooterControl()
    } catch (e) {
    }
}
