const updateFooterBoilerPlate = async (id) => {
    const previousSongImage = `song-image-${id}`
    const previousSongName = `song-name-${id}`
    const previousSongArtist = `song-artist-${id}`
    const previousSongSampleRate = `song-sample-rate-${id}`

    const previousSongImageDiv = document.getElementById(previousSongImage)
    const previousSongNameDiv = document.getElementById(previousSongName)
    const previousSongArtistDiv = document.getElementById(previousSongArtist)
    const previousSongSampleRateDiv = document.getElementById(previousSongSampleRate)

    const newSongImage = 'footer-song-image'
    const newSongName = 'footer-song-name'
    const newSongArtist = 'footer-song-artist'
    const newSongSampleRate = 'footer-song-sample-rate'

    const newSongImageDiv = document.getElementById(newSongImage)
    const newSongNameDiv = document.getElementById(newSongName)
    const newSongArtistDiv = document.getElementById(newSongArtist)
    const newSongSampleRateDiv = document.getElementById(newSongSampleRate)

    if (previousSongImageDiv) {
        newSongImageDiv.src = previousSongImageDiv.href
    } else {
        newSongImageDiv.src = 'https://bulma.io/images/placeholders/128x128.png'
    }

    newSongNameDiv.innerText = previousSongNameDiv.innerText
    newSongArtistDiv.innerText = previousSongArtistDiv.innerText
    newSongSampleRateDiv.innerText = `${previousSongSampleRateDiv.innerText} KHz`
}
const updateFooterControl = () => {
    sound = _.first(howlerArray)
    let seekDuration = sound.seek();

    const preInputElement = document.querySelector('.pre_input')
    const sliderElement = document.querySelector('#slider_progress')
    const progressElement = document.querySelector('#transparent_slider')
    const convertDurationToHundred = (100 * seekDuration) / sound.duration()

    sliderElement.value = convertDurationToHundred
    progressElement.value = convertDurationToHundred
    preInputElement.innerText = formatTime(seekDuration)
}