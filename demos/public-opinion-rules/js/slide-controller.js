/**
 * 《群眾意見》基礎玩法演示控制器 (slide-controller.js)
 * 職責：控制 7 步玩法演示、當前步數聯動與鍵盤/觸控手勢支持
 */

class SlideController {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 7;

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
        img: 'web-assets/slides/slide_01.png'
      },
      {
        step: 2,
        index: '02 / PROMPT',
        zhIndex: '02 / 話題',
        zhTitle: '發言人抽取一張提問卡。',
        enTitle: 'The speaker draws a question card.',
        zhDesc: '發言人從中央牌堆抽取一張卡，讀出本輪的問題。',
        enDesc: 'The speaker draws a card from the central deck and reads the question aloud.',
        img: 'web-assets/slides/slide_02.png'
      },
      {
        step: 3,
        index: '03 / STATEMENT',
        zhIndex: '03 / 發言',
        zhTitle: '發言人回答問題。',
        enTitle: 'The speaker answers the question.',
        zhDesc: '發言人公開回答，其他玩家聆聽內容，並留意語氣與立場。',
        enDesc: 'The speaker answers aloud. The other players listen to the content, tone, and viewpoint.',
        img: 'web-assets/slides/slide_03.png'
      },
      {
        step: 4,
        index: '04 / INTERPRETATION',
        zhIndex: '04 / 解讀',
        zhTitle: '選擇標籤，牌面朝下放置。',
        enTitle: 'Choose a label and place it face down.',
        zhDesc: '其他玩家各自選擇最符合發言者的標籤，牌面朝下放置，暫不公開。',
        enDesc: 'Each listener chooses the label that best describes the speaker and places it face down before the reveal.',
        img: 'web-assets/slides/slide_04.png'
      },
      {
        step: 5,
        index: '05 / REVEAL',
        zhIndex: '05 / 揭曉',
        zhTitle: '同時翻開標籤卡。',
        enTitle: 'Reveal the labels together.',
        zhDesc: '所有玩家同時翻開所選標籤，查看各種標籤獲得的票數。',
        enDesc: 'All tags are revealed together, making the group\'s reading of the speaker visible at once.',
        img: 'web-assets/slides/slide_05.png'
      },
      {
        step: 6,
        index: '06 / THRESHOLD',
        zhIndex: '06 / 門檻',
        zhTitle: '依照共識門檻計分。',
        enTitle: 'Score according to the consensus threshold.',
        zhDesc: '當某一標籤達到本輪的共識門檻，參與形成該共識的玩家獲得分數。',
        enDesc: 'When one label reaches the round\'s threshold, the players who formed that consensus receive the score.',
        img: 'web-assets/slides/slide_06.png'
      },
      {
        step: 7,
        index: '07 / RESOLUTION',
        zhIndex: '07 / 結果',
        zhTitle: '結果決定下一位發言者。',
        enTitle: 'The result determines who speaks next.',
        zhDesc: '達成共識時，形成共識的玩家得分並移交發言；未達標時，發言者得分並保留發言身份。',
        enDesc: 'When consensus is reached, its contributors score and the role passes on. Otherwise, the speaker scores and stays for another prompt.',
        img: 'web-assets/slides/slide_07.png'
      }
    ];

    this.bindEvents();

    const stepParam = parseInt(urlParams.get('step')) || 1;
    this.goToStep(stepParam, true);
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

    // 1. 畫面更新（平滑淡入淡出）
    const data = this.stepsData[this.currentStep - 1];
    const title = this.language === 'zh' ? data.zhTitle : data.enTitle;
    const desc = this.language === 'zh' ? data.zhDesc : data.enDesc;
    const index = this.language === 'zh' ? data.zhIndex : data.index;
    if (this.viewportCard) this.viewportCard.dataset.step = String(this.currentStep);
    if (this.sceneImg) {
      if (immediate) {
        this.sceneImg.src = data.img;
        this.sceneImg.alt = title;
        this.sceneImg.classList.remove('fade-out');
      } else {
        this.sceneImg.classList.add('fade-out');
        setTimeout(() => {
          this.sceneImg.src = data.img;
          this.sceneImg.alt = title;
          this.sceneImg.classList.remove('fade-out');
        }, 120);
      }
    }

    // 2. Single-language caption update with the same transition as the image
    if (this.captionCard) {
      const updateCaption = () => {
        if (this.captionIndex) this.captionIndex.textContent = index;
        if (this.captionTitle) this.captionTitle.textContent = title;
        if (this.captionDesc) this.captionDesc.textContent = desc;
      };

      if (immediate) {
        updateCaption();
        this.captionCard.classList.remove('fade-out');
      } else {
        this.captionCard.classList.add('fade-out');
        setTimeout(() => {
          updateCaption();
          this.captionCard.classList.remove('fade-out');
        }, 120);
      }
    }

    // 3. 步數指示器更新
    if (this.currStepNum) {
      this.currStepNum.textContent = String(this.currentStep).padStart(2, '0');
    }
    if (this.totalStepNum) {
      this.totalStepNum.textContent = String(this.totalSteps).padStart(2, '0');
    }

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
