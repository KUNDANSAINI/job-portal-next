import queryString from "query-string"



export const recruiterForm=[
    {
        label:"Name",
        name:"name",
        placeholder:"Enter Your Name",
        componentType:"input"
    },
    {
        label:"Company Name",
        name:"companyName",
        placeholder:"Enter Your Company Name",
        componentType:"input"
    },
    {
        label:"Company Role",
        name:"companyRole",
        placeholder:"Enter Your Company Role",
        componentType:"input"
    }
]

export const initialRecruiterState={
    name:'',
    companyName:'',
    companyRole:''
}

export const candidateForm=[
    {
        label:"Resume",
        name:"resume",
        componentType:"file"
    },
    {
        label:"Name",
        name:"name",
        placeholder:"Name",
        componentType:"input"
    },
    {
        label:"Current Company",
        name:"currentCompany",
        placeholder:"Current Company",
        componentType:"input"
    },
    {
        label:"Current Job Location",
        name:"currentJobLocation",
        placeholder:"Current Job Location",
        componentType:"input"
    },
    {
        label:"Prefered Job Location",
        name:"preferedJobLocation",
        placeholder:"Prefered Job Location",
        componentType:"input"
    },
    {
        label:"Current Salary",
        name:"currentSalary",
        placeholder:"Current Salary",
        componentType:"input"
    },
    {
        label:"Notice Period",
        name:"noticePeriod",
        placeholder:"Notice Period",
        componentType:"input"
    },
    {
        label:"Skills",
        name:"skills",
        placeholder:"Skills",
        componentType:"input"
    },
    {
        label:"Previous Companies",
        name:"previousCompanies",
        placeholder:"Previous Companies",
        componentType:"input"
    },
    {
        label:"Total Experience",
        name:"totalExperience",
        placeholder:"Total Experience",
        componentType:"input"
    },
    {
        label:"College",
        name:"college",
        placeholder:"College",
        componentType:"input"
    },
    {
        label:"College Location",
        name:"collegeLocation",
        placeholder:"College Location",
        componentType:"input"
    },
    {
        label:"Graduated Year",
        name:"graduatedYear",
        placeholder:"Graduated Year",
        componentType:"input"
    },
    {
        label:"LinkedIn Profile",
        name:"linkedinProfile",
        placeholder:"LinkedIn Profile",
        componentType:"input"
    },
    {
        label:"GitHub Profile",
        name:"githubProfile",
        placeholder:"GitHub Profile",
        componentType:"input"
    }
]

export const initialCandidateState={
    resume:"",
    name:"",
    currentCompany:"",
    currentJobLocation:"",
    preferedJobLocation:"",
    currentSalary:"",
    noticePeriod:"",
    skills:"",
    previousCompanies:"",
    totalExperience:"",
    college:"",
    collegeLocation:"",
    graduatedYear:"",
    linkedinProfile:"",
    githubProfile:"",
}
export const initialCandidateAccountState={
    name:"",
    currentCompany:"",
    currentJobLocation:"",
    preferedJobLocation:"",
    currentSalary:"",
    noticePeriod:"",
    skills:"",
    previousCompanies:"",
    totalExperience:"",
    college:"",
    collegeLocation:"",
    graduatedYear:"",
    linkedinProfile:"",
    githubProfile:"",
}

export const postNewJobForm=[
    {
        label:"Company Name",
        name:"companyName",
        placeholder:"Company Name",
        componentType:"input",
        disabled:true
    },
    {
        label:"Job Title",
        name:"title",
        placeholder:"Job Title",
        componentType:"input",
    },
    {
        label:"Job Type",
        name:"type",
        placeholder:"Job Type",
        componentType:"input",
    },
    {
        label:"Job Location",
        name:"location",
        placeholder:"Job Location",
        componentType:"input",
    },
    {
        label:"Experience",
        name:"experience",
        placeholder:"Minimum Experience",
        componentType:"input",
    },
    {
        label:"Descripation",
        name:"descripation",
        placeholder:"Descripation",
        componentType:"input",
    },
    {
        label:"Skills",
        name:"skills",
        placeholder:"Required Skills",
        componentType:"input",
    },
]


export const initialPostNewJobState={
    companyName:"",
    title:"",
    type:"",
    location:"",
    experience:"",
    descripation:"",
    skills:"",
}

export const filterMenuData=[
    {
        id:"companyName",
        label:"Company Name"
    },
    {
        id:"title",
        label:"Title"
    },
    {
        id:"type",
        label:"Type"
    },
    {
        id:"location",
        label:"Location"
    },
]

// Query String Adding

export function formUrlQuery(params){
    const {param,dataToAdd}=params
    let currentURL= queryString.parse(param)
    if(Object.keys(dataToAdd).length > 0){
        Object.keys(dataToAdd).map((key)=>{
            if(dataToAdd[key].length === 0) delete currentURL[key]
            else currentURL[key] = dataToAdd[key].join(',')
        })
    }
    return queryString.stringifyUrl(
        {
            url:window.location.pathname,
            query: currentURL
        },{
            skipNull :true
        }
    )
}


// Membership Plans 

export const memberShipPlans=[
    {
        heading: 'Tier 1',
        price: 100,
        type: "basic"
    },
    {
        heading: 'Tier 2',
        price: 1000,
        type: "teams"
    },
    {
        heading: 'Tier 3',
        price: 5000,
        type: "enterprise"
    },
]