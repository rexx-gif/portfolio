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
async function submitForm(e) {
    if (e) e.preventDefault();
    const form = document.getElementById('cForm');
    const btn = document.getElementById('cfSubmit');
    const txt = document.getElementById('cfBtnText');
    const spin = document.getElementById('cfSpinner');

    btn.classList.add('loading');
    txt.style.display = 'none';
    spin.style.display = 'block';

    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // Convert to plain object

        const response = await fetch(form.action, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            btn.classList.remove('loading');
            btn.style.background = '#10b981';
            txt.style.display = 'block';
            txt.textContent = 'Terkirim! ✅';
            spin.style.display = 'none';
            form.reset();

            setTimeout(() => {
                btn.style.background = '';
                txt.textContent = 'Kirim Pesan 🚀';
            }, 3000);
        } else {
            const errorData = await response.json();
            console.error('Formspree Error:', errorData);
            throw new Error(errorData.error || 'Form submission failed');
        }
    } catch (error) {
        btn.classList.remove('loading');
        btn.style.background = '#ef4444';
        txt.style.display = 'block';
        txt.textContent = 'Gagal Mengirim ❌';
        spin.style.display = 'none';

        setTimeout(() => {
            btn.style.background = '';
            txt.textContent = 'Kirim Pesan 🚀';
        }, 3000);
    }
}

