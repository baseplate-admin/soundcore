// TippyJS Powering Soundcore.
const calcSliderPos = (e) => {
    return (e.offsetX / e.target.clientWidth) * parseInt(e.target.getAttribute('max'), 10);
}

const mainProgressTippy = async (sound) => {
    // Gets called by an callback from howler.on('load')
    const sliderTippyElement = document.querySelector('#transparent_slider')
    tippy(sliderTippyElement, {
        theme: 'material',
        followCursor: 'horizontal',
        animateFill: true,

    })

    sliderTippyElement.addEventListener('mousemove', (e) => {
        let valueHover = calcSliderPos(e).toFixed(2);
        const math = sound.duration() / 100 * valueHover
        sliderTippyElement._tippy.setContent(formatTime(math))
    });
}

const volumeTippy = () => {
    const volumeSliderTippyElement = document.querySelector('.volume_slider')
    tippy(volumeSliderTippyElement, {
        theme: 'material',
        followCursor: 'horizontal',
        animateFill: true,
    })
    volumeSliderTippyElement.addEventListener('mousemove', (e) => {
        let valueHover = calcSliderPos(e).toFixed(2);
        volumeSliderTippyElement._tippy.setContent(parseInt(valueHover))
    });
}
const playPauseTippy = () => {

    const playPauseTippyElement = document.querySelector('.play_pause_wrapper')
    tippy(playPauseTippyElement, {
        theme: 'material',
        interactive: true,
        animateFill: true,
        offset: [0, -10],
        arrow: true,
    })
    playPauseTippyElement.addEventListener('mouseover', () => {
        if (sound.playing()) {
            playPauseTippyElement._tippy.setContent('Pause')
        } else if (!sound.playing()) {
            playPauseTippyElement._tippy.setContent('Play')

        }
    })
}
const previousTippy = () => {

    const previousTippyElement = document.querySelector('.previous_song_wrapper ')
    tippy(previousTippyElement, {
        theme: 'material',
        interactive: true,
        animateFill: true,
        offset: [0, -10],
        arrow: true,
    })
    previousTippyElement.addEventListener('mouseover', () => {
        previousTippyElement._tippy.setContent('Previous Song')
    })
}
const nextTippy = () => {

    const nextTippyElement = document.querySelector('.next_song_wrapper')
    tippy(nextTippyElement, {
        theme: 'material',
        interactive: true,
        animateFill: true,
        offset: [0, -10],
        arrow: true,
    })
    nextTippyElement.addEventListener('mouseover', () => {
        nextTippyElement._tippy.setContent("Next Song")
    })
}

const handleTippyDropdownClick = (id) => {
    let isHidden = false;
    const dropdownElement = document.querySelector(`.dropdown-icon-wrapper-${id}`)
    tippy(dropdownElement, {
        arrow: true,
        animateFill: true,
        content: '<strong>Bolded content</strong>',
        allowHTML: true,
    })
    dropdownElement.addEventListener('click',()=>{
        if (isHidden){

        } else if (!isHidden){

        }
    })
}

onDomLoadFunction(previousTippy)
onDomLoadFunction(nextTippy)
onDomLoadFunction(volumeTippy)
onDomLoadFunction(playPauseTippy)
