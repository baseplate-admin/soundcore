/*
    left-menu-hidden = Sidebar is hidden
    !left-menu-hidden = Sidebar is shown

*/
const hamburgerElement = document.querySelector('.hamburger_icon ')

hamburgerElement.addEventListener('click', () => {
    const leftMenuElement = document.getElementsByClassName('left-menu')[0]
    /*
        This statement checks if classlist contains Left-Menu-Hidden.
        Then if it doesn't have the class.
        AnimeJS resizes the Menu to previous Size and removes the left-menu-hidden.
    */
    // {# Open #}
    if (leftMenuElement.classList.contains('left-menu-hidden')) {
        anime({
            targets: '.left-menu',
            translateX: 0,
            duration: 500,
            easing: 'easeOutSine',
            complete: () => {
                leftMenuElement.classList.remove('left-menu-hidden')
            }
        })
        anime({
            targets: '.left-menu',
            width: '240',
            duration: 400,
            easing: 'easeOutSine',
        })

    }
        /*
            This statement checks if classlist contains Left-Menu-Hidden.
            This it does have the class.
            AnimeJS removes the left menu and adds the class in a callback.
        */
    // {# Close #}
    else if (!leftMenuElement.classList.contains('left-menu-hidden')) {
        anime({
            targets: '.left-menu',
            translateX: -500,
            duration: 500,
            easing: 'easeOutSine',
            complete: () => {
                leftMenuElement.classList.add('left-menu-hidden')
            }
        })
        anime({
            targets: '.left-menu',
            width: '0',
            duration: 400,
            easing: 'easeOutSine',
        })
    }
})