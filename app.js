import anime from "animejs";
import ScrollReveal from "scrollreveal";
import "./scss/style.scss";
import * as bootstrap from "bootstrap";

const initHome = () => {

  ScrollReveal().reveal("h2", { duration: 2000 });
  // ScrollReveal().reveal(".main-section", { duration: 700 });
  ScrollReveal().reveal(".grid-item", { duration: 1000 });
  /** Main Cover */
  anime({
    targets: "#topnavi",
    translateY: 100,
    delay: 1200,
    duration: 450,
  });
  anime({
    targets: "#subheadline",
    opacity: [0, 1],
    delay: 1200,
    duration: 450,
  });

  fullscreenNav();
  submitForm();
  displayScrollto();
  klickDisco();
};

export { initHome };

const fullscreenNav = () => {
  document
    .querySelector("#hamburger-nav-button")
    .addEventListener("click", (e) => {
      e.preventDefault();

      const animation = anime({
        targets: "#overlay-menu",
        delay: 0,
        opacity: [0, 1],
        translateX: [850, 0],
        duration: 500,
        endDelay: 0,
        loop: false,
        autoplay: false,
        easing: "linear",
      });
      animation.play();

      anime({
        targets: "#fullscreen-menu a",
        opacity: [0, 1],
        delay: anime.stagger(100),
      });
    });

  const backAnimation = (e) => {
    // e.preventDefault();
    const animation = anime({
      targets: "#overlay-menu",
      delay: 500,
      opacity: [1, 0],
      translateX: [0, 850],
      duration: 500,
      endDelay: 0,
      loop: false,
      autoplay: false,
      easing: "linear",
    });
    animation.play();

    anime({
      targets: "#fullscreen-menu a",
      opacity: [1, 0],
      delay: anime.stagger(100, { direction: "reverse" }),
    });
  };

  const overlayMenuClose = document.getElementsByClassName("overlayMenuClose");

  for (var i = 0; i < overlayMenuClose.length; i++) {
    overlayMenuClose[i].addEventListener("click", backAnimation, false);
  }
};

const submitForm = () => {
  const sendData = () => {
    const XHR = new XMLHttpRequest();
    const FD = new FormData(form);

    XHR.addEventListener("load", function (event) {
      if (event.target.responseText === "true") {
        document.getElementById("msg_success").classList.remove("d-none");
      } else {
        document.getElementById("msg_error").classList.remove("d-none");
      }
    });

    XHR.addEventListener("error", function (event) {
      // alert('Oops! Something went wrong.');
    });

    XHR.open("POST", "./sendmail.php");
    XHR.send(FD);
  };

  const form = document.getElementById("contactform");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
  });
};

const displayScrollto = () => {
  const about = document.getElementById("about");
  const scrollToTop = document.getElementById("scrollToTop");

  window.addEventListener("scroll", (event) => {
    let scroll = window.scrollY;
    if (Math.floor(scroll) > about.offsetTop) {
      scrollToTop.classList.remove("hide");
    } else {
      scrollToTop.classList.add("hide");
    }
  });

  scrollToTop.addEventListener("click", (e) => {
    window.scrollTo(0, 0);
  });
};



const klickDisco = () => {
  const covers = document.querySelectorAll('.grid-item');
  const modalplayer = document.getElementById('modalplayerframe');


  let count = 0;
  covers.forEach(element => {
    if (element.attributes[2].value !== '') {
      covers[count].addEventListener('click', e => {

        modalplayer.setAttribute('src', `https://bandcamp.com/EmbeddedPlayer/album=${element.getAttribute('data-release-id')}/size=large/bgcol=000000/linkcol=ffffff/artwork=small/transparent=true/`);
      })

      covers[count].classList.add('pointer');
      covers[count].setAttribute('data-bs-toggle', 'modal');
      covers[count].setAttribute('data-bs-target', '#modalplayer');
    }
    count++;
  });

}
