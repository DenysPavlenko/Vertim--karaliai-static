export default function () {
  const $boxes = $('.js-upload-documents-box');

  // Return if $boxes don't exist
  if (!$boxes.length) { return; }

  $boxes.each((i, elem) => {
    const $box = $(elem);
    const $boxParent = $box.parents('.upload-documents');
    const $downloadButton = $boxParent.find('.upload-documents__header-button button');
    const $emptyText = $boxParent.find('.upload-documents__header-empty');

    new Dropzone($box[0], {
      previewTemplate: $box.find('.upload-documents-box__tpl').html(),
      url: "/",
      uploadprogress: (file, progress) => {
        var $document = $(file.previewElement);
        $document.find('[data-dz-uploadprogress]').css({
          width: progress + 'px',
          opacity: 1 - progress / 100
        });
      },
      init: function () {
        this.on('addedfile', () => {
          var element = $box.find('.document-list-item');
          var wrapper = $box.find('.simplebar-content');
          wrapper.append(element);
          if (this.files.length > 0) {
            $downloadButton.removeClass('button--disabled');
            $emptyText.hide();
          }
        });
        this.on('removedfile', () => {
          if (this.files.length <= 0) {
            $downloadButton.addClass('button--disabled');
            $emptyText.show();
          }
        });
      },
      dragenter: (props) => {
        var $srcElement = $(props.srcElement);
        if ($srcElement.hasClass('upload-documents-box__label')) {
          $srcElement.addClass('is-focused');
        }
      },
      dragleave: (props) => {
        var $srcElement = $(props.srcElement);
        if ($srcElement.hasClass('upload-documents-box__label')) {
          $srcElement.removeClass('is-focused');
        }
      },
      drop: (props) => {
        var $srcElement = $(props.srcElement);
        if ($srcElement.hasClass('upload-documents-box__label')) {
          $srcElement.removeClass('is-focused');
        }
      }
    });
  });
}
