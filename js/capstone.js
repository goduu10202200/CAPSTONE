// Get URL Language 2021/10/11
function _GetUrlLanguage() {
  let ReturnData = "cn";
  // 測試階段 -> 預設中文
  // let LanguageSplit = location.href.split("#");
  // if (LanguageSplit.length > 1) {
  //   switch (LanguageSplit[1]) {
  //     case "ln=cn":
  //       ReturnData = "cn";
  //       break;
  //     case "ln=en":
  //       ReturnData = "en";
  //       break;
  //   }
  // }
  return ReturnData;
}

function _SetMainData(len, page) {
  let _language;

  // Detect Language 2021/10/11
  if (len == undefined || len == "") {
    _language = _GetUrlLanguage();
  } else {
    _language = len;
  }
  if (_language == "en") {
    _EnData(page);
  } else if (_language == "cn") {
    _CnData(page);
  }
}

/* Get API - S 2021/10/16 */
function _GetCommunity() {
  let dataCommunity;
  $.ajax({
    type: "POST",
    url: "./assets/capstone.json",
    async: false,
    success: function (data) {
      dataCommunity = data["community"];
    },
  });
  return dataCommunity;
}

function _GetMenu() {
  let dataMenu;
  $.ajax({
    type: "POST",
    url: "./assets/capstone.json",
    async: false,
    success: function (data) {
      dataMenu = data["menu"];
    },
  });
  return dataMenu;
}

function _GetBanner(type) {
  let dataBanner;
  $.ajax({
    type: "POST",
    url: "./assets/capstone.json",
    async: false,
    success: function (data) {
      $.each(data["banner"], function (index, val) {
        if (val["service"] == type) {
          dataBanner = val["url"];
          return false;
        }
      });
    },
  });
  return dataBanner;
}

// function _GetCourse_List(page) {
//   let ReturnData = "";
//   let index = 0;
//   $.ajax({
//     type: "POST",
//     url: "./assets/capstone.json",
//     async: false,
//     success: function (data) {
//       index = $.map(data["menu"][2].pading, function (item, index) {
//         return item.service;
//       }).indexOf(page);

//       ReturnData = data["menu"][2].pading[index];
//     },
//   });
//   return ReturnData;
// }

function _GetContent(page) {
  let dataContent;
  $.ajax({
    type: "POST",
    url: "./assets/capstone.json",
    async: false,
    success: function (data) {
      $.each(data["content"], function (index, val) {
        if (val["service"] == page) {
          dataContent = val;
          return false;
        }
      });
    },
  });
  return dataContent;
}
/* Get API - E 2021/10/16 */

// CommunityTab - S
var CommunityClose = () => {
  $(".CommunityTap-content").fadeOut(200);
};

function _SetCommunity() {
  let dataCommunity = _GetCommunity();
  $.each(dataCommunity, function (index, val) {
    $("#CommunityUl").append(
      $("<li>").append(
        $("<i>").attr("class", val["class"]).append(),
        $("<a>")
          .attr("href", val["url"])
          .attr("target", "_blank")
          .append(val["name"])
      )
    );
  });
}
// CommunityTab - E

/* 中英切換 -S */
function _EnData(page) {
  Menu_Language("en");

  switch (page) {
    case "home":
      Home_Language("en");
      break;
    case "aboutus":
      Aboutus_Language("en");
      break;
    case "course":
      Course_Language("en");
      break;
    /* 國際課程 */
    case "MHcourse":
      MHcourse_Language("en");
      break;
    /* 國際課程 */

    /* 檢定課程 */
    case "APcourse":
      APcourse_Language("en");
      break;
    /* 檢定課程 */
    case "staff":
      Staff_Language("en");
      break;
    case "policy":
      Policy_Language("en");
      break;
    case "resource":
      Resource_Language("en");
      break;
    case "gemstone":
      Gemstone_Language("en");
      break;
    case "course-description":
      CoursDeescription_Language("en");
      break;
    case "verification-course":
      VerificationCourse_Language("en");
      break;
    case "advisory":
      Advisory_Language("en");
      break;
    case "feedback":
      feedback_Language("en");
      break;
    case "sevents":
      Sevents_Language("en");
      break;
    case "admission-process":
      AdmissionProcess_Language("en");
      break;
    /* 更多資訊 */
    case "signup":
      Signup_Language("en");
      break;
    case "question":
      Question_Language("en");
      break;
    case "contactus":
      Contactus_Language("en");
      break;
    case "trafficinformation":
      TrafficInformation_Language("en");
      break;
  }
}

