"use client"
import React, { Suspense, useEffect, useState } from 'react';
import PageTitle from '@/components/sm/pageTitle';
import { apiURL, imageURL } from '@/app/requestsapi/request';
import { useSearchParams } from 'next/navigation';

interface TreeDetails {
  up_id: number;
  up_name: string;
  up_planter: string;
  up_tree_name: string;
  up_file: string | null;
  up_file_2: string | null;
  up_file_3: string | null;
  up_file_4: string | null;
  up_district: string | null;
  up_lsgd: string | null;
  up_ward: string | null;
  up_landmark_details: string | null;
  source_name: string | null;
  gp_name: string | null;
  cntry_name: string | null;
  st_name: string | null;
  dis_name: string | null;
  cop_name: string | null;
  lsg_name: string | null;
  type_name: string;
  gp_cat_name: string;
  edu_district: string;
  edu_sub_district_name: string;
  sahodaya_name: string;
  block_name: string;
  project_name: string;
  chapter_name: string;
  zone_name: string;
}
interface Participant {
  id : number;
}



const Item: React.FC = () => {
  const [treeDetails, setTreeDetails] = useState<TreeDetails | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    const fetchTreeDetails = async () => {
      const response = await fetch(`${apiURL}/uploads/treeDetails/${id}`);
      const data = await response.json();
      if (data.success) {
        setTreeDetails(data.treeDetails[0]);
      }
    };

    fetchTreeDetails();
  }, [id]);

  if (!treeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageTitle title={`Tree number: ${treeDetails.up_id}`} />
      <div className="rounded-lg shadow-lg max-w-screen-lg mx-auto">
        <div className="rounded-lg border">
          <div className='flex flex-col flex-wrap md:flex-row gap-3 p-4 overflow-hidden justify-center'>
            {treeDetails.up_file ? (
                <img src={`${imageURL}${treeDetails.up_file}`} className='' alt='' width={200} height={200} />
            ):
              <div className="size-48 bg-light-gray grid place-content-center">To be Uploaded</div>
            }
            
            {treeDetails.up_file_2 ? (
                <img src={`${imageURL}${treeDetails.up_file_2}`} className='' alt='' width={200} height={200} />
            ):
              <div className="size-48 bg-light-gray grid place-content-center">To be Uploaded</div>
            }

            {treeDetails.up_file_3 ? (
                <img src={`${imageURL}${treeDetails.up_file_3}`} className='' alt='' width={200} height={200} />
            ):
              <div className="size-48 bg-light-gray grid place-content-center">To be Uploaded</div>
            }

            {treeDetails.up_file_4 ? (
                <img src={`${imageURL}${treeDetails.up_file_4}`} className='' alt='' width={200} height={200} />
            ):
              <div className="size-48 bg-light-gray grid place-content-center">To be Uploaded</div>
            }
          </div>
          <hr className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 rounded-3xl">
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Planter name: </div>
              <div className="text-sm">{treeDetails.up_planter}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Uploader name: </div>
              <div className="text-sm">{treeDetails.up_name}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Tree name: </div>
              <div className="text-sm">{treeDetails.up_tree_name}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Group Name: </div>
              <div className="text-sm">{treeDetails.gp_name || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Country: </div>
              <div className="text-sm">{treeDetails.cntry_name || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">State: </div>
              <div className="text-sm">{treeDetails.st_name || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">District: </div>
              <div className="text-sm">{treeDetails.dis_name || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Corporation: </div>
              <div className="text-sm">{treeDetails.cop_name || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">LSGD: </div>
              <div className="text-sm">{treeDetails.lsg_name || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Ward Name: </div>
              <div className="text-sm">{treeDetails.up_ward || 'N/A'}</div>
            </div>
            {/* <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Coupon Number: </div>
              <div className="text-sm">....</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Tree Scientific Name: </div>
              <div className="text-sm">....</div>
            </div> */}
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Landmark: </div>
              <div className="text-sm">{treeDetails.up_landmark_details || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Plant Source: </div>
              <div className="text-sm">{treeDetails.source_name || 'N/A'}</div>
            </div>
            {treeDetails.type_name ?
            <div className="flex ml-2 mt-2 gap-2">
            <div className="text-sm pl-5 mb-2">School Type: </div>
            <div className="text-sm">{treeDetails.type_name}</div>
          </div>
            
            : ''}
          {treeDetails.gp_cat_name ?
           <div className="flex ml-2 mt-2 gap-2">
           <div className="text-sm pl-5 mb-2">School Category:</div>
           <div className="text-sm">{treeDetails.gp_cat_name}</div>
         </div>
           
            : ''}
          {treeDetails.edu_district ?
          <div className="flex ml-2 mt-2 gap-2">
          <div className="text-sm pl-5 mb-2">Educational District:</div>
          <div className="text-sm">{treeDetails.edu_district}</div>
        </div>
          
            
            : ''}
          {treeDetails.edu_sub_district_name ?
           <div className="flex ml-2 mt-2 gap-2">
           <div className="text-sm pl-5 mb-2">Educational Subdistrict:</div>
           <div className="text-sm">{treeDetails.edu_sub_district_name}</div>
         </div>
            
            : ''}
          {treeDetails.sahodaya_name ?
          <div className="flex ml-2 mt-2 gap-2">
          <div className="text-sm pl-5 mb-2">Sahodaya:</div>
          <div className="text-sm">{treeDetails.sahodaya_name}</div>
        </div>
           
            
            : ''}
          {treeDetails.block_name ?
           <div className="flex ml-2 mt-2 gap-2">
           <div className="text-sm pl-5 mb-2">Block:</div>
           <div className="text-sm">{treeDetails.block_name}</div>
         </div>
            
            : ''}
          {treeDetails.project_name ?
          <div className="flex ml-2 mt-2 gap-2">
          <div className="text-sm pl-5 mb-2">Project:</div>
          <div className="text-sm">{treeDetails.project_name}</div>
        </div>
           
            : ''}
          {treeDetails.chapter_name ?
            <div className="flex ml-2 mt-2 gap-2">
            <div className="text-sm pl-5 mb-2">Chapter:</div>
            <div className="text-sm">{treeDetails.chapter_name}</div>
          </div>
             
           
            : ''}
          {treeDetails.zone_name ?
           <div className="flex ml-2 mt-2 gap-2">
           <div className="text-sm pl-5 mb-2">Zone:</div>
           <div className="text-sm">{treeDetails.zone_name}</div>
         </div>
            
          
           
            : ''}
          </div>
        </div>
      </div>
    </>
  );
}



export default function Itemfn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Item />
    </Suspense>
  );
}