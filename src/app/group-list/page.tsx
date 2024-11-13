"use client"
import React, { useCallback, useEffect, useState } from 'react'
import NavigationBar from '@/components/navigationBar'
import Footer from '@/components/footer'
import { apiURL } from '../requestsapi/request';
import { useRouter } from 'next/navigation';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import axios from 'axios';
import PaginationComponent from './PageComponent';
// Define the interface for the API response data
interface Group {
  gp_id: number;
  gp_name: string;
  co_ord_contact: string;
  dis_name: string;
  gp_code: string;
  upload_count: number;
  activity_count: number;
}

interface ApiResponse {
  success: boolean;
  groupList: Group[];
}

type Country = {
  cntry_id: string;
  cntry_name: string;
}

type State = {
  st_id: string;
  st_name: string;
}

type District = {
  dis_id: string;
  dis_name: string;
}

type Category = {
  id: string;
  group_type: string;
}

type Lsgd = {
  lsg_id: string;
  lsg_name: string;
}

type Corp = {
  cop_id: string;
  cop_name: string;
}

type GrpName = {
  gp_id: string;
  gp_name: string;
}
interface SchoolType {
  id: string;
  type_name: string;
}
interface SubCategory {
  gp_cat_id: string;
  gp_cat_name: string;
}
interface EduDistrict {
  edu_district_id: string;
  edu_district: string;
}
interface Sahodaya {
  sahodaya_id: string;
  sahodaya_name: string;
}

