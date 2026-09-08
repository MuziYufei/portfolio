(() => {
  // Keep the original desktop layout inside each responsive 16:9 preview.
  document.querySelectorAll('.online-platform-frame').forEach((frame) => {
    const viewport = document.createElement('div');
    viewport.className = 'online-desktop-viewport';
    frame.before(viewport);
    viewport.append(frame);
    const resize = () => {
      frame.style.transform = `scale(${viewport.clientWidth / 1920})`;
    };
    new ResizeObserver(resize).observe(viewport);
    resize();
  });
  const root = document.querySelector('[data-card-atlas]');
  if (!root) return;

  const lang = root.dataset.lang === 'zh' ? 'zh' : 'en';
  const assets = root.dataset.assets || '../assets/public-opinion';
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
  const pad = (value) => String(value).padStart(2, '0');

  const copy = lang === 'zh' ? {
    title: '卡牌圖鑑',
    intro: '這套卡牌把網絡中的判斷方式帶到桌面：標籤卡定義群體如何描述一個人，提問卡把日常分歧變成可以繼續討論的入口。',
    coreTitle: '核心標籤',
    extensionTitle: '拓展標籤',
    questionsTitle: '提問卡',
    core: '核心',
    extension: '拓展',
    featured: '主卡',
    hoverHint: '懸停查看翻譯',
    questionAlt: '實體提問卡'
  } : {
    title: 'Card atlas',
    intro: 'The deck brings online judgment to the table: identity labels describe how a group reads a person, while question cards turn everyday disagreement into a reason to keep talking.',
    coreTitle: 'Core labels',
    extensionTitle: 'Extension labels',
    questionsTitle: 'Question cards',
    core: 'CORE',
    extension: 'EXTENSION',
    featured: 'FEATURED',
    hoverHint: 'Hover for translation',
    questionAlt: 'Printed question card'
  };

  const labels = {
    core: [
      { name: '槓精', enName: 'Argument picker', file: 'label-gangjing.jpg', color: '#E51C23', slogan: '你是故意來找茬的是不是', enSlogan: 'You came here just to pick a fight, didn’t you?', desc: '挑剔細節，抬槓至上，為反對而反對', enDesc: 'Finds faults in details and argues for the sake of arguing.' },
      { name: '擺爛人', enName: 'The checked-out one', file: 'label-bailan.jpg', color: '#F57C00', slogan: '算了，愛咋咋地……', enSlogan: 'Whatever. Let it be.', desc: '拒絕內卷，徹底躺平放棄抵抗', enDesc: 'Rejects the grind, gives up, and lets things slide.' },
      { name: '複讀機', enName: 'The repeater', file: 'label-fuduji.jpg', color: '#FBC02D', slogan: '大家都這麼說', enSlogan: 'That’s what everyone says.', desc: '人雲亦雲，重複流行說法或現成答案', enDesc: 'Repeats popular phrases or echoes the answer already in the room.' },
      { name: '騎牆派', enName: 'The fence-sitter', file: 'label-qiqiang.jpg', color: '#2EAD5B', slogan: '兩邊都有道理，先看看', enSlogan: 'Both sides make sense. Let me wait and see.', desc: '端水看風向，不願給出明確立場', enDesc: 'Keeps both sides in play and withholds a clear position.' },
      { name: '鍵盤俠', enName: 'The keyboard expert', file: 'label-jianpanxia.jpg', color: '#1E90FF', slogan: '沒做過，但我會教你', enSlogan: 'I’ve never done it, but I can teach you.', desc: '缺少親身經驗，卻積極遠程指導', enDesc: 'Gives confident remote advice without direct experience.' },
      { name: '樂子人', enName: 'The spectator', file: 'label-leziren.jpg', color: '#8E44AD', slogan: '別急，讓我先笑會兒', enSlogan: 'Don’t rush. Let me enjoy this first.', desc: '圍觀、玩梗、拱火，把衝突當作娛樂材料', enDesc: 'Treats conflict as entertainment and enjoys watching it escalate.' }
    ],
    extension: [
      { name: '老實人', enName: 'The literal one', file: 'label-laoshiren.jpg', color: '#AFDD23', slogan: '我真的只吃了一碗粉', enSlogan: 'I really only ate one bowl of noodles.', desc: '字面理解，耿直回答，常常無辜背鍋', enDesc: 'Takes words literally and answers too earnestly.' },
      { name: '洗地工', enName: 'The apologist', file: 'label-xidigong.jpg', color: '#03786F', slogan: '這都是有原因的', enSlogan: 'There must be a reason for all this.', desc: '替某方辯護，淡化責任並尋找合理化解釋', enDesc: 'Rationalizes a problem and defends the responsible side.' },
      { name: '二極管', enName: 'The binary thinker', file: 'label-erjiguan.jpg', color: '#89ABE3', slogan: '非黑即白，別繞彎子', enSlogan: 'It’s either black or white.', desc: '非此即彼，只接受兩個對立的極端', enDesc: 'Reduces an issue to two opposing extremes.' },
      { name: '三觀黨', enName: 'The moral judge', file: 'label-sanguandang.jpg', color: '#3949AB', slogan: '這不是小事，是道德問題', enSlogan: 'This is not a small matter. It is a moral issue.', desc: '把具體問題上升到人品、道德或價值觀', enDesc: 'Turns a specific issue into a judgment of character or values.' },
      { name: '懂王', enName: 'The know-it-all', file: 'label-dongwang.jpg', color: '#E53C8D', slogan: '這事我門兒清，聽我的', enSlogan: 'I know exactly how this works. Listen to me.', desc: '無論是否了解，都以專家姿態自信下結論', enDesc: 'Speaks with certainty as if no one understands the issue better.' }
    ]
  };

  const coreDescriptions = [{"zh":"抓住措辭、細節或例外不斷反駁，讓話題從原本的問題轉向“你的說法哪裡不成立”。在遊戲中，判斷的重點是反駁是否成為目的本身；提出有依據的不同意見，並不自動等於槓精。","en":"Picks at wording, details, or exceptions until the discussion shifts to what is wrong with someone else’s statement. The distinction is whether contradiction becomes an end in itself: a reasoned disagreement does not automatically earn this label."},{"zh":"面對壓力、競爭或麻煩，選擇不再投入，常以“隨便”“算了”結束討論。這種回答可能是對無效競爭的拒絕，也可能是逃避責任；群體需要從具體語境判斷這句話表達的是哪一種態度。","en":"Responds to pressure, competition, or inconvenience by withdrawing effort, often ending with “whatever.” This may reject pointless competition or avoid responsibility. The same words invite different judgments depending on the situation."},{"zh":"借用前一位玩家的答案、流行套話或多數人的說法，讓自己的表達與群體保持一致。標籤指向的是重複和附和的表達方式；即使結論相同，獨立提出理由也可能帶來不同的判斷。","en":"Borrows a previous player’s answer, a familiar slogan, or the majority view. The label concerns repetition and agreement as a way of speaking. Reaching the same conclusion with independent reasons may lead the table to a different reading."},{"zh":"同時承認兩邊的理由，推遲表態或隨局勢變化調整立場。其趣味來自審慎權衡與迴避承諾之間的模糊地帶：一句“看情況”，究竟是在補充條件，還是不願承擔選擇的後果？","en":"Acknowledges both sides, postpones a position, or shifts with circumstances. The ambiguity lies between careful judgment and avoiding commitment: does “it depends” add a meaningful condition, or sidestep the consequences of choosing?"},{"zh":"站在場外提出自信的指導和看似簡單的解決辦法，卻較少考慮實際經驗、成本與限制。與專挑漏洞的槓精不同，鍵盤俠更傾向於告訴別人“你應該怎麼做”，讓建議與行動之間的距離成為討論對象。","en":"Offers confident advice from the sidelines while overlooking practical experience, costs, and constraints. Unlike the argument picker, this voice focuses on telling others what to do. The gap between easy advice and difficult action becomes part of the discussion."},{"zh":"把事件當作可以圍觀、玩梗或製造戲劇性的材料，優先追求有趣的反應。玩家可能用幽默緩和氣氛，也可能故意拱火；群體判斷的是這句話在推動解決問題，還是讓場面更熱鬧。","en":"Treats an event as material for jokes, spectacle, or a dramatic reaction. Humor may ease tension or deliberately escalate it. The table decides whether the answer helps resolve the issue or mainly makes it more entertaining."}];
  labels.core.forEach((label, index) => {
    label.desc = coreDescriptions[index].zh;
    label.enDesc = coreDescriptions[index].en;
  });

  const categories = [
    { id: 'everyday', zh: '網絡與日常邊界', en: 'Online and everyday boundaries', zhDesc: '數字禮儀、隱私、觀看與表達。', enDesc: 'Digital etiquette, privacy, watching, and expression.' },
    { id: 'relations', zh: '朋友、親密關係與家庭', en: 'Friends, intimacy, and family', zhDesc: '關係邊界、虧欠、信任與嫉妒。', enDesc: 'Boundaries, obligation, trust, and jealousy.' },
    { id: 'work', zh: '職場、學校與合作', en: 'Work, school, and collaboration', zhDesc: '權力、責任、功勞、規則與公平。', enDesc: 'Power, responsibility, credit, rules, and fairness.' },
    { id: 'ethics', zh: '金錢、公共規則與倫理', en: 'Money, public rules, and ethics', zhDesc: '資源分配、公共秩序、手段與正當性。', enDesc: 'Resources, public order, means, and legitimacy.' },
    { id: 'identity', zh: '虛幻、身份與技術', en: 'Fiction, identity, and technology', zhDesc: '記憶、複製、讀心、算法與家庭秘密。', enDesc: 'Memory, copies, mind-reading, algorithms, and family secrets.' }
  ];

  const questionRows = [
    ['everyday', '下班後工作群消息要回嗎？', 'Should you reply to work-group messages after work?'],
    ['everyday', '只看剪輯，算看過一部劇嗎？', 'Does watching only the clips count as having watched a series?'],
    ['everyday', '朋友圈不點讚，算不重視嗎？', 'Does not liking a friend’s post mean you do not care?'],
    ['everyday', '前任點讚要回讚嗎？', 'Should you like an ex’s post back?'],
    ['everyday', '截圖聊天要不要打碼？', 'Should chat screenshots be redacted?'],
    ['everyday', '熱鬧就等於關係好嗎？', 'Does a lively social life mean a good relationship?'],
    ['everyday', '空調優先顧怕冷還是怕熱？', 'Should the AC accommodate the person who feels cold or the one who feels hot?'],
    ['everyday', '三天可見要解釋嗎？', 'Do you need to explain setting posts visible for only three days?'],
    ['everyday', '朋友圈屏蔽朋友要說嗎？', 'Should you tell a friend if you hide your posts from them?'],
    ['everyday', '刪除聊天記錄算心虛嗎？', 'Does deleting chat history make you look guilty?'],
    ['everyday', '發動態要先問同框人嗎？', 'Should you ask people in a photo before posting it?'],
    ['everyday', '網上吵架要不要講道理？', 'Should you reason with someone in an online argument?'],
    ['everyday', '私信已讀不回算冷淡嗎？', 'Is leaving a direct message on read a sign of indifference?'],
    ['everyday', '會議必須開攝像頭嗎？', 'Should cameras be mandatory in meetings?'],
    ['everyday', '吃飯看手機算失禮嗎？', 'Is looking at your phone while eating rude?'],
    ['everyday', '追劇要不要開倍速？', 'Should you watch a series at accelerated speed?'],
    ['everyday', '網購評價要寫實話嗎？', 'Should online shopping reviews tell the full truth?'],
    ['relations', '朋友吐槽伴侶該勸還是罵？', 'When a friend complains about their partner, should you advise them or curse the partner?'],
    ['relations', '朋友遲到要不要先開飯？', 'Should you start eating before a late friend arrives?'],
    ['relations', '朋友請客要搶著買單嗎？', 'When a friend is treating, should you fight to pay?'],
    ['relations', '朋友失戀要一直陪嗎？', 'Should you stay with a friend through a breakup?'],
    ['relations', '朋友臨時放鴿子要原諒嗎？', 'Should you forgive a friend for canceling at the last minute?'],
    ['relations', '朋友吐槽同事要附和嗎？', 'Should you agree when a friend complains about a colleague?'],
    ['relations', '朋友總遲到要直接說嗎？', 'Should you directly call out a friend who is always late?'],
    ['relations', '禮物不喜歡要表現嗎？', 'Should you show it when you dislike a gift?'],
    ['relations', '朋友請教問題要免費幫嗎？', 'Should you help a friend for free when they ask for advice?'],
    ['relations', '關係淡了要主動聯繫嗎？', 'Should you reach out when a relationship starts to fade?'],
    ['relations', '做客空手去合適嗎？', 'Is it acceptable to visit someone empty-handed?'],
    ['relations', '朋友唱歌跑調要提醒嗎？', 'Should you tell a friend when they sing off-key?'],
    ['relations', '桌遊輸了要請客嗎？', 'Should the loser of a tabletop game buy the next round?'],
    ['relations', '伴侶手機要不要互看？', 'Should partners look through each other’s phones?'],
    ['relations', '伴侶晚回家要報備嗎？', 'Should a partner report in when coming home late?'],
    ['relations', '伴侶生氣要馬上哄嗎？', 'Should you comfort a partner immediately when they are angry?'],
    ['relations', '室友作息不同要遷就嗎？', 'Should roommates accommodate different schedules?'],
    ['relations', '室友帶朋友回家要先說嗎？', 'Should a roommate give notice before bringing friends home?'],
    ['relations', '親密關係要共享定位嗎？', 'Should intimate partners share their locations?'],
    ['relations', '對象堅持月供占一半收入，日子怎麼過？', 'How do you live with a partner who insists on spending half their income on monthly payments?'],
    ['relations', '朋友之間容得下嫉妒嗎？', 'Can friendship make room for jealousy?'],
    ['relations', '父母的付出需要子女償還嗎？', 'Do children have to repay what their parents have given them?'],
    ['relations', '忘記傷害等於真正原諒嗎？', 'Does forgetting a hurt mean truly forgiving?'],
    ['work', '認真但做得慢算拖後腿嗎？', 'Does being careful but slow count as holding the team back?'],
    ['work', '加班的人該公開表揚嗎？', 'Should people who work overtime be praised publicly?'],
    ['work', '上班摸魚算休息嗎？', 'Does slacking off at work count as taking a break?'],
    ['work', '領導發語音要秒回嗎？', 'Do you have to reply instantly when your boss sends a voice message?'],
    ['work', '工作成果看過程還是結果？', 'Should work be judged by process or result?'],
    ['work', '任務分工要平均嗎？', 'Should tasks be divided equally?'],
    ['work', '臨時任務可以拒絕嗎？', 'Can you refuse an unexpected task?'],
    ['work', '工作慢但少錯更好嗎？', 'Is it better to work slowly and make fewer mistakes?'],
    ['work', '公共冰箱過期誰處理？', 'Who should deal with expired food in a shared fridge?'],
    ['work', '領導說吃完這頓飯就升職，你怎麼辦？', 'Your boss says you will be promoted after this meal. What do you do?'],
    ['work', '同事不肯留下文字記錄，這活怎麼接？', 'A colleague refuses to leave a written record. How do you take on the work?'],
    ['work', '結果正確能原諒手段錯誤嗎？', 'Can a correct result excuse the wrong means?'],
    ['work', '領導的錯誤決定也該執行嗎？', 'Should you carry out a boss’s wrong decision anyway?'],
    ['work', '業績達標能原諒違規操作嗎？', 'Can meeting performance targets excuse rule-breaking?'],
    ['work', '違反校規做好事該受罰嗎？', 'Should someone be punished for doing good by breaking school rules?'],
    ['work', '舉報同事算背叛團隊嗎？', 'Is reporting a colleague a betrayal of the team?'],
    ['work', '加班能證明工作態度嗎？', 'Can overtime prove a good work attitude?'],
    ['work', '小組作業該讓所有人同分嗎？', 'Should everyone get the same score for group work?'],
    ['work', '領導公開員工失誤，算管理還是羞辱？', 'Is publicly exposing an employee’s mistake management or humiliation?'],
    ['work', '團隊靠一人加班，功勞該如何分？', 'When a team relies on one person working overtime, how should credit be divided?'],
    ['work', '老師按成績排座位，算公平嗎？', 'Is seating students by grades fair?'],
    ['work', '同事靠關係升職，能力還有意義嗎？', 'If a colleague is promoted through connections, does ability still matter?'],
    ['ethics', 'AA制真的最公平嗎？', 'Is splitting the bill really the fairest option?'],
    ['ethics', '朋友借錢要寫欠條嗎？', 'Should friends write an IOU when lending money?'],
    ['ethics', '公交讓座要看年齡嗎？', 'Should giving up a bus seat depend on age?'],
    ['ethics', '外賣少送東西要投訴嗎？', 'Should you complain when a delivery order is missing something?'],
    ['ethics', '鄰居把你的車位砌成花壇，怎麼辦？', 'What do you do if a neighbor turns your parking space into a flower bed?'],
    ['ethics', '買了頭等艙卻被塞進經濟艙，怎麼辦？', 'What do you do if you paid for first class but are placed in economy?'],
    ['ethics', '你發現朋友的餐館後廚很髒，怎麼辦？', 'What do you do if you discover your friend’s restaurant kitchen is filthy?'],
    ['ethics', '體面的謊言可以被接受嗎？', 'Can a well-intentioned lie be accepted?'],
    ['ethics', '真相和安慰，哪個更接近善意？', 'Which is closer to kindness: truth or comfort?'],
    ['ethics', '服從規則等於認同規則嗎？', 'Does obeying a rule mean you agree with it?'],
    ['ethics', '合法的事一定正當嗎？', 'Is everything legal necessarily right?'],
    ['ethics', '懲罰能真正修復傷害嗎？', 'Can punishment truly repair harm?'],
    ['ethics', '外貌優勢算不算一種特權？', 'Does an appearance advantage count as a privilege?'],
    ['ethics', '冒犯感能成為禁言理由嗎？', 'Can feeling offended be a reason to silence someone?'],
    ['ethics', '熟人插隊，關係能讓規則讓步嗎？', 'If an acquaintance cuts the line, should relationships make room around the rules?'],
    ['ethics', '拍下不文明行為算侵犯隱私嗎？', 'Is filming uncivil behavior an invasion of privacy?'],
    ['identity', '三十歲重讀本科，原來的生活怎麼安置？', 'At thirty, how do you make room for life while starting a bachelor’s degree again?'],
    ['identity', '你一夜爆紅，網友開始人肉你，怎麼辦？', 'You become famous overnight and strangers start doxxing you. What do you do?'],
    ['identity', '人人都能讀心，關係會更真實嗎？', 'If everyone could read minds, would relationships become more genuine?'],
    ['identity', '擁有原主記憶的複製人，還是本人嗎？', 'Is a copy with the original person’s memories still the same person?'],
    ['identity', '愛情可以購買，還能證明真心嗎？', 'If love could be bought, could it still prove sincerity?'],
    ['identity', '過去的錯誤能定義一個人嗎？', 'Can a person’s past mistakes define them?'],
    ['identity', '偽裝久了會變成真實嗎？', 'Can a disguise become real if you wear it long enough?'],
    ['identity', '便利值得交換多少隱私？', 'How much privacy is convenience worth?'],
    ['identity', '算法比人更適合做決定嗎？', 'Are algorithms better suited than people to make decisions?'],
    ['identity', '被機器了解算不算被理解？', 'Does being known by a machine count as being understood?'],
    ['identity', '被保護和被控制如何區分？', 'How do you tell protection from control?'],
    ['identity', '保護秘密也可能是一種背叛嗎？', 'Can protecting a secret also be a form of betrayal?'],
    ['identity', '家庭秘密需要向下一代公開嗎？', 'Do family secrets need to be disclosed to the next generation?'],
    ['identity', '匿名發言需要承擔同等責任嗎？', 'Should anonymous speech carry the same responsibility?']
  ];
  const questions = questionRows.map(([category, zh, en], index) => ({ number: index + 1, category, zh, en }));

  const labelCard = (label, isCore) => {
    const name = lang === 'zh' ? label.name : label.enName;
    const slogan = lang === 'zh' ? label.slogan : label.enSlogan;
    const desc = lang === 'zh' ? label.desc : label.enDesc;
    const alt = `${name} ${lang === 'zh' ? '標籤卡' : 'identity label card'}`;
    return `
      <article class="label-atlas-card ${isCore ? 'label-atlas-card-core' : 'label-atlas-card-extension'}" style="--label-color: ${label.color}">
        <figure class="label-atlas-media">
          <div class="atlas-card-mask"><img src="${assets}/labels/${label.file}" alt="${escapeHtml(alt)}" loading="lazy" /></div>
          <figcaption>${isCore ? copy.core : copy.extension}</figcaption>
        </figure>
        <div class="label-atlas-copy">
          <h4>${escapeHtml(name)}</h4>
          <p class="label-atlas-slogan">${escapeHtml(slogan)}</p>
          <p>${escapeHtml(desc)}</p>
        </div>
      </article>`;
  };

  const questionCard = (question, featured = false) => {
    const number = pad(question.number);
    const category = categories.find((item) => item.id === question.category);
    const categoryName = lang === 'zh' ? category.zh : category.en;
    const aria = `${copy.questionAlt} ${number}, ${categoryName}. ${question.en}`;
    return `
      <figure class="question-card-atlas-item ${featured ? 'question-card-atlas-item-featured' : ''}" tabindex="0" aria-label="${escapeHtml(aria)}">
        <div class="question-card-atlas-visual">
          <img src="${assets}/questions/q-${number}.jpg" alt="${escapeHtml(copy.questionAlt)} ${number}" loading="lazy" />
          <span class="question-card-atlas-translation">${escapeHtml(question.en)}</span>
        </div>
        <figcaption><span>Q${number}</span><span class="question-card-atlas-hint">${copy.hoverHint}</span></figcaption>
      </figure>`;
  };

  const questionCategory = (category, index) => {
    const group = questions.filter((question) => question.category === category.id);
    const name = lang === 'zh' ? category.zh : category.en;
    const desc = lang === 'zh' ? category.zhDesc : category.enDesc;
    return `
      <section class="question-atlas-category">
        <div class="question-atlas-category-heading">
          <div>
            <p class="question-atlas-category-index">${pad(index + 1)} / ${escapeHtml(copy.questionsTitle)}</p>
            <h4>${escapeHtml(name)}</h4>
            <p>${escapeHtml(desc)}</p>
          </div>
        </div>
        <div class="question-atlas-category-layout">
          <div class="question-atlas-featured">
            ${questionCard(group[0], true)}
          </div>
          <div class="question-atlas-array">
            ${group.slice(1).map((question) => questionCard(question)).join('')}
          </div>
        </div>
      </section>`;
  };

  root.innerHTML = `
    <div class="card-atlas-intro">
      <h2 class="section-heading">${copy.title}</h2>
      <p>${escapeHtml(copy.intro)}</p>
    </div>
    <section class="label-atlas-block">
      <div class="card-atlas-block-heading">
        <h3>${copy.coreTitle}</h3>
      </div>
      <div class="label-atlas-grid label-atlas-grid-core">
        ${labels.core.map((label) => labelCard(label, true)).join('')}
      </div>
    </section>
    <section class="label-atlas-block label-atlas-extension-block">
      <div class="card-atlas-block-heading">
        <h3>${copy.extensionTitle}</h3>
      </div>
      <div class="label-atlas-grid label-atlas-grid-extension">
        ${labels.extension.map((label) => labelCard(label, false)).join('')}
      </div>
    </section>
    <section class="question-atlas-block">
      <div class="card-atlas-block-heading">
        <h3>${copy.questionsTitle}</h3>
      </div>
      <div class="question-atlas-categories">
        ${categories.map((category, index) => questionCategory(category, index)).join('')}
      </div>
    </section>`;
})();
