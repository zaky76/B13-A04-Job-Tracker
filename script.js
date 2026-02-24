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
const noDataMsg = document.getElementById('no-data-msg');


function calculateTotalCount() {
    totalCount.innerText = allCardSection.children.length
    interviewCount.innerText = interviewCountList.length
    rejectedCount.innerText = rejectedCountList.length
}

calculateTotalCount()


//toggle
function toggleStyle(id) {
    const buttons = [allFilterBtn, interviewFilterBtn, rejectedFilterBtn];
    
    buttons.forEach(btn => {
        btn.classList.remove('bg-[#3B82F6]', 'text-white');
        btn.classList.add('bg-white', 'text-black');
    });

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-[#3B82F6]', 'text-white');
    
    currentStatus = id;
    const noDataMsg = document.getElementById('no-data-msg');

    if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filteredSection.classList.add('hidden');
        if(noDataMsg) noDataMsg.classList.add('hidden');
    } 
    else {
        allCardSection.classList.add('hidden');
        let listToCheck = (id === 'interview-filter-btn') ? interviewCountList : rejectedCountList;

        if (listToCheck.length === 0) {
            if(noDataMsg) noDataMsg.classList.remove('hidden');
            filteredSection.classList.add('hidden');
        } else {
            if(noDataMsg) noDataMsg.classList.add('hidden');
            filteredSection.classList.remove('hidden');
            
            if (id === 'interview-filter-btn') renderInterview();
            else renderRejected();
        }
    }
} 

mainContainer.addEventListener('click', function (event) {
    // for interview
    if (event.target.classList.contains('interview-btn')) {
        const ParentNode = event.target.parentNode.parentNode;
        const companyName = ParentNode.querySelector('.companyName').innerText;
        const jobTitle = ParentNode.querySelector('.jobTitle').innerText;
        const jobDescription = ParentNode.querySelector('.jobDescription').innerText;
        const status = ParentNode.querySelector('.status').innerText;
        const notes = ParentNode.querySelector('.notes').innerText;

        ParentNode.querySelector('.status').innerText = 'INTERVIEW';

        const CardInfo = {
            companyName,
            jobTitle,
            jobDescription,
            status: 'INTERVIEW',
            notes
        }


        //validation for same card no need push in array
        const jobExist = interviewCountList.find(item => item.companyName == CardInfo.companyName)


        if (!jobExist) {
            interviewCountList.push(CardInfo)
        }

        rejectedCountList = rejectedCountList.filter(item => item.companyName != CardInfo.companyName)

        calculateTotalCount()

        if (currentStatus == "rejected-filter-btn") {
            renderRejected()
        }



    }
    // for reject
    else if (event.target.classList.contains('rejected-btn')) {
        const ParentNode = event.target.parentNode.parentNode;
        const companyName = ParentNode.querySelector('.companyName').innerText;
        const jobTitle = ParentNode.querySelector('.jobTitle').innerText;
        const jobDescription = ParentNode.querySelector('.jobDescription').innerText;
        const status = ParentNode.querySelector('.status').innerText;
        const notes = ParentNode.querySelector('.notes').innerText;

        ParentNode.querySelector('.status').innerText = 'REJECTED';

        const CardInfo = {
            companyName,
            jobTitle,
            jobDescription,
            status: 'REJECTED',
            notes
        }


        //validation for same card no need push in array
        const jobExist = rejectedCountList.find(item => item.companyName == CardInfo.companyName)


        if (!jobExist) {
            rejectedCountList.push(CardInfo)
        }

        interviewCountList = interviewCountList.filter(item => item.companyName != CardInfo.companyName)

        if (currentStatus == "interview-filter-btn") {
            renderInterview()
        }
        calculateTotalCount()
    }
    // for delete
    else if (event.target.closest('.delete-btn')) {
    const parentCard = event.target.closest('.card');
    const companyName = parentCard.querySelector('.companyName').innerText;

    if (confirm(`${companyName} you can delete?`)) {
        
        parentCard.remove();

        interviewCountList = interviewCountList.filter(item => item.companyName !== companyName);
        rejectedCountList = rejectedCountList.filter(item => item.companyName !== companyName);

        calculateTotalCount();

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        } else if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }
    }
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
                    <p class="companyName text-[#002C5C] text-xl  font-semibold">${interview.companyName}</p>
                    <p class="jobTitle text-[16px]">${interview.jobTitle}</p>
                </div>

                <div>
                    <p class="jobDescription py-1 ">${interview.jobDescription}s</p>
                </div>

                <div><span class="status bg-blue-100 text-blue-950 py-2 px-3">${interview.status}</span></div>
               <p class="notes text-[16px]">${interview.notes}</p>

                <div class="flex gap-5">
                    <button
                        class="interview-btn text-[#10B981] border-2 border-green-300 rounded-sm px-4 py-2">INTERVIEW</button>
                    <button
                        class="rejected-btn text-[#EF4444] border border-red-300 rounded-sm px-4 py-2">REJECTED</button>
                </div>
        </div>
        <div>
            <button class="delete-btn rounded-full shadow-md  border border-red-300 text-[#EF4444] py-2 px-2"><i
                    class="fa-solid fa-trash-can"></i></button>
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
                    <p class="companyName text-[#002C5C] text-xl  font-semibold">${rejected.companyName}</p>
                    <p class="jobTitle text-[16px]">${rejected.jobTitle}</p>
                </div>

                <div>
                    <p class="jobDescription py-1 ">${rejected.jobDescription}s</p>
                </div>

                <div><span class="status bg-blue-100 text-blue-950 py-2 px-3">${rejected.status}</span></div>
                <p class="notes text-[16px]">${rejected.notes}</p>

                <div class="flex gap-5">
                    <button
                        class="interview-btn text-[#10B981] border-2 border-green-300 rounded-sm px-4 py-2">INTERVIEW</button>
                    <button
                        class="rejected-btn text-[#EF4444] border border-red-300 rounded-sm px-4 py-2">REJECTED</button>
                </div>
          </div>
          <div>
                <button class="delete-btn rounded-full shadow-md  border border-red-300 text-[#EF4444] py-2 px-2"><i
                        class="fa-solid fa-trash-can"></i></button>
            </div>
            `
        filteredSection.appendChild(div)
    }
}      


  