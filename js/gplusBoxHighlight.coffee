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

            transition =
                'height': "#{$this.height()}px !important"
                'top': "#{$this.position().top}px !important"

            for prefix in ['-moz-', '-webkit-', '']
                transition["#{prefix}transition-property"] = 'height, top'
                transition["#{prefix}transition-duration"] = "#{plugin.settings.duration}s"

            selected.removeClass(plugin.settings.selectedClass)
            $('#' + plugin.settings.animationId).css(transition)

            done = ->
                $element.find('#' + plugin.settings.animationId).remove()
                # When you click faster than the duration, several boxes might be selected
                $element.find('.' + plugin.settings.boxClass).removeClass(plugin.settings.selectedClass)
                $this.addClass(plugin.settings.selectedClass)

            setTimeout(done, plugin.settings.duration*1000)


    plugin.init()


$.fn.gplusBoxHighlight = (options) ->
    @each(->
        if not $(@).data('gplusBoxHighlight')?
            plugin = new $.gplusBoxHighlight(@, options)
            $(@).data('gplusBoxHighlight', plugin)
    )
