/**
 * 《群眾意見》基礎玩法演示控制器 (slide-controller.js)
 * 職責：控制 7 步玩法演示、當前步數聯動與鍵盤/觸控手勢支持
 */

class SlideController {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 7;
    this.transitionId = 0;
    this.imageLoads = new Map();

    // The parent portfolio page selects the single language shown in this deck.
    const urlParams = new URLSearchParams(window.location.search);
    this.language = urlParams.get('lang') === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = this.language === 'zh' ? 'zh-Hant' : 'en';
    document.title = this.language === 'zh' ? '《群眾意見》桌遊玩法指引' : 'Public Opinion · Rules';

    const previousLabel = this.language === 'zh' ? '上一步' : 'Previous step';
    const nextLabel = this.language === 'zh' ? '下一步' : 'Next step';
    const viewportLabel = this.language === 'zh' ? '七步玩法演示舞臺' : 'Seven-step rules demonstration';
    const progressLabel = this.language === 'zh' ? '演示步驟進度' : 'Demonstration step progress';

    // DOM 元素引用
    this.viewportCard = document.getElementById('stage-viewport-card');
    this.sceneImg = document.getElementById('stage-scene-img');
    this.imageStatus = document.getElementById('stage-image-status');
    this.btnSidePrev = document.getElementById('btn-side-prev');
    this.btnSideNext = document.getElementById('btn-side-next');
    this.currStepNum = document.getElementById('curr-step-num');
    this.totalStepNum = document.getElementById('total-step-num');

    // Single-language caption DOM
    this.captionCard = document.getElementById('stage-caption-card');
    this.captionIndex = document.getElementById('caption-index');
    this.captionTitle = document.getElementById('caption-title');
    this.captionDesc = document.getElementById('caption-desc');

    if (this.viewportCard) this.viewportCard.setAttribute('aria-label', viewportLabel);
    const progress = document.querySelector('.stage-progress');
    if (progress) progress.setAttribute('aria-label', progressLabel);
    if (this.btnSidePrev) {
      this.btnSidePrev.setAttribute('aria-label', previousLabel);
      this.btnSidePrev.setAttribute('title', previousLabel);
    }
    if (this.btnSideNext) {
      this.btnSideNext.setAttribute('aria-label', nextLabel);
      this.btnSideNext.setAttribute('title', nextLabel);
    }

