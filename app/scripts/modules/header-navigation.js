export default () => {
  var $navigation = $('.js-header-navigation');
  var $burger = $('.js-header-navigation-burger');

  // Return if $burger doesn't exist
  if (!$burger.length) { return; }

  $burger.on('click', (e) => {
    var $this = $(e.currentTarget);
    $this.toggleClass('is-active');
    $navigation.toggleClass('is-active');
  });
}