// Attach listener
const contactForm = document.getElementById('cForm');
if (contactForm) {
    contactForm.addEventListener('submit', submitForm);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   TRANSFORM & ANIMATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
// (Any specific transform animations go here)

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━
   MULTI-LANGUAGE SUPPORT (i18n)
━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const translations = {
    id: {
        "nav.about": "Tentang",
        "nav.skills": "Keahlian",
        "nav.work": "Karya",
        "nav.awards": "Penghargaan",
        "nav.hire": "Hubungi",
        "hero.avail": "Siap untuk Peluang",
        "hero.sub": "Siswa SMK RPL & Flutter Developer yang berdedikasi membangun aplikasi mobile yang bersih, fungsional, dan berorientasi pengguna.",
        "hero.cta": "Lihat Karya",
        "hero.cv": "Unduh CV",
        "about.tag": "{ bio }",
        "about.sec.tag": "{ about me }",
        "about.sec.title": "Mengenal <span class=\"sec-accent\">&amp;</span><br>Profil Saya",
        "about.bio": "Halo! Saya <em>Septiyan Bintang</em>, seorang <strong>Flutter Mobile Developer</strong> & siswa RPL di SMKN 1 Bondowoso yang berdedikasi membangun aplikasi mobile yang indah dan berperforma tinggi. Bagi saya, aplikasi yang baik bukan hanya soal fungsionalitas — tapi juga tentang <em>pengalaman pengguna</em> yang mulus.",
        "about.quote": "Saya tidak hanya belajar coding — saya belajar cara berpikir seperti seorang engineer.",
        "about.focus": "🎯 Fokus: Mobile & Frontend Dev",
        "about.loc": "📍 Bondowoso, Jawa Timur",
        "about.intern": "🔍 Siap untuk Magang",
        "passion.tag": "{ passion }",
        "passion.mobile.title": "Mobile Development",
        "passion.mobile.desc": "Membangun aplikasi lintas platform yang performan dengan Flutter & Dart.",
        "passion.design.title": "UI/UX Design",
        "passion.design.desc": "Merancang pengalaman digital yang intuitif dan estetik lewat Figma.",
        "passion.solve.title": "Problem Solving",
        "passion.solve.desc": "Senang memecah masalah kompleks menjadi solusi kode yang bersih.",
        "stat.projects": "Projects selesai",
        "stat.certs": "Sertifikat",
        "stat.years": "Tahun coding",
        "stat.spirit": "% Semangat",
        "edu.tag": "{ education }",
        "edu.course": "Rekayasa Perangkat Lunak",
        "skills.tag": "{ what i know }",
        "skills.sec.title": "Stack <span class=\"sec-accent\">&amp;</span><br>Keahlian",
        "work.sec.tag": "{ recent work }",
        "work.sec.title": "Proyek <span class=\"sec-accent\">&amp;</span><br>Karya Pilihan",
        "award.sec.tag": "{ achievements }",
        "award.sec.title": "Sertifikat <span class=\"sec-accent\">&amp;</span><br>Penghargaan",
        "proj1.badge": "Featured ✦",
        "proj1.desc": "Website manajemen perpustakaan modern untuk efisiensi peminjaman buku.",
        "proj2.desc": "Platform reservasi wisata lokal dengan sistem booking yang mudah dan cepat.",
        "proj3.desc": "Eksplorasi desain UI/UX untuk aplikasi marketplace elektronik yang user-friendly.",
        "proj4.badge": "Open Source",
        "proj4.desc": "Digitalisasi warung tradisional melalui platform e-commerce nusantara.",
        "proj.demo": "Live Demo ↗",
        "proj.figma": "Lihat Figma ↗",
        "contact.tag": "{ get in touch }",
        "contact.h2": "Yuk, Bangun<br><em>Sesuatu</em><br>yang Keren<span class=\"accent-dot\">.</span>",
        "contact.title": "Yuk, Bangun Sesuatu yang Keren.",
        "contact.body": "Punya ide proyek, butuh partner coding, atau sekadar ingin ngobrol soal teknologi? Pintu saya selalu terbuka.",
        "contact.sub": "Punya ide proyek, butuh partner coding, atau sekadar ingin ngobrol soal teknologi? Kirim pesan saja!",
        "contact.name": "Nama Kamu",
        "contact.msg": "Pesan",
        "contact.send": "Kirim Pesan 🚀"
    },
    en: {
        "nav.about": "About",
        "nav.skills": "Skills",
        "nav.work": "Work",
        "nav.awards": "Awards",
        "nav.hire": "Hire Me",
        "hero.avail": "Open to Opportunities",
        "hero.sub": "SMK RPL student & Flutter Developer dedicated to building clean, functional, and user-oriented mobile applications.",
        "hero.cta": "View Work",
        "hero.cv": "Download CV",
        "about.tag": "{ bio }",
        "about.sec.tag": "{ about me }",
        "about.sec.title": "Discover <span class=\"sec-accent\">&amp;</span><br>My Profile",
        "about.bio": "Hello! I am <em>Septiyan Bintang</em>, a <strong>Flutter Mobile Developer</strong> & CS student at SMKN 1 Bondowoso dedicated to building beautiful and high-performance mobile apps. For me, a good app is not just about functionality — it's about a seamless <em>user experience</em>.",
        "about.quote": "I don't just learn to code — I learn how to think like an engineer.",
        "about.focus": "🎯 Focus: Mobile & Frontend Dev",
        "about.loc": "📍 Bondowoso, ID",
        "about.intern": "🔍 Open to Internship",
        "passion.tag": "{ passion }",
        "passion.mobile.title": "Mobile Development",
        "passion.mobile.desc": "Building high-performance cross-platform apps with Flutter & Dart.",
        "passion.design.title": "UI/UX Design",
        "passion.design.desc": "Designing intuitive and aesthetic digital experiences using Figma.",
        "passion.solve.title": "Problem Solving",
        "passion.solve.desc": "Enjoy breaking down complex problems into clean code solutions.",
        "stat.projects": "Projects completed",
        "stat.certs": "Certificates",
        "stat.years": "Years coding",
        "stat.spirit": "% Spirit",
        "edu.tag": "{ education }",
        "edu.course": "Software Engineering",
        "edu.year": "2022 — 2025",
        "skills.tag": "{ what i know }",
        "skills.sec.title": "Stack <span class=\"sec-accent\">&amp;</span><br>Expertise",
        "work.sec.tag": "{ recent work }",
        "work.sec.title": "Projects <span class=\"sec-accent\">&amp;</span><br>Selected Work",
        "award.sec.tag": "{ achievements }",
        "award.sec.title": "Certificates <span class=\"sec-accent\">&amp;</span><br>Awards",
        "proj1.badge": "Featured ✦",
        "proj1.desc": "Modern library management website for efficient book lending processes.",
        "proj2.desc": "Local travel reservation platform with an easy and fast booking system.",
        "proj3.desc": "UI/UX design exploration for a user-friendly electronics marketplace app.",
        "proj4.badge": "Open Source",
        "proj4.desc": "Digitalizing traditional shops through an Indonesian e-commerce platform.",
        "proj.demo": "Live Demo ↗",
        "proj.figma": "View Figma ↗",
        "contact.tag": "{ get in touch }",
        "contact.h2": "Let's Build<br><em>Something</em><br>Cool<span class=\"accent-dot\">.</span>",
        "contact.title": "Let's Build Something Cool.",
        "contact.body": "Have a project idea, need a coding partner, or just want to chat about tech? My door is always open.",
        "contact.sub": "Have a project idea, need a coding partner, or just want to chat about tech? Drop a message!",
        "contact.name": "Your Name",
        "contact.msg": "Message",
        "contact.send": "Send Message 🚀"
    }
};

// Auto-detect browser language if not set
function getInitialLang() {
    const saved = localStorage.getItem('portfolioLang');
    if (saved) return saved;
    return navigator.language.startsWith('id') ? 'id' : 'en';
}

let currentLang = getInitialLang();

function updateContent() {
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (translations[currentLang][key]) {
            // Use innerHTML for keys that might contain formatting (em, strong, span, br)
            if (key.includes('.bio') || key.includes('.sub') || key.includes('.desc') || key.includes('.title') || key.includes('.h2') || key.includes('.sec.title')) {
                el.innerHTML = translations[currentLang][key];
            } else {
                el.textContent = translations[currentLang][key];
            }
        }
    });

    // Update toggle button text
    const langLabel = document.getElementById('langText');
    if (langLabel) {
        langLabel.textContent = currentLang === 'id' ? 'EN' : 'ID';
    }

    // Specific placeholders
    if (currentLang === 'en') {
        document.querySelector('input[name="name"]')?.setAttribute('placeholder', 'Your Name');
        document.querySelector('textarea[name="message"]')?.setAttribute('placeholder', 'Hey Septiyan, I want to talk about...');
    } else {
        document.querySelector('input[name="name"]')?.setAttribute('placeholder', 'John Doe');
        document.querySelector('textarea[name="message"]')?.setAttribute('placeholder', 'Hei Septiyan, saya ingin ngobrol soal...');
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
}

const langToggleBtn = document.getElementById('langToggle');
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'id' ? 'en' : 'id';
        localStorage.setItem('portfolioLang', currentLang);
        updateContent();
    });
}

// Initial load
document.addEventListener('DOMContentLoaded', updateContent);