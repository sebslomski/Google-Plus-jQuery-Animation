(function() {
  var $;
  $ = jQuery;
  $.gplusBoxHighlight = function(element, options) {
    var $element, defaults, plugin;
    defaults = {
      duration: 0.3,
      boxClass: 'box',
      animationId: 'animation',
      selectedClass: 'selected'
    };
    plugin = this;
    plugin.settings = {};
    $element = $(element);
    element = element;
    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      return $element.find('.' + plugin.settings.boxClass).click(function(e) {
        var $this, position, selected;
        $this = $(this);
        selected = $element.find('.' + plugin.settings.selectedClass);
        if (selected.get(0) === this) {
          return;
        }
        position = selected.position();
        if (selected.height()) {
          position.height = selected.height();
        }
        $('#' + plugin.settings.animationId).remove();
        $this.parent().append($("<div id='" + plugin.settings.animationId + "'></div>"));
        $('#' + plugin.settings.animationId).css(position);
        return $('#' + plugin.settings.animationId).animate({
          left: $this.position().left,
          top: $this.position().top,
          height: $this.height()
        }, {
          duration: plugin.settings.duration * 1000,
          complete: function() {
            selected.removeClass(plugin.settings.selectedClass);
            $this.addClass(plugin.settings.selectedClass);
            $element.find('#' + plugin.settings.animationId).remove();
            return $element.find('.' + plugin.settings.boxClass).removeClass(plugin.settings.selectedClass);
          }
        });
      });
    };
    return plugin.init();
  };
  $.fn.gplusBoxHighlight = function(options) {
    return this.each(function() {
      var plugin;
      if (!($(this).data('gplusBoxHighlight') != null)) {
        plugin = new $.gplusBoxHighlight(this, options);
        return $(this).data('gplusBoxHighlight', plugin);
      }
    });
  };
}).call(this);
