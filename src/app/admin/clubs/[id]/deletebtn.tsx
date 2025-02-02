import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { apiURL } from "@/app/requestsapi/request";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

// Define your form schema here, if needed
const formSchema = z.object({

});

export function DeleteBtn() {
    const router = useRouter();
    const pathname = usePathname();
    const coId = pathname.split("/")[3];
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const token = Cookies.get("adtoken");
    const [category, setCategory] = useState('');
    useEffect(() => {
        async function fetchdata() {
            if (token) {
                const retrievedData = JSON.parse(localStorage.getItem("clubs") || "[]");
                const itemdata = retrievedData.find((item: { id: string; }) => item.id == coId)

                setCategory([itemdata][0].name);
            }
        }
        fetchdata();
    }, [coId, token]);
    async function handleDelete(values: z.infer<typeof formSchema>) {
        const formdata = {
            clubName: category,
            isDeleted: true
        };

        if (token) {
            try {
                const response = await axios.post(`${apiURL}/adminEdit/modifyClubs?recordId=${coId}`, formdata, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success && response.status !== 203) {
                    toast({
                        title: "Data Deleted Successfully.",
                        description: "",
                    });

                    setTimeout(() => {
                        window.history.back();
                    }, 1800);
                } else {
                    toast({
                        variant: "destructive",
                        title: "Oops, Something went wrong!",
                        description: "Please try again...",
                    });
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Oops, Something went wrong!",
                    description: "Please try again...",
                });
            }
        }
    }

    return (
        <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary ml-3" onClick={handleDelete}>
            <Trash2 />
            <span className="text-base">Delete</span>
        </div>
    );
}
