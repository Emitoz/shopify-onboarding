(function runApp() {
  const ITEM_HIDDEN = "hidden";
  const ITEM_OPEN = "open";
  const ITEM_DONE = "item-done";

  // Header section
  const notificationButton = document.querySelector("#notification-button");
  const profileButton = document.querySelector("#profile-button");
  const notificationMenu = document.querySelector("#notification-menu");
  const profileMenu = document.querySelector("#profile-menu");

  const handleKeyNavigation = (e, index, allItems) => {
    const isLast = index === allItems.length - 1;
    const isFirst = index === 0;
    const { key } = e;
    const nextItem = allItems.item(index + 1);
    const prevItem = allItems.item(index - 1);

    if (key === "ArrowRight" || key === "ArrowDown") {
      if (isLast) {
        allItems.item(0).focus();
        return;
      }
      nextItem.focus();
    } else if (key === "ArrowLeft" || key === "ArrowUp") {
      if (isFirst) {
        allItems.item(allItems.length - 1).focus();
        return;
      }
      prevItem.focus();
    }
  }

  const closeNotificationMenu = () => {
    notificationMenu.classList.remove(ITEM_OPEN);
    notificationButton.ariaExpanded = "false";
    notificationButton.focus();
  }

  const openNotificationMenu = () => {
    notificationMenu.classList.add(ITEM_OPEN);
    profileMenu.classList.remove(ITEM_OPEN);
    notificationButton.ariaExpanded = "true";
    const allItems = notificationMenu.querySelectorAll('[role="menuitem"]');
    allItems.item(0).focus();

    allItems.forEach((item, index) => {
      item.addEventListener("keydown", (e) => handleKeyNavigation(e, index, allItems));
    });
  }
  
  const toggleNotificationMenu = () => {
    const notificationOpen = notificationMenu.classList.contains(ITEM_OPEN);
    if (notificationOpen) {
      closeNotificationMenu();
    } else {
      openNotificationMenu();
      notificationMenu.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
          closeNotificationMenu();
        }
      });
    }
  }

  const openProfileMenu = () => {
    profileMenu.classList.add(ITEM_OPEN);
    notificationMenu.classList.remove(ITEM_OPEN);
    profileButton.ariaExpanded = "true";
    const allItems = profileMenu.querySelectorAll('[role="menuitem"]');
    allItems.item(0).focus();

    allItems.forEach((item, index) => {
      item.addEventListener("keydown", (e) => handleKeyNavigation(e, index, allItems));
    });
  }

  const closeProfileMenu = () => {
    profileMenu.classList.remove(ITEM_OPEN);
    profileButton.ariaExpanded = "false";
    profileButton.focus();
  }

  const toggleProfileMenu = () => {
    const profileOpen = profileMenu.classList.contains(ITEM_OPEN);
    if (profileOpen) {
      closeProfileMenu();
    } else {
      openProfileMenu();
      profileMenu.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
          closeProfileMenu();
        }
      });
    }
  }

  notificationButton.addEventListener("click", toggleNotificationMenu);
  profileButton.addEventListener("click", toggleProfileMenu);

  // Alert section
  const alertContainer = document.querySelector("#alert-info");
  const closeAlertButton = document.querySelector("#close-alert");

  closeAlertButton.addEventListener("click", () => alertContainer.classList.add(ITEM_HIDDEN));

  // Expand and collapse setup
  const expandButton = document.querySelector("#expand-button");
  // const collapseButton = document.querySelector("#collapse-button");
  const collapseSection = document.querySelector("#setup-collapse");

  const toggleCollapse = () => {
    const sectionHidden = collapseSection.classList.contains(ITEM_HIDDEN);

    if (sectionHidden) {
      collapseSection.classList.remove(ITEM_HIDDEN);
      // expandButton.classList.add(ITEM_HIDDEN);
      // collapseButton.classList.remove(ITEM_HIDDEN);
      expandButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M14.5303 12.2803C14.2374 12.5732 13.7626 12.5732 13.4697 12.2803L10 8.81066L6.53033 12.2803C6.23744 12.5732 5.76256 12.5732 5.46967 12.2803C5.17678 11.9874 5.17678 11.5126 5.46967 11.2197L9.46967 7.21967C9.76256 6.92678 10.2374 6.92678 10.5303 7.21967L14.5303 11.2197C14.8232 11.5126 14.8232 11.9874 14.5303 12.2803Z"
            fill="#4A4A4A" />
        </svg>
      `;
    }  else {
      collapseSection.classList.add(ITEM_HIDDEN);
      expandButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5.71967 8.46967C6.01256 8.17678 6.48744 8.17678 6.78033 8.46967L10.25 11.9393L13.7197 8.46967C14.0126 8.17678 14.4874 8.17678 14.7803 8.46967C15.0732 8.76256 15.0732 9.23744 14.7803 9.53033L10.7803 13.5303C10.4874 13.8232 10.0126 13.8232 9.71967 13.5303L5.71967 9.53033C5.42678 9.23744 5.42678 8.76256 5.71967 8.46967Z"
            fill="#4A4A4A" />
        </svg>
      `;
    }
  }

  expandButton.addEventListener("click", toggleCollapse);

  // Open and close items
  const setupItems = document.querySelectorAll(".setup-item");

  function getAllSiblings(element, parent) {
    const children = [...parent.children];
    return children.filter(child => child !== element);
  }

  setupItems.forEach((ele) => {
    ele.addEventListener("click", function() {
      if (!this.classList.contains(ITEM_OPEN)) {
        this.classList.add(ITEM_OPEN);
        getAllSiblings(ele, collapseSection).forEach(el => {
          el.classList.remove(ITEM_OPEN);
        })
        return;
      }
      return;
    });
  });

  const progressText = document.querySelector("#progress-text");
  const progressBar = document.querySelector("#progress");
  let progress = 0;
  
  setupItems.forEach((ele) => {
    const checkboxItem = ele.querySelector(".setup-checkbox");
    const incompleteIcon = ele.querySelector("svg.incomplete-icon");
    const completedIcon = ele.querySelector("svg.completed-icon");
    const loadingSpinner = ele.querySelector("svg.loading-spinner");
    const buttonStatus = ele.querySelector(".item-status");
  
    const markAsDone = () => {
      incompleteIcon.classList.add(ITEM_HIDDEN);
      loadingSpinner.classList.remove(ITEM_HIDDEN);
      buttonStatus.ariaLabel = "Loading. Please wait...";
      setTimeout(() => {
        loadingSpinner.classList.add(ITEM_HIDDEN);
        completedIcon.classList.remove(ITEM_HIDDEN);
        progress++;
        progressText.innerHTML = `${progress.toString()}/5`;
        progressBar.style.width = `${(progress / 5) * 100}%`;
        if (progress === 5) {
          progressBar.style.borderRadius = "28px";
        }
      }, 1000);
      buttonStatus.ariaLabel = "Successfully marked task as done.";
      checkboxItem.ariaLabel = checkboxItem.ariaLabel.replace("as done", "as not done");
      checkboxItem.classList.add(ITEM_DONE);
    }
  
    const markAsNotDone = () => {
      completedIcon.classList.add(ITEM_HIDDEN);
      loadingSpinner.classList.remove(ITEM_HIDDEN);
      buttonStatus.ariaLabel = "Loading. Please wait...";
      setTimeout(() => {
        loadingSpinner.classList.add(ITEM_HIDDEN);
        incompleteIcon.classList.remove(ITEM_HIDDEN);
        progress--;
        progressText.innerHTML = `${progress.toString()}/5`;
        progressBar.style.width = `${(progress / 5) * 100}%`;
        progressBar.style.borderTopRightRadius = "0";
        progressBar.style.borderBottomRightRadius = "0";
      }, 1000);
      buttonStatus.ariaLabel = "Successfully marked task as not done.";
      checkboxItem.ariaLabel = checkboxItem.ariaLabel.replace("as not done", "as done");
      checkboxItem.classList.remove(ITEM_DONE);
    }
    
    const toggleStatus = () => {
      const itemIsDone = checkboxItem.classList.contains(ITEM_DONE);
  
      if (itemIsDone) {
        markAsNotDone();
      } else {
        markAsDone();
      }
    }
    
    checkboxItem.addEventListener("click", () => {
      toggleStatus()
    });
  });

})()