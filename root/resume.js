window.addEventListener('load', function() {
  function toggleSelected(element) {
    element.classList.toggle('selected');
  }

  function showAllElementsInList(list, show) {
    for (var i = 0; i < list.length; i++) {
      console.log('show');
    }
  }

  var toggleButtons = document.querySelectorAll('button.toggle');
  for (var i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].addEventListener('click', function(event) {
      toggleSelected(event.currentTarget);
    });
  }

  var categoryButtons = document.querySelectorAll('.buttons button[class*="category-"]');
  for (var i = 0; i < categoryButtons.length; i++) {
    var btn = categoryButtons[i];
    if (btn.classList.contains('category-all')) {
      btn.addEventListener('click', function() {
        showAllElementsInList(document.querySelectorAll('#side-projects .project'), true);

        for (var i = 0; i < categoryButtons.length; i++) {
          var btn = categoryButtons[i];
          if (btn.classList.contains('category-all')) {
            continue;
          }
          btn.classList.remove('selected');
        }
      });
    } else {
      btn.addEventListener('click', function() {
        var allButton = document.querySelector('.buttons .category-all');
        allButton.classList.remove('selected');
        showAllElementsInList(document.querySelectorAll('#side-projects .
      });
    }
  }
});

