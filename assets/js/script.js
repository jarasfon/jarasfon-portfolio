document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({duration:750, once:true, offset:70});
  if (window.Typed) new Typed('#typedRole', {
    strings: ['กรมชลประทาน', 'พัฒนาระบบสารสนเทศ', 'ดูแลเว็บไซต์และระบบเครือข่าย'],
    typeSpeed: 45, backSpeed: 25, backDelay: 1600, loop: true
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  const progress = document.getElementById('scrollProgress');
  const topButton = document.getElementById('backToTop');
  const bars = document.querySelectorAll('.progress-bar');
  let barsAnimated = false;
  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
    topButton.classList.toggle('show', window.scrollY > 450);
    const skills = document.getElementById('skills').getBoundingClientRect();
    if (!barsAnimated && skills.top < window.innerHeight * .8) {
      bars.forEach(bar => bar.style.width = bar.dataset.width);
      barsAnimated = true;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  topButton.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  document.getElementById('copyLine').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('save34596');
      bootstrap.Toast.getOrCreateInstance(document.getElementById('copyToast')).show();
    } catch (e) {
      window.prompt('คัดลอก LINE ID:', 'save34596');
    }
  });

  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });
});


/* =========================================
   SKILLS PROGRESS BAR ANIMATION
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const skillBars = document.querySelectorAll(
        "#skills .progress-bar"
    );

    if (!skillBars.length) return;

    const animateSkillBar = (bar) => {
        const value = Number.parseFloat(bar.dataset.width);

        if (!Number.isFinite(value)) return;

        const percentage = Math.max(0, Math.min(100, value));

        bar.style.width = percentage + "%";
        bar.setAttribute("aria-valuenow", percentage);
    };

    if (!("IntersectionObserver" in window)) {
        skillBars.forEach(animateSkillBar);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    skillBars.forEach((bar) => observer.observe(bar));
});


// modal event //

/* =========================================
   ACTIVITY GALLERY MODAL
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const activityModal = document.getElementById("activityModal");

    if (!activityModal) return;

    const activityButtons = Array.from(
        document.querySelectorAll(
            "#activities .gallery-trigger"
        )
    );

    if (!activityButtons.length) return;

    const modalImage = document.getElementById("activityModalImage");
    const modalTitle = document.getElementById("activityModalTitle");
    const modalDescription = document.getElementById(
        "activityModalDescription"
    );
    const modalCounter = document.getElementById("activityCounter");

    const previousButton = document.getElementById(
        "previousActivity"
    );
    const nextButton = document.getElementById("nextActivity");

    let currentIndex = 0;

    function showActivity(index) {

        currentIndex = (
            index + activityButtons.length
        ) % activityButtons.length;

        const activity = activityButtons[currentIndex];

        const title = activity.dataset.title || "ภาพกิจกรรม";
        const image = activity.dataset.image || "";
        const description = activity.dataset.description || "";

        modalTitle.textContent = title;
        modalDescription.textContent = description;

        modalImage.src = image;
        modalImage.alt = title;

        modalCounter.textContent =
            `${currentIndex + 1} / ${activityButtons.length}`;
    }

    activityModal.addEventListener(
        "show.bs.modal",
        function (event) {

            const trigger = event.relatedTarget;

            const index = activityButtons.indexOf(trigger);

            showActivity(index >= 0 ? index : 0);
        }
    );

    previousButton.addEventListener("click", function () {
        showActivity(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        showActivity(currentIndex + 1);
    });

    // รองรับปุ่มลูกศรบนคีย์บอร์ด
    document.addEventListener("keydown", function (event) {

        if (!activityModal.classList.contains("show")) {
            return;
        }

        if (event.key === "ArrowLeft") {
            showActivity(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showActivity(currentIndex + 1);
        }
    });

    // ล้างรูปเมื่อปิด Modal
    activityModal.addEventListener(
        "hidden.bs.modal",
        function () {
            modalImage.removeAttribute("src");
        }
    );

});

// ------------//


// Card Carousel //


document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("activityTrack");
    const prev = document.getElementById("activityPrev");
    const next = document.getElementById("activityNext");
    const pagination = document.getElementById("activityPagination");

    if (!track || !prev || !next || !pagination) return;

    const cards = Array.from(
        track.querySelectorAll(".activity-card")
    );

    let currentIndex = 0;

    function visibleCards() {
        if (window.innerWidth <= 575) return 1;
        if (window.innerWidth <= 991) return 2;
        return 3;
    }

    function maxIndex() {
        return Math.max(0, cards.length - visibleCards());
    }

    function renderPagination() {
        pagination.replaceChildren();

        for (let i = 0; i <= maxIndex(); i++) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute(
                "aria-label",
                `แสดงกิจกรรมตำแหน่งที่ ${i + 1}`
            );

            if (i === currentIndex) {
                dot.classList.add("active");
                dot.setAttribute("aria-current", "true");
            }

            dot.addEventListener("click", function () {
                currentIndex = i;
                updateCarousel();
            });

            pagination.appendChild(dot);
        }
    }

    function updateCarousel() {
        if (!cards.length) return;

        currentIndex = Math.min(
            Math.max(0, currentIndex),
            maxIndex()
        );

        const gap = parseFloat(
            getComputedStyle(track).gap
        ) || 0;

        const cardWidth = cards[0].getBoundingClientRect().width;

        track.style.transform =
            `translateX(-${currentIndex * (cardWidth + gap)}px)`;

        prev.disabled = currentIndex === 0;
        next.disabled = currentIndex === maxIndex();

        renderPagination();
    }

    prev.addEventListener("click", function () {
        currentIndex--;
        updateCarousel();
    });

    next.addEventListener("click", function () {
        currentIndex++;
        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();

    /* =====================================
       MODAL รายละเอียดกิจกรรม
       ===================================== */

    const modal = document.getElementById("activityModal");

    if (!modal) return;

    const modalImage = document.getElementById("activityModalImage");
    const modalTitle = document.getElementById("activityModalTitle");
    const modalDate = document.getElementById("activityModalDate");
    const modalDescription = document.getElementById(
        "activityModalDescription"
    );

    modal.addEventListener("show.bs.modal", function (event) {
        const trigger = event.relatedTarget;
        if (!trigger) return;

        const title = trigger.dataset.title || "ภาพกิจกรรม";

        modalTitle.textContent = title;
        modalDate.textContent = trigger.dataset.date || "";
        modalDescription.textContent =
            trigger.dataset.description || "";

        modalImage.src = trigger.dataset.image || "";
        modalImage.alt = title;
    });

    modal.addEventListener("hidden.bs.modal", function () {
        modalImage.removeAttribute("src");
    });

});

//---------//