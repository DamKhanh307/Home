document.addEventListener('DOMContentLoaded', function () {
    var place_click = document.querySelector('.avatar');
    var click_count = 0;
    var list_bg_desktop = ["./IMG/bg1.jpg", "./IMG/bg2.jpg", "./IMG/bg3.jpg", "./IMG/bg4.jpg", "./IMG/bg5.jpeg", "./IMG/bg6.jpg"];
    var devices = window.screen;

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * list_bg_desktop.length);
        return list_bg_desktop[randomIndex];
    }


    document.body.style.backgroundImage = `url(${getRandomImage()})`;
    function setMidAutumnBg() {
        const today = new Date();
        const d = today.getDate();
        const m = today.getMonth() + 1;
        // Kiểm tra nằm trong khoảng 30/9 -> 6/10
        if ((m === 9 && d >= 30) || (m === 10 && d <= 6)) {
            document.body.style.backgroundImage = "url('./IMG/bg_midautumn.jpg')";
        }

        if ((m === 10 && d >= 10) || (m === 11 && d <= 1)) {
            document.body.style.backgroundImage = "url('./IMG/bg_halloween.png')";
            const font = new FontFace('HalloweenFont', 'url(./halloween.ttf)');
            font.load().then(function (loadedFont) {
                document.fonts.add(loadedFont);
                document.body.style.fontFamily = 'HalloweenFont, sans-serif';
            });

        }

        else {
            document.body.style.backgroundImage = "url('./IMG/bg6.jpg')";
        }
    }

    setMidAutumnBg();

    const card = document.querySelector(".card");

    document.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    document.addEventListener("mouseleave", () => {
        card.style.transform = "rotateY(0deg) rotateX(0deg)";
    });


    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            let circle = document.createElement("span");
            let d = Math.max(this.clientWidth, this.clientHeight);

            circle.style.width = circle.style.height = `${d}px`;
            circle.style.left = e.clientX - this.offsetLeft - d / 2 + "px";
            circle.style.top = e.clientY - this.offsetTop - d / 2 + "px";

            circle.classList.add("ripple-effect");
            this.appendChild(circle);

            setTimeout(() => circle.remove(), 600);
        });
    });


    const el = document.getElementById("typing");
    const text = "Đàm Khánh";

    let idx = 0;
    let deleting = false;

    function loop() {
        let speed = deleting ? 70 : 120;

        if (!deleting) {
            el.textContent = text.slice(0, idx + 1);
            idx++;

            if (idx === text.length) {
                setTimeout(() => deleting = true, 1000);
            }
        } else {
            el.textContent = text.slice(0, idx - 1);
            idx--;

            if (idx === 0) {
                deleting = false;
            }
        }

        setTimeout(loop, speed);
    }

    loop();



    place_click.addEventListener('click', function OpenImg() {
        click_count++;
        if (click_count === 3) {
            var input_pass = prompt('Input Password To Continue:');
            click_count = 0;
            if (input_pass != null) {
                userInput = input_pass.toLowerCase();
                if (userInput == 'damkhanh') {
                    window.location.href = 'https://damkhanh307.github.io/Home/IMG/';
                } else {
                    if (devices.width >= 900) {
                        window.location.href = 'https://damkhanh307.github.io/Home/404-not-found/';
                    } else {
                        window.location.href = 'https://damkhanh307.github.io/Home/404';
                    }
                }
            }
        }
    });
});
