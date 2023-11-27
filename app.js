(function runApp() {
  const ITEM_HIDDEN = "hidden";
  const ITEM_OPEN = "open";
  const ITEM_DONE = "item-done";

  // Header section
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

  const closeMenuWhenBodyIsClicked = (e) => {
    console.log(e.target.closest(".menu") || e.target.closest(".header-buttons button") ? true : false);
    if (e.target.closest(".profile-button") || e.target.classList.contains("profile-button")) {
      toggleProfileMenu();
      console.log("Profile button");
    } else if (e.target.closest(".notificaction-button") || e.target.classList.contains("notification-button")) {
      toggleNotificationMenu();
      console.log("Notification button");
    } else if (e.target.closest(".menu")) {
      return;
    } else {
      notificationMenu.classList.remove(ITEM_OPEN);
      profileMenu.classList.remove(ITEM_OPEN);
    }

    return;

      // if (
      //   !e.target.closest(".menu") || !e.target.closest(".header-buttons button")
      // ) {
      //   notificationMenu.classList.remove(ITEM_OPEN);
      //   profileMenu.classList.remove(ITEM_OPEN);
      // }
  }

  // document.body.addEventListener("click", (e) => closeMenuWhenBodyIsClicked(e));

  notificationButton.addEventListener("click", toggleNotificationMenu);
  profileButton.addEventListener("click", toggleProfileMenu);

  // Alert section
  const alertContainer = document.querySelector("#alert-info");
  const closeAlertButton = document.querySelector("#close-alert");

  closeAlertButton.addEventListener("click", () => alertContainer.classList.add(ITEM_HIDDEN));


  // Expand and collapse setup
  const expandButton = document.querySelector("#expand-button");
  const collapseButton = document.querySelector("#collapse-button");
  const collapseSection = document.querySelector("#setup-collapse");

  const toggleCollapse = () => {
    const sectionHidden = collapseSection.classList.contains(ITEM_HIDDEN);

    if (sectionHidden) {
      collapseSection.classList.remove(ITEM_HIDDEN);
      expandButton.classList.add(ITEM_HIDDEN);
      collapseButton.classList.remove(ITEM_HIDDEN);
    }  else {
      collapseSection.classList.add(ITEM_HIDDEN);
      collapseButton.classList.add(ITEM_HIDDEN);
      expandButton.classList.remove(ITEM_HIDDEN);
    }
  }

  expandButton.addEventListener("click", toggleCollapse);
  collapseButton.addEventListener("click", toggleCollapse);


  const checkboxItem = document.querySelector(".setup-checkbox");
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