interface EduSubDistrict {
  edu_sub_district_id: string;
  edu_sub_district_name: string;
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
const GroupList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);
  const [grpName, setGrpName] = useState<GrpName[]>([]);

  const [missionZone, setMissionZone] = useState<MissionZone[]>([]);
  const [selectZone, setSelectedZone] = useState('');
  const [missionChapter, setMissionChapter] = useState<MissionChapter[]>([]);
  const [selectMission, setSelectedMission] = useState('');
  const [icdsProject, setIcdsProject] = useState<IcdsProject[]>([]);
  const [selectIcdsProject, setSelectIcdsProject] = useState('');
  const [icdsBlock, setIcdsBlock] = useState<IcdsBlock[]>([]);
  const [selectIcdsBlock, setSelectIcdsBlock] = useState('');
  const [sahodaya, setSahodaya] = useState<Sahodaya[]>([]);
  const [selectSahodaya, setSelectSahodaya] = useState('');
  const [eduDistrict, setEduDistrict] = useState<EduDistrict[]>([]);
  const [eduSubDistrict, setEduSubDistrict] = useState<EduSubDistrict[]>([]);
  const [schoolType, setSchoolType] = useState<SchoolType[]>([]);
  const [selectschoolType, setSelectschoolType] = useState('');
  const [selectMissionarea, setSelectMissionarea] = useState('');
  const [selecteduDistrict, setSelecteduDistrict] = useState('');
  const [selecteduSubDistrict, setSelecteduSubDistrict] = useState('');
  const [subcategoryOptions, setSubCategoryOptions] = useState<SubCategory[]>([]);
  const [filterData, setFilterData] = useState({});

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [selectedCountryGrp, setSelectedCountryGrp] = useState("");
  const [selectedStateGrp, setSelectedStateGrp] = useState("");
  const [selectedDistrictGrp, setSelectedDistrictGrp] = useState("");

  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [selectedGrpType, setSelectedGrpType] = useState("new");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [coName, setConame] = useState("");
  const [Phone, setPhone] = useState("");
  const [grpId, setGrpId] = useState("");
  const [selectedgrpName, setSelectedGrpName] = useState("");

  const formCountry = useForm({
    defaultValues: {
      country: '',
      state: '',
      district: '',
      corporation: '',
      lsg: '',
      wardNo: '',
      city: '',
    },
  });
  const form = useForm({
    defaultValues: {
      grptype: '',
      grpid: '',
      subCategory: '',
      schooltype: '',
      missionchapter: '',
      missionarea: '',
      missionzone: '',
      country: '',
      state: '',
      district: '',
      sahodaya: '',
      icdsblock: '',
      icdsproject: '',
      edudistrict: '',
      edusubdistrict: '',
      twoupload: false,
      threeupload: false,
      fourupload: false,
    },
  });
    useEffect(() => {
      async function fetchfirstData(){
        const responseall = await fetch(`${apiURL}/common/groupList?limit=100000000000`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }); 
        const dataall = await responseall.json();
        setTotalPages(Math.ceil(dataall.groupList.length / itemsPerPage));
      }
      fetchfirstData();
    }, []);

    const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
      
        setCurrentPage(newPage);
      }
    }
  
  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch(`${apiURL}/common/groupList?page=${currentPage}&limit=${itemsPerPage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data: ApiResponse = await response.json();
      if (data.success) {
        setGroups(data.groupList);
      }
    };

    fetchGroups();
  }, [currentPage]);

  
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
    const handleCbse = async () => {
      if (selectschoolType === 'CBSE' && selectedStateGrp) {
        try {
          const st_id = states.find((item) => item.st_name === selectedStateGrp)?.st_id;
          const response = await axios.get(`${apiURL}/sahodaya/${st_id}`);
          setSahodaya(response.data.sahodayaList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      if (selectschoolType === 'ICDS' && selectedDistrictGrp) {

        try {
          const dis_id = districts.find((item) => item.dis_name === selectedDistrictGrp)?.dis_id;


          const response = await axios.get(`${apiURL}/icdsBlock/${dis_id}`);

          setIcdsBlock(response.data.icdsBlockList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
      if (selectschoolType === 'Malayalam Mission' && selectMissionarea) {

        try {
          const response = await axios.get(`${apiURL}/malayalamMissionChapter/${selectMissionarea}`);
          setMissionChapter(response.data.chapterList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
    };
    handleCbse();
  }, [districts, selectschoolType, states, selectMissionarea, selectedStateGrp, selectedDistrictGrp]);

  const handleEduDistrict = async (e: any) => {
    try {
      const eduid = eduDistrict.find((item) => item.edu_district === e)?.edu_district_id
      const responseedusubdistrict = await axios.get(`${apiURL}/eduSubDistrict/${eduid}`);
      setEduSubDistrict(responseedusubdistrict.data.eduSubDistrict);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
  useEffect(() => {
    async function fetchInitialData() {
      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);
      
    }
    fetchInitialData();
  }, []);

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
    async function fetchData() {
      const categoryResponse = await fetch(`${apiURL}/category`);
      const categoryData = await categoryResponse.json();
      setCategory(categoryData.category);
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     if (selectedGrpType) {
  //       const groupId = category.find((item) => item.group_type === selectedGrpType)?.id;
  //       const Response = await axios.get(`${apiURL}/common/groupName/${groupId}`);
  //       setGrpName(Response.data.stateMapData);

  //     }
  //   }
  //   fetchData();
  // }, [category, grpName, selectedGrpType]);

  useEffect(() => {
    async function fetchStates() {
      if (selectedCountry === "India" || selectedCountryGrp === "India") {
        const stateResponse = await fetch(`${apiURL}/state`);
        const stateData = await stateResponse.json();
        setStates(stateData.state);
      } else {
        setStates([]);
        setSelectedState("");
      }
      setDistricts([]);
      setCorporation([]);
      setLsgd([]);
      setSelectedDistrict("");
      setSelectedCorp("");
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchStates();
  }, [selectedCountry, selectedCountryGrp]);

  useEffect(() => {
    async function fetchDistricts() {
      if ((selectedCountry === "India" && selectedState === "Kerala") || (selectedCountryGrp === "India" && selectedStateGrp === "Kerala")) {
        const districtResponse = await fetch(`${apiURL}/district`);
        const districtData = await districtResponse.json();
        setDistricts(districtData.district);
      } else {
        setDistricts([]);
      }
      setCorporation([]);
      setLsgd([]);
      setSelectedDistrict("");
      setSelectedCorp("");
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchDistricts();
  }, [selectedCountry, selectedCountryGrp, selectedState, selectedStateGrp]);

  useEffect(() => {
    async function fetchCorpData() {
      if (selectedCountry === "India" && selectedState === "Kerala" && selectedDistrict) {
        const dist_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
        const corpResponse = await fetch(`${apiURL}/corporation/${dist_id}`);
        const corpData = await corpResponse.json();
        setCorporation(corpData.corporation);
      } else {
        setCorporation([]);
      }
      setLsgd([]);
      setSelectedCorp("");
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchCorpData();
  }, [selectedCountry, selectedState, selectedDistrict, districts]);

  useEffect(() => {
    async function fetchLsgdData() {
      if (selectedCountry === "India" && selectedState === "Kerala" && selectedCorp) {
        const corp_id = corporation.find((item) => item.cop_name === selectedCorp)?.cop_id;
        const lsgResponse = await fetch(`${apiURL}/lsg/${corp_id}`);
        const lsgData = await lsgResponse.json();
        setLsgd(lsgData.lsg);
      } else {
        setLsgd([]);
      }
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchLsgdData();
  }, [selectedCountry, selectedState, selectedCorp, corporation]);


  
  

  const onSubmit = async (data: any) => {
    const dataWithIds: any = {};
    // treeNo !== "" ? dataWithIds.treeNumber = parseInt(treeNo) : '';
    


    if (selectedGrpType !== "") {
      selectedGrpType ? dataWithIds.groupTypeId = parseInt(category.find((item) => item.group_type === selectedGrpType)?.id!) : null;
      selectedgrpName !== "" ? dataWithIds.groupId = parseInt(grpName.find((item) => item.gp_name === selectedgrpName)?.gp_id!) : '';

    }

    if (selectedCountry !== "") {
      dataWithIds.countryId = countries.find((item) => item.cntry_name === selectedCountry)?.cntry_id
    }

    if (selectedCountry === "India") {
      dataWithIds.stateId = states.find((item) => item.st_name === selectedState)?.st_id || null;

      if (selectedState === "Kerala") {
        dataWithIds.districtId = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id || null;
        dataWithIds.corporationId = corporation.find((item) => item.cop_name === selectedCorp)?.cop_id || null;
        dataWithIds.lsgdId = lsgd.find((item) => item.lsg_name === selectedLsgd)?.lsg_id || null;
        dataWithIds.wardNo = data.wardNo ? parseInt(data.wardNo) || null : null;
      }
    }

    selectedSubCategory ? dataWithIds.subCategoryId = subcategoryOptions.find((item) => item.gp_cat_name === selectedSubCategory)?.gp_cat_id || null : null;
    selectschoolType ? dataWithIds.schoolTypeId = schoolType.find((item) => item.type_name === selectschoolType)?.id || null : null;
    selecteduDistrict ? dataWithIds.eduDistrictId = eduDistrict.find((item) => item.edu_district === selecteduDistrict)?.edu_district_id || null : null;
    selecteduSubDistrict ? dataWithIds.eduSubDistrictId = eduSubDistrict.find((item) => item.edu_sub_district_name === selecteduSubDistrict)?.edu_sub_district_id || null : null;
    selectSahodaya ? dataWithIds.sahodayaId = sahodaya.find((item) => item.sahodaya_name === selectSahodaya)?.sahodaya_id || null : null;
    selectIcdsBlock ? dataWithIds.blockId = icdsBlock.find((item) => item.block_name === selectIcdsBlock)?.icds_block_id || null : null;
    selectIcdsProject ? dataWithIds.projectId = icdsProject.find((item) => item.project_name === selectIcdsProject)?.project_id || null : null;
    selectMission ? dataWithIds.chapterId = missionChapter.find((item) => item.chapter_name === selectMission)?.chapter_id || null : null;
    selectZone ? dataWithIds.zoneId = missionZone.find((item) => item.zone_name === selectZone)?.zone_id || null : null;

    data.twoupload === true ? dataWithIds.hasTwoUploads = data.twoupload : null;
    data.threeupload === true ? dataWithIds.hasThreeUploads = data.threeupload : null;
    data.fourupload === true ? dataWithIds.hasFourUploads = data.fourupload : null;


    setFilterData(dataWithIds);
    
    const response = await axios.post(
      `${apiURL}/common/groupList`,
      dataWithIds,
      {
        headers: {
          
          "Content-Type": "application/json",
        },
      }
    );
    try {
      if (response.data.success && response.status !== 203) {
        

        setTotalPages(Math.ceil(response.data.groupList.length / itemsPerPage));
        setGroups(response.data.groupList);
      } else {
        setGroups([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
   

    
    // onDataSubmit(dataWithIds);

  };

  const handleFilterGrpName = (e: any) => {

    if (e.target.value != "") {
      setSelectedGrpName(e.target.value);
      // fetchFilteredGrpName(e.target.value);
      // setCurrentPage(1); // Reset to first page
    }
  };


  const fetchgrpname = useCallback(async () => {
    try {
      // Clear group name to empty array before fetching
      setGrpName([]);

      const response = await axios.post(
        `${apiURL}/common/groupName/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setGrpName(response.data.groupList);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }, []); // Empty dependency array ensures this only runs once

  // Call fetchgrpname only once when the component mounts
  useEffect(() => {
    fetchgrpname();
  }, [fetchgrpname]);

  // Define handleGrpName using useCallback to memoize it
  const handleGrpName = useCallback(async () => {
    if (selectedGrpType) {
      const groupId = category.find((item) => item.group_type === selectedGrpType)?.id;
      const subcatid = subcategoryOptions.find((item) => item.gp_cat_name === selectedSubCategory)?.gp_cat_id;
      const schooltypeid = schoolType.find((item) => item.type_name === selectschoolType)?.id;
      const sahodayaid = sahodaya.find((item) => item.sahodaya_name === selectSahodaya)?.sahodaya_id;
      const edudistid = eduDistrict.find((item) => item.edu_district === selecteduDistrict)?.edu_district_id;
      const edusubid = eduSubDistrict.find((item) => item.edu_sub_district_name === selecteduSubDistrict)?.edu_sub_district_id;
      const blockid = icdsBlock.find((item) => item.block_name === selectIcdsBlock)?.icds_block_id;
      const projectid = icdsProject.find((item) => item.project_name === selectIcdsProject)?.project_id;
      const chapterid = missionChapter.find((item) => item.chapter_name === selectMission)?.chapter_id;
      const zoneid = missionZone.find((item) => item.zone_name === selectZone)?.zone_id;

      const apidata = {
        groupTypeId: groupId,
        subCategoryId: subcatid,
        schoolTypeId: schooltypeid,
        eduDistrictId: edudistid,
        eduSubDistrictId: edusubid,
        sahodayaId: sahodayaid,
        blockId: blockid,
        projectId: projectid,
        chapterId: chapterid,
        zoneId: zoneid
      };

     

      try {
        // Clear group name to empty array before fetching
        setGrpName([]);

        const response = await axios.post(
          `${apiURL}/common/groupName/`,
          apidata,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const GroupList = response.data.groupList;
        
        setGrpName(GroupList);
      } catch (error) {
        console.error("Error fetching group names:", error);
      }
    }
  }, [selectedGrpType, category, subcategoryOptions, schoolType, sahodaya, eduDistrict, eduSubDistrict, icdsBlock, icdsProject, missionChapter, missionZone, selectedSubCategory, selectschoolType, selectSahodaya, selecteduDistrict, selecteduSubDistrict, selectIcdsBlock, selectIcdsProject, selectMission, selectZone]);

  // Trigger handleGrpName whenever dependencies change
  useEffect(() => {
    if (selectedGrpType) {
      handleGrpName();
    }
  }, [
    selectedGrpType,
    selectedSubCategory,
    selectschoolType,
    selectSahodaya,
    selecteduDistrict,
    selecteduSubDistrict,
    selectIcdsBlock,
    selectIcdsProject,
    selectMission,
    selectZone,
    handleGrpName
  ]);

  return (
    <>
      <NavigationBar />
      <div className='justify-center sw-full md:w-auto mt-6'>
        <h1 className='m-3 text-center text-2xl font-bold'>Group List</h1>
      </div>
      <div className='border border-black m-5 p-7 rounded-lg'>
        <p>ഹരിത മത്സരങ്ങളിൽ  പങ്കെടുത്ത  സ്ഥാപനങ്ങളുടെ   ലിസ്റ്റ് ഇവിടെ കൊടുക്കുന്നു .വിദ്യാലയങ്ങൾ, സന്നദ്ധ സംഘടനകൾ, റെസിഡൻസ് അസോസിയേഷനുകൾ, കുടുംബശ്രീ യൂണിറ്റുകൾ, സോഷ്യൽ മീഡിയ കൂട്ടായ്മകൾ,   സ്ഥാപനങ്ങൾ,  എന്നിവയ്ക്ക് ഗ്രൂപ്പ് ആയി ഹരിത മത്സരങ്ങളിൽ  പങ്കെടുക്കാവുന്നതാണ്.</p>
      </div>
      {/* <div className='flex justify-center items-center h-full'>
        <p className='inline-block px-5 ml-5 mr-5 p-2 text-center rounded-lg bg-light-gray'>
          ഗ്രൂപ് കോഡ് (GROUP CODE) ലഭിക്കാൻ ഇവിടെ CLICK ചെയ്യുക.
        </p>
      </div> */}
      <p className='ml-7 mt-4 p-3'>ഇപ്പോൾ മത്സരത്തിൽ പങ്കെടുക്കുന്ന സ്ഥാപനങ്ങളുടെ GROUP CODE ചുവടെ ചേർക്കുന്നു</p>
      
       {/* Search by Country Wise */}
<div className='search1 mb-5'>
  <h1 className='text-lg text-center m-3'>Search by Country Wise</h1>
  <div className="mx-5 md:mx-9 lg:mx-16 border-2 border-gray-300 shadow-lg bg-gray-100 rounded-lg p-4">
    <Form {...formCountry}>
      <form onSubmit={formCountry.handleSubmit(onSubmit)} noValidate className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          
          {/* Country Select */}
          <FormField
            control={formCountry.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedCountry(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.cntry_id} value={country.cntry_name}>
                        {country.cntry_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State Select */}
          {selectedCountry === 'India' && (
            <FormField
              control={formCountry.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedState(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.st_id} value={state.st_name}>
                          {state.st_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* District Select */}
          {selectedState === 'Kerala' && (
            <FormField
              control={formCountry.control}
              name="district"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedDistrict(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district.dis_id} value={district.dis_name}>
                          {district.dis_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Corporation Select */}
          {selectedState === 'Kerala' && (
            <FormField
              control={formCountry.control}
              name="corporation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedCorp(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a block" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {corporation.map((corp) => (
                        <SelectItem key={corp.cop_id} value={corp.cop_name}>
                          {corp.cop_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* LSG Select */}
          {selectedState === 'Kerala' && (
            <FormField
              control={formCountry.control}
              name="lsg"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedLsgd(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a LSG" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lsgd ? (
                        lsgd.map((lsg) => (
                          <SelectItem key={lsg.lsg_id} value={lsg.lsg_name}>
                            {lsg.lsg_name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          Choose a LSG
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Ward Number Input */}
          {selectedState === 'Kerala' && (
            <FormField
              control={formCountry.control}
              name="wardNo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input type="number" {...field} placeholder='Ward Number' className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Submit Button
          <div className="col-span-full flex justify-center"> */}
            <Button
              type="submit"
              className="w-full bg-primary text-center px-6 py-2 rounded-md"
            >
              Search
            </Button>
          {/* </div> */}

        </div>
      </form>
    </Form>
  </div>
</div>


      {/* Search by Group Wise */}
<div className='search1 mb-5'>
  <h1 className='text-lg text-center m-3'>Search by Group Wise</h1>
  <div className="mx-5 md:mx-9 lg:mx-16 border-2 border-gray-300 shadow-lg bg-gray-100 rounded-lg p-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {/* Group Type Select */}
          <FormField
            control={form.control}
            name="grptype"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedGrpType(value);
                    handleGrpName();
                    
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a group type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {category.map((c) => (
                      <SelectItem key={c.id} value={c.group_type}>
                        {c.group_type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* School Type Select */}
          {selectedSubCategory !== 'College' && (
            <FormField
              control={form.control}
              name="schooltype"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectschoolType(value);
                      if (value === 'CBSE' || value === 'General Education' || value === 'ICDS') {
                        setSelectedCountryGrp('India');
                      }
                      if (value === 'General Education' || value === 'ICDS') {
                        setSelectedStateGrp('Kerala');
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a school type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {schoolType.map((s) => (
                        <SelectItem key={s.id} value={s.type_name}>
                          {s.type_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Conditionally Rendered Fields */}
          {selectedSubCategory !== 'College' && selectschoolType === 'Malayalam Mission' && (
            <>
              {/* Mission Area */}
              <FormField
                control={form.control}
                name="missionarea"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectMissionarea(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose mission area" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Global</SelectItem>
                        <SelectItem value="2">India</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mission Chapter */}
              <FormField
                control={form.control}
                name="missionchapter"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedMission(value);
                        handleChapter(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a mission chapter" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {missionChapter && missionChapter.map((e) => (
                          <SelectItem key={e.chapter_id} value={e.chapter_name}>
                            {e.chapter_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mission Zone */}
              <FormField
                control={form.control}
                name="missionzone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedZone(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a mission zone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {missionZone && missionZone.map((e) => (
                          <SelectItem key={e.zone_id} value={e.zone_name}>
                            {e.zone_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* CBSE Specific Fields */}
          {selectschoolType === 'CBSE' && selectedSubCategory !== 'College' && (
            <>
              {/* State Select */}
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedStateGrp(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.st_id} value={state.st_name}>
                            {state.st_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sahodaya Select */}
              <FormField
                control={form.control}
                name="sahodaya"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectSahodaya(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a sahodaya" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sahodaya && sahodaya.map((s) => (
                          <SelectItem key={s.sahodaya_id} value={s.sahodaya_name}>
                            {s.sahodaya_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* ICDS Specific Fields */}
          {selectschoolType === 'ICDS' && selectedSubCategory !== 'College' && (
            <>
              {selectedStateGrp === 'Kerala' && (
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedDistrictGrp(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district.dis_id} value={district.dis_name}>
                              {district.dis_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* ICDS Block */}
              <FormField
                control={form.control}
                name="icdsblock"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleIcds(value);
                        setSelectIcdsBlock(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose an ICDS block" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {icdsBlock && icdsBlock.map((e) => (
                          <SelectItem key={e.icds_block_id} value={e.block_name}>
                            {e.block_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ICDS Project */}
              <FormField
                control={form.control}
                name="icdsproject"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectIcdsProject(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose an ICDS project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {icdsProject && icdsProject.map((e) => (
                          <SelectItem key={e.project_id} value={e.project_name}>
                            {e.project_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* General Education Specific Fields */}
          {selectschoolType === 'General Education' && selectedSubCategory !== 'College' && (
            <>
              {selectedStateGrp === 'Kerala' && (
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedDistrictGrp(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district.dis_id} value={district.dis_name}>
                              {district.dis_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Education District */}
              <FormField
                control={form.control}
                name="edudistrict"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleEduDistrict(value);
                        setSelecteduDistrict(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose an education district" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eduDistrict && eduDistrict.map((e) => (
                          <SelectItem key={e.edu_district_id} value={e.edu_district}>
                            {e.edu_district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Education Subdistrict */}
              <FormField
                control={form.control}
                name="edusubdistrict"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelecteduSubDistrict(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose an education subdistrict" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eduSubDistrict && eduSubDistrict.map((e) => (
                          <SelectItem key={e.edu_sub_district_id} value={e.edu_sub_district_name}>
                            {e.edu_sub_district_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Sub Category Select */}
          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem className="w-full">
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedSubCategory(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a sub category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subcategoryOptions.map((category) => (
                      <SelectItem key={category.gp_cat_id} value={category.gp_cat_name}>
                        {category.gp_cat_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

           {/* Group Name Select */}

           <div className="w-full sm:col-span-2 md:col-span-1">
                  <select
                    id="groupFilter"
                    value={selectedgrpName}
                    onChange={handleFilterGrpName}
                    className="w-full p-2 border border-black rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  >
                    <option value="">Select Group Name</option>

                    {grpName.map((c) => (
                      <option key={c.gp_id} value={c.gp_name}>
                        {c.gp_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

        {/* Submit Button */}
        <div className="col-span-full sm:col-span-2 md:col-span-1 flex justify-center mt-5">
            <Button
              type="submit"
              className="w-full bg-primary text-center px-6 py-2 rounded-md"
            >
              Search
            </Button>
          </div>
      </form>
    </Form>
  </div>
</div>
      
      {/* Table */}
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left w-16 rounded-tl-lg">Sl. No</th>
                <th className="py-3 px-6 text-left">Group Name</th>
                <th className="py-3 px-6 text-left">Group Code</th>
                <th className="py-3 px-6 text-left">Upload Count</th>
                <th className="py-3 px-6 text-left">Activity Count</th>
                <th className="py-3 px-6 text-left rounded-tr-lg">District</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={group.gp_id} className="border border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{startIndex + index + 1}</td>
                  <a href={`/group-page?gname=${group.gp_name}&gid=${group.gp_id}&uc=${group.upload_count}`}><td className="py-3 px-6 text-left">{group.gp_name}</td></a>
                  <td className="py-3 px-6 text-left">{group.gp_code}</td>
                  <td className="py-3 px-6 text-left">{group.upload_count}</td>
                  <td className="py-3 px-6 text-left">{group.activity_count}</td>
                  <td className="py-3 px-6 text-left">{group.dis_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
     
      {/* <div className="flex justify-center items-center space-x-2 my-4">
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
        <span className="text-xl">{currentPage}</span>
        <button
          className={currentPage === totalPages ? 
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
          : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => {
            handlePageChange(currentPage + 1) 
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
      <Footer />
    </>
  )
}

export default GroupList
