(function() {
  function init() {
  	// Prevent multiple injections
    if (document.documentElement.dataset.BGKiller) {
      return;
    }
    var cardsView = document.getElementById('cards-view');

    // Create the BGKiller button
    var button = document.createElement('button');
    // set it as type to prevent form submit.
    button.type = 'button';
    button.textContent = '';
    // Background not working (?)
    button.style.background = 'none';
    button.style.backgroundImage = "url('icons/button.png')";
    button.style.background-repeat = 'no-repeat';
    button.style.border = 'none';
    button.style.outline = 'none';
    button.style.fontSize = '3rem';
    button.style.position = 'fixed';
    button.style.top = '50rem';
    button.style.left = '15rem';
    button.style.zIndex = '9999999';

    // Add event listener on touch
    button.addEventListener('touchstart', function(e) {
      var taskMgr = window.wrappedJSObject.appWindowManager.taskManager;
      if (taskMgr.cardsList.children.length > 0) {
        var cards = Array.from(taskMgr.cardsList.children).map(function(e) {
          return taskMgr.getCardForElement(e);
        });
        // Cycles through every app in background
        cards.forEach(function(card) {
          if (card.app.killable()) {
            card.killApp();
          }
        });
        // Return to launcher
        taskMgr.exitToApp();
      }
    }, true);

    // Event listener to prevent BGKiller button shows
    // everywhere
    window.addEventListener('cardviewshown', function() {
      var taskMgr = window.wrappedJSObject.appWindowManager.taskManager;
      // Show BGKiller only if there is at least 1 card
      button.style.display = taskMgr.cardsList.children.length === 0 ?
                                'none' : 'inline-block';
    });

    cardsView.insertBefore(button, cardsView.firstElementChild);
    document.documentElement.dataset.BGKiller = true;
  }

  // Initialize BGKiller
  window.onload = init();
  /*
  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('readystatechange',
      function readyStateChange() {
        if (document.readyState == 'interactive') {
          document.removeEventListener('readystatechange',
            readyStateChange);
          init();
        }
      });
  }*/
})();
