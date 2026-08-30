/* ============================================================
   choijiwoo_PORTFOLIO — 2026 트렌드 인터랙션 스크립트
   ============================================================ */

/* ---------- 다크모드 토글 (localStorage에 저장) ---------- */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ---------- 네비게이션: 스크롤 배경 + 스크롤스파이 + 스무스스크롤 ---------- */
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  let current = sections[0]?.id;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
});

/* ---------- 모바일 메뉴 토글 ---------- */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});
navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinksEl.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', '메뉴 열기');
}));

/* ---------- 프로젝트 카드 전체 클릭 시 이동 ---------- */
document.querySelectorAll('.project-card.is-clickable').forEach(card => {
  const openProject = () => {
    const url = card.dataset.goto;
    if (!url) return;
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (opened) opened.opener = null;
  };
  card.setAttribute('role', 'link');
  card.tabIndex = 0;
  card.setAttribute('aria-label', `${card.querySelector('h3')?.textContent.trim() || '프로젝트'} 새 창에서 보기`);
  card.addEventListener('click', openProject);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject();
    }
  });
  card.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', (e) => e.stopPropagation());
  });
});

/* ---------- 프로젝트 상세보기(트러블슈팅) 모달 ---------- */
const stories = {
  'trippick-site': {
    tag: 'TRIPPICK · 고객 예약 사이트',
    title: '예약 플로우 단절 문제',
    problem: '로그인, 상세페이지, 예약, 결제가 각각 독립된 화면으로 흩어져 있어 사용자가 흐름을 이어가기 어려웠습니다.',
    solve: 'index → detail → booking → payment로 이어지는 단일 흐름을 설계하고, 각 단계마다 이전 선택 정보(날짜·사이트타입)를 유지하도록 페이지 구조를 재정리했습니다.'
  },
  'trippick-host': {
    tag: 'TRIPPICK HOST · 운영자 콘솔',
    title: '예약 상태 실시간 반영 문제',
    problem: '예약 상태를 변경해도 화면의 상태 배지(pill)가 즉시 업데이트되지 않아 운영자가 새로고침을 반복해야 했습니다.',
    solve: '상태 셀렉트박스에 data-pill-class 속성을 매핑해, change 이벤트 발생 시 JS가 배지의 클래스와 텍스트를 즉시 교체하도록 구현해 새로고침 없이 반영되게 했습니다.'
  },
  'danggeun': {
    tag: '당근부동산 리디자인',
    title: '필터-카드 렌더링 동기화 문제',
    problem: '카테고리 필터 칩을 클릭할 때마다 매물 카드 목록을 다시 그려야 했는데, 클릭 이벤트가 카드마다 중복 등록되는 문제가 있었습니다.',
    solve: '카드 렌더링 함수를 분리하고, 렌더링 직후 이벤트를 다시 바인딩하는 구조로 변경해 중복 등록 없이 필터마다 안정적으로 동작하도록 했습니다.'
  }
};

const modalBackdrop = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
let modalReturnFocus = null;

function focusableElements(container) {
  return Array.from(container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'));
}

function trapDialogFocus(event, container) {
  if (event.key !== 'Tab') return;
  const focusable = focusableElements(container);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function closeStoryModal() {
  if (!modalBackdrop.classList.contains('open')) return;
  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('dialog-open');
  modalReturnFocus?.focus();
}

document.querySelectorAll('.overlay-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const s = stories[btn.dataset.story];
    if (!s) return;
    modalContent.innerHTML = `
      <h3>${s.tag}</h3>
      <h4 id="modalTitle">${s.title}</h4>
      <p><strong>문제 :</strong> ${s.problem}</p>
      <p><strong>해결 :</strong> ${s.solve}</p>
    `;
    modalReturnFocus = btn;
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('dialog-open');
    modalClose.focus();
  });
});
modalClose.addEventListener('click', closeStoryModal);
modalBackdrop.addEventListener('click', (event) => { if (event.target === modalBackdrop) closeStoryModal(); });
modalBackdrop.addEventListener('keydown', event => trapDialogFocus(event, modalBackdrop));

/* ---------- 디자인 워크 갤러리: 무한 자동 슬라이드 + 라이트박스 ---------- */
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const designTrack = document.getElementById('designTrack');
let designImages = [];
if (designTrack) {
  const originalItems = Array.from(designTrack.children);
  originalItems.forEach((item, i) => item.setAttribute('data-index', i));
  designImages = originalItems.map(item => {
    const img = item.querySelector('img');
    return { src: img.src, alt: img.alt };
  });
  // 끊김 없이 무한으로 흐르도록 아이템을 한 번 복제해 뒤에 이어붙임
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    designTrack.appendChild(clone);
  });
}

