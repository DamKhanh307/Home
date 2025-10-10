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
