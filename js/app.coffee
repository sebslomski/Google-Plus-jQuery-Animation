$ ->
    $('div.box:first').addClass('selected')

    $('div.box').click (e) ->
        # duration in seconds
        duration = 0.3

        $this = $(@)
        selected = $this.parent().find('.selected')

        if selected.get(0) is @
            return

        position = selected.position()
        # Don't click so fast
        if selected.height()
            position.height = selected.height()

        $('div#animation').remove()
        $this.parent().append $('<div id="animation"></div>')
        $('div#animation').css(position)

        transition =
            'height': "#{$this.height()}px !important"
            'top': "#{$this.position().top}px !important"

        for prefix in ['-moz-', '-webkit-', '']
            transition["#{prefix}transition-property"] = 'height, top'
            transition["#{prefix}transition-duration"] = "#{duration}s"

        selected.removeClass('selected')
        $('div#animation').css(transition)

        done = ->
            $('div#animation').remove()
            # When you click faster than the duration, several boxes might be selected
            $('div.box').removeClass('selected')
            $this.addClass('selected')

        setTimeout(done, duration*1000)
