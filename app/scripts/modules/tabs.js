export default function () {
  const $tabsContainers = $('.js-tabs');

  // Return if $tabsContainers doesn't exist
  if ($tabsContainers.length === 0) { return; }

  $tabsContainers.each((i, elem) => {
    const $tabsContainer = $(elem);
    const $tabs = $tabsContainer.find('.js-tabs-tab');

    $tabs.on('click', function () {
      const $tab = $(this);
      if ($tab.hasClass('is-active')) { return; }
      const tabName = $tab.attr('data-tab');
      const $content = $('[data-content="' + tabName + '"]');
      const $activeTab = $tabsContainer.find('.js-tabs-tab.is-active');
      const activeTabName = $activeTab.attr('data-tab');
      const $activeContent = $('[data-content="' + activeTabName + '"]');

      $tabs.removeClass('is-active');
      $tab.addClass('is-active');
      $activeContent.fadeOut(150, () => {
        $content.fadeIn(150);
      });
    });
  });
}
