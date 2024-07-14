"use client";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/navigationBar";
import { Input } from "@/components/ui/input";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { apiURL } from "@/app/requestsapi/request";
import { fetchClubData } from "@/app/requestsapi/request";
import Footer from "@/components/footer";

const formSchema = z.object({
  value: z.array(z.string()).nonempty("Please select at least one club"),
  no_of_students: z.coerce.number(),
  total_classes: z.coerce.number().gte(1).lte(999),
  list_of_classes: z.string().min(3).max(255),
  // referral_name: z.string().min(3),
});

type FormSchema = z.infer<typeof formSchema>;

interface Club {
  id: string;
  name: string;
}

const MultiSelectZodForm = () => {
  const [clubOptions, setClubOptions] = useState<Club[]>([]);
  const multiForm = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: [],
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  // Wrap useSearchParams in Suspense
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchClubs = async () => {
      try {

        const data = await fetchClubData();
        setClubOptions(data.clubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  const onSubmit = async (data: FormSchema) => {
    // Extracting values from searchParams
    const groupId = searchParams.get("group_id");
    const pno = searchParams.get("pno");

    const selectedClubIds = clubOptions
      .filter((club) => data.value.includes(club.name))
      .map((club) => club.id);

    const payload = {
      groupId: parseInt(groupId!),
      clubs: selectedClubIds.toString(),
      list_of_classes: data.list_of_classes.toString(),
      no_of_students: parseInt(data.no_of_students.toString()),
      phoneNUmber: parseInt(pno!),
    };

    try {
      const response = await fetch(`${apiURL}/group/school/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
        });
        router.push("/login/coordinator");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-green-50">
      <NavigationBar />
      {/*<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-8">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              School - Additional details
            </h1>
            
                <Button type="submit" className="bg-green-600">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
                  </div>*/}

<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
School - Additional details   
      </h1>
      <div className="mt-7 container mx-auto p-4 flex flex-col lg:flex-row  items-stretch">
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <img
            src="/images/planting_trees.jpg"
            alt="Description of image"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
        </div>
        {/*form.......... */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center border-2">
          <div className="p-6 w-full">
          <Form {...multiForm}>
              <form
                onSubmit={multiForm.handleSubmit(onSubmit)}
                className="space-y-3 grid gap-3 w-full"
              >
                <FormField
                  control={multiForm.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>List of clubs in your school</FormLabel>
                      <MultiSelector
                        onValuesChange={field.onChange}
                        values={field.value}
                      >
                        <MultiSelectorTrigger className="shadow-xl rounded-md px-4 py-1 border-0">
                          <MultiSelectorInput placeholder="Select clubs" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {clubOptions.map((club) => (
                              <MultiSelectorItem
                                key={club.id}
                                value={club.name}
                              >
                                {club.name}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={multiForm.control}
                  name="no_of_students"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of students this year</FormLabel>
                      <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormDescription> </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={multiForm.control}
                  name="total_classes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total number of classes</FormLabel>
                      <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormDescription> </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={multiForm.control}
                  name="list_of_classes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>List of classes</FormLabel>
                      <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription> </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
            <Button type="submit" className="w-1/3 bg-green-600">
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
    <Footer/>
    </section>
  );
};


export default function MultiSelectZod() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MultiSelectZodForm />
    </Suspense>
  );
}