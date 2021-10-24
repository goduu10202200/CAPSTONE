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
  console.log("_SetMainData._language", _language);
  console.log("_SetMainData.page", page);
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
/* Get API - S 2021/10/16 */

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
      $("#PageTitle").text("Welcome");
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
    case "advisory":
      Advisory_Language("en");
      break;
  }
}

function _CnData(page) {
  Menu_Language("cn");

  switch (page) {
    case "home":
      $("#PageTitle").text("歡迎");
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
    case "advisory":
      Advisory_Language("cn");
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

  $.each(dataMenu, function (index, val) {
    if (index == 2) {
      $("#AboutTitle").text(val[lan]);
    }
  });
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

  console.log("Staff_Language", lan);
  $("#header_staff h2").text(DataContent[lan]);

  // console.log(dataMenu);
  // $.each(dataMenu, function (index, val) {
  //   if (index == 2) {
  //     $("#AboutTitle").text(val["pading"][0][lan]);
  //   }
  // });
}

function Advisory_Language(lan) {
  let dataMenu = _GetMenu();
  // Clear item
  $("#AboutTitle").empty();

  $.each(dataMenu, function (index, val) {
    if (index == 2) {
      $("#AboutTitle").text(val["pading"][1][lan]);
    }
  });
}
