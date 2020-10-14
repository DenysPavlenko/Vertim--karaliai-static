export default () => {
  const $manageSkills = $('.js-manage-skills');
  // Return if $manageSkills don't exist
  if (!$manageSkills.length) { return; }
  $manageSkills.each((i, elem) => {
    const $this = $(elem);
    const $createButton = $this.find('.manage-skills__create-button');
    const $form = $this.find('.manage-skills__form');
    const $formInput = $this.find('.manage-skills__form-input');
    const $formSubmit = $this.find('.manage-skills__form-submit');
    const $manageItemsWrap = $this.find('.manage-skills__items');
    const $manageItems = $this.find('.manage-skills__item');

    // Add new item
    $createButton.on('click', () => {
      $form.show();
      $formInput.trigger('focus');
      $formSubmit.on('click', () => {
        if ($formInput.val()) {
          createNewSkill($formInput.val());
          $form
            .hide()
            .val('');
        } else {
          $form.hide();
        }
      });
    });

    $manageItemsWrap.on('click', (e) => {
      const $target = $(e.target);
      const $manageItem = $target.parents('.manage-skills__item');
      if ($manageItem) {
        const $skill = $manageItem.find('.manage-skills__skill');
        const $skillTitle = $skill.find('.skill-checkbox__wrap-title');
        const $checkbox = $skill.find('input');
        const $input = $manageItem.find('.manage-skills__skill-input');
        const $edit = $manageItem.find('.manage-skills__edit');
        const $done = $manageItem.find('.manage-skills__done');
        // Stop checkbox propagation
        $checkbox.one('click', (e) => {
          e.stopPropagation();
        })
        // Show/hide edit button
        $skill.one('change', (e) => {
          e.stopPropagation();
          if ($checkbox.is(':checked')) {
            $edit.show();
          } else {
            $edit.hide();
          }
        });
        // Hide edit button and show done button. Copy value to the input. Hide skill.
        $edit.one('click', (e) => {
          e.stopPropagation();
          $edit.hide();
          $done.show();
          $skill.hide();
          $input
            .val($skillTitle.html())
            .show()
            .trigger('focus');
        });
        // Copy input value to SkillTitle. Hide done, input.
        $done.one('click', (e) => {
          e.stopPropagation();
          $done.hide();
          $skillTitle.html($input.val());
          $skill.show();
          $input.hide();
          $checkbox.prop('checked', false);
        });
      }
    });

    function createNewSkill(title) {
      const $skill = $manageItems.eq(0).clone(true, true);
      const $skillTitle = $skill.find('.skill-checkbox__wrap-title');
      $skillTitle.html(title);
      $manageItemsWrap.prepend($skill);
    }
  });
}
