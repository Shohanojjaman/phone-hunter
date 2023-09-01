const loadData = async (searchValue, isShowAll) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phoneContainer');
  const showAllBtn = document.getElementById('showAllBtn');
  phoneContainer.textContent = '';

  if (phones.length > 6 && !isShowAll) {
    showAllBtn.classList.remove('hidden');
    showAllBtn.classList.add('block');
  } else {
    showAllBtn.classList.add('hidden');
    showAllBtn.classList.remove('block');
  }
  if (!isShowAll) {
    phones = phones.slice(0, 6);
  }

  phones.forEach((phone) => {
    const card = document.createElement('article');
    card.innerHTML = `
    <div class="bg-[#0D6EFD0D] p-12 rounded-lg">
            <img src="${phone.image}" class="mx-auto bg-[#0D6EFD0D]">
        </div>
        <h3 class="font-bold text-2xl text-heading">${phone.phone_name}</h3>
        <p class="text-body">There are many variations of passages of available, but the majority have suffered</p>
        <h5 class="font-bold text-2xl text-heading">$999</h5>
        <button class="secondary-btn">Show Details</button>
    `;
    card.classList.add('card');
    phoneContainer.appendChild(card);
  });
};
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const searchValue = document.getElementById('searchField').value;
  loadData(searchValue);
});
function searchForm(isShowAll, value) {
  const searchValue = document.getElementById('searchField').value;
  if (searchValue === '') {
    loadData(value, isShowAll);
  } else {
    loadData(searchValue, isShowAll);
  }
  return searchValue;
}
function showAllBtn() {
  searchForm(true, 'apple');
}
loadData('apple');
