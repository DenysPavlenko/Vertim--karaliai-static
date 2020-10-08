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
import editAvatarBox from './modules/edit-avatar-box';

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
  editAvatarBox();
});

// On window load
$(window).on('load', () => { });
