import editAvatarTool from './edit-avatar-tool';

export default () => {
  var $modal = $('.js-edit-avatar-modal');
  // Return if $modal doesn't exist
  if ($modal.length === 0) { return; }

  var isInitialized;
  $modal.on($.modal.OPEN, function () {
    if (!isInitialized) {
      editAvatarTool();
      isInitialized = true;
    }
  });
}
