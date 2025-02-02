"use client";
import { useState, useEffect } from "react";
import Navigationbar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { apiURL } from "@/app/requestsapi/request";
import Earth from "@/components/earth";
import { imageURL } from "../requestsapi/request";
import Link from "next/link";
import Loading from "@/components/loading";
import axios from "axios";
import Cookies from "js-cookie";


type Participant = {
  up_file: string;
  up_id: number;
  up_tree_name: string;
  up_date: string;
  up_planter: string;
  up_name: string;
  is_challenged:number;
  gp_name: string;
}

const ParticipantList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;
  const [challenge,setchallenge]=useState(false)
  const token = Cookies.get("token");
  

 
    useEffect(() => {
      async function fetchfirstData(){
        const responseall = await fetch(`${apiURL}/uploads/all?limit=100000000000`); 
        const dataall = await responseall.json();
      
        setTotalPages(Math.ceil(dataall.Uploads.length / itemsPerPage));
      }
      fetchfirstData();
    }, []);
  
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  async function fetchData(page: number) {
    const response = await fetch(`${apiURL}/uploads/all?page=${page}&limit=${itemsPerPage}`);
    const data = await response.json();
    setParticipants(data.Uploads);
  }

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  function formatTime(isoString: string) {
    const date = new Date(isoString);
    let hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let hour = parseInt(hours) % 12;
    const formattedTime = `${hour}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;
    return formattedTime;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      
      setCurrentPage(newPage);
    }
  }

  async function handleChallenge(treeno: number) {
    if(token!=null){
      try {
        const response = await axios.post(`${apiURL}/uploads/markChallenged`, { treeNumber:treeno });
        fetchData(currentPage);
      } catch (error) {
        console.error("Error challenging tree:", error);
      }

    }
  }

  return (
    <div className="">
      <Navigationbar />
      <div className="mt-6 mb-3">
        <h1 className="text-2xl my-4 text-center font-bold">Participant List</h1>
      </div>
      <div className="m-2 flex justify-center items-center space-x-4">
        <a href="/participants">
          <button className="text-black text-sm md:text-base py-2 px-3 bg-[#FFF6E4] rounded-2xl shadow-xl md:py-3 md:px-4">
            Sorting Page
          </button>
        </a>
        <a href="/district"><button className="text-black text-sm md:text-base py-2 px-3 bg-[#FFF6E4] rounded-2xl shadow-xl md:py-3 md:px-4">
          District List
        </button></a>
        <a href="https://greencleanearth.org/participants/1" className="text-black text-sm md:text-base py-2 px-3 bg-[#FFF6E4] rounded-2xl shadow-xl md:py-3 md:px-4">
          Old participants
        </a>
      </div>
      {
  participants ? (
    <div className="participant-container flex justify-center">
      {participants.map((participant) => (
        <div 
          key={participant.up_id} 
          className="participant-item relative group" // Add `group` here
          style={{ maxHeight: '450px', boxSizing: 'border-box' }}
        >
          {/* Conditional image for challenged status */}
          {participant.is_challenged == 1 && (
            <img
              className="absolute top-1/3 left-1/2  transform -translate-x-1/2  w-28 h-18 object-cover z-10"
              src="/images/chellenge.png"
              alt="Challenged"
            />
          )}
          <div className="rounded-lg shadow-lg border  hover:shadow-2xl hover:border-gray-400 h-full flex flex-col">
            <Link
              href={{
                pathname: 'participant-list/item',
                query: { id: participant.up_id },
              }}
            >
              <img
                className="w-full h-48 object-cover rounded-tl-lg rounded-tr-lg"
                src={`${imageURL}${participant.up_file}`}
                //src="/images/image1.jpeg"
                alt="Image"
              />
              <div className="flex justify-center mt-2 gap-1">
                <div className="text-md text-center font-bold">Tree number:</div>
                <div className="text-md">{participant.up_id}</div>
              </div>
              <div className="flex justify-center mt-2 text-gray-600 gap-2">
                <div className="text-md">{formatDate(participant.up_date)}</div>
                <div className="text-md">{formatTime(participant.up_date)}</div>
              </div>
            </Link>
            <hr className="my-2" />
            <div className="flex-grow flex flex-col justify-between">
              <div className="flex gap-3">
                <div className="text-sm text-left pl-8" style={{width:'45%'}}>Tree name:</div>
                <div className="text-sm">{participant.up_tree_name}</div>
              </div>
              <div className="flex gap-3">
                <div className="text-sm text-left pl-8" style={{width:'45%'}}>Planter name:</div>                 
                <div className="text-sm">{participant.up_planter}</div>
              </div>
              <div className="flex gap-3">
                <div className="text-sm text-left pl-8" style={{width:'45%'}}>Uploader name:</div>                 
                <div className="text-sm">{participant.up_name}</div>
              </div>
              <div className="flex gap-3">
                <div className="text-sm text-left pl-8" style={{width:'45%'}}>Group name:</div>                 
                <div className="text-sm">{participant.gp_name}</div>
              </div>
              {participant.is_challenged == 1 ? (
                <div className="flex m-auto">
                  <div className="text-sm text-center text-primary">This image has been challenged</div>
                </div>
              ) : token!=null ? (
                <div className="flex justify-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default link behavior
                      handleChallenge(participant.up_id);
                    }}
                    className="bg-primary m-1 text-white text-sm py-1 px-2 rounded hidden group-hover:block mx-auto"
                  >
                    Challenge
                  </button>
                </div>
              ):''}
            </div>
          </div>
        </div>
      ))}
       </div>
  ) : (
    <Loading />
  )
}
  
  <div className="flex justify-center items-center space-x-2 my-4">
    <button
      className={
        currentPage === 1
          ? "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg"
          : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
      }
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span className="text-xl">{currentPage}</span>
    <button
      className={
        currentPage === totalPages
          ? "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg"
          : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
      }
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
  
  <Earth />
  <Footer />
  
  <style jsx>{`
    .participant-container {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding: 16px;
    }
  
    .participant-item {
      flex: 1 1 calc(100%);
      max-width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }

    @media (min-width: 440px) {
      .participant-item {
        flex: 1 1 calc(50% - 32px);
        max-width: 400px !important;
      }
    }
  
    @media (min-width: 740px) {
      .participant-item {
        flex: 1 1 calc(33.33% - 32px);
        max-width: 350px !important;
      }
    }
  
    @media (min-width: 1024px) {
      .participant-item {
        flex: 1 1 calc(25% - 32px);
        max-width: 300px !important;
      }
    }
  
    .participant-item > div {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  
    img {
      flex-shrink: 0;
    }
  
    .flex-grow {
      flex-grow: 1;
    }
  `}</style>
  

    </div>
  );
}

export default ParticipantList;
function fetchfirstData() {
  throw new Error("Function not implemented.");
}

