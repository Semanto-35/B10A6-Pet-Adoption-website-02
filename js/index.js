
let petsData = [];
let activeCategory = null;
// Function to fetch all pet categories
const loadAllCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json();
    displayAllCategories(data.categories);
};
loadAllCategory();
// Function to display all pet categories
const displayAllCategories = (categories) => {
    categories.forEach((patName) => {
        const buttonContainer = document.getElementById('btn-container');
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
            <button id="btn-${patName.category}" onclick="loadCategoryBtn('${patName.category}')" class="btn btn-sm lg:btn-lg md:h-16 lg:h-20 category-btn">
                <img class="w-5 md:w-8 lg:w-10" src="${patName.category_icon}" alt="">
                <h5 class="font-bold md:text-2xl">${patName.category}</h5>
            </button>
        `;
        buttonContainer.append(buttonDiv);
    });
};

// all button style
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (const btn of buttons) {
        btn.classList.remove('rounded-full', 'bg-[#0E7A81]/20', 'border', 'border-[#0E7A81]');
    };
};
// Function to fetch pets by category
const loadCategoryBtn = async (category) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await response.json();
    petsData = data.data;
    activeCategory = category;
    removeActiveClass();
    const activeBtn = document.getElementById(`btn-${category}`);
    activeBtn.classList.add('rounded-full', 'bg-[#0E7A81]/20', 'border', 'border-[#0E7A81]');
    spinnerDisplay(data.data);
};
// Function to show spinner
const spinnerDisplay = (datas) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = `
        <div class="flex justify-center md:col-span-2 lg:col-span-3">
            <span class="loading loading-spinner text-success loading-lg"></span>
        </div>
    `;
    setTimeout(() => {
        displayCategoryBtn(datas);
    }, 2000);
};
// Function to display pets by category
const displayCategoryBtn = (pets) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    if (pets.length == 0) {
        cardsContainer.classList.remove('grid');
        cardsContainer.innerHTML = `
            <div class="flex flex-col justify-center items-center bg-gray-100 rounded-3xl border py-24">
                <img src="./images/error.webp" alt="">
                <h3 class="font-bold text-center mt-7 text-2xl md:text-3xl">No Information Available</h3>
                <p class="w-11/12 md:w-3/4 mx-auto text-center mt-4 text-[#131313]/70">
                    It is a long established fact that a reader will be distracted by the readable content of a page when
                    looking at its layout. The point of using Lorem Ipsum is that it has a.
                </p>
            </div>
        `;
    } else {
        cardsContainer.classList.add('grid');
    }
    pets.forEach((pet) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList = 'card p-5 border space-y-6 shadow-xl';
        cardDiv.innerHTML = `
            <div class="md:h-40">
                <img class="w-full h-full object-cover rounded-lg" src="${pet.image}" alt="">
            </div>
            <div class="space-y-4">
                <h3 class="text-xl font-bold">
                    ${pet.pet_name}
                </h3>
                <div class="space-y-1">
                    <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                        <i class="fa-solid fa-shield-cat"></i>
                        <p>Breed: ${pet.breed ? pet.breed : "N/A"}</p>
                    </div>
                    <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                        <i class="fa-solid fa-calendar-days"></i>
                        <p>Birth: ${pet.date_of_birth ? pet.date_of_birth : "N/A"}</p>
                    </div>
                    <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                        <i class="fa-solid fa-mercury"></i>
                        <p>Gender: ${pet.gender ? pet.gender : "N/A"}</p>
                    </div>
                    <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p>Price : ${pet.price ? pet.price : "N/A"}$</p>
                    </div>
                </div>
                <hr class="border border-[#131313]/10">
                <div class="flex items-center justify-between">
                    <button onclick="addImages('${pet.image}')" class="btn btn-sm btn-outline font-bold"><i class="fa-solid fa-thumbs-up fa-lg" style="color: #0e7a81;"></i></button>
                    <button id="btn-${pet.petId}" onclick="Adopted('${pet.petId}')" class="btn btn-sm btn-outline text-[#0E7A81] font-bold">Adopt</button>
                    <button onclick="loadDetailsModal('${pet.petId}')" class="btn btn-sm btn-outline text-[#0E7A81] font-bold">Details</button>
                </div>
            </div>
        `;
        cardsContainer.append(cardDiv);
    });
};

// Function to fetch all pets
const loadAllPetsDetails = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    displayAllPetsDetails(data.pets);
};
loadAllPetsDetails();
// Function to display all pets
const displayAllPetsDetails = (PetsDetails) => {
    PetsDetails.forEach((pets) => {
        const cardsContainer = document.getElementById('cards-container');
        const cardDiv = document.createElement('div');
        cardDiv.classList = 'card p-5 border space-y-6 shadow-xl';
        cardDiv.innerHTML = `
            <div class="md:h-40">
                <img class="w-full h-full object-cover rounded-lg" src="${pets.image}" alt="">
            </div>
            <div class="space-y-4">
                <h3 class="text-xl font-bold">
                    ${pets.pet_name}
                </h3>
                <div class="space-y-1">
                    <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                       <i class="fa-solid fa-shield-cat"></i>
                       <p>Breed: ${pets.breed ? pets.breed : "N/A"}</p>
                    </div>
                    <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                        <i class="fa-solid fa-calendar-days"></i>
                        <p>Birth: ${pets.date_of_birth ? pets.date_of_birth : "N/A"}</p>
                    </div>
                    <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                        <i class="fa-solid fa-mercury"></i>
                        <p>Gender: ${pets.gender ? pets.gender : "N/A"}</p>
                    </div>
                    <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p>Price : ${pets.price ? pets.price : "N/A"}$</p>
                    </div>
                </div>
                <hr class="border border-[#131313]/10">
                <div class="flex items-center justify-between mt-2">
                    <button onclick="addImages('${pets.image}')" class="btn btn-sm btn-outline font-bold"><i class="fa-solid fa-thumbs-up fa-lg" style="color: #0e7a81;"></i></button>
                    <button id="btn-${pets.petId}" onclick="Adopted('${pets.petId}')" class="btn btn-sm btn-outline text-[#0E7A81] font-bold">Adopt</button>
                    <button onclick="loadDetailsModal('${pets.petId}')" class="btn btn-sm btn-outline text-[#0E7A81] font-bold">Details</button>
                </div>
            </div>
        `;
        cardsContainer.append(cardDiv);
    });
};


// Function to display all sorted pets by price
const sortByPrice = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    const sortedAllPets = [...data.pets].sort((a, b) => b.price - a.price);
    const sortedPets = petsData.sort((a, b) => b.price - a.price);
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    if (activeCategory && sortedPets.length == 0) {
        cardsContainer.innerHTML = `
            <div class="flex flex-col justify-center items-center bg-gray-100 rounded-3xl border py-24">
                <img src="./images/error.webp" alt="">
                <h3 class="font-bold text-center mt-7 text-2xl md:text-3xl">No Information Available</h3>
                <p class="w-11/12 md:w-3/4 mx-auto text-center mt-4 text-[#131313]/70">
                    It is a long established fact that a reader will be distracted by the readable content of a page when
                    looking at its layout. The point of using Lorem Ipsum is that it has a.
                </p>
            </div>
        `;
    }
    const sorted = activeCategory ? sortedPets : sortedAllPets;
    displayAllPetsDetails(sorted);

};



// onclick function for liked button
const addImages = (image) => {
    const imagesContainer = document.getElementById('images-container');
    const imgDiv = document.createElement('div');
    imgDiv.classList = 'h-32';
    imgDiv.innerHTML = `
        <img class="w-full h-full object-cover rounded-lg" src="${image}" alt="">
    `;
    imagesContainer.append(imgDiv);
};
// Function for adopt button modal
const Adopted = (id) => {
    let countdown = 3;
    document.getElementById('countdown').innerText = countdown;
    document.getElementById(`btn-${id}`).textContent = 'Adopted';
    document.getElementById(`btn-${id}`).disabled = true;
    document.getElementById('adoptModal').showModal();
    const interval = setInterval(() => {
        countdown--;
        document.getElementById('countdown').innerText = countdown;
        if (countdown == 0) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('adoptModal').close();
            }, 1000);
        }
    }, 1000);
};
// Function to fetch pets by id for details btn modal 
const loadDetailsModal = async (petId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await response.json();
    displayDetailsModal(data.petData);
};
// Function to show details button modal
const displayDetailsModal = (details) => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        <div class="h-80">
            <img class="w-full h-full object-cover rounded-lg" src="${details.image}" alt="">
        </div>
        <div class="mt-6">
            <h3 class="text-2xl font-bold">
               ${details.pet_name}
            </h3>
            <div class="py-4 grid grid-cols-2 gap-1">
                <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                    <i class="fa-solid fa-shield-cat"></i>
                    <p>Breed: ${details.breed ? details.breed : "N/A"}</p>
                </div>
                <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                    <i class="fa-solid fa-calendar-days"></i>
                    <p>Birth: ${details.date_of_birth ? details.date_of_birth : "N/A"}</p>
                </div>
                <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                    <i class="fa-solid fa-mercury"></i>
                    <p>Gender: ${details.gender ? details.gender : "N/A"}</p>
                </div>
                <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                    <i class="fa-solid fa-dollar-sign"></i>
                    <p>Price : ${details.price ? details.price : "N/A"}$</p>
                </div>
                <div class="flex items-center gap-2 font-medium text-[#131313]/70">
                    <i class="fa-solid fa-shield-virus"></i>
                    <p>Vaccinated status: ${details.vaccinated_status ? details.vaccinated_status : "N/A"}</p>
                </div>
            </div>
            <hr class="border border-[#131313]/10">
            <h4 class="text-xl font-bold mt-4">Details Information</h4>
            <p class="text-[#131313]/70 mt-2">${details.pet_details
        }</p>
        </div>
    `;
    document.getElementById('detailsModal').showModal();
};
// Function to scroll view more btn
const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: 'smooth' });
};