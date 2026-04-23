/* script.js — 渲染题目、采集答案并计算结果 */
const QUESTIONS = [
  '当我刷到朋友圈或群里有人发测试链接（如性格、职业、心理测试）时，我会毫不犹豫地点进去做。',
  '我会主动在搜索引擎或社交平台搜索“趣味测试”“心理测验”之类的内容。',
  '完成一个测试后，如果结果显示需要付费才能查看完整分析，我愿意花几块钱解锁。',
  '我曾经同一个测试做过两遍以上（比如隔了一段时间再做，为了看结果是否变化）。',
  '当有人说“这个测试超准”时，我会立刻产生强烈的想做欲望。',
  '我可以连续做10个以上不同类型的测试而不会感到疲倦或无聊。',
  '我会把测试结果截图保存，或者转发给朋友讨论。',
  '即使手头有重要的工作/学习任务，如果看到一个感兴趣的测试，我还是会先做完再说。',
  '我认为做测试是一种有效的自我探索方式，甚至比和朋友聊天更有收获。',
  '如果有一个全新的、包含100道题的深度测试，我愿意花40分钟认真完成。'
];

const LABELS = ['非常不符合', '不符合', '中等', '符合', '非常符合'];

const LEVELS = [
  { min: 10, max: 20, label: '佛系绝缘体', desc: '对做测试毫无兴趣，甚至有点抗拒。看到测试链接直接划走，觉得大多数测试都是浪费时间。' },
  { min: 21, max: 35, label: '路人甲', desc: '偶尔会做一两个感兴趣的测试（比如星座、MBTI），但不会主动寻找，也不会上瘾。属于正常范围。' },
  { min: 36, max: 45, label: '狂热测试粉', desc: '非常喜欢做测试，遇到新测试就手痒，会主动搜罗各种测评。做测试是你的小乐趣，甚至能从中获得自我认同感。' },
  { min: 46, max: 50, label: '无测不欢·终极玩家', desc: '你已经到了“看到测试就迈不动腿”的程度。手机里存着无数测试结果，每天不做几个测试就觉得少了点什么。建议控制一下，以防测试成瘾 😄' }
];

function $(s) { return document.querySelector(s) }

function renderQuestions() {
  const tbody = $('#questionsBody');
  tbody.innerHTML = '';
  QUESTIONS.forEach((q, idx) => {
    const tr = document.createElement('tr');
    const tdQ = document.createElement('td');
    tdQ.textContent = `${idx + 1}. ${q}`;
    tr.appendChild(tdQ);

    for (let v = 1; v <= 5; v++) {
      const td = document.createElement('td');
      td.style.textAlign = 'center';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${idx}`;
      input.value = v;
      input.id = `q${idx}v${v}`;
      const label = document.createElement('label');
      label.htmlFor = input.id;
      // keep label visually empty; header already describes scale
      td.appendChild(input);
      td.appendChild(label);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  });
}

function handleSubmit() {
  const answers = [];
  for (let i = 0; i < QUESTIONS.length; i++) {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    if (!sel) {
      alert('请完成所有题目后再提交。');
      return;
    }
    answers.push(Number(sel.value));
  }

  const sum = answers.reduce((a, b) => a + b, 0);
  $('#totalScore').textContent = sum;

  const level = LEVELS.find(l => sum >= l.min && sum <= l.max) || { label: '未知', desc: '' };
  $('#levelLabel').textContent = level.label;
  $('#levelDesc').textContent = level.desc;
  $('#result').classList.remove('hidden');
}

function handleReset() {
  document.getElementById('quizForm').reset();
  $('#result').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  renderQuestions();
  document.getElementById('quizForm').addEventListener('submit', (e) => { e.preventDefault(); handleSubmit(); });
  document.getElementById('resetBtn').addEventListener('click', handleReset);
});