    this.stepsData = [
      {
        step: 1,
        index: '01 / ROUND',
        zhIndex: '01 / 回合',
        zhTitle: '分發標籤卡，準備話題牌堆。',
        enTitle: 'Deal the labels and prepare the question deck.',
        zhDesc: '每位玩家拿取一套身份標籤卡，將話題牌堆放在桌面中央。',
        enDesc: 'Each player receives a complete set of identity labels. Place the question deck in the center of the table.',
        preview: 'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAwBACdASooABYAPwFssFArJaSisBVaqWAgCWkA0qwLNrLsPWemLSXI+AAA/u+0YPLardUMyoHEt6c+ZEIzasu/rnAAAA==',
        img: 'web-assets/slides/rules-step-01.webp?v=20261102'
      },
      {
        step: 2,
        index: '02 / PROMPT',
        zhIndex: '02 / 話題',
        zhTitle: '發言人抽取一張提問卡。',
        enTitle: 'The speaker draws a question card.',
        zhDesc: '發言人從中央牌堆抽取一張卡，讀出本輪的問題。',
        enDesc: 'The speaker draws a card from the central deck and reads the question aloud.',
        preview: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAwBACdASooABYAPwFssFArJiSisBVaqWAgCWkA0qwLNrEgdOXKgHYizAAA/u+0YPPureEMLztAEyREXRNZL2KM0hs2AAAA',
        img: 'web-assets/slides/rules-step-02.webp?v=20261102'
      },
      {
        step: 3,
        index: '03 / STATEMENT',
        zhIndex: '03 / 發言',
        zhTitle: '發言人回答問題。',
        enTitle: 'The speaker answers the question.',
        zhDesc: '發言人公開回答，其他玩家聆聽內容，並留意語氣與立場。',
        enDesc: 'The speaker answers aloud. The other players listen to the content, tone, and viewpoint.',
        preview: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAQBACdASooABYAPwFssE+rJiSiMBVaqWAgCWkA0ugLNrGDo0LejuwGAAD+77Rg8JO+cY9x739GcovX9E4OEsjC+9YAAAAA',
        img: 'web-assets/slides/rules-step-03.webp?v=20261102'
      },
      {
        step: 4,
        index: '04 / INTERPRETATION',
        zhIndex: '04 / 解讀',
        zhTitle: '選擇標籤，牌面朝下放置。',
        enTitle: 'Choose a label and place it face down.',
        zhDesc: '其他玩家各自選擇最符合發言者的標籤，牌面朝下放置，暫不公開。',
        enDesc: 'Each listener chooses the label that best describes the speaker and places it face down before the reveal.',
        preview: 'data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAABwBACdASooABYAPwFssFCrJaSisBVaqWAgCWkA0qwLNrLsPWemLSVe4bni4AD+77Rg8tqt1QzKgcS3pz5kQjNiwEAAAAAA',
        img: 'web-assets/slides/rules-step-04.webp?v=20261102'
      },
      {
        step: 5,
        index: '05 / REVEAL',
        zhIndex: '05 / 揭曉',
        zhTitle: '同時翻開標籤卡。',
        enTitle: 'Reveal the labels together.',
        zhDesc: '所有玩家同時翻開所選標籤，查看各種標籤獲得的票數。',
        enDesc: 'All tags are revealed together, making the group\'s reading of the speaker visible at once.',
        preview: 'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAwBACdASooABYAPwFssFArJiSisBVaqWAgCWkA0MwLNrIVrgX3U+6GpQAA/u+0YPPuQeENfvE7rpaa35BZynHCIImAAA==',
        img: 'web-assets/slides/rules-step-05.webp?v=20261102'
      },
      {
        step: 6,
        index: '06 / THRESHOLD',
        zhIndex: '06 / 門檻',
        zhTitle: '依照共識門檻計分。',
        enTitle: 'Score according to the consensus threshold.',
        zhDesc: '當某一標籤達到本輪的共識門檻，參與形成該共識的玩家獲得分數。',
        enDesc: 'When one label reaches the round\'s threshold, the players who formed that consensus receive the score.',
        preview: 'data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAABQBACdASooABYAPu1kqU6ppiQiNUgBMB2JaQDS6Cza0FY79twvvC3xPYgAAP7xwv034hA4KH4+2CAvbwfNtuPfwAA=',
        img: 'web-assets/slides/rules-step-06.webp?v=20261102'
      },
      {
        step: 7,
        index: '07 / RESOLUTION',
        zhIndex: '07 / 結果',
        zhTitle: '結果決定下一位發言者。',
        enTitle: 'The result determines who speaks next.',
        zhDesc: '達成共識時，形成共識的玩家得分並移交發言；未達標時，發言者得分並保留發言身份。',
        enDesc: 'When consensus is reached, its contributors score and the role passes on. Otherwise, the speaker scores and stays for another prompt.',
        preview: 'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAwBACdASooABYAPwFssFArJaSisBVaqWAgCWkA0qwLNrLsPRiH6DmBpAAA/u+0YPLareEKQ5v5qyEJ5RWjzN1opQAAAA==',
        img: 'web-assets/slides/rules-step-07.webp?v=20261102'
      }
    ];

    this.preloadImages();
    this.bindEvents();

