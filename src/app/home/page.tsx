"use client";

import Footer from "@/components/footer";
import NavigationBar from "@/components/navigationBar";
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';import { ChevronRight } from "lucide-react";
import { apiURL } from "../requestsapi/request";

interface Events {
  event_heading: string;
  event_body: string;
  image_link: string;
  location: string;
  created_time: string;
  is_deleted: string;
  show_in_main: string;
  
}


const HomePage = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  //const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await fetch(`${apiURL}/common/getMainPageEvents`);
      const data = await response.json();
      if (data.success) {
       setEvents(data.count);
      }
    };

    fetchEventDetails();
  }, []);

  


  const images = [
    '/images/slide01.jpg',
    '/images/slide03.jpg',
    '/images/slide04.jpg',
  ];

  const items = [
    { id: 1, heading: "GCEM Foundation 2016-ൽ ആരംഭിച്ച പദ്ധതി-സോഷ്യൽ ഫോറെസ്ട്രിയുടെ സഹകരണത്തോടെ", message: "പരിസ്ഥിതി ദിനത്തിലും തുടർന്നും നടുന്ന തൈകൾ സംരക്ഷിക്കുകയും , നാട്ടിൽ ഒരു ഹരിത ശുചിത്വ ബോധം ഉണ്ടാക്കുകയും ചെയ്യുക എന്ന ലക്ഷ്യം വെച്ച് കൊണ്ട് 2016 ജൂൺ 5 ന് പ്രൊഫസർ ശോഭീന്ദ്രന്റെ നേതൃത്വത്തിൽ സോഷ്യൽ ഫോറസ്ട്രി ഉദ്യാഗസ്ഥൻ മാരുടെ സഹകരണത്തോടെ , GCEM Foundation ആരംഭിച്ച പദ്ധതിയാണിത് .സോഷ്യൽ ഫോറെസ്റ്ററി നൽകുന്ന തൈകൾ നട്ട് പരിപാലിച്ചാൽ സമ്മാനങ്ങൾ നൽകുന്ന പദ്ധതിയുടെ നോട്ടീസ് , വിദ്യാലയങ്ങൾക്കും സന്നദ്ധ സംഘടനകൾക്കും സോഷ്യൽ ഫോറെസ്റ്ററി തൈകളൊടൊപ്പം വിതരണം ചെയ്‌തു കൊണ്ട് പദ്ധതിക്ക് തുടക്കം കുറിച്ചു ." },
    { id: 2, heading: "കുടുംബശ്രീ കോഴിക്കോട് ജില്ലാ മിഷൻ സഹകരണം", message: "തുടർന്ന് കുടുംബശ്രീ കോഴിക്കോട് ജില്ലാ മിഷൻ ഈ പദ്ധതി ഏറ്റെടുക്കുകയും, കോഴിക്കോട് കോർപറേഷൻ കുടുംബശ്രീ സ്നേഹപാലിക പൂക്കളമത്സരത്തിലൂടെ പ്രചാരണം ആരംഭിക്കുകയും ചെയ്തു . ഈ പദ്ധതി പൈലറ്റ് അടിസ്ഥാനത്തിൽ നടപ്പിലാക്കാൻ താല്പര്യമുള്ള കൂട്ടായ്മകളെ ക്ഷണിച്ച് കൊണ്ട് വിവിധ കുടുംബശ്രീ യൂണിറ്റുകളിലും തദ്ദേശ സ്വയം ഭരണ സ്ഥാപനങ്ങളിലും കാമ്പയിൻ ആരംഭിക്കുകയും ചെയ്തു ." },
    { id: 3, heading: "ഒന്നാം ഘട്ട ലക്ഷ്യം-1000 തൈകൾ-2017ൽ നേടി -തളിർ ജൈവ കൂട്ടായ്മയുടെ സഹകരണത്തോടെ", message: "കൊയിലാണ്ടി മുൻസിപ്പാലിറ്റിയിലെ ഒന്നാം വാർഡ് ആയ മന്ദമംഗലം ഗ്രാമത്തിലെ തളിർ ജൈവകൂട്ടായ്മ ഈ പദ്ധതി ഏറ്റെടുക്കുകയും കൊയിലാണ്ടി SN കോളേജിലെ NSS വളണ്ടിയർമാരുടെ സഹകരണത്തോടെ 1044 തൈകൾ അപ്ലോഡ് ചെയ്യൂകയും വിജയികൾക്ക് സ്വർണ്ണ നാണയങ്ങൾ സമ്മാനം നൽകുകയും ചെയ്തു ." },
    { id: 4, heading: "കോഴിക്കോട് ജില്ലാ പഞ്ചായത്ത് പദ്ധതി ഏറ്റെടുത്തു", message: "കേവലം ഒരു വാർഡിൽ നിന്നും 1000 ൽ അധികം തൈകൾ സംരക്ഷിച്ച് അപ്‌ലോഡ് ചെയ്യാൻ കഴിഞ്ഞാൽ 15000 ലധികം വാർഡുകളുള്ള കേരളത്തിൽ നിന്നും ഒരു കോടിയിലധികം തൈകൾ സംരക്ഷിച്ച് അപ്‌ലോഡ് ചെയ്യുവാൻ കഴിയുമെന്ന നിരീക്ഷണത്തോടെ ഈ പ്രൊജക്റ്റ് കോഴിക്കോട് ജില്ലാ പഞ്ചായത്തിന് സമർപ്പിക്കുകയും തുടർന്ന് ഈ പദ്ധതി കോഴിക്കോട് ജില്ലാ പഞ്ചായത്ത് ഏറ്റെടുക്കുകയും ഗ്രീനിങ് കോഴിക്കോട് എന്ന പേരിൽ പ്രത്യേക പദ്ധതി ആവിഷ്കരിച്ച് ഫണ്ട് വകയിരുത്തി സോയിൽ കൺസർവേഷൻ മുഖേനെ ഗ്രീൻ ക്ലീൻ കേരള മിഷന്റെ സഹകരണത്തോടെ ഹരിത ശുചിത്വ മത്സരങ്ങൾ ആരംഭിക്കുകയും ചെയ്തു ," },
    { id: 5, heading: "മികച്ച പരിസ്ഥിതി പ്രവർത്തനത്തിന് അവാർഡ്", message: "വൃക്ഷങ്ങൾ സംരക്ഷിക്കാൻ മികച്ച പരിസ്ഥിതി പ്രവർത്തനം നടത്തിയ വ്യക്തികൾക്കും സ്ഥാപനങ്ങൾക്കും ക് സഹരിതപുരസ്കാരവും സമ്മാനങ്ങളും നൽകുന്നു. വൃക്ഷങ്ങൾ നട്ട് വളർത്താനും അത് പരിരക്ഷിക്കാനും ക്രിയാത്മകമായ പദ്ധതികൾ നടപ്പിലാക്കുന്നവയിൽ ഏറ്റവും മികച്ചതിനാണ് പുരസ്‌കാരങ്ങൾ നൽകുന്നത്.." },
    { id: 6, heading: "ഗ്രീൻ ക്ലീൻ എസ്റ്റിമേറ്റ്", message: "വൃക്ഷത്തൈ പരിപാലന  മത്സരത്തിൽ  പങ്കെടുക്കുന്നവരെല്ലാം, സ്വന്തം വീട്ടിൽ  കൃഷി,  മാലിന്യ സംസ്കരണം, വൃക്ഷങ്ങൾ  വളർത്തൽ , ജല സംരക്ഷണം,ഊർജ്ജ സംരക്ഷണം പൂന്തോട്ട നിർമ്മാണം  എന്നീ  മേഖലകളിൽ  നടപ്പിലാക്കാൻ  കഴിയുന്ന  പ്രവർത്തികളുടെ  എസ്റ്റിമേറ്റ്  ഈ വെബ്‌സൈറ്റിലൂടെ  തയ്യാറാക്കുന്നുണ്ട്." },
  ];
