(function() {
  $(function() {
    $('div.box:first').addClass('selected');
    return $('div.box').click(function(e) {
      var $this, done, duration, position, prefix, selected, transition, _i, _len, _ref;
      duration = 0.3;
      $this = $(this);
      selected = $this.parent().find('.selected');
      if (selected.get(0) === this) {
        return;
      }
      position = selected.position();
      if (selected.height()) {
        position.height = selected.height();
      }
      $('div#animation').remove();
      $this.parent().append($('<div id="animation"></div>'));
      $('div#animation').css(position);
      transition = {
        'height': "" + ($this.height()) + "px !important",
        'top': "" + ($this.position().top) + "px !important"
      };
      _ref = ['-moz-', '-webkit-', ''];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prefix = _ref[_i];
        transition["" + prefix + "transition-property"] = 'height, top';
        transition["" + prefix + "transition-duration"] = "" + duration + "s";
      }
      selected.removeClass('selected');
      $('div#animation').css(transition);
      done = function() {
        $('div#animation').remove();
        $('div.box').removeClass('selected');
        return $this.addClass('selected');
      };
      return setTimeout(done, duration * 1000);
    });
  });
}).call(this);