    const stepParam = parseInt(urlParams.get('step')) || 1;
    this.goToStep(stepParam, true);
  }

  loadImage(src) {
    if (!this.imageLoads.has(src)) {
      const pending = new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
      });
      this.imageLoads.set(src, pending);
      pending.catch(() => this.imageLoads.delete(src));
    }
    return this.imageLoads.get(src);
  }

  preloadImages() {
    this.stepsData.forEach(data => this.loadImage(data.img).catch(() => {}));
  }

  bindEvents() {
    // 翻頁按鈕
    if (this.btnSidePrev) this.btnSidePrev.addEventListener('click', () => this.prevStep());
    if (this.btnSideNext) this.btnSideNext.addEventListener('click', () => this.nextStep());

    // 鍵盤左右鍵與空格
    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        this.nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevStep();
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.goToStep(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.goToStep(this.totalSteps);
      }
    });

    // 移動端手勢滑動
    let touchStartX = 0;
    let touchStartY = 0;
    if (this.viewportCard) {
      this.viewportCard.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      this.viewportCard.addEventListener('touchend', (e) => {
        const diffX = e.changedTouches[0].screenX - touchStartX;
        const diffY = e.changedTouches[0].screenY - touchStartY;
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) this.nextStep();
          else this.prevStep();
        }
      }, { passive: true });
    }
  }

  goToStep(stepNum, immediate = false) {
    if (stepNum < 1) stepNum = 1;
    if (stepNum > this.totalSteps) stepNum = this.totalSteps;
    this.currentStep = stepNum;

    const data = this.stepsData[this.currentStep - 1];
    const title = this.language === 'zh' ? data.zhTitle : data.enTitle;
    const desc = this.language === 'zh' ? data.zhDesc : data.enDesc;
    const index = this.language === 'zh' ? data.zhIndex : data.index;
    const transitionId = ++this.transitionId;


    // Immediately show this step's own preview, never the preceding clear image.
    if (this.viewportCard) {
      this.viewportCard.dataset.step = String(this.currentStep);
      this.viewportCard.setAttribute('aria-busy', 'true');
    }
    if (this.sceneImg) {
      this.sceneImg.classList.add('is-loading');
      this.sceneImg.src = data.preview;
      this.sceneImg.alt = title;
    }
    if (this.captionIndex) this.captionIndex.textContent = index;
    if (this.captionTitle) this.captionTitle.textContent = title;
    if (this.captionDesc) this.captionDesc.textContent = desc;
    if (this.currStepNum) this.currStepNum.textContent = String(this.currentStep).padStart(2, '0');
    if (this.totalStepNum) this.totalStepNum.textContent = String(this.totalSteps).padStart(2, '0');
    if (this.imageStatus) {
      this.imageStatus.hidden = false;
      this.imageStatus.textContent = this.language === 'zh' ? '圖片載入中…' : 'Loading image…';
    }
    this.loadImage(data.img).then(() => {
      // An earlier request must never replace the latest step's preview.
      if (transitionId !== this.transitionId) return;
      if (this.sceneImg) {
        this.sceneImg.src = data.img;
        this.sceneImg.classList.remove('is-loading');
      }
      if (this.imageStatus) this.imageStatus.hidden = true;
      if (this.viewportCard) this.viewportCard.setAttribute('aria-busy', 'false');
    }).catch(() => {
      if (transitionId !== this.transitionId) return;
      // Keep this step's blurred preview visible when its clear image fails.
      if (this.imageStatus) {
        this.imageStatus.hidden = false;
        this.imageStatus.textContent = this.language === 'zh' ? '圖片載入失敗，請重新切換此步驟。' : 'Image failed to load. Revisit this step to retry.';
      }
      if (this.viewportCard) this.viewportCard.setAttribute('aria-busy', 'false');
    });

    // 4. Button state
    const isFirst = (this.currentStep === 1);

    if (this.btnSidePrev) this.btnSidePrev.disabled = isFirst;
  }

  nextStep() {
    if (this.currentStep >= this.totalSteps) {
      this.goToStep(1);
    } else {
      this.goToStep(this.currentStep + 1);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }
}

window.SlideController = SlideController;
