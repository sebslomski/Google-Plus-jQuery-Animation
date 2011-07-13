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
        var $this, done, position, prefix, selected, transition, _i, _len, _ref;
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
        transition = {
          'height': "" + ($this.height()) + "px !important",
          'top': "" + ($this.position().top) + "px !important"
        };
        _ref = ['-moz-', '-webkit-', ''];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          prefix = _ref[_i];
          transition["" + prefix + "transition-property"] = 'height, top';
          transition["" + prefix + "transition-duration"] = "" + plugin.settings.duration + "s";
        }
        selected.removeClass(plugin.settings.selectedClass);
        $('#' + plugin.settings.animationId).css(transition);
        done = function() {
          $element.find('#' + plugin.settings.animationId).remove();
          $element.find('.' + plugin.settings.boxClass).removeClass(plugin.settings.selectedClass);
          return $this.addClass(plugin.settings.selectedClass);
        };
        return setTimeout(done, plugin.settings.duration * 1000);
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
