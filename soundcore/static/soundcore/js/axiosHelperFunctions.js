const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

const axiosGetVolumeDataAndMapToVolume = async (url) => {
    const updateVolumeSlider = async (volume) => {
        const setGlobalVolume = async (input) => {
            Howler.volume(input / 100)
        }

        const volumeSliderElement = document.querySelector('.volume_slider')
        const volumeProgressElement = document.querySelector('.volume_progress')

        volumeProgressElement.value = volume
        volumeSliderElement.value = volume

        await setGlobalVolume(volume)
    }

    const res = await axios.get(url)
    // Try..Catch to set the Volume.
    // If theres no user. The volume will be automatically set to 100.
    try {
        const data = JSON.parse(res.data)
        const dataField = _.map(data, 'fields')
        const volumeField = _.map(dataField, "volume")
        await updateVolumeSlider(volumeField)
    } catch (e) {
        await updateVolumeSlider(100)
    }
}
const axiosPostVolumeData = async (url, volume) => {
    const config = {
        headers: {
            'X-CSRFToken': csrftoken
        }
    }
    await axios.post(url, volume, config).catch(e => {
        console.log(`Cant post volume:${volume} to Url:${url}`)
    })
}
const axiosGetRandomSong = async (url) => {
    const config = {
        headers: {
            'X-CSRFToken': csrftoken
        }
    }

    const res = await axios.post(url, {}, config).catch(e => {
        console.log(`Cant get random song from ${url}`)
    })
    await howlerJsPlay((_.first(JSON.parse(res.data)).pk))
}
const axiosPostPreviousSong = async (url, id) => {
    const config = {
        headers: {
            'X-CSRFToken': csrftoken
        }
    }

    await axios.post(url, JSON.stringify({pk: id}), config).catch(e => {
        console.log(`Cant Post Song:${id} to ${url}`)
    })
}
const axiosGetPreviousSong = async (url) => {
    const res = await axios.get(url).catch(e => {
        console.log("No Previous Song.")
    })
    const jsonData = _.first(JSON.parse(res.data)).fields
    await howlerJsPlay(jsonData.previous_song)
}

const axiosGetLastSong = async (url) => {
    const res = await axios.get(url)
    const jsonData = _.first(JSON.parse(res.data)).fields

    await howlerJsPlay(parseInt(jsonData.last_song))

    // Revert the changes made by HowlerJS
    document.getElementById('play_icon').classList.remove('is-hidden')
    document.getElementById('pause_icon').classList.add('is-hidden')

    await handleSliderInputChange(100 * parseFloat(jsonData.timestamp) / parseFloat(jsonData.song_duration))

    const sliderElement = document.querySelector('#transparent_slider')
    const preInputElement = document.querySelector('.pre_input')


    preInputElement.innerText = formatTime(parseFloat(jsonData.timestamp))
    sliderElement.value = 100 * parseFloat(jsonData.timestamp) / parseFloat(jsonData.song_duration)
}

const axiosPostLastSong = async (url, songId, timestamp, songDuration) => {
    const config = {
        headers: {
            'X-CSRFToken': csrftoken
        }
    }

    await axios.post(url, JSON.stringify({
        song: songId,
        timestamp: timestamp,
        song_duration: songDuration
    }), config).catch(e => {
        console.log(`Cant Post to: ${url}`)
    })
}