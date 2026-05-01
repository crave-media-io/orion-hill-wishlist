(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  //  CONFIGURATION
  // ═══════════════════════════════════════════════════════════════

  const scriptTag = document.currentScript || document.querySelector('script[data-client-id][src*="wishlist"]');

  const CONFIG = {
    clientId:    scriptTag?.getAttribute('data-client-id') || '',
    ga4Id:       scriptTag?.getAttribute('data-ga4-id') || '',
    apiUrl:      scriptTag?.getAttribute('data-api-url') || 'https://orion-hill-wishlist.vercel.app',
    logoUrl:     scriptTag?.getAttribute('data-logo-url') || '',
    containerId: scriptTag?.getAttribute('data-container') || 'ohwl-wishlist-widget',
    maxDates:    5
  };

  const DEFAULT_LOGO = 'data:image/webp;base64,UklGRpYKAABXRUJQVlA4WAoAAAAYAAAAjAAAjAAAVlA4TLUJAAAvjAAjEIcgEEgi3B9oiMGZDoFACje4RA2O4YAkSXLcpgcY7ANM//+7JEGalO8R/Z8AfF1V67Wq4r8OqQ7j0a55tFFT+F9iGU5ar0kF+6KpdiN9lPg/SOrO1XPEX8bcF70n+XVpkKMEvDGUQY70w0Jzjix4r+RBb+E3qXEVwdulLJr+njxpim+qcebfoos94Luhc+nviMYe8O3QafE3SKcpHo+qepJrrfkPADU2+QHJPeMPUyfrISZP+OPsnr4mg03wt92ZcDT8uTQO+VTypfjrmujxJYAuTx9q7IK7oZiNIluonPJQqHIH0tm+ItMzbrehiJ2etzA4HkLyKjeA7FM+EX1G3O4FR3XmLZmsD1Xa0DuI0+MHMofgdpo4z3S5ikB0JrQHxBnwoAzm12V2PDjrBYzlSgEkeqwPVHYcrcoW0Jlf1pnxYKBeJdoeKme7J85wAveyh8z+qs6MJ5XlCrfQyXuVHaeZlvMeMvuLOjMe6ht2S+Y9cc5ysqi4ndlf05mxXeJFoMtGPxG1oQIAwfVOZUO2DGQaHszsL8nM2JXecT1ZrjydhFr0DEFuiLsAyJYX9Qlk5ldkZuyGSdtI9HiWDX/eWXHaaXg2M78gsmG7x8l+hU6Ph2jyV3XQ5WxRN0LcQWf8s+ADd4MzX6E4e0q9C/489BVOMg2bYnEHw8MfyZxyC0rGK0iuNQe8MtSTxbiD7nlH5vyj7gEPFrpcvT1IYcdup1veQPT+J4kJj3bOr0Rzhp1Oj9AdJKY/CN7wrEz2jwBqTa46PeJu8/CcTXkIwZmRvgHoVaZH3JZpjxVGPK6k5a9cZ3rEg5HlIfGKzdCsbKF5xMczGfFoc3mmL9nITnLsRBN8umomM56V1R9RJlxHC1Bn3Aj4uHQyYzvnKyTqE9NwLSYAInXjB/aOfVlyBbMHMsNGbzjOi/QT0NNWWmwbgfne6rjO5BBAaNZqrfYjIBvByDH0Cn3dygxXwXTRFd152vBrq3MppGwE5jur41oE0knLAIJqlh+jk6y429eNzLBxmp0z4OcWkU5awO3AvGcdt8OkJyD+Fp1Oz3iy21ak3gMa2XX8FjQ2waPKuNMnHlXnkh8jE0/PviGen4FQ8WtzfSq7XGWXh1LF77X4kHi+so6HI35w8JZqewDdLgLTU7+50jKeTAxn2bGpg6T38MMQ8LDns9E3Mt3MSc+vCy+6KXLVxxnzVfIMALE548t0fiXUq8yTRLmaAedhzndFsn4jlnklTIc2cZkyrmXFN8VOzvCieBLycJJygdkO1q5q2ECubzInOcN7BiT3RZJWWrpqdmDakJ3wKh4d762LJK0qgNCuEgEoZSPvxJctrjXeo5wtCW4LFSgL17pko+ibFp1kew8Mz64CNNvAmnIhE28M4RBSJmkjlfeMh6wBVneUXsNBV3pFnxEA5iJ90tN7SnqmGuB5B5nkNFuseKOQdtBmk6TgvXE+kx2gbiF0kjTFG8MipwuKdyTSJRxCfQN8Fg33lFDKHoCoeGnhUQNIOi1NAyDm8obWa9V7QlXiqzrWorPaSs7TCIiR7Q1PU7N/RpxHzctJ9uUJEYmk5894rvaZ3sckTZu3QZIWu6HS3dtnrH6oLDrpHgavMwpJzv8IhVyqPeVsnCc9JXLNVv6f0NLkqoOLvkhyOGuaJGnhQ+0rmDQnOTt3xwyNTPhqr1Y/I5Pj4GaTdHKNkklnb+MrtbavhJWVJL1xCOqas2nzaaTT41darfYRGP1w9OW8NHJSU/6IfchJunMVHvuFk6RR/5tmnNxc88Q76SSZ/pvsvLbFu87xmbI+Emrqc9CddJKLpJN+Qm8fWUX5jeakLXI4Tw+KkXL3abXU+A3qV2TyuJwkl/PY0iLpPPavCPULoeYTDpIN6IfFox2mfEIJMH0Bg5tT26hOrj7pPJ8ev5AIWP0Eqtkil/PUGlfp9EWug2d8sRrQxxdSiUDjtaJOQVgk6WQNovoGa3dGB+q8Fd4Q3H3yOHKtEagGILZWnOTqk2/ICWGy78wKKG/l/AJgui2SDQCCXABQ0icZ8MIKzCFVN6iAUG9k9ldEs+HOwbXWCmfF3dfg7D3jjWnYFOiGUgDMutddwyuOUiiqJQWcQZOgdrw2F4H0cFUnAHTbEZsBkt8CJS7PjrW+B0BoFdfWD5kbcc0E9Pl/7DMdhOlKVDWtWeQfCE3vJMoBs10BCHMIXhvqlejVa2u51SZOy9qJ3gC0t3xZTHB3lbPAuGGj1lot/rxs7GEvMpxhto1L/XkDsdNS22gTl2Xd+/lhRkCqh41VrgLTPf1xQAKAiuvEcIUx7rXy626Pgc3EcCPO1eWHSb4XmHaw2k6QxibSflgbcqstbBeXjeEWe8SMvytITzfEy5543QgDMmsu+Ompy1Z12UN1uUKJ+Omlm5nRdUO84qZ43ZA58on8pDRXUVXFbnW5g+pyhRBw2uMvCtAesC9ecVtW37jMtPCDAEgtIez0JfeQGe90Vxm/RsIB0CUbkRlPmu1J9wj0+GNs6klUbJrh0ciyk9cUAFN/S4tytl0Yn0HzsIGeAGSGn9IHxKA3gjc8LMt20LJ2ZgDhZ4Q8e6lJ254teQqRZQdaawQAnfIjAJkGxLlVGPF89bhz3eeIPyB2AJA5QpedyIq/tCn3igeZ8jmp7QCZU7Ap0/Cn4uOWUoGaPyYJqCdogt3h8jeIrHshegHQ67fiHIIUT/YrI/46M2/JHAAiFUCS70RbKvVeZsbfd8YdoBbN3nHw/ImIY/HWbkV2vLF73EKoVXG0Kh/IY4UDgjHciN7xTvO4dZ1dAGh6la4ESSdAvhHd8FKZHh8Qzzh6eVO0ioZno095C2R6vNcMx2gG6ektUK8jB3kg+hS8V6bHO5XxpAUCTeWPYryANQTN96JPwas78w3EfJCKlaQCgLRW8xPRGpqFC3VBb7cyO97eWW+cl4DWcgAQPAPFDqm2vDGSxjjjBWxUxd3KjvdndrlXJpBmA4DeAaADEAPGxrSa1sB1V9yVzowvqs94C6oA88HS4RhdEa+qjtZ60av7cbrim2F6vnXsOFGgtAwAjbZhAkjNz2WfAZ9tHPLAee1AdJyG7lejC6ADD8tgw5d1eXoKrYYyBUAVgFditFXloeRL8W1ptPAQgqqedC3t6i+DsQk+r5NVntmMGvH3UjkVP7G4l795ZXUv+JVSfeUvSV5eBT9UqnuVj0h1r4IfK9XZ9QPa6VXwi/PkKuFVoSzOjJ8d2+Ks8SWxTq4W8dtjW/Se4x/F3J2rRfyHoQynW8sqD4jmZk4fJeAfDbmak1xmvZ53s0XSreaAf1m11DrsfNRaVPFtAEVYSUa6AAAARXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAAvGQEA6AMAAC8ZAQDoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAI0AAAADoAQAAQAAAI0AAAAAAAAA';

  // ═══════════════════════════════════════════════════════════════
  //  STATE
  // ═══════════════════════════════════════════════════════════════

  const state = {
    currentStep: 1,
    selectedDates: [],
    calMonth: new Date().getMonth(),
    calYear: new Date().getFullYear(),
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
    scheduleTour: false,
    submitting: false,
    errors: {}
  };

  let container = null;

  // ═══════════════════════════════════════════════════════════════
  //  UTILITIES
  // ═══════════════════════════════════════════════════════════════

  function escapeHtml(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ═══════════════════════════════════════════════════════════════
  //  CALENDAR HELPERS
  // ═══════════════════════════════════════════════════════════════

  function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
  function getFirstDayOfMonth(y, m) { return new Date(y, m, 1).getDay(); }

  function isDatePast(y, m, d) {
    var t = new Date(); t.setHours(0,0,0,0);
    return new Date(y, m, d) < t;
  }

  function isTodayDate(y, m, d) {
    var t = new Date();
    return y === t.getFullYear() && m === t.getMonth() && d === t.getDate();
  }

  function dateKey(y, m, d) {
    return y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
  }

  function isSelected(y, m, d) {
    return state.selectedDates.indexOf(dateKey(y, m, d)) !== -1;
  }

  function formatDateShort(ds) {
    var p = ds.split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function formatDateLong(ds) {
    var p = ds.split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  function nextMonth(y, m) { return m === 11 ? { y: y + 1, m: 0 } : { y: y, m: m + 1 }; }

  function canGoPrev() {
    var t = new Date();
    return state.calYear > t.getFullYear() || (state.calYear === t.getFullYear() && state.calMonth > t.getMonth());
  }

  // ═══════════════════════════════════════════════════════════════
  //  FONT LOADING
  // ═══════════════════════════════════════════════════════════════

  function loadFonts() {
    if (!document.querySelector('link[href*="fonts.googleapis.com"][rel="preconnect"]')) {
      var pc1 = document.createElement('link'); pc1.rel = 'preconnect'; pc1.href = 'https://fonts.googleapis.com'; document.head.appendChild(pc1);
      var pc2 = document.createElement('link'); pc2.rel = 'preconnect'; pc2.href = 'https://fonts.gstatic.com'; pc2.crossOrigin = ''; document.head.appendChild(pc2);
    }
    if (!document.querySelector('link[href*="Playfair+Display"]')) {
      var l = document.createElement('link'); l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap';
      document.head.appendChild(l);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  CSS STYLES
  // ═══════════════════════════════════════════════════════════════

  function getStyles() {
    return '\
.ohwl-widget *{box-sizing:border-box;margin:0;padding:0}\
.ohwl-widget{--cream:#FAF6EE;--cream2:#F1EADB;--ivory:#FFFDF8;--forest:#2E3D2E;--forest-dk:#1F2A1F;--moss:#5A6B4E;--brass:#B08B4A;--brass-dk:#8E6F38;--stone:#6B6860;--espresso:#2A2420;--line:rgba(42,36,32,0.12);\
display:grid;grid-template-columns:280px 1fr;min-height:680px;border-radius:16px;overflow:hidden;\
box-shadow:0 20px 60px -20px rgba(42,36,32,0.25),0 8px 24px -12px rgba(42,36,32,0.18);\
font-family:"Inter",system-ui,-apple-system,sans-serif;color:var(--espresso);line-height:1.55;position:relative}\
\
.ohwl-sidebar{background:var(--forest-dk);color:var(--cream);padding:36px 28px;display:flex;flex-direction:column;position:relative;overflow:hidden}\
.ohwl-sidebar::before{content:"";position:absolute;inset:0;\
background:radial-gradient(ellipse at 80% 10%,rgba(255,245,210,0.08),transparent 50%),radial-gradient(ellipse at 10% 90%,rgba(176,139,74,0.12),transparent 60%);\
pointer-events:none}\
.ohwl-sidebar>*{position:relative;z-index:1}\
.ohwl-logo{max-width:140px;height:auto;margin-bottom:28px;display:block}\
.ohwl-brand-text{font-family:"Playfair Display",serif;font-size:14px;letter-spacing:5px;text-transform:uppercase;color:var(--brass);margin-bottom:28px}\
.ohwl-sidebar-title{font-family:"Playfair Display",serif;font-weight:400;font-size:26px;line-height:1.2;margin-bottom:12px;letter-spacing:-0.3px}\
.ohwl-sidebar-intro{font-size:13px;opacity:0.75;line-height:1.7;margin-bottom:32px}\
\
.ohwl-steps{list-style:none;display:flex;flex-direction:column;gap:4px}\
.ohwl-step{display:flex;align-items:flex-start;gap:14px;padding:12px;border-radius:8px;transition:background 0.25s}\
.ohwl-step.ohwl-active{background:rgba(176,139,74,0.12)}\
.ohwl-step-num{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;flex-shrink:0;\
background:rgba(255,255,255,0.08);color:rgba(250,246,238,0.6);transition:all 0.25s}\
.ohwl-step.ohwl-done .ohwl-step-num,.ohwl-step.ohwl-active .ohwl-step-num{background:var(--brass);color:var(--forest-dk)}\
.ohwl-step-info{min-width:0}\
.ohwl-step-title{font-size:13px;font-weight:500;line-height:1.4}\
.ohwl-step-desc{font-size:11px;opacity:0.6;margin-top:2px}\
.ohwl-step:not(.ohwl-active):not(.ohwl-done) .ohwl-step-title{opacity:0.6}\
\
.ohwl-sidebar-footer{margin-top:auto;font-size:11px;opacity:0.4;line-height:1.6;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1)}\
\
.ohwl-mobile-dots{display:none}\
\
.ohwl-main{background:var(--ivory);padding:40px 48px;display:flex;flex-direction:column;overflow-y:auto}\
\
.ohwl-progress{display:flex;justify-content:space-between;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--stone);margin-bottom:8px}\
.ohwl-progress-cur{color:var(--brass-dk);font-weight:600}\
.ohwl-bar{height:3px;background:var(--cream2);border-radius:2px;overflow:hidden;margin-bottom:28px}\
.ohwl-bar-fill{height:100%;background:var(--brass);transition:width 0.4s ease;border-radius:2px}\
\
.ohwl-title{font-family:"Playfair Display",serif;font-weight:500;font-size:26px;margin-bottom:6px;color:var(--forest-dk)}\
.ohwl-sub{color:var(--stone);font-size:14px;margin-bottom:24px}\
\
.ohwl-content{display:none;flex-direction:column;flex:1}\
.ohwl-content.ohwl-visible{display:flex;animation:ohwlFadeIn 0.3s ease}\
@keyframes ohwlFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}\
\
.ohwl-cal-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}\
.ohwl-cal-range{font-family:"Playfair Display",serif;font-size:17px;color:var(--forest-dk)}\
.ohwl-cal-arrow{background:transparent;border:1px solid var(--line);width:34px;height:34px;border-radius:50%;cursor:pointer;color:var(--forest-dk);font-size:16px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;font-family:inherit}\
.ohwl-cal-arrow:hover:not(:disabled){background:var(--cream2);border-color:var(--brass)}\
.ohwl-cal-arrow:disabled{opacity:0.3;cursor:default}\
\
.ohwl-cal-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}\
.ohwl-cal{background:white;border:1px solid var(--line);border-radius:12px;padding:18px}\
.ohwl-cal-month{font-family:"Playfair Display",serif;font-size:15px;color:var(--forest-dk);margin-bottom:12px;text-align:center}\
.ohwl-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}\
.ohwl-dow{text-align:center;font-size:9px;letter-spacing:1px;color:var(--stone);padding-bottom:8px;font-weight:500;text-transform:uppercase}\
.ohwl-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:12px;border-radius:6px;cursor:pointer;color:var(--espresso);transition:all 0.15s;user-select:none}\
.ohwl-day:hover:not(.ohwl-muted):not(.ohwl-sel):not(.ohwl-maxed){background:var(--cream2)}\
.ohwl-day.ohwl-muted{color:rgba(42,36,32,0.2);cursor:default;pointer-events:none}\
.ohwl-day.ohwl-sel{background:var(--brass);color:white;font-weight:500}\
.ohwl-day.ohwl-sel:hover{background:var(--brass-dk)}\
.ohwl-day.ohwl-today:not(.ohwl-sel){border:1px solid var(--brass)}\
.ohwl-day.ohwl-maxed{color:rgba(42,36,32,0.25);cursor:default}\
\
.ohwl-selected-bar{background:var(--cream);border:1px dashed var(--line);border-radius:10px;padding:14px 18px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;min-height:52px;margin-bottom:8px}\
.ohwl-selected-label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--stone);white-space:nowrap}\
.ohwl-selected-hint{font-size:12px;color:var(--stone);opacity:0.7;font-style:italic}\
.ohwl-pills{display:flex;gap:6px;flex-wrap:wrap}\
.ohwl-pill{background:var(--forest);color:var(--cream);padding:5px 10px;border-radius:20px;font-size:12px;display:inline-flex;align-items:center;gap:6px;animation:ohwlFadeIn 0.2s ease}\
.ohwl-pill-x{cursor:pointer;opacity:0.6;font-size:15px;line-height:1;transition:opacity 0.15s}\
.ohwl-pill-x:hover{opacity:1}\
\
.ohwl-form{display:grid;grid-template-columns:1fr 1fr;gap:16px;position:relative}\
.ohwl-field{display:flex;flex-direction:column;gap:5px}\
.ohwl-field.ohwl-full{grid-column:1/-1}\
.ohwl-field label{font-size:13px;font-weight:500;color:var(--espresso)}\
.ohwl-req{color:var(--brass)}\
.ohwl-opt{font-weight:400;color:var(--stone);font-size:12px}\
.ohwl-field input,.ohwl-field textarea{width:100%;background:white;border:1px solid var(--line);border-radius:10px;padding:13px 16px;font-size:14px;color:var(--espresso);font-family:"Inter",system-ui,sans-serif;transition:border-color 0.2s,box-shadow 0.2s}\
.ohwl-field input:focus,.ohwl-field textarea:focus{outline:none;border-color:var(--brass);box-shadow:0 0 0 3px rgba(176,139,74,0.1)}\
.ohwl-field input::placeholder,.ohwl-field textarea::placeholder{color:rgba(42,36,32,0.4)}\
.ohwl-field textarea{resize:vertical;min-height:90px}\
.ohwl-field input.ohwl-invalid,.ohwl-field textarea.ohwl-invalid{border-color:#c0392b}\
.ohwl-err{font-size:12px;color:#c0392b;min-height:16px}\
\
.ohwl-review-card{background:white;border:1px solid var(--line);border-radius:12px;padding:20px 24px;margin-bottom:14px}\
.ohwl-review-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--line)}\
.ohwl-review-label{font-family:"Playfair Display",serif;font-size:16px;color:var(--forest-dk)}\
.ohwl-review-edit{background:none;border:none;color:var(--brass);font-size:12px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;font-family:inherit;font-weight:500;padding:4px 8px;border-radius:4px;transition:background 0.15s}\
.ohwl-review-edit:hover{background:rgba(176,139,74,0.1)}\
.ohwl-review-date{padding:6px 0;font-size:14px;color:var(--espresso);border-bottom:1px solid rgba(42,36,32,0.06)}\
.ohwl-review-date:last-child{border-bottom:none}\
.ohwl-review-row{padding:5px 0;font-size:14px;color:var(--espresso)}\
.ohwl-review-row strong{color:var(--stone);font-weight:500;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;display:block;margin-bottom:2px}\
\
.ohwl-tour{background:rgba(176,139,74,0.06);border:1px solid rgba(176,139,74,0.2);border-radius:12px;padding:20px 24px;margin-top:4px}\
.ohwl-tour-label{display:flex;align-items:flex-start;gap:14px;cursor:pointer;font-size:14px}\
.ohwl-tour-label input[type="checkbox"]{width:20px;height:20px;margin-top:2px;flex-shrink:0;accent-color:var(--brass);cursor:pointer}\
.ohwl-tour-text strong{display:block;color:var(--forest-dk);font-size:15px;margin-bottom:4px}\
.ohwl-tour-text span{color:var(--stone);font-size:13px;line-height:1.5}\
\
.ohwl-actions{margin-top:auto;display:flex;justify-content:space-between;align-items:center;padding-top:20px;border-top:1px solid var(--line);gap:12px}\
.ohwl-btn-back{background:transparent;border:none;color:var(--stone);padding:14px 20px;font-size:13px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;font-family:inherit;transition:color 0.15s}\
.ohwl-btn-back:hover{color:var(--forest-dk)}\
.ohwl-btn-next,.ohwl-btn-submit{background:var(--brass);color:var(--cream);border:none;padding:15px 28px;font-size:13px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:10px;font-family:inherit;font-weight:500;transition:background 0.2s,transform 0.15s,opacity 0.2s;white-space:nowrap}\
.ohwl-btn-next:hover,.ohwl-btn-submit:hover{background:var(--brass-dk)}\
.ohwl-btn-next:disabled,.ohwl-btn-submit:disabled{opacity:0.5;cursor:default;transform:none}\
.ohwl-btn-next:not(:disabled):active,.ohwl-btn-submit:not(:disabled):active{transform:scale(0.98)}\
.ohwl-btn-submit{display:none;align-items:center;justify-content:center;gap:8px}\
.ohwl-spinner{width:18px;height:18px;animation:ohwlSpin 1s linear infinite}\
@keyframes ohwlSpin{to{transform:rotate(360deg)}}\
\
.ohwl-success-wrap{grid-column:1/-1;display:flex;align-items:center;justify-content:center;padding:60px 32px;background:var(--ivory);text-align:center}\
.ohwl-success{max-width:420px}\
.ohwl-check-wrap{width:88px;height:88px;margin:0 auto 24px;position:relative}\
.ohwl-circle-bg{position:absolute;inset:0;border-radius:50%;background:rgba(176,139,74,0.12);animation:ohwlScaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;transform:scale(0)}\
.ohwl-check-svg{position:relative;width:88px;height:88px;z-index:1}\
.ohwl-circle-stroke{fill:none;stroke:var(--brass);stroke-width:2.5;stroke-linecap:round;stroke-dasharray:251;stroke-dashoffset:251;animation:ohwlDraw 0.7s 0.3s ease-out forwards}\
.ohwl-check-stroke{fill:none;stroke:var(--brass);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:36;stroke-dashoffset:36;animation:ohwlDraw 0.35s 0.85s ease-out forwards}\
@keyframes ohwlScaleIn{to{transform:scale(1)}}\
@keyframes ohwlDraw{to{stroke-dashoffset:0}}\
.ohwl-success h3{font-family:"Playfair Display",serif;font-size:28px;font-weight:500;color:var(--forest-dk);margin-bottom:10px;opacity:0;animation:ohwlFadeIn 0.5s 1s ease forwards}\
.ohwl-success p{font-size:14px;color:var(--stone);line-height:1.7;opacity:0;animation:ohwlFadeIn 0.5s 1.1s ease forwards}\
\
.ohwl-error-banner{background:#fdf0f0;border:1px solid #f5c6cb;color:#721c24;padding:12px 16px;border-radius:10px;font-size:13px;text-align:center;margin-top:12px;display:none}\
\
@media(max-width:768px){\
.ohwl-widget{grid-template-columns:1fr;min-height:auto}\
.ohwl-sidebar{flex-direction:row;padding:16px 20px;align-items:center;gap:16px}\
.ohwl-sidebar-title,.ohwl-sidebar-intro,.ohwl-sidebar-footer,.ohwl-steps{display:none}\
.ohwl-logo{margin-bottom:0;max-width:100px}\
.ohwl-brand-text{margin-bottom:0;font-size:12px}\
.ohwl-mobile-dots{display:flex;gap:8px;margin-left:auto}\
.ohwl-mobile-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.15);transition:background 0.25s}\
.ohwl-mobile-dot.ohwl-dot-done{background:var(--brass)}\
.ohwl-mobile-dot.ohwl-dot-active{background:var(--brass);box-shadow:0 0 0 3px rgba(176,139,74,0.3)}\
.ohwl-main{padding:24px 20px}\
.ohwl-title{font-size:22px}\
.ohwl-cal-row{grid-template-columns:1fr}\
.ohwl-form{grid-template-columns:1fr}\
.ohwl-actions{flex-wrap:wrap}\
.ohwl-btn-back{padding:12px 16px;font-size:12px}\
.ohwl-btn-next,.ohwl-btn-submit{padding:14px 24px;font-size:12px;flex:1;min-width:0}\
}';
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDER CALENDAR GRID
  // ═══════════════════════════════════════════════════════════════

  function renderCalGrid(year, month) {
    var days = getDaysInMonth(year, month);
    var first = getFirstDayOfMonth(year, month);
    var today = new Date(); today.setHours(0,0,0,0);
    var atMax = state.selectedDates.length >= CONFIG.maxDates;

    var html = '<div class="ohwl-dow">S</div><div class="ohwl-dow">M</div><div class="ohwl-dow">T</div><div class="ohwl-dow">W</div><div class="ohwl-dow">T</div><div class="ohwl-dow">F</div><div class="ohwl-dow">S</div>';

    var prevM = month === 0 ? 11 : month - 1;
    var prevY = month === 0 ? year - 1 : year;
    var prevDays = getDaysInMonth(prevY, prevM);
    for (var i = first - 1; i >= 0; i--) {
      html += '<div class="ohwl-day ohwl-muted">' + (prevDays - i) + '</div>';
    }

    for (var d = 1; d <= days; d++) {
      var dk = dateKey(year, month, d);
      var past = new Date(year, month, d) < today;
      var sel = state.selectedDates.indexOf(dk) !== -1;
      var tod = isTodayDate(year, month, d);

      if (past) {
        html += '<div class="ohwl-day ohwl-muted">' + d + '</div>';
      } else {
        var cls = 'ohwl-day';
        if (sel) cls += ' ohwl-sel';
        else if (atMax) cls += ' ohwl-maxed';
        if (tod) cls += ' ohwl-today';
        html += '<div class="' + cls + '" data-date="' + dk + '">' + d + '</div>';
      }
    }

    var total = first + days;
    var rem = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (var j = 1; j <= rem; j++) {
      html += '<div class="ohwl-day ohwl-muted">' + j + '</div>';
    }

    return html;
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDER WIDGET
  // ═══════════════════════════════════════════════════════════════

  function renderWidget() {
    container = document.getElementById(CONFIG.containerId);
    if (!container) {
      console.error('[Wishlist Widget] Container not found:', CONFIG.containerId);
      return;
    }

    var logoSrc = CONFIG.logoUrl || (CONFIG.apiUrl + '/logo-prim400.png');
    var nm = nextMonth(state.calYear, state.calMonth);

    var logoHtml = '<img src="' + escapeHtml(logoSrc) + '" alt="Orion Hill" class="ohwl-logo">';

    container.innerHTML = '<style>' + getStyles() + '</style>' +
    '<div class="ohwl-widget">' +

      // Sidebar
      '<div class="ohwl-sidebar">' +
        logoHtml +
        '<h4 class="ohwl-sidebar-title">Let\'s find your day.</h4>' +
        '<p class="ohwl-sidebar-intro">Tell us when you\'d love to celebrate and we\'ll reach out to confirm availability and walk you through next steps.</p>' +
        '<ul class="ohwl-steps">' +
          '<li class="ohwl-step ohwl-active" data-si="1"><div class="ohwl-step-num">1</div><div class="ohwl-step-info"><div class="ohwl-step-title">Choose your dates</div><div class="ohwl-step-desc">Select up to 5 preferred dates</div></div></li>' +
          '<li class="ohwl-step" data-si="2"><div class="ohwl-step-num">2</div><div class="ohwl-step-info"><div class="ohwl-step-title">Your contact info</div><div class="ohwl-step-desc">So we can reach out</div></div></li>' +
          '<li class="ohwl-step" data-si="3"><div class="ohwl-step-num">3</div><div class="ohwl-step-info"><div class="ohwl-step-title">Schedule a Tour</div><div class="ohwl-step-desc">Optional &mdash; and submit</div></div></li>' +
        '</ul>' +
        '<div class="ohwl-sidebar-footer">Dates are held on a first-come, first-served basis. A hospitality manager follows up within one business day.</div>' +
        '<div class="ohwl-mobile-dots">' +
          '<span class="ohwl-mobile-dot ohwl-dot-active" data-md="1"></span>' +
          '<span class="ohwl-mobile-dot" data-md="2"></span>' +
          '<span class="ohwl-mobile-dot" data-md="3"></span>' +
        '</div>' +
      '</div>' +

      // Main
      '<div class="ohwl-main">' +
        '<div class="ohwl-progress"><span>Step <strong class="ohwl-progress-cur">1 of 3</strong></span><span class="ohwl-progress-pct">33% complete</span></div>' +
        '<div class="ohwl-bar"><div class="ohwl-bar-fill" style="width:33%"></div></div>' +

        // Step 1
        '<div class="ohwl-content ohwl-visible" data-step="1">' +
          '<h3 class="ohwl-title">Pick your preferred dates</h3>' +
          '<p class="ohwl-sub">Click any date to add it to your wishlist. You can choose up to ' + CONFIG.maxDates + '.</p>' +
          '<div class="ohwl-cal-nav">' +
            '<button class="ohwl-cal-arrow" id="ohwl-prev"' + (!canGoPrev() ? ' disabled' : '') + '>&lsaquo;</button>' +
            '<span class="ohwl-cal-range" id="ohwl-range">' + calRangeText() + '</span>' +
            '<button class="ohwl-cal-arrow" id="ohwl-next">&rsaquo;</button>' +
          '</div>' +
          '<div class="ohwl-cal-row">' +
            '<div class="ohwl-cal"><div class="ohwl-cal-month">' + MONTHS[state.calMonth] + ' ' + state.calYear + '</div><div class="ohwl-cal-grid" id="ohwl-grid-l">' + renderCalGrid(state.calYear, state.calMonth) + '</div></div>' +
            '<div class="ohwl-cal"><div class="ohwl-cal-month">' + MONTHS[nm.m] + ' ' + nm.y + '</div><div class="ohwl-cal-grid" id="ohwl-grid-r">' + renderCalGrid(nm.y, nm.m) + '</div></div>' +
          '</div>' +
          '<div class="ohwl-selected-bar" id="ohwl-selbar">' + renderSelectedBar() + '</div>' +
        '</div>' +

        // Step 2
        '<div class="ohwl-content" data-step="2">' +
          '<h3 class="ohwl-title">Your contact information</h3>' +
          '<p class="ohwl-sub">So our events team can follow up with you.</p>' +
          '<div class="ohwl-form">' +
            '<div class="ohwl-field"><label>First Name <span class="ohwl-req">*</span></label><input type="text" data-field="firstName" placeholder="First name" autocomplete="given-name"><span class="ohwl-err" data-err="firstName"></span></div>' +
            '<div class="ohwl-field"><label>Last Name <span class="ohwl-req">*</span></label><input type="text" data-field="lastName" placeholder="Last name" autocomplete="family-name"><span class="ohwl-err" data-err="lastName"></span></div>' +
            '<div class="ohwl-field"><label>Email <span class="ohwl-req">*</span></label><input type="email" data-field="email" placeholder="you@example.com" autocomplete="email"><span class="ohwl-err" data-err="email"></span></div>' +
            '<div class="ohwl-field"><label>Phone <span class="ohwl-req">*</span></label><input type="tel" data-field="phone" placeholder="(555) 123-4567" autocomplete="tel"><span class="ohwl-err" data-err="phone"></span></div>' +
            '<div class="ohwl-field ohwl-full"><label>Message <span class="ohwl-opt">(optional)</span></label><textarea data-field="message" placeholder="Tell us about your event — guest count, style, anything you\'d like us to know..." rows="4"></textarea></div>' +
            '<div style="position:absolute;left:-9999px;opacity:0;height:0;overflow:hidden" aria-hidden="true"><input type="text" data-field="honeypot" tabindex="-1" autocomplete="off"></div>' +
          '</div>' +
        '</div>' +

        // Step 3
        '<div class="ohwl-content" data-step="3">' +
          '<h3 class="ohwl-title">Review & Submit</h3>' +
          '<p class="ohwl-sub">Confirm your wishlist details below.</p>' +
          '<div id="ohwl-review"></div>' +
          '<div class="ohwl-tour"><label class="ohwl-tour-label"><input type="checkbox" id="ohwl-tour-check"><div class="ohwl-tour-text"><strong>Schedule an in-person tour</strong><span>We\'d love to show you the grounds. Our team will reach out to arrange a visit at a time that works for you.</span></div></label></div>' +
          '<div class="ohwl-error-banner" id="ohwl-error"></div>' +
        '</div>' +

        // Actions
        '<div class="ohwl-actions">' +
          '<button class="ohwl-btn-back" id="ohwl-back" style="visibility:hidden">&larr; Back</button>' +
          '<button class="ohwl-btn-next" id="ohwl-next-btn" disabled>Continue &rarr;</button>' +
          '<button class="ohwl-btn-submit" id="ohwl-submit-btn"><span class="ohwl-btn-text">Submit My Wishlist</span><span class="ohwl-btn-loading" style="display:none"><svg class="ohwl-spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="60" stroke-dashoffset="20"></circle></svg> Submitting...</span></button>' +
        '</div>' +
      '</div>' +
    '</div>';

    attachListeners();
  }

  function calRangeText() {
    var nm = nextMonth(state.calYear, state.calMonth);
    if (state.calYear === nm.y) return MONTHS[state.calMonth] + ' – ' + MONTHS[nm.m] + ' ' + state.calYear;
    return MONTHS[state.calMonth] + ' ' + state.calYear + ' – ' + MONTHS[nm.m] + ' ' + nm.y;
  }

  function renderSelectedBar() {
    if (state.selectedDates.length === 0) {
      return '<span class="ohwl-selected-label">No dates selected</span><span class="ohwl-selected-hint">Click any date above to add it to your wishlist</span>';
    }
    var pills = state.selectedDates.map(function(ds) {
      return '<span class="ohwl-pill">' + formatDateShort(ds) + ' <span class="ohwl-pill-x" data-rm="' + ds + '">&times;</span></span>';
    }).join('');
    var label = state.selectedDates.length + ' of ' + CONFIG.maxDates + ' selected';
    return '<span class="ohwl-selected-label">' + label + '</span><div class="ohwl-pills">' + pills + '</div>';
  }

  // ═══════════════════════════════════════════════════════════════
  //  DOM UPDATES
  // ═══════════════════════════════════════════════════════════════

  function updateCalendars() {
    var nm = nextMonth(state.calYear, state.calMonth);
    var w = container.querySelector('.ohwl-widget');
    w.querySelector('#ohwl-grid-l').innerHTML = renderCalGrid(state.calYear, state.calMonth);
    w.querySelector('#ohwl-grid-r').innerHTML = renderCalGrid(nm.y, nm.m);
    w.querySelector('#ohwl-range').textContent = calRangeText();

    var leftLabel = w.querySelectorAll('.ohwl-cal-month');
    leftLabel[0].textContent = MONTHS[state.calMonth] + ' ' + state.calYear;
    leftLabel[1].textContent = MONTHS[nm.m] + ' ' + nm.y;

    w.querySelector('#ohwl-prev').disabled = !canGoPrev();
  }

  function updateSelectedBar() {
    container.querySelector('#ohwl-selbar').innerHTML = renderSelectedBar();
    var nextBtn = container.querySelector('#ohwl-next-btn');
    if (state.currentStep === 1) {
      nextBtn.disabled = state.selectedDates.length === 0;
    }
  }

  function updateReview() {
    var html = '<div class="ohwl-review-card"><div class="ohwl-review-header"><span class="ohwl-review-label">Selected Dates</span><button class="ohwl-review-edit" data-goto="1">Edit</button></div>';
    state.selectedDates.forEach(function(ds) {
      html += '<div class="ohwl-review-date">' + formatDateLong(ds) + '</div>';
    });
    html += '</div>';

    html += '<div class="ohwl-review-card"><div class="ohwl-review-header"><span class="ohwl-review-label">Contact Information</span><button class="ohwl-review-edit" data-goto="2">Edit</button></div>';
    html += '<div class="ohwl-review-row"><strong>Name</strong>' + escapeHtml(state.firstName + ' ' + state.lastName) + '</div>';
    html += '<div class="ohwl-review-row"><strong>Email</strong>' + escapeHtml(state.email) + '</div>';
    html += '<div class="ohwl-review-row"><strong>Phone</strong>' + escapeHtml(state.phone) + '</div>';
    if (state.message.trim()) html += '<div class="ohwl-review-row"><strong>Message</strong>' + escapeHtml(state.message) + '</div>';
    html += '</div>';

    container.querySelector('#ohwl-review').innerHTML = html;
  }

  function goToStep(step) {
    state.currentStep = step;
    var w = container.querySelector('.ohwl-widget');

    // Update step content visibility
    w.querySelectorAll('.ohwl-content').forEach(function(el) {
      var s = parseInt(el.getAttribute('data-step'));
      if (s === step) { el.classList.add('ohwl-visible'); }
      else { el.classList.remove('ohwl-visible'); }
    });

    // Update sidebar steps
    w.querySelectorAll('.ohwl-step').forEach(function(el) {
      var s = parseInt(el.getAttribute('data-si'));
      el.classList.remove('ohwl-active', 'ohwl-done');
      if (s < step) { el.classList.add('ohwl-done'); el.querySelector('.ohwl-step-num').innerHTML = '&#10003;'; }
      else if (s === step) { el.classList.add('ohwl-active'); el.querySelector('.ohwl-step-num').textContent = s; }
      else { el.querySelector('.ohwl-step-num').textContent = s; }
    });

    // Update mobile dots
    w.querySelectorAll('.ohwl-mobile-dot').forEach(function(el) {
      var s = parseInt(el.getAttribute('data-md'));
      el.classList.remove('ohwl-dot-active', 'ohwl-dot-done');
      if (s < step) el.classList.add('ohwl-dot-done');
      else if (s === step) el.classList.add('ohwl-dot-active');
    });

    // Update progress
    var pct = Math.round((step / 3) * 100);
    w.querySelector('.ohwl-progress-cur').textContent = step + ' of 3';
    w.querySelector('.ohwl-progress-pct').textContent = pct + '% complete';
    w.querySelector('.ohwl-bar-fill').style.width = pct + '%';

    // Update buttons
    var backBtn = w.querySelector('#ohwl-back');
    var nextBtn = w.querySelector('#ohwl-next-btn');
    var submitBtn = w.querySelector('#ohwl-submit-btn');

    backBtn.style.visibility = step === 1 ? 'hidden' : 'visible';

    if (step === 3) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-flex';
      updateReview();
    } else {
      nextBtn.style.display = 'inline-block';
      submitBtn.style.display = 'none';
      if (step === 1) nextBtn.disabled = state.selectedDates.length === 0;
      else nextBtn.disabled = false;
    }

    // Restore form values when returning to step 2
    if (step === 2) {
      var inputs = w.querySelectorAll('[data-field]');
      inputs.forEach(function(inp) {
        var f = inp.getAttribute('data-field');
        if (state[f] !== undefined) inp.value = state[f];
      });
    }

    // Scroll main area to top
    w.querySelector('.ohwl-main').scrollTop = 0;
  }

  // ═══════════════════════════════════════════════════════════════
  //  EVENT LISTENERS
  // ═══════════════════════════════════════════════════════════════

  function attachListeners() {
    var w = container.querySelector('.ohwl-widget');

    // Calendar day clicks (event delegation)
    w.addEventListener('click', function(e) {
      var day = e.target.closest('.ohwl-day[data-date]');
      if (day && !day.classList.contains('ohwl-muted') && !day.classList.contains('ohwl-maxed')) {
        toggleDate(day.getAttribute('data-date'));
        return;
      }

      // Pill remove clicks
      var rm = e.target.closest('.ohwl-pill-x[data-rm]');
      if (rm) {
        removeDate(rm.getAttribute('data-rm'));
        return;
      }

      // Review edit buttons
      var edit = e.target.closest('.ohwl-review-edit[data-goto]');
      if (edit) {
        goToStep(parseInt(edit.getAttribute('data-goto')));
        return;
      }
    });

    // Calendar navigation
    w.querySelector('#ohwl-prev').addEventListener('click', function() {
      if (!canGoPrev()) return;
      if (state.calMonth === 0) { state.calYear--; state.calMonth = 11; }
      else { state.calMonth--; }
      updateCalendars();
    });

    w.querySelector('#ohwl-next').addEventListener('click', function() {
      if (state.calMonth === 11) { state.calYear++; state.calMonth = 0; }
      else { state.calMonth++; }
      updateCalendars();
    });

    // Form inputs
    w.addEventListener('input', function(e) {
      var field = e.target.getAttribute('data-field');
      if (field && state.hasOwnProperty(field)) {
        state[field] = e.target.value;
        // Clear error on input
        if (state.errors[field]) {
          delete state.errors[field];
          e.target.classList.remove('ohwl-invalid');
          var errEl = w.querySelector('[data-err="' + field + '"]');
          if (errEl) errEl.textContent = '';
        }
      }
    });

    // Back button
    w.querySelector('#ohwl-back').addEventListener('click', function() {
      if (state.currentStep > 1) goToStep(state.currentStep - 1);
    });

    // Next button
    w.querySelector('#ohwl-next-btn').addEventListener('click', function() {
      if (state.currentStep === 1) {
        if (state.selectedDates.length === 0) return;
        fireGA4('wishlist_step_complete', { step: 1, dates_count: state.selectedDates.length });
        goToStep(2);
      } else if (state.currentStep === 2) {
        if (validateStep2()) {
          fireGA4('wishlist_step_complete', { step: 2 });
          goToStep(3);
        }
      }
    });

    // Submit button
    w.querySelector('#ohwl-submit-btn').addEventListener('click', function() {
      state.scheduleTour = !!w.querySelector('#ohwl-tour-check').checked;
      handleSubmit();
    });
  }

  // ═══════════════════════════════════════════════════════════════
  //  DATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════

  function toggleDate(dateStr) {
    var idx = state.selectedDates.indexOf(dateStr);
    if (idx !== -1) {
      state.selectedDates.splice(idx, 1);
    } else {
      if (state.selectedDates.length >= CONFIG.maxDates) return;
      state.selectedDates.push(dateStr);
      state.selectedDates.sort();
    }
    updateCalendars();
    updateSelectedBar();
  }

  function removeDate(dateStr) {
    var idx = state.selectedDates.indexOf(dateStr);
    if (idx !== -1) {
      state.selectedDates.splice(idx, 1);
      updateCalendars();
      updateSelectedBar();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  VALIDATION
  // ═══════════════════════════════════════════════════════════════

  function validateStep2() {
    var errors = {};
    var w = container.querySelector('.ohwl-widget');

    if (!state.firstName.trim()) errors.firstName = 'Please enter your first name';
    if (!state.lastName.trim()) errors.lastName = 'Please enter your last name';
    if (!state.email.trim()) errors.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) errors.email = 'Please enter a valid email';
    if (!state.phone.trim()) errors.phone = 'Please enter your phone number';

    state.errors = errors;

    ['firstName', 'lastName', 'email', 'phone'].forEach(function(field) {
      var inp = w.querySelector('[data-field="' + field + '"]');
      var err = w.querySelector('[data-err="' + field + '"]');
      if (errors[field]) {
        if (inp) inp.classList.add('ohwl-invalid');
        if (err) err.textContent = errors[field];
      } else {
        if (inp) inp.classList.remove('ohwl-invalid');
        if (err) err.textContent = '';
      }
    });

    return Object.keys(errors).length === 0;
  }

  // ═══════════════════════════════════════════════════════════════
  //  SUBMIT
  // ═══════════════════════════════════════════════════════════════

  async function handleSubmit() {
    if (state.submitting) return;

    // Honeypot check
    if (state.honeypot) {
      showSuccess();
      return;
    }

    state.submitting = true;
    var w = container.querySelector('.ohwl-widget');
    var submitBtn = w.querySelector('#ohwl-submit-btn');
    var btnText = submitBtn.querySelector('.ohwl-btn-text');
    var btnLoading = submitBtn.querySelector('.ohwl-btn-loading');
    var errorBanner = w.querySelector('#ohwl-error');

    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    errorBanner.style.display = 'none';

    var payload = {
      clientId: CONFIG.clientId,
      firstName: state.firstName.trim(),
      lastName: state.lastName.trim(),
      email: state.email.trim(),
      phone: state.phone.trim(),
      message: state.message.trim(),
      dates: state.selectedDates,
      scheduleTour: state.scheduleTour,
      honeypot: state.honeypot,
      pageUrl: window.location.href
    };

    try {
      var response = await fetch(CONFIG.apiUrl + '/api/wishlist/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      var result = await response.json();

      if (response.ok && result.success) {
        fireGA4('wishlist_submitted', {
          dates_count: state.selectedDates.length,
          schedule_tour: state.scheduleTour
        });
        if (state.scheduleTour) {
          fireGA4('wishlist_tour_requested', {});
        }
        showSuccess();
      } else {
        throw new Error(result.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('[Wishlist Widget] Submit error:', err);
      errorBanner.textContent = err.message || 'Something went wrong. Please try again.';
      errorBanner.style.display = 'block';
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    } finally {
      state.submitting = false;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  GA4 TRACKING
  // ═══════════════════════════════════════════════════════════════

  function fireGA4(eventName, params) {
    var ga4Id = CONFIG.ga4Id;
    if (!ga4Id) return;

    if (typeof gtag !== 'function') {
      if (!document.querySelector('script[src*="gtag/js?id=' + ga4Id + '"]')) {
        var s = document.createElement('script');
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ga4Id;
        s.async = true;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', ga4Id);
      }
    }

    setTimeout(function() {
      if (typeof gtag === 'function') {
        gtag('event', eventName, Object.assign({
          event_category: 'wishlist',
          client_id: CONFIG.clientId
        }, params || {}));
        console.log('[Wishlist Widget] GA4 event fired:', eventName);
      }
    }, 100);
  }

  // ═══════════════════════════════════════════════════════════════
  //  SUCCESS STATE
  // ═══════════════════════════════════════════════════════════════

  function showSuccess() {
    var w = container.querySelector('.ohwl-widget');
    w.innerHTML =
      '<div class="ohwl-success-wrap">' +
        '<div class="ohwl-success">' +
          '<div class="ohwl-check-wrap">' +
            '<div class="ohwl-circle-bg"></div>' +
            '<svg class="ohwl-check-svg" viewBox="0 0 88 88">' +
              '<circle class="ohwl-circle-stroke" cx="44" cy="44" r="40"/>' +
              '<polyline class="ohwl-check-stroke" points="28 45 39 56 60 34"/>' +
            '</svg>' +
          '</div>' +
          '<h3>Your Wishlist Has Been Sent!</h3>' +
          '<p>Thank you for your interest in Orion Hill. Our hospitality team will review your preferred dates and follow up within one business day.</p>' +
        '</div>' +
      '</div>';
  }

  // ═══════════════════════════════════════════════════════════════
  //  INIT
  // ═══════════════════════════════════════════════════════════════

  function init() {
    if (!CONFIG.clientId) {
      console.error('[Wishlist Widget] No data-client-id provided on the script tag.');
      return;
    }
    console.log('[Wishlist Widget] Initializing for client:', CONFIG.clientId);
    loadFonts();
    renderWidget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