function _CnData(page) {
  Menu_Language("cn");

  switch (page) {
    case "home":
      Home_Language("cn");
      break;
    case "aboutus":
      Aboutus_Language("cn");
      break;
    case "course":
      Course_Language("cn");
      break;
    /* 國際課程 */
    case "MHcourse":
      MHcourse_Language("cn");
      break;
    /* 國際課程 */

    /* 檢定課程 */
    case "APcourse":
      APcourse_Language("en");
      break;
    /* 檢定課程 */
    case "staff":
      Staff_Language("cn");
      break;
    case "policy":
      Policy_Language("cn");
      break;
    case "resource":
      Resource_Language("cn");
      break;
    case "gemstone":
      Gemstone_Language("cn");
      break;
    case "course-description":
      CoursDeescription_Language("cn");
      break;
    case "verification-course":
      VerificationCourse_Language("cn");
      break;
    case "advisory":
      Advisory_Language("cn");
      break;
    case "feedback":
      feedback_Language("cn");
      break;
    case "sevents":
      Sevents_Language("cn");
      break;
    case "admission-process":
      AdmissionProcess_Language("cn");
      break;
    /* 更多資訊 */
    case "signup":
      Signup_Language("en");
      break;
    case "question":
      Question_Language("en");
      break;
    case "contactus":
      Contactus_Language("en");
      break;
    case "trafficinformation":
      TrafficInformation_Language("en");
      break;
  }
}
/* 中英切換 -E */

function Menu_Language(lan) {
  let dataMenu = _GetMenu();
  // Clear item
  $("#menu").empty();

  $.each(dataMenu, function (index, val) {
    $("#menu").append(function () {
      let returnpage;
      // && val["url"] == ""
      if (val["pading"].length > 0 && val["url"] == "") {
        /* 有分頁 */

        returnpage = $("<li>")
          .addClass("nav-item dropdown")
          .append(
            $("<a>")
              .addClass("nav-link dropdown-toggle")
              .attr("onclick", "ChangePge('" + val["service"] + "')")
              .attr("id", val["service"])
              .attr("data-bs-toggle", "dropdown")
              .attr("aria-expanded", "false")
              .attr("data-bs-auto-close", "outside")
              .append(val[lan])
          )
          .append(
            $("<ul>")
              .addClass("dropdown-menu dropdown-submenu")
              .attr("aria-labelledby", val["service"])
              .append(function () {
                let li_pading = [];
                $.each(val["pading"], function (index_pading, val_pading) {
                  let ul_sub = [];
                  if (val_pading["pading"] != undefined) {
                    /* 2個子選單 */
                    $.each(val_pading["pading"], function (index_sub, val_sub) {
                      ul_sub.push(
                        $("<li>").append(
                          $("<a>")
                            .addClass(
                              "dropdown-item dropdown-item-link nav-link"
                            )
                            .attr("id", val_sub["service"])
                            .attr(
                              "onclick",
                              "ChangePge('" + val_sub["service"] + "')"
                            )
                            .append(val_sub[lan])
                        )
                      );
                    });
                    li_pading.push(
                      $("<li>")
                        .addClass("nav-item dropdown")
                        //dropend -> 佑箭頭
                        .append(
                          $("<a>")
                            .addClass("nav-link dropdown-toggle")

                            .attr("id", val_pading["service"])
                            .attr(
                              "onclick",
                              "ChangePge('" + val_pading["service"] + "')"
                            )
                            .attr("data-bs-toggle", "dropdown")
                            .attr("aria-expanded", "false")

                            .append(val_pading[lan])
                        )
                        .append(
                          $("<ul>")
                            .addClass("dropdown-menu tt")
                            .attr("aria-labelledby", val_pading["service"])
                            .append(ul_sub)
                        )
                    );
                  } else {
                    li_pading.push(
                      $("<li>").append(
                        $("<a>")
                          .addClass("dropdown-item dropdown-item-link nav-link")
                          .attr(
                            "onclick",
                            "ChangePge('" + val_pading["service"] + "')"
                          )
                          .append(val_pading[lan])
                      )
                    );
                  }
                });
                return li_pading;
              })
          );
      } else if (val["pading"].length > 0 && val["url"] != "") {
        returnpage = $("<li>")
          .addClass("nav-item dropdown ")
          .append(
            $("<a>")
              .addClass("nav-link dropdown-toggle")
              .attr(
                "onclick",
                "ChangePge('" + val["service"] + "','" + val["url"] + "')"
              )
              .attr("id", val["service"])
              .attr("data-bs-toggle", "dropdown")
              .attr("aria-expanded", "false")
              .append(val[lan])
          )
          .append(
            $("<ul>")
              .addClass("dropdown-menu")
              .attr("aria-labelledby", val["service"])
              .append(function () {
                let li_pading = [];
                $.each(val["pading"], function (index_pading, val_pading) {
                  li_pading.push(
                    $("<li>").append(
                      $("<a>")
                        .addClass("dropdown-item dropdown-item-link nav-link")
                        // .attr("href", val_pading["url"])
                        .attr(
                          "onclick",
                          "ChangePge('" +
                            val_pading["service"] +
                            "','" +
                            val_pading["url"] +
                            "')"
                        )
                        .append(val_pading[lan])
                    )
                  );
                });
                return li_pading;
              })
          );
      } else {
        returnpage = $("<li>")
          .attr("class", "nav-item")
          .append(
            $("<a>")
              .attr("class", "nav-link")
              .attr("onclick", "ChangePge('" + val["service"] + "')")
              .append(val[lan])
          );
      }

      return returnpage;
    });
  });
}

