window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }

    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
      // 更換Logo - 2021/09/19
      $("#cs_logo").attr("src", "~/../assets/img/logo_white.png");
      $(".language-sep").removeAttr("style");

      // 社群按鈕
      $(".sc-7dvmpp-1").parent().css("margin-bottom", "0rem");
      $(".sc-7dvmpp-1").parent().css("transition", ".7s");

      // Top Button
      $(".js-top").removeClass("active");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
      // 更換Logo - 2021/09/19
      $("#cs_logo").attr("src", "~/../assets/img/logo_gold.png");
      $(".language-sep").attr("style", "color:#6c757d");

      // 社群按鈕
      $(".sc-7dvmpp-1").parent().css("margin-bottom", "3.5rem");
      $(".sc-7dvmpp-1").parent().css("transition", ".7s");

      // Top Button
      $(".js-top").addClass("active");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  $("body").scrollspy({ target: "#mainNav" });

  // const mainNav = document.body.querySelector('#mainNav');
  // if (mainNav) {
  //     new bootstrap.ScrollSpy(document.body, {
  //         target: '#mainNav',
  //         offset: 74,
  //     });
  // }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  // Activate SimpleLightbox plugin for portfolio items
  // new SimpleLightbox({
  //     elements: '#portfolio a.portfolio-box'
  // });
});

// 偵測網頁寬度 2021/09/21
window.addEventListener("load", function (event) {
  if (document.body.clientWidth <= 875) {
    $(".navbar-brand").css("display", "none");
  } else {
    $(".navbar-brand").css("display", "block");
  }
});

window.addEventListener("resize", function (event) {
  if (document.body.clientWidth <= 875) {
    $(".navbar-brand").css("display", "none");
  } else {
    $(".navbar-brand").css("display", "block");
  }
});
