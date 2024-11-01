"use client";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry,
  RowClickedEvent,
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@/app/admin/ag-grid-theme-builder.css"
import { useRouter } from "next/navigation";
import React, { StrictMode, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';
import * as XLSX from 'xlsx';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface Country {
  cntry_id: number;
  cntry_name: string;
}
interface State {
  st_id: number;
  st_name: string;
}

interface District {
  dis_id: number;
  dis_name: string;
}
type Corp = {
  cop_id: string;
  cop_name: string;
}
interface Lsgd {
  lsg_id: number;
  lsg_name: string;
}
type Category = {
  id: string;
  group_type: string;
}
interface SchoolType {
  id: string;
  type_name: string;
}
interface EduDistrict {
  edu_district_id: string;
  edu_district: string;
}
interface EduSubDistrict {
  edu_sub_district_id: string;
  edu_sub_district_name: string;
}
interface SubCategory {
  gp_cat_id: string;
  gp_cat_name: string;
}
interface Sahodaya {
  sahodaya_id: string;
  sahodaya_name: string;
}
interface IcdsBlock {
  icds_block_id: string;
  block_name: string;
}
interface IcdsProject {
  project_id: string;
  project_name: string;
}
interface MissionChapter {
  chapter_id: string;
  chapter_name: string;
}
interface MissionZone {
  zone_id: string;
  zone_name: string;
}


const AdminGrid = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get("adtoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [totalcount, setTotalcount] = useState("");
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedCntry, setSelectedCntry] = useState("");
    const [selectedCorp, setSelectedCorp] = useState("");
    const [selectedLsgd, setSelectedLsgd] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [lsgd, setLsgd] = useState<Lsgd[]>([]);
    const [corporation, setCorporation] = useState<Corp[]>([]);
    const [upname, setUpname] = useState("");
    const [email, setEmail] = useState("");
    const [upid, setUpid] = useState("");
    const [mobile, setMobile] = useState("");
    const [grouptype, setGroupType] = useState("");
    const [selectedschoolType, setSelectedSchoolType] = useState("");
    const [category, setCategory] = useState<Category[]>([]);
    const [schoolType, setSchoolType] = useState<SchoolType[]>([]);
    const [selectedDistrictGrp, setSelectedDistrictGrp] = useState("");
    const [eduDistrict, setEduDistrict] = useState<EduDistrict[]>([]);
    const [eduSubDistrict, setEduSubDistrict] = useState<EduSubDistrict[]>([]);
    const [selectedCountryGrp, setSelectedCountryGrp] = useState("");
    const [selectedStateGrp, setSelectedStateGrp] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [subcategoryOptions, setSubCategoryOptions] = useState<SubCategory[]>([]);
    const [selectSahodaya, setSelectSahodaya] = useState('');
    const [sahodaya, setSahodaya] = useState<Sahodaya[]>([]);
    const [icdsBlock, setIcdsBlock] = useState<IcdsBlock[]>([]);
    const [missionChapter, setMissionChapter] = useState<MissionChapter[]>([]);
    const [selectMissionarea, setSelectMissionarea] = useState('');
    const [selecteduDistrict, setSelecteduDistrict] = useState('');
    const [selecteduSubDistrict, setSelecteduSubDistrict] = useState('');
    const [selectIcdsBlock, setSelectIcdsBlock] = useState('');
    const [selectIcdsProject, setSelectIcdsProject] = useState('');
    const [missionZone, setMissionZone] = useState<MissionZone[]>([]);
    const [icdsProject, setIcdsProject] = useState<IcdsProject[]>([]);
    const [selectMission, setSelectedMission] = useState('');
    const [selectZone, setSelectedZone] = useState('');


  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {

      setCurrentPage(newPage);
    }
  }
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "up_id", headerName: "Uploader Id" },
    { field: "up_name", headerName: "Uploader name" },
    { field: "up_planter", headerName: "Planter name" },
    { field: "up_tree_name", headerName: "Tree name" },
    { field: "gp_name", headerName: "Group name" },
    { field: "co_ord_name", headerName: "Coordinator name" },
    { field: "group_type", headerName: "Group type" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: false,
    };
  }, []);
  const onRowClicked = (event: RowClickedEvent) => {

    const id = event.data.up_id;
    router.push(`challenges/${id}`);
  };
  const handleExportToExcel = async () => {
    try {
      const response = await axios.post(`${apiURL}/admin/adminChallenges`, {
        "isExcel": true
    },{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
      if (response.data.success && response.status!=203) {
        // Convert response zoneList into Excel
        const datalist = response.data.Uploads
  
        // Create a worksheet from the zoneList data
        const worksheet = XLSX.utils.json_to_sheet(datalist);
  
        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
        // Export the workbook to Excel
        XLSX.writeFile(workbook, 'data.xlsx');
      } else {
        console.error("Failed to export data");
      }
    } catch (error) {
      console.error("Error during exporting:", error);
    }
  };
  useEffect(() => {
    async function fetchdata(){
     if(token){

      
      const response = await axios.post(`${apiURL}/admin/adminChallenges?page=${currentPage}&limit=${itemsPerPage}`,{},{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
       if(response.data.success && response.status!=203){
       
        setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
        console.log(response.data)
         setRowData(response.data.Uploads);
       }
       
     }
    }
    fetchdata();
  }, [currentPage, token]);

  useEffect(() => {
    async function fetchData() {

        const countryResponse = await fetch(`${apiURL}/country`);
        const countryData = await countryResponse.json();
        setCountries(countryData.country);


        const stateResponse = await fetch(`${apiURL}/state`);
        const stateData = await stateResponse.json();
        setStates(stateData.state);

        const districtResponse = await fetch(`${apiURL}/district`);
        const districtData = await districtResponse.json();
        setDistricts(districtData.district);

    }
    fetchData();
}, [selectedCountry]);

useEffect(() => {
    async function fetchCorpData() {
        if (selectedCntry === "India" && selectedState === "Kerala" && selectedDistrict) {
            const dist_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
            const corpResponse = await fetch(`${apiURL}/corporation/${dist_id}`);
            const corpData = await corpResponse.json();
            setCorporation(corpData.corporation);
        } else {
            setCorporation([]);
        }
    }
    fetchCorpData();
}, [selectedCntry, selectedState, selectedDistrict, districts]);

useEffect(() => {
    async function fetchLsgdData() {
        if (selectedCntry === "India" && selectedState === "Kerala" && selectedCorp) {
            const corp_id = corporation.find((item) => item.cop_name === selectedCorp)?.cop_id;
            const lsgResponse = await fetch(`${apiURL}/lsg/${corp_id}`);
            const lsgData = await lsgResponse.json();
            setLsgd(lsgData.lsg);
        } else {
            setLsgd([]);
        }
        // setSelectedLsgd("");
        // setWardNo("");
    }
    fetchLsgdData();
}, [selectedCntry, selectedState, selectedCorp, corporation]);

useEffect(() => {
    async function fetchData() {
        const categoryResponse = await fetch(`${apiURL}/category`);
        const categoryData = await categoryResponse.json();
        console.log(categoryData.category)
        setCategory(categoryData.category);
    }
    fetchData();
}, []);

useEffect(() => {
    const fetchClass = async () => {
        try {
            const responsetype = await axios.get(`${apiURL}/schoolType`);
            setSchoolType(responsetype.data.schoolType);
            const dis_id = districts.find((item) => item.dis_name === selectedDistrictGrp)?.dis_id;

            const responseedudistrict = dis_id ? await axios.get(`${apiURL}/eduDistrict/${dis_id}`) : null;
            responseedudistrict ? setEduDistrict(responseedudistrict.data.eduDistrict) : '';
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    fetchClass();
}, [districts, selectedDistrictGrp]);

useEffect(() => {
    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${apiURL}/schoolCategory`);

            setSubCategoryOptions(response.data.subCategory);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };
    fetchCategory();
}, []);
useEffect(() => {
    const handleCbse = async () => {
        if (selectedschoolType === 'CBSE' && selectedStateGrp) {
            try {
                const st_id = states.find((item) => item.st_name === selectedStateGrp)?.st_id;
                const response = await axios.get(`${apiURL}/sahodaya/${st_id}`);
                setSahodaya(response.data.sahodayaList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        if (selectedschoolType === 'ICDS' && selectedDistrictGrp) {

            try {
                const dis_id = districts.find((item) => item.dis_name === selectedDistrictGrp)?.dis_id;


                const response = await axios.get(`${apiURL}/icdsBlock/${dis_id}`);

                setIcdsBlock(response.data.icdsBlockList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

        }
        if (selectedschoolType === 'Malayalam Mission' && selectMissionarea) {

            try {
                const response = await axios.get(`${apiURL}/malayalamMissionChapter/${selectMissionarea}`);
                setMissionChapter(response.data.chapterList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

        }
    };
    handleCbse();
}, [districts, selectedschoolType, states, selectMissionarea, selectedStateGrp, selectedDistrictGrp]);

const handleIcds = async (e: any) => {
    try {
        const icdsid = icdsBlock.find((item) => item.block_name === e)?.icds_block_id
        const response = await axios.get(`${apiURL}/icdsProject/${icdsid}`);
        setIcdsProject(response.data.icdsProjectList);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
const handleChapter = async (e: any) => {
    try {
        const chapterid = missionChapter.find((item) => item.chapter_name === e)?.chapter_id
        const response = await axios.get(`${apiURL}/malayalamMissionZone/${chapterid}`);
        setMissionZone(response.data.zoneList);


    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const handleEduDistrict = async (e: any) => {
    try {
        const eduid = eduDistrict.find((item) => item.edu_district === e)?.edu_district_id
        const responseedusubdistrict = await axios.get(`${apiURL}/eduSubDistrict/${eduid}`);
        setEduSubDistrict(responseedusubdistrict.data.eduSubDistrict);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const handleFilterGrpName = (e: any) => {
    console.log(e)
    if (e != "") {
        fetchFilteredGrpName(e);
        setCurrentPage(1); // Reset to first page
    }
};

const handleFilterEmail = (e: any) => {
    console.log(e)
    if (e != "") {

        fetchFilteredEmail(e);
        setCurrentPage(1); // Reset to first page
    }
};
const handleFilterId = (e: any) => {
    console.log(e)
    if (e != "") {

        fetchFilteredId(e);
        setCurrentPage(1); // Reset to first page
    }
};
const handleFilterMobile = (e: any) => {
    console.log(e)
    if (e != "") {

        fetchFilteredMobile(e);
        setCurrentPage(1); // Reset to first page
    }
};

const handleFilterChangeCntry = (e: any) => {
    console.log(e.target.value)

    setSelectedCntry(e.target.value); // Update dropdown value
    fetchFilteredCntry(e.target.value);
    setCurrentPage(1); // Reset to first page
};

const handleFilterChangeState = (e: any) => {
    console.log(e.target.value)

    setSelectedState(e.target.value); // Update dropdown value
    fetchFilteredState(e.target.value);
    setCurrentPage(1); // Reset to first page
};

const handleFilterChangeDistrict = (e: any) => {
    console.log(e.target.value)

    setSelectedDistrict(e.target.value); // Update dropdown value
    fetchFilteredDistrict(e.target.value);
    setCurrentPage(1); // Reset to first page
};
const handleFilterChangeCorp = (e: any) => {
    console.log(e.target.value)

    setSelectedCorp(e.target.value); // Update dropdown value
    fetchFilteredCorp(e.target.value);
    setCurrentPage(1); // Reset to first page
};

const handleFilterChangeLsgd = (e: any) => {
    console.log(e.target.value)

    setSelectedLsgd(e.target.value); // Update dropdown value
    fetchFilteredLsgd(e.target.value);
    setCurrentPage(1); // Reset to first page
};

// const handleFilterChangeWard = (e: any) => {
//   console.log(e)
//   setSelectedWard(e); // Update dropdown value
//   fetchFilteredWard(e);
//   setCurrentPage(1); // Reset to first page
// };

const fetchFilteredGrpName = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log(response.data.Uploads)
                console.log(value)

                const filteredData = response.data.Uploads.filter(
                    (item: { up_name: string; }) => item.up_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

const fetchFilteredEmail = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log(response.data.Uploads)
                console.log(value)

                const filteredData = response.data.Uploads.filter(
                    (item: { co_email_id: string; }) => item.co_email_id === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

const fetchFilteredId = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log(response.data.Uploads)
                console.log(value)

                const filteredData = response.data.Uploads.filter(
                    (item: { up_id: string; }) => item.up_id == value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

const fetchFilteredMobile = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log(response.data.Uploads)
                console.log(value)

                const filteredData = response.data.Uploads.filter(
                    (item: { co_ord_contact: string; }) => item.co_ord_contact == value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

const fetchFilteredCntry = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                console.log(response.data.Uploads)
                const filteredData = response.data.Uploads.filter(
                    (item: { cntry_name: string; }) => item.cntry_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

const fetchFilteredState = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                console.log(response.data.Uploads)
                const filteredData = response.data.Uploads.filter(
                    (item: { st_name: string; }) => item.st_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

const fetchFilteredDistrict = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                console.log(response.data.Uploads)
                const filteredData = response.data.Uploads.filter(
                    (item: { dis_name: string; }) => item.dis_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};
const fetchFilteredCorp = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                console.log(response.data.Uploads)
                const filteredData = response.data.Uploads.filter(
                    (item: { cop_name: string; }) => item.cop_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};
const fetchFilteredLsgd = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                console.log(response.data.Uploads)
                const filteredData = response.data.Uploads.filter(
                    (item: { lsg_name: string; }) => item.lsg_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

//  const fetchFilteredWard = async (value: string) => {
//     if (token) {
//       const response = await axios.post(
//         `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       try {
//         if (response.data.success && response.status !== 203) {
//           console.log('filter')
//           console.log('hi',response.data)
//           console.log(response.data.Uploads)
//           const filteredData = response.data.Uploads.filter(
//             (item: { us_ward: string; }) => item.us_ward === value
//           );
//           console.log(filteredData)

//           setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
//           setRowData(filteredData);
//         } else {
//           setRowData([]);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

const handleFilterGrpType = (e: any) => {
    console.log(e.target.value)
    if (e != "") {
        setGroupType(e.target.value);
        fetchFilteredGrpType(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const fetchFilteredGrpType = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                const filteredData = response.data.Uploads.filter(
                    (item: { group_type: string; }) => item.group_type === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

const handleFilterSchoolType = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelectedSchoolType(e.target.value);
        e.target.value === 'CBSE' ? setSelectedCountryGrp('India') : ''
        e.target.value === 'General Education' || 'ICDS' ? setSelectedCountryGrp('India') : ''
        e.target.value === 'General Education' || 'ICDS' ? setSelectedStateGrp('Kerala') : ''
        fetchFilteredSchoolType(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const fetchFilteredSchoolType = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                const filteredData = response.data.Uploads.filter(
                    (item: { type_name: string; }) => item.type_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

const handleFilterSchoolCategory = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelectedSubCategory(e.target.value);
        fetchFilteredSchoolCategory(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const fetchFilteredSchoolCategory = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                const filteredData = response.data.Uploads.filter(
                    (item: { gp_cat_name: string; }) => item.gp_cat_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

const handleFilterSahodayaState = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelectedStateGrp(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const handleFilterSahodaya = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelectSahodaya(e.target.value);
        fetchFilteredSahodaya(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const fetchFilteredSahodaya = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                const filteredData = response.data.Uploads.filter(
                    (item: { sahodaya_name: string; }) => item.sahodaya_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};


const handleFilterEDistrict = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelectedDistrictGrp(e.target.value);
        // fetchFilteredSahodaya(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const handleFilterEduDistrict = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelecteduDistrict(e.target.value);
        handleEduDistrict(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const handleFilterEduSubDistrict = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelecteduSubDistrict(e.target.value);
        fetchFilteredEduSubDistrict(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const fetchFilteredEduSubDistrict = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                const filteredData = response.data.Uploads.filter(
                    (item: { edu_sub_district_name: string; }) => item.edu_sub_district_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};


const handleFilterIcdsBlock = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelectIcdsBlock(e.target.value);
        handleIcds(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const handleFilterIcdsProject = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelectIcdsProject(e.target.value);
        fetchFilteredIcdsProject(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const fetchFilteredIcdsProject = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                const filteredData = response.data.Uploads.filter(
                    (item: { project_name: string; }) => item.project_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};

const handleFilterMissionArea = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelectMissionarea(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const handleFilterMissionChapter = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelectedMission(e.target.value);
        handleChapter(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const handleFilterMissionZone = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
        setSelectedZone(e.target.value);
        fetchFilteredMissionZone(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const fetchFilteredMissionZone = async (value: string) => {
    if (token) {
        const response = await axios.post(
            `${apiURL}/admin/adminChallenges?limit=${totalcount}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        try {
            if (response.data.success && response.status !== 203) {
                console.log('filter')
                console.log(response.data)
                const filteredData = response.data.Uploads.filter(
                    (item: { zone_name: string; }) => item.zone_name === value
                );
                console.log(filteredData)

                setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
                setRowData(filteredData);
            } else {
                setRowData([]);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
};


  return (
    <div className=" bg-slate-100">
      <button
          className= "text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          
          onClick={handleExportToExcel}
        >
          Export To Excel
        </button>
        <div>
                <label>Upload Id</label>
                <div className="flex mb-3">
                    <input
                        className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
                        value={upid}
                        onChange={(e) => setUpid(e.target.value)} // Update the state directly
                    />
                    <button
                        className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                        onClick={() => handleFilterId(upid)}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div>
                <label>Upload Name</label>
                <div className="flex mb-3">
                    <input
                        className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
                        value={upname}
                        onChange={(e) => setUpname(e.target.value)} // Update the state directly
                    />
                    <button
                        className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                        onClick={() => handleFilterGrpName(upname)}
                    >
                        Search
                    </button>
                </div>
            </div>
            {/* <div>
        <label>Email</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterEmail(email)}
          >
            Search
          </button>
        </div>
      </div>

      <div>
        <label>Mobile</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={mobile}
            onChange={(e) => setMobile(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterMobile(mobile)}
          >
            Search
          </button>
        </div>
      </div> */}

            {/* country section  */}
            <div className="flex items-center mb-3 space-x-2">
                <label htmlFor="groupFilter" className="text-sm font-medium">
                    Country:
                </label>
                <select
                    id="groupFilter"
                    value={selectedCntry}
                    onChange={handleFilterChangeCntry}
                    className="border border-gray-300 rounded p-1"
                >
                    <option value="">Choose Country</option>
                    {countries.map((country) => (
                        <option key={country.cntry_id} value={country.cntry_name}>
                            {country.cntry_name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedCntry == "India" ?
                <>
                    <div className="flex items-center mb-3 space-x-2">
                        <label htmlFor="groupFilter" className="text-sm font-medium">
                            State:
                        </label>
                        <select
                            id="groupFilter"
                            value={selectedState}
                            onChange={handleFilterChangeState}
                            className="border border-gray-300 rounded p-1"
                        >
                            <option value="">Choose State</option>
                            {states.map((state) => (
                                <option key={state.st_id} value={state.st_name}>
                                    {state.st_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedState == "Kerala" ?
                        <>
                            <div className="flex items-center mb-3 space-x-2">
                                <label htmlFor="groupFilter" className="text-sm font-medium">
                                    District:
                                </label>
                                <select
                                    id="groupFilter"
                                    value={selectedDistrict}
                                    onChange={handleFilterChangeDistrict}
                                    className="border border-gray-300 rounded p-1"
                                >
                                    <option value="">Choose District</option>
                                    {districts.map((district) => (
                                        <option key={district.dis_id} value={district.dis_name}>
                                            {district.dis_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedDistrict != "" ?
                                <>
                                    <div className="flex items-center mb-3 space-x-2">
                                        <label htmlFor="groupFilter" className="text-sm font-medium">
                                            Corporation:
                                        </label>
                                        <select
                                            id="groupFilter"
                                            value={selectedCorp}
                                            onChange={handleFilterChangeCorp}
                                            className="border border-gray-300 rounded p-1"
                                        >
                                            <option value="">Choose Corporation</option>
                                            {corporation.map((corp) => (
                                                <option key={corp.cop_id} value={corp.cop_name}>
                                                    {corp.cop_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {selectedDistrict != "" ?

                                        <div className="flex items-center mb-3 space-x-2">
                                            <label htmlFor="groupFilter" className="text-sm font-medium">
                                                Lsgd:
                                            </label>
                                            <select
                                                id="groupFilter"
                                                value={selectedLsgd}
                                                onChange={handleFilterChangeLsgd}
                                                className="border border-gray-300 rounded p-1"
                                            >
                                                <option value="">Choose Lsgd</option>
                                                {lsgd && lsgd.map((lsg) => (
                                                    <option key={lsg.lsg_id} value={lsg.lsg_name}>
                                                        {lsg.lsg_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        //  <div>
                                        //   <label>Ward No</label>
                                        //   <div className="flex mb-3">
                                        //     <input
                                        //       className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
                                        //       value={selectedWard}
                                        //       onChange={(e) => setSelectedWard(e.target.value)} // Update the state directly
                                        //     />
                                        //     <button
                                        //       className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                                        //       onClick={() => handleFilterChangeWard(selectedWard)}
                                        //     >
                                        //       Search
                                        //     </button>
                                        //   </div> 
                                        // </div>
                                        : ''}
                                </> : ''}
                        </> : ''}
                </> : ''}
                <div className="flex items-center mb-3 space-x-2">
                <label htmlFor="groupFilter" className="text-sm font-medium">
                    Group Type:
                </label>
                <select
                    id="groupFilter"
                    value={grouptype}
                    onChange={handleFilterGrpType}
                    className="border border-gray-300 rounded p-1"
                >
                    <option value="">Choose Group Type</option>

                    {category.map((c, i) => (
                        <option key={c.id} value={c.group_type}>
                            {c.group_type}
                        </option>
                    ))}

                </select>
            </div>
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
      <div className="flex justify-center items-center space-x-2 my-4">
        <button
          className={currentPage === 1 ?
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg"
            : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {currentPage >= 4 && totalPages > 3 && <span className="text-xl text-gray-600">...</span>}

        {Array.from({ length: totalPages >= 3 ? 3 : totalPages }, (_, index) => currentPage < 4 ? index+1:currentPage+index-2).map((page) => (
          <span
            key={page}
            className={`text-xl cursor-pointer text-gray-600 ${page === currentPage ? 'font-bold' : 'underline'}`}
            onClick={() => handlePageChange(page)}
          >
            {page > 0 ? page : ''}
          </span>
        ))}

        {currentPage > 1 && totalPages > 3 && currentPage!=totalPages && <span className="text-xl text-gray-600">...</span>}
        {currentPage === 1 && totalPages > 3 && currentPage!=totalPages && <span className="text-xl text-gray-600">...</span>}


        <button
          className={currentPage === totalPages || totalPages === 1 ?
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg"
            : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default AdminGrid;
