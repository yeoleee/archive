// =========================
// DOM 캐싱
// =========================
const buttons = document.querySelectorAll('.filter-btn');
const items = Array.from(document.querySelectorAll('.item'));
const countEl = document.getElementById('count');
const loadMoreBtn = document.getElementById('loadMoreBtn');

const ITEMS_PER_PAGE = 3;
let currentPage = 1;
let currentFilter = 'all';
let filteredItems = [];

// =========================
// 필터링 + 페이지 계산
// =========================
function applyFilter(filter) {
  currentFilter = filter;
  currentPage = 1;
  let delay = 0;

  filteredItems = items.filter(item => {
    const categories = item.dataset.category.split(' ');
    return filter === 'all' || categories.includes(filter);
  });

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  items.forEach(item => {
    item.style.display = 'none';
  });

  filteredItems.forEach((item, index) => {
    if (index < ITEMS_PER_PAGE) {
      item.style.display = 'inline-flex';

      // 애니메이션 리셋
      item.style.animation = 'none';
      item.offsetHeight;
      item.style.animation = 'fadeUp 0.35s ease both';
      item.style.animationDelay = `${delay}ms`;

      delay += 40;
    }
  });

  countEl.textContent = filteredItems.length;
  updateLoadMore(totalPages);
}

// =========================
// 더보기
// =========================
function loadMore() {
  currentPage++;
  let delay = 0;

  const visibleCount = currentPage * ITEMS_PER_PAGE;

  filteredItems.forEach((item, index) => {
    if (index < visibleCount) {
      if (item.style.display === 'none') {
        item.style.display = 'inline-flex';

        item.style.animation = 'none';
        item.offsetHeight;
        item.style.animation = 'fadeUp 0.35s ease both';
        item.style.animationDelay = `${delay}ms`;

        delay += 40;
      }
    }
  });

  updateLoadMore(Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
}

// =========================
// 더보기 버튼 상태
// =========================
function updateLoadMore(totalPages) {
  if (currentPage >= totalPages) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
    loadMoreBtn.textContent = `(${currentPage}/${totalPages}) 더보기`;
  }
}

// =========================
// 필터 버튼 이벤트
// =========================
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    applyFilter(btn.dataset.filter);
  });
});

// =========================
// 더보기 클릭
// =========================
loadMoreBtn.addEventListener('click', loadMore);

// =========================
// 초기 실행
// =========================
applyFilter('all');
