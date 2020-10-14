'use strict';
// Modules
import select from './modules/select';
import inputAnimation from './modules/input-animation';
import scrollUp from './modules/scroll-up';
import radioToggleContent from './modules/radio-toggle-content';
import modal from './modules/modal';
import datepicker from './modules/datepicker';
import dropdown from './modules/dropdown';
import tabs from './modules/tabs';
import uploadDocumentsBox from './modules/upload-documents-box';
import headerNavigation from './modules/header-navigation';
import inputRange from './modules/input-range';
import editAvatarModal from './modules/edit-avatar-modal';
import editableText from './modules/editable-text';
import contentToggle from './modules/content-toggle';
import catalogFilters from './modules/catalog-filters';
import manageSkills from './modules/manage-skills';
import suspendButtons from './modules/suspend-buttons';

// On document ready
$(() => {
  svg4everybody();
  select();
  inputAnimation();
  scrollUp();
  radioToggleContent();
  modal();
  datepicker();
  dropdown();
  tabs();
  uploadDocumentsBox();
  headerNavigation();
  inputRange();
  editAvatarModal();
  editableText();
  contentToggle();
  catalogFilters();
  manageSkills();
  suspendButtons();
});

// On window load
$(window).on('load', () => { });
