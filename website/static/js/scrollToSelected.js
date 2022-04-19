document.addEventListener("DOMContentLoaded", () => {
    // Find the active nav item in the sidebar
    const item = document.getElementsByClassName("navListItemActive")[0];
    /**
     * Finds the closest element with the `navGroup` class.
     */
    const sectionHeading = item.closest(".navGroup");

    /**
     * Does nothing if the group element is not available.
     */
    if (!sectionHeading) { return; }

    const bounding = sectionHeading.getBoundingClientRect();
    if (
      bounding.top >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        /**
         * Do nothing, the group is already visible in the sidebar menu.
         */
    } else {
      /**
       * Scroll the group heading into the top of the view.
       */
      sectionHeading.scrollIntoView({block: "start", inline: "nearest"});
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  });