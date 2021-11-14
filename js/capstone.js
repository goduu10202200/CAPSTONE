/* Why Capstone Model - S 2021/11/14 */
function _ShowCapstoneModel(type) {
  $("#CapstoneModal").modal("show");
  switch (type) {
    case "A":
      $("#CapstoneModalHeader").text("教室環境");
      $("#CapstoneModalImg").attr(
        "src",
        "./assets/img/portfolio/fullsize/1.jpg"
      );
      break;
    case "B":
      $("#CapstoneModalHeader").text("硬體設備");
      $("#CapstoneModalImg").attr(
        "src",
        "./assets/img/portfolio/fullsize/2.jpg"
      );
      break;
    case "C":
      $("#CapstoneModalHeader").text("優質教學");
      $("#CapstoneModalImg").attr(
        "src",
        "./assets/img/portfolio/fullsize/3.jpg"
      );
      break;
    case "D":
      $("#CapstoneModalHeader").text("特別服務");
      $("#CapstoneModalImg").attr(
        "src",
        "./assets/img/portfolio/fullsize/4.jpg"
      );
      break;
    default:
  }
}
/* Why Capstone Model - E 2021/11/14 */

// Get URL Language 2021/10/11
function _GetUrlLanguage() {
  let ReturnData = "en";
  let LanguageSplit = location.href.split("#");
  if (LanguageSplit.length > 1) {
    switch (LanguageSplit[1]) {
      case "ln=cn":
        ReturnData = "cn";
        break;
      case "ln=en":
        ReturnData = "en";
        break;
    }
  }
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
  // console.log("_SetMainData._language", _language);
  // console.log("_SetMainData.page", page);
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
    case "about":
      About_Language("en");
      break;
    case "aboutus":
      Aboutus_Language("en");
      break;
    case "course":
      Course_Language("en");
      break;
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
    case "s-feedback":
      Sfeedback_Language("en");
      break;
    case "s-events":
      Sevents_Language("en");
      break;
    case "admission-process":
      AdmissionProcess_Language("en");
      break;
    case "contact-us":
      Contactus_Language("en");
      break;
    case "traffic-information":
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
    case "about":
      About_Language("cn");
      break;
    case "aboutus":
      Aboutus_Language("cn");
      break;
    case "course":
      Course_Language("cn");
      break;
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
    case "s-feedback":
      Sfeedback_Language("cn");
      break;
    case "s-events":
      Sevents_Language("cn");
      break;
    case "admission-process":
      AdmissionProcess_Language("cn");
      break;
    case "contact-us":
      Contactus_Language("cn");
      break;
    case "traffic-information":
      TrafficInformation_Language("cn");
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
      if (val["pading"].length > 0) {
        returnpage = $("<li>")
          .addClass("nav-item dropdown")
          .append(
            $("<a>")
              .addClass("nav-link dropdown-toggle")
              .attr("onclick", "ChangePge('" + val["service"] + "')")
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
                        .attr(
                          "onclick",
                          "ChangePge('" + val_pading["service"] + "')"
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
  let ReturnDataContent = _GetContent("home");
  let DataHeader = ReturnDataContent["header"]["title"][0];

  // Clear item
  $("#HeaderTitle").empty();

  $("#HeaderTitle").text(DataHeader[lan]);
}

function About_Language(lan) {
  let dataMenu = _GetMenu();
  // Clear item
  $("#AboutTitle").empty();

  // Set Header
  $("#header_about").css(
    "background-image",
    'url("~/../assets/img/page_header/about.jpg")'
  );

  $.each(dataMenu, function (index, val) {
    if (index == 1) {
      $("#AboutTitle").text(val[lan]);
    }
  });
}

function Aboutus_Language(lan) {
  let dataMenu = _GetMenu();
  // Clear item
  $("#AboutTitle").empty();

  // Set Header
  $("#header_aboutus").css(
    "background-image",
    'url("~/../assets/img/page_header/about.jpg")'
  );

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

function Staff_Language(lan) {
  let ReturnDataContent = _GetContent("staff");
  let DataContent = ReturnDataContent["header"][0];
  // Clear item
  $("#AboutTitle").empty();

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
function Sfeedback_Language(lan) {}
function Sevents_Language(lan) {}
function AdmissionProcess_Language(lan) {}
function Contactus_Language(lan) {}
function TrafficInformation_Language(lan) {}