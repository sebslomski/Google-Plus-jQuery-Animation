$ ->
    $('div.box:first').addClass('selected')

    $('div#wrapper').gplusBoxHighlight()

    $('div.box').click (e) ->
        $this = $(@)
        selected = $this.parent().find('.selected')

        if selected.get(0) is @
            return

        $this.parent().append $('<div id="animation"></div>')

        position = selected.position()
        if selected.height()
            position.height = selected.height()

        $('div#animation').css position

        selected.removeClass 'selected'

        $('div#animation').animate(
          {
            left: $this.position().left,
            top: $this.position().top,
            height: $this.height()
          },
          {
              duration: 300,
              complete: ->
                  selected.removeClass 'selected'
                  $this.addClass 'selected'
                  $('div#animation').remove()
          }
        )
