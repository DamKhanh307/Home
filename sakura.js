var stop, staticx, img = new Image;

function Sakura(t, n, e, i, a) {
    this.x = t, this.y = n, this.s = e, this.r = i, this.fn = a
}

function getRandom(t) {
    var n, e;
    switch (t) {
        case "x":
            n = Math.random() * window.innerWidth;
            break;
        case "y":
            n = Math.random() * window.innerHeight;
            break;
        case "s":
            n = Math.random();
            break;
        case "r":
            n = 6 * Math.random();
            break;
        case "fnx":
            e = -.5 + 1 * Math.random(), n = function(t, n) {
                return t + .5 * e - 1.7
            };
            break;
        case "fny":
            e = 1.5 + .7 * Math.random(), n = function(t, n) {
                return n + e
            };
            break;
        case "fnr":
            e = .03 * Math.random(), n = function(t) {
                return t + e
            }
    }
    return n
}

function startSakura() {
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    var t, n, e, i, a, s, r, o, h = document.createElement("canvas");
    console.log("Canvas created");
    staticx = !0, h.height = window.innerHeight, h.width = window.innerWidth, h.setAttribute("style", "position: fixed;left: 0;top: 0;pointer-events: none;z-index: 8888;"), h.setAttribute("id", "canvas_sakura"), document.getElementsByTagName("body")[0].appendChild(h);
    console.log("Canvas appended to body");
    o = h.getContext("2d");
    for (var d = new SakuraList, m = 0; m < 10; m++) {
        n = getRandom("x"), e = getRandom("y"), a = getRandom("r"), i = getRandom("s"), s = getRandom("fnx"), r = getRandom("fny"), randomFnR = getRandom("fnr");
        (t = new Sakura(n, e, i, a, {
            x: s,
            y: r,
            r: randomFnR
        })).draw(o), d.push(t);
    }
    stop = requestAnimationFrame(function() {
        o.clearRect(0, 0, h.width, h.height), d.update(), d.draw(o), stop = requestAnimationFrame(arguments.callee)
    })
}

function stopp() {
    if (staticx) {
        var t = document.getElementById("canvas_sakura");
        t.parentNode.removeChild(t), window.cancelAnimationFrame(stop), staticx = !1
    } else startSakura()
}

sakura = "//i.ibb.co/8sdy2gK/sakura.png", leaf = "//i.ibb.co/8sdy2gK/sakura.png", maple = "//i.ibb.co/8sdy2gK/sakura.png", user = "", img.src = maple;

Sakura.prototype.draw = function(t) {
    t.save(), this.s, t.translate(this.x, this.y), t.rotate(this.r), t.drawImage(img, 0, 0, 30 * this.s, 30 * this.s), t.restore()
};

Sakura.prototype.update = function() {
    this.x = this.fn.x(this.x, this.y), this.y = this.fn.y(this.y, this.y), this.r = this.fn.r(this.r);
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom("fnr");
        if (Math.random() > .4) {
            this.x = getRandom("x");
            this.y = 0;
            this.s = getRandom("s");
            this.r = getRandom("r");
        } else {
            this.x = window.innerWidth;
            this.y = getRandom("y");
            this.s = getRandom("s");
            this.r = getRandom("r");
        }
    }
};

var SakuraList = function() {
    this.list = []
};

SakuraList.prototype.push = function(t) {
    this.list.push(t)
};

SakuraList.prototype.update = function() {
    for (var t = 0, n = this.list.length; t < n; t++) this.list[t].update()
};

SakuraList.prototype.draw = function(t) {
    for (var n = 0, e = this.list.length; n < e; n++) this.list[n].draw(t)
};

SakuraList.prototype.get = function(t) {
    return this.list[t]
};

SakuraList.prototype.size = function() {
    return this.list.length
};

window.onresize = function() {
    var canvas = document.getElementById("canvas_sakura");
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
};

img.onload = function() {
    startSakura()
};

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    startSakura();
});
