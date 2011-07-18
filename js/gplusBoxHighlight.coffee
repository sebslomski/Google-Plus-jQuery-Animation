$ = jQuery

$.gplusBoxHighlight = (element, options) ->

    defaults =
        duration: 0.3
        boxClass: 'box'
        animationId: 'animation'
        selectedClass: 'selected'

    plugin = @

    plugin.settings = {}

    $element = $(element)
    element = element

    plugin.init = ->

        plugin.settings = $.extend({}, defaults, options)

        $element.find('.' + plugin.settings.boxClass).click (e) ->
            $this = $(@)
            selected = $element.find('.' + plugin.settings.selectedClass)

            if selected.get(0) is @
                return

            position = selected.position()
            # Don't click so fast
            if selected.height()
                position.height = selected.height()

            $('#' + plugin.settings.animationId).remove()
            $this.parent().append $("<div id='#{plugin.settings.animationId}'></div>")
            $('#' + plugin.settings.animationId).css(position)

            $('#' + plugin.settings.animationId).animate(
                {
                    left: $this.position().left,
                    top: $this.position().top,
                    height: $this.height()
                }, {
                    duration: plugin.settings.duration * 1000
                    complete: ->
                        $element.find('.' + plugin.settings.boxClass).removeClass(plugin.settings.selectedClass)
                        $this.addClass(plugin.settings.selectedClass)
                        $element.find('#' + plugin.settings.animationId).remove()
                }
            )


    plugin.init()


$.fn.gplusBoxHighlight = (options) ->
    @each(->
        if not $(@).data('gplusBoxHighlight')?
            plugin = new $.gplusBoxHighlight(@, options)
            $(@).data('gplusBoxHighlight', plugin)
    )
