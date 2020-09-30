export default function (media, callback) {
  var jsMediaQuery = window.matchMedia(media);
  jsMediaQuery.addListener(callback);
  callback(jsMediaQuery);
}
