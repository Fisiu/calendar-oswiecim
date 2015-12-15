$(document).ready(function() {
  $('#id_image').bind('change', function() {
    var MAX_UPLOAD_SIZE = 2; // size in MB
    var fileSize = this.files[0].size;
    if(fileSize > MAX_UPLOAD_SIZE * 1024 *1024) {
      // display info - file too big + reset input
      alert('Plik za duży: ' + (this.files[0].size/1024/1024).toFixed(2) + '/' + MAX_UPLOAD_SIZE + ' MB');
      $fileInput = $('#id_image');
      $fileInput.replaceWith($fileInput = $fileInput.clone(true));
    }
  });
});
