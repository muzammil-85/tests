"use client"
import React, { useEffect, useState } from 'react'
import NavigationBar from '@/components/navigationBar'
import Footer from '@/components/footer'
import { apiURL } from '../requestsapi/request';
import { useRouter } from 'next/navigation';

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

const GroupList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

 
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
  const router = useRouter();

  
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
      </div>
      <Footer />
    </>
  )
}

export default GroupList
