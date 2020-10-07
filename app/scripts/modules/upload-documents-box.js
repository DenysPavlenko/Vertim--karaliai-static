export default function () {
  var $boxes = $('.js-upload-documents-box');

  // Return if $boxes don't exist
  if (!$boxes.length) { return; }

  $boxes.each(function () {
    var $box = $(this);
    var $boxParent = $box.parents('.upload-documents');
    var $downloadButton = $boxParent.find('.upload-documents__header-button button');
    var $emptyText = $boxParent.find('.upload-documents__header-empty');

    new Dropzone($box[0], {
      previewTemplate: $box.find('.upload-documents-box__tpl').html(),
      url: "/",
      uploadprogress: function (file, progress) {
        var $document = $(file.previewElement);
        $document.find('[data-dz-uploadprogress]').css({
          width: progress + 'px',
          opacity: 1 - progress / 100
        });
      },
      init: function () {
        this.on('addedfile', function () {
          var element = $box.find('.document-list-item');
          var wrapper = $box.find('.simplebar-content');
          wrapper.append(element);
          if (this.files.length > 0) {
            $downloadButton.removeClass('button--disabled');
            $emptyText.hide();
          }
        });
        this.on('removedfile', function (e) {
          if (this.files.length <= 0) {
            $downloadButton.addClass('button--disabled');
            $emptyText.show();
          }
        });
      },
      dragenter: function (props) {
        var $srcElement = $(props.srcElement);
        if ($srcElement.hasClass('upload-documents-box__label')) {
          $srcElement.addClass('is-focused');
        }
      },
      dragleave: function (props) {
        var $srcElement = $(props.srcElement);
        if ($srcElement.hasClass('upload-documents-box__label')) {
          $srcElement.removeClass('is-focused');
        }
      },
      drop: function (props) {
        var $srcElement = $(props.srcElement);
        if ($srcElement.hasClass('upload-documents-box__label')) {
          $srcElement.removeClass('is-focused');
        }
      }
    });
  });
}
