window.addEventListener && window.addEventListener('load', function () {
    'use strict';
    var e = document.body;
    if (e.getElementsByClassName && e.querySelector && e.classList && e.getBoundingClientRect) {
        var t, n = 'replace', i = 'preview', s = 'reveal', r = document.getElementsByClassName('progressive ' + n),
            o = window.requestAnimationFrame || function (e) {
                e()
            };
        ['pageshow', 'scroll', 'resize'].forEach(function (e) {
            window.addEventListener(e, a, {passive: !0})
        }), window.MutationObserver && new MutationObserver(a).observe(e, {
            subtree: !0,
            childList: !0,
            attributes: !0
        }), c()
    }

    function a() {
        t = t || setTimeout(function () {
            t = null, c()
        }, 300)
    }

    function c() {
        r.length && o(function () {
            for (var e, t, n = window.innerHeight, i = 0; i < r.length;) 0 < (t = (e = r[i].getBoundingClientRect()).top) + e.height && n > t ? u(r[i]) : i++
        })
    }

    function u(e, t) {
        e.classList.remove(n);
        var r = e.getAttribute('data-href') || e.href, a = e.querySelector('img.' + i);
        if (r && a) {
            var c = new Image, l = e.dataset;
            l && (l.srcset && (c.srcset = l.srcset), l.sizes && (c.sizes = l.sizes)), c.onload = function () {
                r === e.href && (e.style.cursor = 'default', e.addEventListener('click', function (e) {
                    e.preventDefault()
                }));
                var t = c.classList;
                c.className = a.className, t.remove(i), t.add(s), c.alt = a.alt || '', o(function () {
                    e.insertBefore(c, a.nextSibling).addEventListener('animationend', function () {
                        e.removeChild(a), t.remove(s)
                    })
                })
            }, (t = 1 + (t || 0)) < 3 && (c.onerror = function () {
                setTimeout(function () {
                    u(e, t)
                }, 3e3 * t)
            }), c.src = r
        }
    }
}, !1);