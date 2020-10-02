export default function () {
  var $modalAuto = $('[data-modal-auto]');
  var $modalOpen = $('[data-modal-open]');
  var $modalClose = $('[data-modal-close]');

  // Open on widnow load
  if ($modalAuto.length > 0) {
    $modalAuto.each(function () {
      var $modal = $(this);
      createScrollBar($modal);
      $modal.modal({
        closeExisting: false,
        showClose: false
      });
    });
  }

  $modalClose.on('click', function () {
    $.modal.close();
  });

  // Return if $modalOpen doesn't exist
  if ($modalOpen.length === 0) { return; }

  $modalOpen.on('click', function () {
    var $this = $(this);
    var modalName = $this.attr('data-modal-open');
    var $modal = $('[data-modal="' + modalName + '"]');
    createScrollBar($modal);
    $modal.modal({
      closeExisting: false,
      showClose: false
    });
  });

  function createScrollBar(modal) {
    var $scrollBar = modal.find('[data-modal-simplebar]');
    if ($scrollBar.length > 0) {
      setTimeout(function () {
        new SimpleBar($scrollBar[0])
      }, 0);
    }
  }
}
