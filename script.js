var is_dragging = null;
var list = document.getElementById('list');
var new_element_text = "1";
var border_style = 'solid 2px red';

list.addEventListener('click', function (e) {
  if (e.target && e.target.nodeName == "BUTTON") {
    e.target.parentNode.remove();
  }
});

document.addEventListener('dragstart', function (event) {
  var target = getLI(event.target);
  is_dragging = target;
});

document.addEventListener('dragover', function (event) {
  event.preventDefault();
  var target = getLI(event.target);
  var bounding = target.getBoundingClientRect();
  var offset = bounding.y + (bounding.height / 2);
  if (event.clientY - offset > 0) {
    target.style['border-top'] = '';
    target.style['border-bottom'] = border_style;
  } else {
    target.style['border-top'] = border_style;
    target.style['border-bottom'] = '';
  }
});

document.addEventListener('dragleave', function (event) {
  var target = getLI(event.target);
  target.style['border-bottom'] = '';
  target.style['border-top'] = '';
});

document.addEventListener('drop', function (event) {
  event.preventDefault();
  var target = getLI(event.target);
  if (target.style['border-bottom'] !== '') {
    target.style['border-bottom'] = '';
    target.parentNode.insertBefore(is_dragging, event.target.nextSibling);
  } else {
    target.style['border-top'] = '';
    target.parentNode.insertBefore(is_dragging, event.target);
  }
});
function getLI(target) {

  while (target.nodeName != 'LI' && target.nodeName != 'BODY') target = target.parentNode;
  if (target.nodeName == 'BODY') return false;
  return target;
}