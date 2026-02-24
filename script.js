let interviewCountList = [];
let rejectedCountList = [];
let currentStatus = 'all'

let totalCount = document.getElementById('totalCount');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');
const filteredSection = document.getElementById('filtered-section');


function calculateTotalCount() {
    totalCount.innerText = allCardSection.children.length
    interviewCount.innerText = interviewCountList.length
    rejectedCount.innerText = rejectedCountList.length
}

calculateTotalCount()


//toggle (for three btn)
function toggleStyle(id) {
    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')

    allFilterBtn.classList.add('bg-white', 'text-black')
    interviewFilterBtn.classList.add('bg-white', 'text-black')
    rejectedFilterBtn.classList.add('bg-white', 'text-black')

    const selected = document.getElementById(id);
    currentStatus = id

    selected.classList.remove('bg-white', 'text-black')
    selected.classList.add('bg-[#3B82F6]', 'text-white')

    //filtering
    if(id == 'interview-filter-btn'){
        allCardSection.classList.add('hidden')
        filteredSection.classList.remove('hidden')
        renderInterview()
    }
    else if(id == 'all-filter-btn'){
        allCardSection.classList.remove('hidden')
        filteredSection.classList.add('hidden')
    }
    else if (id == 'rejected-filter-btn'){
        allCardSection.classList.add('hidden')
        filteredSection.classList.remove('hidden')
        renderRejected()
    }
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const ParentNode = event.target.parentNode.parentNode;
        const companyName = ParentNode.querySelector('.companyName').innerText;
        const jobTitle = ParentNode.querySelector('.jobTitle').innerText;
        const jobDescription = ParentNode.querySelector('.jobDescription').innerText;
        const status = ParentNode.querySelector('.status').innerText;
        const notes = ParentNode.querySelector('.notes').innerText;

         ParentNode.querySelector('.status').innerText  = 'INTERVIEW';

        const CardInfo = {
            companyName,
            jobTitle,
            jobDescription,
            status:'INTERVIEW',
            notes
        }


        //validation for same card no need push in array
        const jobExist = interviewCountList.find(item => item.companyName == CardInfo.companyName)
       

        if (!jobExist) {
            interviewCountList.push(CardInfo)
        }

         rejectedCountList = rejectedCountList.filter(item=>item.companyName != CardInfo.companyName)

         calculateTotalCount() 

         if(currentStatus == "rejected-filter-btn"){
            renderRejected()
        }
        
       
      
    }
    else if (event.target.classList.contains('rejected-btn')) {
        const ParentNode = event.target.parentNode.parentNode;
        const companyName = ParentNode.querySelector('.companyName').innerText;
        const jobTitle = ParentNode.querySelector('.jobTitle').innerText;
        const jobDescription = ParentNode.querySelector('.jobDescription').innerText;
        const status = ParentNode.querySelector('.status').innerText;
        const notes = ParentNode.querySelector('.notes').innerText;

         ParentNode.querySelector('.status').innerText  = 'REJECTED';

        const CardInfo = {
            companyName,
            jobTitle,
            jobDescription,
            status:'REJECTED',
            notes
        }


        //validation for same card no need push in array
        const jobExist = rejectedCountList.find(item => item.companyName == CardInfo.companyName)
       

        if (!jobExist) {
            rejectedCountList.push(CardInfo)
        }

        interviewCountList = interviewCountList.filter(item=>item.companyName != CardInfo.companyName)

        if(currentStatus == "interview-filter-btn"){
            renderInterview()
        }
        calculateTotalCount() 
    }
})

function renderInterview() {
    filteredSection.innerHTML = ''

    for (let interview of interviewCountList) {
        // console.log(interview);
        let div = document.createElement('div');
        div.className = 'card flex justify-between border border-gray-300 p-10 rounded'
        div.innerHTML = `
         <div class="space-y-4">
                    <div>
                        <p class="companyName text-3xl">${interview.companyName}</p>
                        <p class="jobTitle">${interview.jobTitle}</p>
                    </div>

                    <div class="flex gap-5">
                        <p class="jobDescription bg-gray-200 py-1 px-3">${interview.jobDescription}</p>
                    </div>

                    <p class="status">${interview.status}</p>
                    <p class="notes">New leaf unforling by the east window.</p>

                    <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">Rejected</button>
                    </div>
                </div>
                <div>
                    <button class="delete-btn bg-red-200 text-red-600 py-2 px-4">Delete</button>
                </div>
            `
            filteredSection.appendChild(div)
    }
}      
function renderRejected() {
    filteredSection.innerHTML = ''

    for (let rejected of rejectedCountList) {
        // console.log(rejected);
        let div = document.createElement('div');
        div.className = 'card flex justify-between border border-gray-300 p-10 rounded'
        div.innerHTML = `
         <div class="space-y-4">
                    <div>
                        <p class="companyName text-3xl">${rejected.companyName}</p>
                        <p class="jobTitle">${rejected.jobTitle}</p>
                    </div>

                    <div class="flex gap-5">
                        <p class="jobDescription bg-gray-200 py-1 px-3">${rejected.jobDescription}</p>
                    </div>

                    <p class="status">${rejected.status}</p>
                    <p class="notes">New leaf unforling by the east window.</p>

                    <div class="flex gap-5">
                        <button class="interview-btn bg-green-200 px-4 py-2">Interview</button>
                        <button class="rejected-btn bg-red-200 px-4 py-2">Rejected</button>
                    </div>
                </div>
                <div>
                    <button class="delete-btn bg-red-200 text-red-600 py-2 px-4">Delete</button>
                </div>
            `
            filteredSection.appendChild(div)
    }
}      