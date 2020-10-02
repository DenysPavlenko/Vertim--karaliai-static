export default function () {
  var $boxes = $('.js-drag-and-drop-box');
  // Return if $boxes don't exist
  if (!$boxes.length) { return; }

  $boxes.each(function () {
    var box = this;
    new Dropzone(box, {
      previewTemplate: document.querySelector('.drag-and-drop-box__tpl').innerHTML,
      url: "/",
      init: function () {
        this.on('addedfile', function () {
          var $box = $(this.element);
          var element = $box.find('.document-list-item');
          var wrapper = $box.find('.simplebar-content');
          wrapper.append(element);
        });
      }
    });
  });
}
