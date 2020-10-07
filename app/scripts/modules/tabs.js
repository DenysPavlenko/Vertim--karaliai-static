export default function () {
  var $tabsContainers = $('.js-tabs');

  // Return if $tabsContainers doesn't exist
  if ($tabsContainers.length === 0) { return; }

  $tabsContainers.each(function () {
    var $tabsContainer = $(this);
    var $tabs = $tabsContainer.find('.js-tabs-tab');

    $tabs.on('click', function () {
      var $tab = $(this);
      if ($tab.hasClass('is-active')) { return; }
      var tabName = $tab.attr('data-tab');
      var $content = $('[data-content="' + tabName + '"]');
      var $activeTab = $tabsContainer.find('.js-tabs-tab.is-active');
      var activeTabName = $activeTab.attr('data-tab');
      var $activeContent = $('[data-content="' + activeTabName + '"]');

      $tabs.removeClass('is-active');
      $tab.addClass('is-active');
      $activeContent.fadeOut(150, function () {
        $content.fadeIn(150);
      });
    });
  });
}
