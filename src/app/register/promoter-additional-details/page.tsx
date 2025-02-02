"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { apiURL } from "@/app/requestsapi/request";
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast";

// Define the interface for the category data
interface Category {
  id: number;
  group_type: string;
}

const formSchema = z.object({
  city_name: z.string().max(255),
  category: z.string().max(255),
  total_team: z.coerce.number(),
});

function PromoterAdditionalDetailsForm() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [lsgd, setLsgd] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

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

      const categoryResponse = await fetch(`${apiURL}/category`);
      const categoryData = await categoryResponse.json();
      setCategory(categoryData.category);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchLsgdData() {
      if (selectedDistrict) {
        const lsgResponse = await fetch(`${apiURL}/lsg/${selectedDistrict}`);
        const lsgData = await lsgResponse.json();
        setLsgd(lsgData.district);
      }
    }
    fetchLsgdData();
  }, [selectedDistrict]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // get group id from the url parameter
  const searchParams = useSearchParams();
  const group_id = searchParams.get("group_id");
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dataWithIds = {
      cityName: values.city_name,
      totalNoOfMembers: values.total_team,
      categoryIdPromoting: category.find((item) => item.group_type === values.category)?.id,
      groupId: parseInt(group_id!)
    };

    try {
      const response = await fetch(`${apiURL}/group/promoter/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithIds),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result) {
        toast({
          title: "Account created.",
          description: "ഇനി  കോഡിനേറ്റർ  USER  NAME  ഉം  PASS WORD ഉം കൊടുത്ത് LOGIN   ചെയ്യുക",
        });
        router.push("/loginform");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops,Something went wrong !",
        description: "Please try again...",
      });
      console.error("Error:", error);
    }
  };
  return (
    <section className="bg-green-50 dark:bg-gray-900">
      <NavigationBar />
      <h1 className="text-xl mt-6 mb-3 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Promoter - Additional details
      </h1>
      {/*div part */}
      <div className="mt-7 container mx-auto p-4 flex flex-col lg:flex-row  items-stretch">
        <div className="w-full lg:w-1/4 flex items-center justify-center">
          <img
            src="/images/planting_trees.jpg"
            alt="Description of image"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
        </div>
        {/*form.......... */}
        <div className="w-full lg:w-2/4 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center border-2">
          <div className="p-6 w-full">
            <h1 className="text-base font-normal leading-tight tracking-tight text-black dark:text-white mt-4 mb-4 text-center">
              Helping School, NGO or Residence Association
            </h1>
            <Form {...form}>
              <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-14">
                <FormField
                  control={form.control}
                  name="city_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City name</FormLabel>
                      <FormControl>
                         <Input {...field} />
                      </FormControl>
                      <FormMessage /> 
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promoting Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {category.map((category) =>
                            category.group_type !== "Promoter" ? (
                              <SelectItem key={category.id} value={category.group_type}>
                                {category.group_type}
                              </SelectItem>
                            ) : (
                              ""
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total number of team members</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                <Button type="submit" className="w-1/3 bg-primary items-center">
                  Submit
                </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <img
            src="/images/planting_trees_2.jpg"
            alt="Description of image"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default function PromoterAdditionalDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PromoterAdditionalDetailsForm />
    </Suspense>
  );
}