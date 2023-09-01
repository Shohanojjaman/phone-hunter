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
    <button class="secondary-btn" onclick="loadDetails('${phone.slug}')">Show Details</button>
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

const loadDetails = async (phoneId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`);
  const data = await res.json();
  const phone = data.data;

  showDetails(phone);
};
function showDetails(phone) {
  const phoneDetails = document.getElementById('phoneDetails');
  phoneDetails.textContent = '';
  const singlePhone = document.createElement('article');
  singlePhone.innerHTML = `
    <div class="bg-[#0D6EFD0D] p-12 rounded-lg mb-10">
        <img src="${phone.image}" class="mx-auto  bg-[#0D6EFD0D]">
    </div>
    <h4 class="font-bold text-heading text-3xl">${phone.name}</h4>

    <p class="text-body text-base">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p class="text-xl text-body"><b class="text-heading font-semibold">Storage:</b> ${phone?.mainFeatures?.storage}</p>
    <p class="text-xl text-body"><b class="text-heading font-semibold">Display Size :</b> ${phone?.mainFeatures?.displaySize}</p>
    <p class="text-xl text-body"><b class="text-heading font-semibold">Chipset:</b> ${phone?.mainFeatures?.chipSet}</p>
    <p class="text-xl text-body"><b class="text-heading font-semibold">Memory:</b> ${phone?.mainFeatures?.memory}</p>
    <p class="text-xl text-body"><b class="text-heading font-semibold">Slug:</b> ${phone?.slug}</p>
    <p class="text-xl text-body"><b class="text-heading font-semibold">Release data:</b> ${phone?.releaseDate}</p>
    <p class="text-xl text-body"><b class="text-heading font-semibold">Brand:</b> ${phone?.brand}</p>
    <p class="text-xl text-body"><b class="text-heading font-semibold">GPS:</b> ${phone?.others?.GPS}</p>
  `;
  singlePhone.classList.add('w-[47rem]', 'space-y-4');
  phoneDetails.appendChild(singlePhone);

  show_details_modal.showModal();
}
