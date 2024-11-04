"use client";
import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import { useForm } from "react-hook-form";
import { apiURL, imageURL } from '@/app/requestsapi/request';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import axios from 'axios';
import Link from "next/link";
import PaginationComponent from './PageComponent';
import { Label } from '@radix-ui/react-label';


interface Participant {
  up_id: number,
  up_reg_id: number,
  up_name: string,
  up_planter: string,
  up_tree_name: string,
  up_cord_id: number,
  up_date: string,
  up_file: string,
  us_corporation: number,
  gp_name: string,
  total_upload: number,
  cntry_name: string,
  st_name: string, 
  dis_name: string,
  cop_name: string,
  lsg_name: string,
  gp_id: number
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


const ParticipateList = () => {
  const [participantlist, setParticipantList] = useState<Participant[]>([]);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const formPersonal = useForm({
    defaultValues: {
      coname: '',
      treeNumber: '',
      phoneNumber: ''
    },
  });
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
      try {
        const response = await fetch(`${apiURL}/uploads/filter?page=${currentPage}&limit=${itemsPerPage}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!response.ok) {

          throw new Error("Network response was not ok");
        }
        try {
          const result = await response.json();

          setParticipantList(result.Uploads);
        } catch {
          setParticipantList([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchInitialData();
  }, [currentPage]);

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

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedCorp("");
    setSelectedLsgd("");
    setWardNo("");
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setSelectedDistrict("");
    setSelectedCorp("");
    setSelectedLsgd("");
    setWardNo("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
    setSelectedCorp("");
    setSelectedLsgd("");
    setWardNo("");
  };

  const handleCorpChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCorp = e.target.value;
    setSelectedCorp(selectedCorp);
    setSelectedLsgd("");
    setWardNo("");
  };

  useEffect(() => {
    handleGrpName();
  }, [selectedGrpType]);


  async function handleGrpName() {
    if (selectedGrpType) {
      const groupId = category.find((item) => item.group_type === selectedGrpType)?.id;
      const Response = await axios.get(`${apiURL}/common/groupName/${groupId}`);
      setGrpName(Response.data.stateMapData);

    }
  }

  const onDataSubmit = async (data: any, page = 1) => {
    try {
      // Fetch all results to calculate total uploads (for pagination)
      const responseAll = await fetch(`${apiURL}/uploads/filter?limit=10000000`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!responseAll.ok) {
        throw new Error("Failed to fetch all uploads.");
      }
  
      const resultAll = await responseAll.json();
  
      // Update total pages based on total records
      setTotalPages(Math.ceil(resultAll.Uploads.length / itemsPerPage));
  
      // Fetch paginated data based on current page
      const response = await fetch(`${apiURL}/uploads/filter?page=${page}&limit=${itemsPerPage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch paginated uploads.");
      }
  
      const result = await response.json();
  
      // Set paginated data and total count for the page
      setParticipantList(result.Uploads);
      setTotalCount(result.total);
  
    } catch (error) {
      console.error("Error fetching data:", error);
      // Reset pagination and participant list on error
      setTotalPages(1);
      setParticipantList([]);
    }
  };
  
  // Handle page change for pagination
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Trigger data fetch with the updated page number
      onDataSubmit({ /* pass any form/filter data */ }, newPage);
    }
  };
  
  // Fetch initial data for total pages when the component mounts
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const responseAll = await fetch(`${apiURL}/uploads/filter?limit=10000000`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!responseAll.ok) {
          throw new Error("Failed to fetch total uploads.");
        }
  
        const dataAll = await responseAll.json();
        setTotalPages(Math.ceil(dataAll.Uploads.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    }
  
    fetchInitialData();
  }, [itemsPerPage]);
  useEffect(() => {
    if (filterData) {
      onDataSubmit(filterData);
    }
  }, [filterData]);

  const onSubmit = async (data: any) => {
    const dataWithIds: any = {};
    // treeNo !== "" ? dataWithIds.treeNumber = parseInt(treeNo) : '';
    data.treeNumber !== "" ? dataWithIds.treeNumber = parseInt(data.treeNumber) : '';
    data.coname !== "" ? dataWithIds.name = data.coname : '';
    data.phoneNumber !== "" ? dataWithIds.phoneNumber = data.phoneNumber : '';


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
    onDataSubmit(dataWithIds);

  };

  return (
    <>
      <NavigationBar />
      <div className='relative flex justify-center p-4'>
        <h1 className='text-3xl text-center mt-2 font-bold text-[#3C6E1F]'>Sorting Page</h1>
      </div>

      {/* Search by Person Wise */}
      <div className='search1'>
  <h1 className='text-lg text-center m-3'>Search by Person Wise</h1>
  <div className="mx-5 md:mx-9 lg:mx-16 border-2 border-gray-300 shadow-lg flex justify-center items-center bg-gray-100 rounded-lg">
    <Form {...formPersonal}>
      <form onSubmit={formPersonal.handleSubmit(onSubmit)} noValidate className="space-y-8 w-full md:w-2/3">
        <div className="flex flex-col gap-4 md:flex-row md:m-5 justify-center items-center">

          {/* Tree Number Field */}
          <FormField
            control={formPersonal.control}
            name="treeNumber"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormControl>
                  <Input {...field} placeholder="Enter Tree Number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name Field */}
          <FormField
            control={formPersonal.control}
            name="coname"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={formPersonal.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/3">
                <FormControl>
                  <Input type="number" {...field} placeholder="Phone Number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full md:w-1/3 bg-primary mx-auto text-center">
            Search
          </Button>

        </div>
      </form>
    </Form>
  </div>
</div>



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
          {selectedGrpType && grpName && grpName.length > 0 && (
            <div className="w-full sm:col-span-2 md:col-span-1">
              <select
                className="w-full p-2 border border-black rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                value={selectedgrpName}
                onChange={(e) => setSelectedGrpName(e.target.value)}
              >
                <option value="">Select Group Name</option>
                {grpName.map((c) => (
                  <option key={c.gp_id} value={c.gp_name}>
                    {c.gp_name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="twoupload"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>Have Two Upload</p>
          </div>

          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="threeupload"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>Have Three Upload</p>
          </div>

          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="fourupload"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>Have Four Upload</p>
          </div>

          {/* Submit Button */}
          <div className="col-span-full sm:col-span-2 md:col-span-1 flex justify-center">
            <Button
              type="submit"
              className="w-full bg-primary text-center px-6 py-2 rounded-md"
            >
              Search
            </Button>
          </div>
        </div>
      </form>
    </Form>
  </div>
</div>



      <div className="flex justify-center font-bold my-4">
        <p>Total Count: {totalCount}</p>
      </div>

      <div className="container mx-auto p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">SL .No</th>
                <th className="py-3 px-6 text-left">Tree number</th>
                <th className="py-3 px-6 text-left">Planter name</th>
                <th className="py-3 px-6 text-left">Uploader name/User Id</th>
                <th className="py-3 px-6 text-left">Group Name/Count</th>
                <th className="py-3 px-6 text-left">Tree name/Scientific Name</th>
                <th className="py-3 px-6 text-left">Image last uploaded</th>
                <th className="py-3 px-6 text-left">Country</th>
                <th className="py-3 px-6 text-left">State</th>
                <th className="py-3 px-6 text-left">District</th>
                <th className="py-3 px-6 text-left">Corporation</th>
                <th className="py-3 px-6 text-left rounded-tr-lg">LSGD</th>
              </tr>
            </thead>
            <tbody>
              {participantlist && participantlist.length > 0 && (
                participantlist.map((p, index) => (

                  <tr key={p.up_id} className="border border-gray-200 hover:bg-gray-100">

                    <td className="py-3 px-6 text-left">{startIndex + index + 1}</td>
                    <td className="py-3 px-6 text-left">{p.up_id}</td>
                    <td className="py-3 px-6 text-left">{p.up_planter}</td>
                    <td className="py-3 px-6 text-left"><a href={`/user-page?u=${p.up_name}&id=${p.up_reg_id}`}>{p.up_name}/{p.up_reg_id}</a></td>
                    <td className="py-3 px-6 text-left"><a href={`/group-page?gname=${p.gp_name}&gid=${p.gp_id}&uc=${p.total_upload}`}>{p.gp_name}/{p.total_upload}</a></td>
                    <td className="py-3 px-6 text-left">{p.up_tree_name}</td>
                    <td className="py-3 px-6 text-left">
                      {p.up_file ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <Link
                          href={{
                            pathname: 'participant-list/item',
                            query: { id: p.up_id },
                          }}
                        >
                          <img
                            src={`${imageURL}${p.up_file}`}
                            style={{ height: '100px', width: '110px' }}
                            alt="Tree"
                          // onError={(e) => {
                          //   e.currentTarget.src = '/path/to/fallback/image.jpg';
                          //   e.currentTarget.alt = 'Image not available';
                          // }}
                          />
                        </Link>
                      ) : (
                        'No image available'
                      )}
                    </td>
                    <td className="py-3 px-6 text-left">{p.cntry_name}</td>
                    <td className="py-3 px-6 text-left">{p.st_name}</td>
                    <td className="py-3 px-6 text-left">{p.dis_name}</td>
                    <td className="py-3 px-6 text-left">{p.cop_name}</td>
                    <td className="py-3 px-6 text-left">{p.lsg_name}</td>
                  </tr>

                ))
              )}
              {!participantlist || participantlist.length <= 0 && (
                <tr>
                  <td colSpan={6} className="py-3 px-6 text-center">No participants data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
}

export default ParticipateList;