function Home_Language(lan) {
  // let ReturnDataContent = _GetContent("home");
  // let DataHeader = ReturnDataContent["header"]["title"][0];
  // // Clear item
  // $("#HeaderTitle").empty();
  // $("#HeaderTitle").text(DataHeader[lan]);
}

function Aboutus_Language(lan) {
  let cn1 = "",
    cn2 = "";
  let dataMenu = _GetMenu();
  let dataBanner = _GetBanner("aboutus");
  let ListSwiperEnvironment = [1, 2, 3, 4, 5, 6, 7, 8];
  let environment_content = _GetContent("aboutus")["environment"];

  // Clear item
  $("#AboutTitle").empty();
  $("#header_aboutus").empty();

  // Set Header
  $("#header_aboutus").css("background-image", 'url("' + dataBanner + '")');

  // 環境介紹
  setTimeout(() => {
    $.each(ListSwiperEnvironment, function (index, val) {
      let seq = index + 1;
      /* 取得內容 */
      switch (seq) {
        case 6:
          cn1 = environment_content["content2"]["cn1"];
          cn2 = environment_content["content2"]["cn2"];
          break;
        case 7:
          cn1 = environment_content["content3"]["cn1"];
          cn2 = environment_content["content3"]["cn2"];
          break;

        case 8:
          cn1 = environment_content["content4"]["cn1"];
          cn2 = environment_content["content4"]["cn2"];
          break;
        default:
          cn1 = environment_content["content1"]["cn1"];
          cn2 = environment_content["content1"]["cn2"];
          break;
      }

      let SwiperEnvironmentContent =
        '<div class="container py-5  px-lg-5"> ' +
        '<div class="row gx-4 gx-lg-5 justify-content-center buil01-template-03"> ' +
        '<div class="col-md-2"> ' +
        '<div class="title-area fadeUp text-white" style="opacity: 1;transform: matrix(1, 0, 0, 1, 0, 0);"> ' +
        '<h3 class="title"> ' +
        '<span class="span-en">Environment Inyroduction</span> ' +
        "<span>介紹</span> " +
        "<strong>環境</strong> " +
        "</h3> " +
        "</div> " +
        "</div> " +
        '<div class="col-md-5"></div> ' +
        '<div class="col-md-5 py-2 text-center"> ' +
        '<div class="container h-100 w-100"> ' +
        '<div class="d-flex min-vh-50 text-center align-items-center" style = "border: #989898 1px solid;background-color: #fff;opacity: 0.6;"> ' +
        '<div class="w-100"> ' +
        '<div class="py-5 text-dark" style = "padding-top: 20% !important;padding-bottom: 20% !important;"> ' +
        "<h2>" +
        cn1 +
        " " +
        "<h2>" +
        cn2 +
        "</h2> " +
        '<hr class="divider" /> ' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div >";

      $("#swiper-environment").append(
        '<div class="swiper-slide parallax-bg" style="background-image: url(~/../assets/img/page/about/environment/' +
          val +
          '.jpg);">' +
          SwiperEnvironmentContent +
          "</div>"
      );
    });

    var swiper = new Swiper(".mySwiper", {
      cssMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      keyboard: true,
    });
  }, 1000);

  $.each(dataMenu, function (index, val) {
    if (index == 1) {
      $("#AboutTitle").text(val["pading"][0][lan]);
    }
  });
}

function Course_Language(lan) {
  let dataMenu = _GetMenu();
  // Clear item
  $("#AboutTitle").empty();

  // Set Header
  $("#header_course").css(
    "background-image",
    'url("~/../assets/img/page_header/about.jpg")'
  );
}

/* 國際課程 - S */

