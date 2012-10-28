$(document).ready(
  function() {
    var slash;

    var chosenFont = "futura";
    $("#headline").addClass(chosenFont);
    $("#body").addClass(chosenFont);
    $("#circle").addClass(chosenFont);

    var chosenBg = "default"
    $("#show-pane").addClass(chosenBg);

    $("#trends input.trend[type='checkbox']").bind("click", function() {
      $("#show-pane").toggleClass($(this).val());
    })

    $("input.gradient").bind("click", function() {
      if($(this).attr("checked") == "checked") {
        var index = rand(4)
        chosenGradient = ["top", "bottom", "left", "right"][index]
        $("#show-pane").addClass(chosenGradient);
        $("#show-pane").addClass($(this).val());
      } else {
        $("#show-pane").removeClass(chosenGradient);
        $("#show-pane").removeClass($(this).val());
      }
    })

    $("#fonts input[type='radio']").bind("click", function() {
      $("#headline").removeClass(chosenFont);
      $("#body").removeClass(chosenFont);
      $("#circle").removeClass(chosenFont);
      chosenFont = $(this).val();
      $("#headline").addClass(chosenFont);
      $("#body").addClass(chosenFont);
      $("#circle").addClass(chosenFont);
    })

    $("#backgrounds input[type='radio']").bind("click", function() {
      $("#show-pane").removeClass(chosenBg);
      chosenBg = $(this).val();
      $("#show-pane").addClass(chosenBg);
    })

    $("input#show-preview").bind("click", function() {
      $("#controls").toggle();
      $("#title").toggle();
      $("body").toggleClass("centered");
    })

    $("input.zigzag").bind("click", function() {
      if($(this).attr("checked") == "checked") {
        var arr = $("#headline-text").val().split(" ");
        var elements = jQuery.map(arr, function(t, i) { return "<span class='zig_" + i + "'>" + t + "</span>" });
        $("#headline").html(elements.join(" "));
      } else {
        $("#headline").html($("#headline-text").val());
      }
    })

    $("input.slash").bind("click", function() {
      if($(this).attr("checked") == "checked") {
        var index = rand(4)
        var el = $("<hr />")
        slash = "slash_" + index
        el.addClass(slash)
        $("#headline").before(el);
      } else {
        $("#show-pane hr").remove();
      }
    })

    $("input.left-right-up-down").bind("click", function() {
      if($(this).attr("checked") == "checked") {
        $("#left-right-up-down").show();
        $("#left, #right, #up, #down").show();
      } else {
        $("#left-right-up-down").hide();
        $("#left, #right, #up, #down").hide();
      }
    })

    $("#up-text").bind("change", function() {
      $("#up").html($(this).val());
    })

    $("#down-text").bind("change", function() {
      $("#down").html($(this).val());
    })

    $("#left-text").bind("change", function() {
      $("#left").html($(this).val());
    })

    $("#right-text").bind("change", function() {
      $("#right").html($(this).val());
    })

    $("#left-text").bind("change", function() {
      $("#left").html($(this).val());
    })

    $(".circle-text").bind("change", function() {
      $("#circle").html($(this).val());
    })

    $(".circle-switch").bind("click", function() {
      if($(this).attr("checked") == "checked") {
        var top = rand(550);
        var left = rand(350);
        $("#circle").css({ top: top + "px", left: left + "px"});
        $("#circle").show();
        $("#circle-text").show();
      } else {
        $("#circle").hide();
        $("#circle-text").hide();
      }
    })

    $("#headline-text").bind("change", function() {
      var arr = $("#headline-text").val().split(" ");
      var elements = jQuery.map(arr, function(t, i) { return "<span>" + t + "</span>" });
      $("#headline").html(elements.join("<span> </span>"));
    })

    $("#body-text").bind("change", function() {
      var arr = $("#body-text").val().split(" ");
      var elements = jQuery.map(arr, function(t, i) { return "<span>" + t + "</span>" });
      $("#body").html(elements.join("<span> </span>"));
    })

    $("input.content").bind("click", function() {
      if($(this).attr("checked") == "checked") {
        $("#exposed-content").show();
        $("#exposed-content input").each(function() {
          if($(this).val() != "") {
            var w = rand(140) + 80,
                h = rand(140) + 80,
                t = rand(550),
                l = rand(350),
                c = "img_" + this.id.split("_")[1]

            var img = $("<img src='" + $(this).val() + "' />")
            img.addClass(c)
            img.css({top: t, left: l, width: w, heigth: h})
            $("#headline").before(img)
          }
        });
      } else {
        $("#show-pane img").each(function() { $(this).remove() })
        $("#exposed-content").hide();
      }
    })

    $("input.img").bind("change", function() {
      var c = "img_" + this.id.split("_")[1]
      var img = $("img." + c)
      img.hide()
      if($(this).val() != "") {
        img.attr("src", $(this).val())
        img.show()
      }
    })

    $("form").bind("submit", function() {
      var h
      h = "headline=" + escape($("#headline-text").val())
      h = h + "&body=" + escape($("#body-text").val())
      h = h + "&background=" + $("input.color[checked='checked']").val()
      h = h + "&font=" + $("input.font[checked='checked']").val()
      var trends = $("#trends input.trend:checked")
      if(trends.length > 0) {
        h = h + "&trends=" + $(this).val();
        trends.each(function() {
          h = h + "&" + $(this).val()
        })
      }
      if($("input.slash:checked").length > 0) {
        h = h + "&slash=" + slash
      }
      if($("input.slash:checked").length > 0) {
        h = h + "&slash=" + slash
      }
      if($("input.gradient:checked").length > 0) {
        h = h + "&gradient=" + chosenGradient
      }
      if($("input.circle-switch:checked").length > 0) {
        h = h + "&circle=" + $(".circle-text").val()
      }
      if($("input.left-right-up-down:checked").length > 0) {
        h = h + "&up=" + $("#up-text").val()
        h = h + "&down=" + $("#down-text").val()
        h = h + "&left=" + $("#left-text").val()
        h = h + "&right=" + $("#right-text").val()
      }
      if($("input.content:checked").length > 0) {
        $("#show-pane img").each(function() {
          if($(this).attr("src") != "") {
            h = h + "&" + $(this).attr("class") + "="
            h = h + $(this).attr("src")
            h = h + "@" + $(this).attr("style")
          }
        })
      }
      document.location.hash = h
      return false;
    })

  }
)

function rand(i) {
  return Math.floor(Math.random() * i);
}
