let mediaQueryListener = window.matchMedia('(max-width: 767px)')

const watchMediaQueryFunction = (event) => {
    const leftMenuElement = document.getElementsByClassName('left-menu')[0]

    if (event.matches) {
        //{# Mobile Version #}
        anime({
            targets: '.left-menu',
            translateX: -500,
            duration: .001,
            easing: 'easeOutSine',
            complete: () => {
                leftMenuElement.classList.add('left-menu-hidden')
            }
        })
        anime({
            targets: '.left-menu',
            width: '0',
            duration: .0001,
            easing: 'easeOutSine',
        })
    } else if (!event.matches) {
        // {# Desktop Vesion #}
        leftMenuElement.classList.remove('left-menu-hidden')
        anime({
            targets: '.left-menu',
            translateX: 0,
            duration: .001,
            easing: 'easeOutSine',
            complete: () => {
                leftMenuElement.classList.remove('left-menu-hidden')
            }
        })
        anime({
            targets: '.left-menu',
            width: '240',
            duration: .0001,
            easing: 'easeOutSine',
        })
    }
}
// Init the Function Once
watchMediaQueryFunction(mediaQueryListener)
// Add listener
mediaQueryListener.addListener(watchMediaQueryFunction)