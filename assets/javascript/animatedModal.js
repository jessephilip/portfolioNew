!function(a) {
    a.fn.animatedModal = function(b) {
        function c() {
            i.css({"z-index": f.zIndexOut}),
            f.afterClose()
        }
        function d() {
            f.afterOpen()
        }
        var e = a(this),
            f = a.extend({
                modalTarget: "animatedModal",
                position: "fixed",
                width: "100%",
                height: "100%",
                top: "0px",
                left: "0px",
                zIndexIn: "9999",
                zIndexOut: "-9999",
                color: "#39BEB9",
                opacityIn: "1",
                opacityOut: "0",
                animatedIn: "zoomIn",
                animatedOut: "zoomOut",
                animationDuration: ".6s",
                overflow: "auto",
                beforeOpen: function() {},
                afterOpen: function() {},
                beforeClose: function() {},
                afterClose: function() {}
            }, b),
            g = a(".close-" + f.modalTarget),
            h = a(e).attr("href"),
            i = a("body").find("#" + f.modalTarget),
            j = "#" + i.attr("id");
        i.addClass("animated"),
        i.addClass(f.modalTarget + "-off");
        var k = {
            position: f.position,
            width: f.width,
            height: f.height,
            top: f.top,
            left: f.left,
            "background-color": f.color,
            "overflow-y": f.overflow,
            "z-index": f.zIndexOut,
            opacity: f.opacityOut,
            "-webkit-animation-duration": f.animationDuration,
            "-moz-animation-duration": f.animationDuration,
            "-ms-animation-duration": f.animationDuration,
            "animation-duration": f.animationDuration
        };
        i.css(k),
        e.click(function(b) {
            b.preventDefault(),
            a("body, html").css({overflow: "hidden"}),
            h == j && (i.hasClass(f.modalTarget + "-off") && (i.removeClass(f.animatedOut), i.removeClass(f.modalTarget + "-off"), i.addClass(f.modalTarget + "-on")), i.hasClass(f.modalTarget + "-on") && (f.beforeOpen(), i.css({opacity: f.opacityIn, "z-index": f.zIndexIn}), i.addClass(f.animatedIn), i.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", d)))
        }),
        g.click(function(b) {
            b.preventDefault(),
            a("body, html").css({overflow: "auto"}),
            f.beforeClose(),
            i.hasClass(f.modalTarget + "-on") && (i.removeClass(f.modalTarget + "-on"), i.addClass(f.modalTarget + "-off")),
            i.hasClass(f.modalTarget + "-off") && (i.removeClass(f.animatedIn), i.addClass(f.animatedOut), i.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
        })
    }
}(jQuery);
