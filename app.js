(function runApp() {
  const ITEM_HIDDEN = "hidden";
  const ITEM_OPEN = "open";
  const ITEM_DONE = "item-done";

  // Header
  const notificationButton = document.querySelector("#notification-button");
  const profileButton = document.querySelector("#profile-button");
  const notificationMenu = document.querySelector("#notification-menu");
  const profileMenu = document.querySelector("#profile-menu");

  const toggleNotificationMenu = () => {
    const notificationOpen = notificationMenu.classList.contains(ITEM_OPEN);
    if (notificationOpen) {
      notificationMenu.classList.remove(ITEM_OPEN);
    } else {
      notificationMenu.classList.add(ITEM_OPEN);
      profileMenu.classList.remove(ITEM_OPEN);
    }
  }

  const toggleProfileMenu = () => {
    const profileOpen = profileMenu.classList.contains(ITEM_OPEN);
    if (profileOpen) {
      profileMenu.classList.remove(ITEM_OPEN);
    } else {
      profileMenu.classList.add(ITEM_OPEN);
      notificationMenu.classList.remove(ITEM_OPEN);
    }
  }

  notificationButton.addEventListener("click", toggleNotificationMenu);
  profileButton.addEventListener("click", toggleProfileMenu);

  const checkboxItem = document.querySelector(".shopping-checkbox");
  const incompleteIcon = document.querySelector("svg.incomplete-icon");
  const completedIcon = document.querySelector("svg.completed-icon");
  const loadingSpinner = document.querySelector("svg.loading-spinner");
  const buttonStatus = document.querySelector(".item-status");

  function markAsDone () {
    incompleteIcon.classList.add(ITEM_HIDDEN);
    loadingSpinner.classList.remove(ITEM_HIDDEN);
    buttonStatus.ariaLabel = "Loading. Please wait...";
    setTimeout(() => {
      loadingSpinner.classList.add(ITEM_HIDDEN);
      completedIcon.classList.remove(ITEM_HIDDEN);
    }, 2000);
    buttonStatus.ariaLabel = "Successfully marked task as done.";
    checkboxItem.ariaLabel = checkboxItem.ariaLabel.replace("as done", "as not done");
    checkboxItem.classList.add(ITEM_DONE);
  }

  function markAsNotDone () {
    completedIcon.classList.add(ITEM_HIDDEN);
    loadingSpinner.classList.remove(ITEM_HIDDEN);
    buttonStatus.ariaLabel = "Loading. Please wait...";
    setTimeout(() => {
      loadingSpinner.classList.add(ITEM_HIDDEN);
      incompleteIcon.classList.remove(ITEM_HIDDEN);
    }, 2000);
    buttonStatus.ariaLabel = "Successfully marked task as not done.";
    checkboxItem.ariaLabel = checkboxItem.ariaLabel.replace("as not done", "as done");
    checkboxItem.classList.remove(ITEM_DONE);
  }
  
  function toggleStatus () {
    const itemIsDone = checkboxItem.classList.contains(ITEM_DONE);

    if (itemIsDone) {
      markAsNotDone();
    } else {
      markAsDone();
    }
  }

  checkboxItem.addEventListener("click", toggleStatus);
})()