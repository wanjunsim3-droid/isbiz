const config = window.SITE_CONFIG || {};
document.querySelectorAll('[data-project]').forEach(el => el.textContent = config.projectName || '프로젝트명 입력');
document.querySelectorAll('[data-phone]').forEach(el => el.textContent = config.phone || '000-0000-0000');
document.querySelectorAll('[data-phone-link]').forEach(el => el.href = `tel:${config.phoneHref || ''}`);
document.querySelectorAll('[data-address]').forEach(el => el.textContent = config.address || '현장 주소 입력');
document.querySelectorAll('[data-privacy-manager]').forEach(el => el.textContent = config.privacyManager || '운영 담당자 확인 필요');

const header = document.querySelector('.site-header');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20), { passive: true });

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); });

document.querySelector('#interest-form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#form-message').textContent = '시연용 폼입니다. 실제 접수 기능은 운영 서버 연결 후 활성화됩니다.';
});
