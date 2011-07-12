(function() {
  $(function() {
    return $('div.box').click(function(e) {
      var $this, position, selected;
      $this = $(this);
      selected = $this.parent().find('.selected');
      if (selected.get(0) === this) {
        return;
      }
      $this.parent().append($('<div id="animation"></div>'));
      position = selected.position();
      if (selected.height()) {
        position.height = selected.height();
      }
      $('div#animation').css(position);
      selected.removeClass('selected');
      return $('div#animation').animate({
        left: $this.position().left,
        top: $this.position().top,
        height: $this.height()
      }, {
        duration: 300,
        complete: function() {
          selected.removeClass('selected');
          $this.addClass('selected');
          return $('div#animation').remove();
        }
      });
    });
  });
}).call(this);
