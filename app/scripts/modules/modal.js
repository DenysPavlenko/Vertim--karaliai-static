export default function () {
  const $modalAuto = $('[data-modal-auto]');
  const $modalOpen = $('[data-modal-open]');
  const $modalClose = $('[data-modal-close]');

  // Open on widnow load
  if ($modalAuto.length > 0) {
    $modalAuto.each((elem) => {
      const $modal = $(elem);
      createScrollBar($modal);
      $modal.modal({
        closeExisting: false,
        showClose: false
      });
    });
  }

  $modalClose.on('click', () => {
    $.modal.close();
  });

  // Return if $modalOpen doesn't exist
  if ($modalOpen.length === 0) { return; }

  $modalOpen.on('click', function () {
    const $this = $(this);
    const modalName = $this.attr('data-modal-open');
    const $modal = $(`[data-modal="${modalName}"]`);
    createScrollBar($modal);
    $modal.modal({
      closeExisting: false,
      showClose: false
    });
  });

  function createScrollBar(modal) {
    const $scrollBar = modal.find('[data-modal-simplebar]');
    if ($scrollBar.length > 0) {
      setTimeout(() => {
        new SimpleBar($scrollBar[0])
      }, 0);
    }
  }
}