let currentIndex = 0;
let lightboxReturnFocus = null;
function openLightbox(index) {
  if (!designImages.length) return;
  currentIndex = (index + designImages.length) % designImages.length;
  const data = designImages[currentIndex];
  lightboxImg.src = data.src;
  lightboxImg.alt = data.alt;
  lightboxBackdrop.classList.add('open');
  lightboxBackdrop.setAttribute('aria-hidden', 'false');
  document.body.classList.add('dialog-open');
  lightboxClose.focus();
}

function closeLightbox() {
  if (!lightboxBackdrop.classList.contains('open')) return;
  lightboxBackdrop.classList.remove('open');
  lightboxBackdrop.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('dialog-open');
  lightboxImg.src = '';
  lightboxReturnFocus?.focus();
}

document.querySelectorAll('.design-item:not([aria-hidden="true"])').forEach(item => {
  item.setAttribute('role', 'button');
  item.tabIndex = 0;
  item.setAttribute('aria-label', `${item.querySelector('img')?.alt || '디자인 작업'} 확대보기`);
  const activate = () => {
    lightboxReturnFocus = item;
    openLightbox(Number(item.dataset.index));
  };
  item.addEventListener('click', activate);
  item.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activate();
    }
  });
});
lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(currentIndex - 1); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(currentIndex + 1); });
lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', (e) => { if (e.target === lightboxBackdrop) closeLightbox(); });
lightboxBackdrop.addEventListener('keydown', event => trapDialogFocus(event, lightboxBackdrop));
window.addEventListener('keydown', (e) => {
  if (modalBackdrop.classList.contains('open') && e.key === 'Escape') {
    closeStoryModal();
    return;
  }
  if (!lightboxBackdrop.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
  if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
});

// 모바일 스와이프로도 사진 넘기기
let touchStartX = 0;
lightboxBackdrop.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });
lightboxBackdrop.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) openLightbox(currentIndex + (dx < 0 ? 1 : -1));
}, { passive: true });

/* ---------- Scroll-driven reveal (IntersectionObserver) ---------- */
const revealSelectors = '.bento-card, .project-card, .contact-icons, .design-item';
document.querySelectorAll(revealSelectors).forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ============================================================
   Junni.co.jp 스타일 인터랙션 레이어
   - 텍스트 split 등장 애니메이션
   - 커튼(패널) 와이프 리빌
   - 버튼 마그네틱 효과
   - 카드 마우스 틸트
   ============================================================ */

/* ---------- 1) 타이틀 split-word 등장 애니메이션 ---------- */
function wrapWords(el) {
  const text = el.innerHTML;
  // <br>, <em>는 보존하면서 텍스트 노드만 단어 단위로 분리
  const html = text
    .split(/(<br>|<em>|<\/em>)/g)
    .map(chunk => {
      if (chunk === '<br>' || chunk === '<em>' || chunk === '</em>') return chunk;
      return chunk
        .split(' ')
        .filter(w => w.length)
        .map(word => `<span class="split-word">${word}</span>`)
        .join(' ');
    })
    .join('');
  el.innerHTML = html;
}

document.querySelectorAll('[data-split]').forEach(el => {
  wrapWords(el);
  const words = el.querySelectorAll('.split-word');
  words.forEach((w, i) => w.style.setProperty('--i', i));
});

const splitIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.split-word').forEach(w => w.classList.add('in-view'));
      splitIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('[data-split]').forEach(el => splitIO.observe(el));

/* 히어로 타이틀은 즉시(로드 시) 등장 */
document.querySelectorAll('[data-split-hero]').forEach(el => {
  wrapWords(el);
  const words = el.querySelectorAll('.split-word');
  words.forEach((w, i) => w.style.setProperty('--i', i));
  requestAnimationFrame(() => {
    setTimeout(() => words.forEach(w => w.classList.add('in-view')), 100);
  });
});

/* ---------- 2) 커튼(패널) 와이프 리빌 ---------- */
document.querySelectorAll('.curtain-reveal').forEach(el => {
  const color = el.dataset.curtainColor;
  if (color) el.style.setProperty('--curtain-c', color);
});

const curtainIO = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      const delay = Array.from(entry.target.parentElement?.children || []).indexOf(entry.target) * 60;
      setTimeout(() => entry.target.classList.add('curtain-open'), Math.min(delay, 300));
      curtainIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.curtain-reveal').forEach(el => curtainIO.observe(el));

/* ---------- 3) 버튼 마그네틱 효과 ---------- */
if (!prefersReducedMotion) document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0,0)';
  });
});

/* ---------- 4) 카드 마우스 틸트 ---------- */
if (!prefersReducedMotion) document.querySelectorAll('.bento-card, .ai-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--rx', (px * 6).toFixed(2) + 'deg');
    card.style.setProperty('--ry', (-py * 6).toFixed(2) + 'deg');
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});
