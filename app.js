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

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/3878e8dba7de3ed14f707d506bb03f43';
const interestForm = document.querySelector('#interest-form');
const formMessage = document.querySelector('#form-message');
interestForm.addEventListener('submit', async event => {
  event.preventDefault();
  const button = interestForm.querySelector('button[type="submit"]');
  const name = interestForm.elements.name.value.trim();
  const phone = interestForm.elements.phone.value.trim();
  if (!/^[0-9+\-\s()]{9,16}$/.test(phone)) {
    formMessage.textContent = '연락처를 숫자로 정확히 입력해 주세요.';
    return;
  }
  button.disabled = true;
  formMessage.textContent = '접수 중입니다…';
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: '[에일린의 뜰] 관심 고객 등록',
        _template: 'table',
        _captcha: 'false',
        _honey: interestForm.elements._honey ? interestForm.elements._honey.value : '',
        이름: name,
        연락처: phone,
        접수시각: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === 'false' || data.success === false) throw new Error('submit failed');
    interestForm.reset();
    formMessage.textContent = '관심 고객 등록이 접수되었습니다. 확인 후 연락드리겠습니다.';
  } catch (e) {
    formMessage.textContent = '접수 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 대표번호로 문의해 주세요.';
  } finally {
    button.disabled = false;
  }
});

// 주소에 #contact 같은 위치가 있으면 이미지 로딩이 끝난 뒤 다시 정확히 맞춰 줍니다.
if (location.hash.length > 1) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) {
    const align = () => target.scrollIntoView({ behavior: 'auto', block: 'start' });
    requestAnimationFrame(align);
    addEventListener('load', align, { once: true });
  }
}
