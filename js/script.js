/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   CURSOR
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ring = document.getElementById('curRing');
const dot  = document.getElementById('curDot');

let mx = 0, my = 0, rx = 0, ry = 0;

window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
});

(function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, [data-acc], .cert-card, .pcard, .soc-item, .bento').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   LOADER
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('gone');
    }, 1600);
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   NAVBAR & MOBILE MENU
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

if (navToggle) {
    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    });
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   REVEAL ON SCROLL
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const revEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revEls.forEach(el => revObs.observe(el));

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   COUNT-UP NUMBERS
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function countUp(el, target, duration = 1400) {
    let start = 0;
    const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    };
    requestAnimationFrame(step);
}

const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('[data-count]').forEach(el => {
                countUp(el, parseInt(el.dataset.count));
            });
            countObs.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.bento-stats').forEach(el => countObs.observe(el));

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   SKILL ACCORDION
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.querySelectorAll('[data-acc]').forEach(item => {
    const head = item.querySelector('.acc-head');
    head.addEventListener('click', () => {
        const isOpen = item.classList.contains('acc-open');
        // Close all
        document.querySelectorAll('.acc-item.acc-open').forEach(i => i.classList.remove('acc-open'));
        // Open clicked if it was closed
        if (!isOpen) item.classList.add('acc-open');
    });
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROJECT FILTER
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const pfBtns  = document.querySelectorAll('.pf-btn');
const pItems  = document.querySelectorAll('.proj-item');

pfBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        pfBtns.forEach(b => b.classList.remove('pf-active'));
        btn.classList.add('pf-active');
        const f = btn.dataset.filter;

        pItems.forEach(item => {
            const show = f === 'all' || item.dataset.filter === f;
            item.style.transition = 'opacity .35s, transform .35s';
            if (show) {
                item.style.display = 'flex';
                requestAnimationFrame(() => { 
                    item.style.opacity = '1'; 
                    item.style.transform = ''; 
                });
            } else {
                item.style.opacity = '0'; 
                item.style.transform = 'translateY(10px) scale(0.95)';
                setTimeout(() => { item.style.display = 'none'; }, 350);
            }
        });
    });
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   CERTIFICATE SCROLL BUTTONS
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const certTrack = document.getElementById('certTrack');
document.getElementById('certPrev').addEventListener('click', () => {
    certTrack.scrollBy({ left: -300, behavior: 'smooth' });
});
document.getElementById('certNext').addEventListener('click', () => {
    certTrack.scrollBy({ left: 300, behavior: 'smooth' });
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONTACT FORM
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function submitForm(e) {
    e.preventDefault();
    const btn = document.getElementById('cfSubmit');
    const txt = document.getElementById('cfBtnText');
    const spin= document.getElementById('cfSpinner');

    btn.classList.add('loading');
    txt.style.display = 'none';
    spin.style.display = 'block';

    setTimeout(() => {
        btn.classList.remove('loading');
        btn.style.background = '#10b981';
        txt.style.display = 'block';
        txt.textContent = 'Terkirim! ✅';
        spin.style.display = 'none';
        e.target.reset();

        setTimeout(() => {
            btn.style.background = '';
            txt.textContent = 'Kirim Pesan 🚀';
        }, 3000);
    }, 2000);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   PARALLAX BLOBS (subtle)
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelectorAll('.h-blob').forEach((b, i) => {
        const d = (i + 1) * 0.4;
        b.style.transform = `translate(${x*d}px, ${y*d}px)`;
    });
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   CV BUTTON EASTER EGG
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
document.getElementById('cvBtn').addEventListener('click', e => {
    e.preventDefault();
    const el = e.target;
    const orig = el.textContent;
    el.textContent = '📄 Segera!';
    setTimeout(() => el.textContent = orig, 2000);
});

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROFILE PHOTO TILT
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const photoFrame = document.querySelector('.photo-frame');
if (photoFrame) {
    photoFrame.addEventListener('mousemove', e => {
        const rect = photoFrame.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const rx_ = ((e.clientY - cy) / rect.height) * 12;
        const ry_ = ((e.clientX - cx) / rect.width)  * -12;
        photoFrame.style.transform = `perspective(600px) rotateX(${rx_}deg) rotateY(${ry_}deg) scale(1.03)`;
    });
    photoFrame.addEventListener('mouseleave', () => {
        photoFrame.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
    });
}