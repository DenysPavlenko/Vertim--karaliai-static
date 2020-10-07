export default function () {
  var $boxes = $('.js-upload-documents-box');

  // Return if $boxes don't exist
  if (!$boxes.length) { return; }

  $boxes.each(function () {
    var box = this;
    // var boxLabel
    new Dropzone(box, {
      previewTemplate: box.querySelector('.upload-documents-box__tpl').innerHTML,
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
          var $box = $(this.element);
          var element = $box.find('.document-list-item');
          var wrapper = $box.find('.simplebar-content');
          wrapper.append(element);
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
