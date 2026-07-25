/* ============================================================
   choijiwoo_PORTFOLIO — 2026 트렌드 인터랙션 스크립트
   ============================================================ */

/* ---------- 다크모드 토글 (localStorage에 저장) ---------- */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

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

/* ---------- 커스텀 커서 ---------- */
const cursorDot = document.getElementById('cursorDot');
window.addEventListener('mousemove', (e) => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => { cursorDot.style.width = '30px'; cursorDot.style.height = '30px'; cursorDot.style.background = 'rgba(91,79,233,.15)'; });
  el.addEventListener('mouseleave', () => { cursorDot.style.width = '16px'; cursorDot.style.height = '16px'; cursorDot.style.background = 'transparent'; });
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
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- 모바일 메뉴 토글 ---------- */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinksEl.classList.remove('open')));

/* ---------- 프로젝트 카드 전체 클릭 시 이동 ---------- */
document.querySelectorAll('.project-card.is-clickable').forEach(card => {
  card.addEventListener('click', () => {
    const url = card.dataset.goto;
    if (url) window.open(url, '_blank');
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

document.querySelectorAll('.overlay-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const s = stories[btn.dataset.story];
    if (!s) return;
    modalContent.innerHTML = `
      <h3>${s.tag}</h3>
      <h4>${s.title}</h4>
      <p><strong>문제 :</strong> ${s.problem}</p>
      <p><strong>해결 :</strong> ${s.solve}</p>
    `;
    modalBackdrop.classList.add('open');
  });
});
modalClose.addEventListener('click', () => modalBackdrop.classList.remove('open'));
modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) modalBackdrop.classList.remove('open'); });

/* ---------- Scroll-driven reveal (IntersectionObserver) ---------- */
const revealSelectors = '.bento-card, .project-card, .contact-icons';
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