$(document).ready(function () {

    // MODAL
    const modalText = {
        roambi: {
            title: 'Title...Nah',
            tag: 'TAG...Nah',
            detail: 'Description...Nah.',
            link: 'https://www.bing.com'
        },
        walker: {
            title: 'Title...Nah',
            tag: 'TAG...Nah',
            detail: 'Description...Nah.',
        },
        powur: {
            title: 'Title...Nah',
            tag: 'TAG...Nah',
            detail: 'Description...Nah.',
            link: 'https://www.cnn.com'
        },
        mystand: {
            title: 'Title...Nah',
            tag: 'TAG...Nah',
            detail: 'Description...Nah.',
        },
        never: {
            title: 'Title...Nah',
            tag: 'TAG...Nah',
            detail: 'Description...Nah.',
        },
        themall: {
            title: 'Title...Nah',
            tag: 'TAG...Nah',
            detail: 'Description...Nah.',
        }
    };

    $('#gallery .button').on('click', function () {
        fillModal(this.id)
        $('.modal-wrap').addClass('visible')
    })

    $('.close').on('click', function () {
        $('.modal-wrap, #modal .button').removeClass('visible')
    })

    $('.mask').on('click', function () {
        $('.modal-wrap, #modal .button').removeClass('visible')
    })



    setDimensions()

    $('#next').click(function () {
        shiftSlide(-1)
    })
    $('#prev').click(function () {
        shiftSlide(1)
    })

    let carousel;
    carousel.on('mousedown', function () {
        if (carousel.hasClass('transition')) return
        dragStart = event.pageX
        $(this).on('mousemove', function () {
            $(this).css('transform', 'translateX(' + dragPos() + 'px)')
        })
        $(document).on('mouseup', function () {
            let threshold;
            if (dragPos() > threshold) {
                return shiftSlide(1)
            }
            if (dragPos() < -threshold) {
                return shiftSlide(-1)
            }
            shiftSlide(0)
        })
    })

    function setDimensions() {
        let slideWidth;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            slideWidth = $(window).innerWidth()
        }
        $('.carousel-wrap, .slide').css('width', slideWidth)
        $('.modal').css('max-width', slideWidth)
        $('#carousel').css('left', slideWidth * -1)
    }

    function dragPos() {
        return dragEnd - dragStart
    }

    function shiftSlide(direction) {
        if (carousel.hasClass('transition')) return
        dragEnd = dragStart
        $(document).off('mouseup')
        carousel.off('mousemove')
            .addClass('transition')
            .css('transform', 'translateX(' + (direction * slideWidth) + 'px)')
        setTimeout(function () {
            if (direction === 1) {
                $('.slide:first').before($('.slide:last'))
            } else if (direction === -1) {
                $('.slide:last').after($('.slide:first'))
            }
            carousel.removeClass('transition')
            carousel.css('transform', 'translateX(0px)')
        }, 700)
    }

    function fillModal(id) {
        $('#modal .title').text(modalText[id].title)
        $('#modal .detail').text(modalText[id].detail)
        $('#modal .tag').text(modalText[id].tag)
        if (modalText[id].link) $('#modal .button').addClass('visible')
            .parent()
            .attr('href', modalText[id].link)

        $.each($('#modal li'), function (index) {
            $(this).text(modalText[id].bullets[index])
        })
        $.each($('#modal .slide'), function (index) {
            $(this).css({
                background: 'url(\'img/slides/' + id + '-' + index + '.jpg\') center center/cover',
                backgroundSize: 'cover'
            })

        })
    }
})