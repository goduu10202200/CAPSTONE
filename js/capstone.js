// Get URL Language 2021/10/11
function _GetUrlLanguage() {
  let ReturnData = "EN";
  let LanguageSplit = location.href.split("#");
  if (LanguageSplit.length > 1) {
    switch (LanguageSplit[1]) {
      case "ln=CN":
        ReturnData = "CN";
        break;
      case "ln=EN":
        ReturnData = "EN";
        break;
    }
  }
  return ReturnData;
}

function _SetMainData(len) {
  let _language;

  // Detect Language 2021/10/11
  if (len == undefined) {
    _language = _GetUrlLanguage();
  } else {
    _language = len;
  }

  if (_language == "EN") {
    _EnData();
  } else if (_language == "CN") {
    _CnData();
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
function _EnData() {
  Menu_Language("en");
  // PageDescribe
  $("#PageTitle").text("Welcome");
  $("#AboutTitle").text("Why Capstone");
}

function _CnData() {
    Menu_Language("cn");

  $("#PageTitle").text("歡迎");
  $("#AboutTitle").text("為何選擇Capstone");
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