const cards = [
  {
    imageSrc: '/images/news01.jpg', 
    date: 'Jun 5, 2017',
    place: 'Quilandy SIK Bazar',
    heading: 'ഹരിതപുരസ്കാരം മൂന്നാം നറുക്കെടുപ്പ്',
    paragraph: 'ജിസം ഫൗണ്ടേഷൻ നൽകുന്ന ഹരിതപുരസ്കാരം സമ്മാനപദ്ധതിയിലെ മൂന്നാം സമ്മാനാർഹനായ രമേശൻ V.V. ക്കുള്ള സർണ്ണനാണയം ബഹു:കൊയിലാണ്ടി MLA കെ.ദാസൻ നൽകുന്നു. ജിസം ഡയറക്ടർമാരായ കെ.ഇക്ബാൽ, ഇസ്മായിൽ കോട്ടക്കൽ, കൊയിലാണ്ടി മുൻസിപ്പാലിറ്റി സ്റ്റാന്റിംഗ് കമ്മിറ്റീ ചെയർമാൻ ഷിജു മാസ്റ്റർ ,കൗൺസിലർ ഷാജി ,തളിർ ഡയറക്ടർ രാമകൃഷ്ണൻ തുടങ്ങിയവർ സമീപം.2017 jun5 Quilandy sik bazar',
  },
  {
    imageSrc: '/images/news02.jpg', 
    date: '2016-17',
    //place: 'Quilandy SIK Bazar',
    heading: '2016-17 ഏറ്റവും കൂടുതൽ വൃക്ഷത്തൈകൾ അപ്‌ലോഡ് ചെയ്ത ഗ്രൂപ് ലീഡർ',
    paragraph: '2016-17 ൽ ഏറ്റവും കൂടുതൽ വൃക്ഷത്തൈകൾ അപ്‌ലോഡ് ചെയ്ത ഗ്രൂപ് ലീഡർ-തളിർ ജൈവഗ്രാമം മന്ദമംഗലത്തിനുള്ള ഹരിതപുരസ്കാരം ഡയറക്ടർ സതീശൻ കൊരോത്തിൽ നിന്നും തളിർ ഡയറക്ടറും കൊയിലാണ്ടി മുൻസിപ്പാലിറ്റി കൗൺസിലറുമായ ഷാജി ഏറ്റു വാങ്ങുന്നു.',
  },
  {
    imageSrc: '/images/news03.jpg', 
    date: 'DEC 31,2016',
   // place: 'Quilandy SIK Bazar',
    heading: 'ഹരിതപുരസ്കാരം സമ്മാനപദ്ധതി രണ്ടാം നറുക്ക്ർടുപ്പ്',
    paragraph: 'ഹരിതപുരസ്കാരം സമ്മാനപദ്ധതി രണ്ടാം നറുക്ക്ർടുപ്പ് (തളിർ)വിജയി സ്മിത.CP ക്കുള്ള സ്വർണ്ണ നാണയം ബഹു കൊയിലാണ്ടി MLA K ദാസനിൽ നിന്നും പിതാവ് ഏറ്റ് വാങ്ങുന്നു.ബഹു. തൊഴിൽ, എക്സൈസ് വകുപ്പ് മന്ത്രി TP രാമകൃഷ്ണൻ, മുൻ കുടുംബശ്രീ ജില്ലാ മിഷൻ കോഡിനേറ്റർ സൈദ് അക്ബർ ബാദ്ഷഖാൻ, ജിസം ഫൗണ്ടേഷൻ ചീഫ് പേട്രൺ ശോഭീന്ദ്രൻ മാസ്റ്റർ, കുടുംബശ്രീ അസിസ്റ്റന്റ് കോർഡിനേറ്റർ നാസർ ബാബു, ജിസം ഫൗണ്ടേഷൻ എക്സിക്കുട്ടീവ് ഡയറക്ടർ മുഹമ്മദ് ഇഖ്ബാൽ.കെ എന്നിവർ സമീപം. 2016 ഡിസംബർ 31. കൊയിലാണ്ടി കൊല്ലം',
  },
];
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };


  const dynamicContent = isMounted ? (
    <>
  {/* Box 2 */}
  <div className="flex justify-center items-center p-0 m-3 rounded-2xl overflow-hidden" style={{ height: '100%' }}>
    <ReactPlayer url="https://youtu.be/GXCqljYDBEU?si=KF6A-8r8YmAEFgsm" width="100%" height="100%" />
  </div>
</>

  ) : null;

  const updateIsMobile = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Example threshold for mobile view
    };

    setIsMounted(true);
    updateIsMobile(); // Initial check
    window.addEventListener('resize', updateIsMobile);

    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change image every 3 seconds

    return () => {
      window.removeEventListener('resize', updateIsMobile);
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentTextIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNextClick = () => {
    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const getVisibleItems = () => {
    if (!isMobile) {
      return [
        items[(currentTextIndex) % items.length],
        items[(currentTextIndex + 1) % items.length],
        items[(currentTextIndex + 2) % items.length],
      ];
    } else {
      return [items[currentTextIndex]];
    }
  };
   const handleReadmoreClick=()=>{
    router.push("/events")
   }
  //1
  const visibleItems = getVisibleItems();
  const [isOpen1, setIsOpen1] = useState(false);
  const toggleOpen1 = () => {
    setIsOpen1(!isOpen1);
  };
    //2
    const [isOpen2, setIsOpen2] = useState(false);
    const toggleOpen2 = () => {
      setIsOpen2(!isOpen2);
    };
      //3
      const [isOpen3, setIsOpen3] = useState(false);
      const toggleOpen3 = () => {
        setIsOpen3(!isOpen3);
      };
      //4
      const [isOpen4, setIsOpen4] = useState(false);
      const toggleOpen4 = () => {
        setIsOpen4(!isOpen4);
      };
  //5
  const [isOpen5, setIsOpen5] = useState(false);
  const toggleOpen5 = () => {
    setIsOpen5(!isOpen5);
  };
//6
  const [isOpen6, setIsOpen6] = useState(false);
  const toggleOpen6 = () => {
    setIsOpen6(!isOpen6);
  };
//7s
  const [isOpen7, setIsOpen7] = useState(false);
  const toggleOpen7 = () => {
    setIsOpen7(!isOpen7);
  };
  
  return (
    <div className="body">
      <NavigationBar />
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt="Sliding Image"
          className="w-full h-full object-contain md:object-cover"
        />
        <button
          onClick={handlePrev}
          className="absolute inset-y-0 left-4 flex items-center justify-center p-2 rounded-full shadow-lg focus:outline-none"
        >
        <svg
           className="h-10 w-10 text-white"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
        >
       <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth="2"
         d="M15 19l-7-7 7-7"
       />
        </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute inset-y-0 right-4 flex items-center justify-center p-2 rounded-full shadow-lg focus:outline-none"
        >
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="container mx-auto p-0">
        <div className="grid gap-0 grid-cols-1 md:grid-cols-3">   
          {/* Box 1 */}
          <div className=" bg-light-gray flex flex-col justify-center items-center px-4 py-8 my-3 rounded-2xl">
            <h2 className="text-2xl p-2" style={{fontWeight:'bold'}}>ഗ്രീൻ ക്ലീൻ കേരള -ഹരിത മത്സരങ്ങൾ</h2>
            <p className="mt-4 px-2">
           സുസ്ഥിര വികസിതവും  മാലിന്യമുക്തവും  ഹരിതാഭവും  ആയ  കേരളം  എന്ന  ലക്‌ഷ്യം സാക്ഷാൽക്കരിക്കാനായി Green Clean Kerala Mission , വിദ്യാർത്ഥികൾക്കും  പരിസ്ഥിതി  തല്പരർക്കുമായി സംഘടിപ്പിക്കുന്ന മത്സരാധിഷ്ഠിതമായ ഒരു പദ്ധതിയാണ്  ഗ്രീൻ ക്ലീൻ കേരള -ഹരിത മത്സരങ്ങൾ.   
            </p>
            <Link href="/project" legacyBehavior>
            <a className="mt-2 self-start p-2 font-bold no-underline flex place-items-center">
              Read more
              <span className="text-white text-center text-xl font-bold bg-[#3C6E1F] rounded-full ml-3 p-2  inline-block"><ChevronRight/></span>
            </a>

            </Link>
          </div>  
          {/* Box 2 */}
          {dynamicContent}
          
          {/* Box 3 */}
          <div className=" bg-light-gray relative flex justify-center items-center bg-cover my-8 rounded-2xl ">
            <div className="bg-opacity-50 bg-none p-4">
              <h2 className="text-2xl"style={{fontWeight:'bold'}}>പ്രൊഫസ്സർ  ശോഭീന്ദ്രൻ  സ്മാരക പരിസ്ഥിതി അവാർഡ് –2024-25
              (ഒരു ലക്ഷം രൂപയുടെ പുരസ്കാരങ്ങളും സമ്മാനങ്ങളും)</h2>
              <p className="mt-4">
              ഹരിത  മത്സരങ്ങളിൽ മികച്ചപ്രകടനം  നടത്തുന്ന   വിദ്യാലയങ്ങൾക്കും , വിദ്യാർത്ഥികൾക്കും , അധ്യാപകർക്കും പരിസ്ഥിതി പ്രവർത്തകർക്കും പ്രൊഫസ്സർ  ശോഭീന്ദ്രൻ സാറിന്റെ  പേരിൽ  പ്രത്യേക  പുരസ്കാരങ്ങളും  ക്യാഷ്  പ്രൈസും  നൽകുന്നതാണ് . ആയതിനായി  2024  ജൂൺ  5  മുതൽ  2025  ജൂൺ  5  വരെ  വിവിധ വിഭാഗങ്ങൾക്കായി പ്രത്യേക  ഹരിത  മത്സരങ്ങൾ  സംഘടിപ്പിക്കുന്നുണ്ട് .
              </p>
              <Link href="/project" legacyBehavior>
                <a className="mt-2 self-start p-2 font-bold no-underline flex place-items-center">
                  Read more
                  <span className="text-white  text-center text-xl font-bold bg-[#3C6E1F] rounded-full ml-3 p-2  inline-block"><ChevronRight/></span>
                </a>
            </Link>
            </div>
          </div>
        </div>
      </div>
     <div className="container">
       {/* container 1 */}
        <div onClick={toggleOpen1} className={`p-4 my-4 mt-6 mx-4 shadow-md rounded-lg ${isOpen1 ? 'bg-light-green' : 'bg-light-gray'}`} style={{ boxSizing: 'border-box' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold " style={{color:'#3C6E1F'}}>ഒരുകോടി വൃക്ഷത്തൈ സെൽഫികളുമായി കേരളം UNEP യിലേക്ക്...</h2>
          <button className="text-xl">
            {isOpen1 ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        {isOpen1 && (
          <>
            <hr className="my-1" />
            <p className="mt-2 text-center">
            ലോക  മലയാളികൾ  ചേർന്ന് ഇങ്ങനെ  ഒരു കോടി വൃക്ഷത്തൈകൾ സംരക്ഷിച്ച്, അതിൻറെ  ഓരോ മൂന്ന് മാസത്തെയും  വളർച്ച പ്രകടമാവുന്ന  ഫോട്ടോയും  മറ്റു വിവരങ്ങളും വെബ്സൈറ്റിൽ പ്രസിദ്ധീകരിച്ച് UNEP (United Nations Environmental Program) യിലേക്ക് സമർപ്പിക്കുവാനും  സുസ്ഥിര  വികസിത  കേരളം  എന്ന  മഹത്തായ  ലക്ഷ്യം  സാക്ഷാൽക്കരിക്കുവാനുള്ള   പ്രവർത്തനങ്ങൾ  നടത്തുവാനും  ഈ പദ്ധതിയിലൂടെ  ലക്ഷ്യമിടുന്നു.
            </p>
          </>
        )}
           </div>
           {/* container 2 */}
          <div onClick={toggleOpen2} className={`p-4 my-4 mx-4 shadow-md rounded-lg ${isOpen2 ? 'bg-light-green' : 'bg-light-gray'}`} style={{ boxSizing: 'border-box' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold " style={{color:'#3C6E1F'}}>ആയിരം കോടി രൂപയുടെ സുസ്ഥിര വികസിത പ്രൊജക്റ്റ്  തയ്യാറാക്കൽ</h2>
          <button className="text-xl">
            {isOpen2 ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        {isOpen2 && (
          <>
            <hr className="my-1" />
            <p className="mt-2 text-center">
            ഒരു കോടി വൃക്ഷത്തൈ സെൽഫികൾ UNEP ലേക്ക് സമർപ്പിക്കുന്നതൊടൊപ്പം  കേരളം സുസ്ഥിര വികസിതവും സമ്പൂർണ്ണ മാലിന്യമുക്തവും ഹരിതാഭവും ആക്കുവാനുള്ള പ്രവർത്തനം നടത്താൻ ആയിരം കോടി രൂപയുടെ  ഗ്രീൻ ക്ലീൻ എസ്റ്റിമേറ്റ് തയ്യാറാക്കി , അതാത്  തദ്ദേശ  സ്വയംഭരണ  സ്ഥാപനങ്ങളും കേരള സർക്കാറും  മുഖേന  കേന്ദ്രസർക്കാർ ,UNEP, എന്നിവക്ക് സമർപ്പിക്കുന്നതാണ്. മത്സരത്തിൽ  പങ്കെടുക്കുന്നവർ  അവരുടെ  അധീനതയിലുള്ള   പ്രദേശങ്ങളിൽ  നടപ്പിലാക്കാൻ  കഴിയുന്ന പ്രദേശിക  പദ്ധതികളാണ്  തയ്യാറാക്കേണ്ടത്. 20  % തുക  ഗുണഭോക്താവും , 20  % അതാത്  തദ്ദേശ  സ്വയംഭരണ  സ്ഥാപനങ്ങളും  20  % കേരള സർക്കാരും 20  %  കേന്ദ്ര സർക്കാറും  20  % UNEP യും  നൽകുന്ന  വിധത്തിലാണ്  പദ്ധതി  വിഭാവനം  ചെയ്യുന്നത് .
            </p>
          </>
        )}
           </div>
           {/* container 3 */}
           <div onClick={toggleOpen3} className={`p-4 my-4 mx-4 shadow-md rounded-lg ${isOpen3 ? 'bg-light-green' : 'bg-light-gray'}`} style={{ boxSizing: 'border-box' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold " style={{color:'#3C6E1F'}}>ഐക്യരാഷ്ട്രസഭ 17 സുസ്ഥിര വികസനം ലക്ഷ്യങ്ങൾ (Sustainable Development Goals)</h2>
          <button className="text-xl">
            {isOpen3 ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        {isOpen3 && (
          <>
            <hr className="my-1" />
            <p className="mt-2 text-center">
            ഇതോടൊപ്പം  ഐക്യരാഷ്ട്രസഭ വിഭാവനം  ചെയ്ത 17 സുസ്ഥിര വികസന  ലക്ഷ്യങ്ങൾ  കേരളത്തിൽ  പ്രാവർത്തികമാക്കാനുള്ള  പ്രചാരണ  പ്രവർത്തനങ്ങളും  നടത്താൻ   ഉദ്ദേശിക്കുന്നു .

1) ദാരിദ്യ്ര നിർമ്മാർജ്ജനം , 2) വിശപ്പില്ലാതാക്കൽ, 3) നല്ല ആരോഗ്യവും ക്ഷേമവും, 4) ഗുണമേന്മയുള്ള വിദ്യാഭ്യാസം, 5) ലിംഗസമത്വം, 6) ശുദ്ധമായ വെള്ളവും പൊതുശുചിത്വം, 7) താങ്ങാവുന്നതും ശുദ്ധവുമായ ഊർജ്ജം, 8) മാന്യമായ തൊഴിലും സാമ്പത്തിക വളർച്ചയും 9) വ്യവസായം, നവീകരണം, അടിസ്ഥാനസൗകര്യങ്ങൾ, 10) അസമത്വം ലഘൂകരിക്കൽ, 11) സുസ്ഥിര നഗരങ്ങളും സമൂഹങ്ങളും, 12) ഉത്തരവാദിത്ത ഉപഭോഗവും ഉത്പാദനവും, 13) കാലാവസ്ഥാ വ്യതിയാനം, 14) ജലത്തിനടിയിലെ ജീവൻ, 15) കരയിലെ ജീവൻ, 16) സമാധാനം, നീതി, ശക്തമായ നിയമസ്ഥാപനങ്ങൾ, 17) ലക്ഷ്യങ്ങൾ കൈവരിക്കാനുള്ള പങ്കാളിത്തം.  എന്നിവയാണ് ഐക്യരാഷ്ട്രസഭ വിഭാവനം  ചെയ്ത 17 സുസ്ഥിര വികസന  ലക്ഷ്യങ്ങൾ.
            </p>
          </>
        )}
           </div>
           {/* container 4 */}
           <div onClick={toggleOpen4} className={`p-4  my-4 mx-4  shadow-md rounded-lg ${isOpen4 ? 'bg-light-green' : 'bg-light-gray'}`} style={{ boxSizing: 'border-box' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold " style={{color:'#3C6E1F'}}>ഹരിത മത്സരങ്ങൾ</h2>
          <button className="text-xl">
            {isOpen4 ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        {isOpen4 && (
          <>
            <hr className="my-1" />
            <p className="mt-2 text-center">
            വിദ്യാർഥികൾക്കും, അദ്ധ്യാപകർക്കും ,  പൊതുജനങ്ങൾക്കുമായി വിവിധ ഹരിത മത്സരങ്ങൾ സംഘടിപ്പിച്ച് വിജയികൾക്ക് പുരസ്കാരങ്ങളും സമ്മാനങ്ങളും നൽകുന്നു.  KG, LP, UP, HS, HSS, CLG, GENERAL എന്നീ വിഭാഗങ്ങളിൽ,  വിദ്യാഭ്യാസ  ഉപ ജില്ലാ തലം, വിദ്യാഭ്യാസ ജില്ലാതലം, ജില്ലാ തലം,സംസ്ഥാന തലം,  എന്നിവയിൽ മികച്ച പ്രകടനം നടത്തുന്നവർക്ക് പ്രത്യേക പുരസ്കാരങ്ങളും സമ്മാനങ്ങളും ഉണ്ടായിരിക്കുന്നതാണ്.
            </p>
          </>
        )}
           </div>
           {/* container 5 */}
           <div onClick={toggleOpen5} className={`p-4  my-4 mx-4 shadow-md rounded-lg ${isOpen5 ? 'bg-light-green' : 'bg-light-gray'}`} style={{ boxSizing: 'border-box' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold" style={{color:'#3C6E1F'}}>ഗ്രീനിങ് കോഴിക്കോട് - 2023-24</h2>
          <button className="text-xl">
            {isOpen5 ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        {isOpen5 && (
          <>
            <hr className="my-1" />
            <p className="mt-2 text-center">
            കോഴിക്കോട് ജില്ലയെ സമ്പൂർണ്ണ മാലിന്യ മുക്തവും ഹരിതാഭവും വേണ്ടി കോഴിക്കോട് ജില്ലാ പഞ്ചായത്ത് സോയിൽ കൺസർവേഷൻ ഡിപ്പാർട്മെൻറ് മുഖേനെ ഗ്രീൻ ക്ലീൻ കേരള മിഷൻറെ സഹകരണത്തോടെ നടപ്പാക്കുന്ന പദ്ധതിയാണ് ഗ്രീനിങ് കോഴിക്കോട് . ഹരിത കേരള മിഷൻ, ശുചിത്വ മിഷൻ , കുടുംബശ്രീ, അഗ്രിക്കൾച്ചറൽ ഡിപ്പാർമെൻറ് , സോഷ്യൽ ഫോറെസ്റ്ററി,ബയോ ഡൈവേഴ്‌സിറ്റി ബോർഡ് , വിവിധ തദ്ദേശ സ്വയം ഭരണസ്ഥാപനങ്ങൾ എന്നിവ മുഖേനെ സർക്കാർ നടപ്പാക്കുന്ന പദ്ധതികൾ കൂടുതൽ ജനകീയമാക്കാൻ ഗ്രീൻ ക്ലീൻ കേരള മിഷന്റെ സഹകരണത്തോടെ വിവിധ ഹരിത മത്സരങ്ങൾ സംഘടിപ്പിക്കുകയും , വിജയികൾക്ക് ഗ്രീൻ ക്ലീൻ കേരള മിഷൻ സമ്മാനങ്ങൾ നൽകുകയും ചെയ്യുന്നു..
            </p>
          </>
        )}
           </div>
           {/* container 6 */}
           <div onClick={toggleOpen6} className={`p-4  my-4 mx-4  shadow-md rounded-lg ${isOpen6 ? 'bg-light-green' : 'bg-light-gray'}`} style={{ boxSizing: 'border-box' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold " style={{color:'#3C6E1F'}}>ഗ്രീൻ ക്ലീൻ കേരള മിഷൻ</h2>
          <button className="text-xl">
            {isOpen6 ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        {isOpen6 && (
          <>
            <hr className="my-1" />
            <p className="mt-2 text-center">
            കോഴിക്കോട് ജില്ലയിലെ Forestry Club,ICDS, NSS, SPC, SCOUT & GUIDE, JRC, SAVE, Green Clean Earth Movement Foundation (GCEM Fondation), തുടങ്ങിയവയുടെ കൂട്ടായ്മയാണ് ഗ്രീൻ ക്ലീൻ കേരള മിഷൻ .കോഴിക്കോട് ജില്ലാ പഞ്ചായത്ത് സോയിൽ കൺസർവേഷൻ ഡിപ്പാർട്മെൻറ് , ഹരിത കേരള മിഷൻ, ശുചിത്വ മിഷൻ , കുടുംബശ്രീ, അഗ്രിക്കൾച്ചറൽ ഡിപ്പാർമെൻറ് , സോഷ്യൽ ഫോറെസ്റ്ററി,ബയോ ഡൈവേഴ്‌സിറ്റി ബോർഡ് , വിവിധ തദ്ദേശ സ്വയം ഭരണസ്ഥാപനങ്ങൾ എന്നിവയുടെ സഹകരണത്തോടെയാണ് പദ്ധതികൾ ആവിഷ്‌കരിക്കുന്നത് . വിദ്യാർഥികളിലൂടെ ഹരിത ശുചിത്വ ബോധം സമൂഹത്തിൽ വ്യാപിപ്പിക്കുവാൻ വേണ്ടി വിവിധ ഹരിത മത്സരങ്ങൾ സംഘടിപ്പിച്ച് വിജയികൾക്ക് സമ്മാനങ്ങൾ നൽകുന്നു
            </p>
          </>
        )}
           </div>
       
           {/* container 7 */}
           <div onClick={toggleOpen7} className={`p-4  my-4 mx-4  shadow-md rounded-lg ${isOpen7 ? 'bg-light-green' : 'bg-light-gray'}`} style={{ boxSizing: 'border-box' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold " style={{color:'#3C6E1F'}}>നാഴികക്കല്ലുകൾ -ഗ്രീൻ ക്ലീൻ കേരള -വൃക്ഷത്തൈ പരിപാലന മത്സരം</h2>
          <button className="text-xl">
            {isOpen7 ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        {isOpen7 && (
          <>
            <hr className="my-1" />
            <p className="mt-2 text-center">
            Conducted by Green Clean Kerala Mission- A confederation of Green Clean Eearth Movement(GCEM) Foundation, Forestry Club, NSS, SPC, Scout & Guide, JRC & SAVE.
       In Association with Kozhikkode jilla panchayath Soil Conservation Department, Agricultural Department, Haritha Keralam Mission, Social forestry, Kudumbashree & ICDS.
       Supported by indian Oil Corporation and myG, VKC,tecQ, Aqua garden, Mall of garden, AGRI SUPER MARKET, KISAN EXCEL, a2z4home.
            </p>
          </>
        )}
           </div>
     </div>
    {/*textSlide */}
  <div className="relative w-full">
    <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center py-4 h-full pointer-events-none">
      <button
        onClick={handlePrevClick}
        className="text-white rounded-full shadow-md p-2 ml-1 pointer-events-auto"
        style={{ backgroundColor: '#3C6E1F', fontSize: '20px', fontWeight: 'bold' }}
      >
        ←
      </button>
      <button
        onClick={handleNextClick}
        className="text-white rounded-full shadow-md p-2 mr-1 pointer-events-auto"
        style={{ backgroundColor: '#3C6E1F', fontSize: '20px', fontWeight: 'bold' }}    >
        →
      </button>
    </div>
    <div className="flex overflow-hidden w-full relative z-10">
      {visibleItems.map((item, index) => (
        <div
          key={item.id}
          className="flex-shrink-0 p-4"
          style={{ width: isMobile ? "100%" : "33.33%" }}
        >
          <div
            className={`p-6 shadow-md rounded-md h-full ${
              index % 2 === 0 ? 'bg-light-green' : 'bg-light-gray'
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">{item.heading}</h2>
            <p>{item.message}</p>
            <a
              href="/project"
              className="text-blue-500"
              style={{ textDecoration: 'none', color: 'blue', fontSize: '14px' }}
            >
              Read more...
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
    {/*lteat news............. */}
    
   <div className="flex justify-center mt-2">
      <div>
        <span className="text-black text-3xl font-bold">Latest</span>
        <span className="text-green-500 text-3xl font-bold"> News</span>
      </div>
    </div>
    <div className="d-flex justify-content-center my-4">
            <Image src="/images/line.png" alt="Line" style={{ width: '50%', height: '40px' ,marginLeft:'25%'}} />
          </div>
    {/*card with image */}
    {/* Card with image */}
    <div className="container mx-auto p-4" style={{ boxSizing: 'border-box' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ justifyItems: 'center' }}>
        {events.map((card, index) => (
          <div key={index} className="bg-light-gray p-4 shadow-md" style={{ borderRadius: '9px', maxWidth: '400px' }}>
            <Image src={card.image_link} alt={`Card Image ${index + 1}`} width={500} height={300} className="rounded-lg" />
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-500" />
                <span className="ml-2 text-gray-600">{card.created_time.split("T")[0].split('-').reverse().join('-')}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-500" />
                <span className="ml-2 text-gray-600">{card.location}</span>
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold">{card.event_heading}</h2>
            <p className="mt-2 text-gray-700">{card.event_body}</p>
          </div>
        ))}
      </div>
    </div>

  <div className="m-2 flex justify-center items-center">
  <button 
    onClick={handleReadmoreClick}
    className="bg-light-gray font-bold py-2 px-4 rounded-full text-[#3C6E1F]">
    Read More &gt;&gt;
  </button>
</div>

    <div className="mx-1 md:mx-4" style={{ boxSizing: 'border-box' }}>
      <h1 className="m-2 flex justify-center items-center text-2xl font-bold">Videos</h1>
        <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="flex justify-between items-center" style={{height:'250px', backgroundColor:'#DAD4D2'}}>
    <video className="w-full h-full object-cover rounded-md" controls>
      <source src="/video/new3.mp4" type="video/mp4" />
    </video>
  </div>
  <div className="flex justify-between items-center rounded-md" style={{height:'250px', backgroundColor:'#DAD4D2'}}>
    <video className="w-full h-full object-cover" controls>
      <source src="/video/FORWATSAP.mp4" type="video/mp4" />
    </video>
  </div>
</div>

        </div>
    </div>
        <Footer/>
    </div>
  );
};
export default HomePage;