// 國/高中進度課程
function MHcourse_Language(lan) {
  let dataMenu = _GetMenu();
  let dataBanner = _GetBanner("MHcourse");
  // Clear item
  $("#header_MHcourse").empty();
  // Set Header
  $("#header_MHcourse").css("background-image", 'url("' + dataBanner + '")');

  $.each(dataMenu, function (index, val) {
    if (index == 1) {
      // $("#MHcourseTitle").text(val["pading"][0][lan]);
    }
  });
}
/* 國際課程 - E */

/* 檢定課程 - S */

// 進階先修課程
function APcourse_Language(lan) {
  let dataMenu = _GetMenu();
  let dataBanner = _GetBanner("APcourse");
  // Clear item
  $("#header_APcourse").empty();
  // Set Header
  $("#header_APcourse").css("background-image", 'url("' + dataBanner + '")');

  $.each(dataMenu, function (index, val) {
    if (index == 1) {
      // $("#MHcourseTitle").text(val["pading"][0][lan]);
    }
  });
}
/* 檢定課程 - E */

function Staff_Language(lan) {
  let ReturnDataContent = _GetContent("staff");
  let DataContent = ReturnDataContent["header"][0];

  // Set Header
  $("#header_staff").css(
    "background-image",
    'url("~/../assets/img/page_header/' + DataContent["img"] + '")'
  );

  $("#header_staff h2").text(DataContent[lan]);

  // console.log(dataMenu);
  // $.each(dataMenu, function (index, val) {
  //   if (index == 2) {
  //     $("#AboutTitle").text(val["pading"][0][lan]);
  //   }
  // });
}
function Policy_Language(lan) {}

function Resource_Language(lan) {}
function Gemstone_Language(lan) {}
function CoursDeescription_Language(lan) {}
function VerificationCourse_Language(lan) {}
function Advisory_Language(lan) {
  let dataMenu = _GetMenu();
  // Clear item
  // $("#AboutTitle").empty();

  // Set Header
  $("#header_advisory").css(
    "background-image",
    'url("~/../assets/img/page_header/about.jpg")'
  );

  // $.each(dataMenu, function (index, val) {
  //   if (index == 2) {
  //     $("#AboutTitle").text(val["pading"][1][lan]);
  //   }
  // });
}
function feedback_Language(lan) {
  let dataMenu = _GetMenu();
  let dataBanner = _GetBanner("feedback");
  // Clear item
  $("#header_feedback").empty();
  // Set Header
  $("#header_feedback").css("background-image", 'url("' + dataBanner + '")');
}
function Sevents_Language(lan) {
  let dataMenu = _GetMenu();
  let dataBanner = _GetBanner("sevents");
  // Clear item
  $("#header_sevents").empty();
  // Set Header
  $("#header_sevents").css("background-image", 'url("' + dataBanner + '")');
}
function AdmissionProcess_Language(lan) {}
/* 更多資訊 */
function Signup_Language(lan) {
  let dataBanner = _GetBanner("signup");
  // Clear item
  $("#header_aboutus").empty();

  // Set Header
  $("#header_signup").css("background-image", 'url("' + dataBanner + '")');
}
function Question_Language(lan) {
  let dataBanner = _GetBanner("question");
  // Clear item
  $("#header_question").empty();

  // Set Header
  $("#header_question").css("background-image", 'url("' + dataBanner + '")');
}
function Contactus_Language(lan) {
  let dataBanner = _GetBanner("contactus");
  // Clear item
  $("#header_contactus").empty();

  // Set Header
  $("#header_contactus").css("background-image", 'url("' + dataBanner + '")');
}
function TrafficInformation_Language(lan) {
  let dataBanner = _GetBanner("trafficinformation");
  // Clear item
  $("#header_trafficinformation").empty();

  // Set Header
  $("#header_trafficinformation").css(
    "background-image",
    'url("' + dataBanner + '")'
  );
}

//社群按鈕
function GetCommunity() {
  var options = {
    line: "//line.me/ti/p/vmBwMrebDS", // Line QR code URL
    instagram: "capstone_tw", // Instagram username
    // call_to_action: "Message us", // Call to action
    button_color: "#129BF4", // Color of button
    position: "right", // Position may be 'right' or 'left'
    order: "instagram,line", // Order of buttons
  };
  var proto = document.location.protocol,
    host = "getbutton.io",
    url = proto + "//static." + host;

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = url + "/widget-send-button/js/init.js";
  s.onload = function () {
    WhWidgetSendButton.init(host, proto, options);
  };
  var x = document.getElementsByTagName("script")[0];
  x.parentNode.insertBefore(s, x);
}

// Top Button
var goToTop = function () {
  $(".js-gotop").on("click", function (e) {
    e.preventDefault();
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      200
    );
  });
};
