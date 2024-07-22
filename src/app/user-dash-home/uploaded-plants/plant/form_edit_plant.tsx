"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BsImages, BsPaperclip } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { uploadActivityData } from "@/app/requestsapi/request";
import { useToast } from "@/components/ui/use-toast";
import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100MB
const TARGET_FILE_SIZE = 1024 * 1024 * 4; // 4MB
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];


const formSchema = z.object({
  category: z.string(),
  sub_category: z.string(),
  name: z.string().max(255),
  address: z.string().max(255),
  activity_title: z.string().max(255),
  short_desc: z.string().max(255),
  social_link: z.string().max(255),
});

interface Category {
  activity_category: string;
  activity_category_id: string;
}

interface SubCategory {
  id: string;
  name: string;
}

interface ActivitiesTabProps {
  token: string;
}

export function FormEditPlant({ token }: ActivitiesTabProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      sub_category: "",
      name: "",
      address: "",
      activity_title: "",
      short_desc: "",
      social_link: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/activity_category`);
        setCategories(response.data.activity_category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/activity_sub_category`);
        setSubCategories(response.data.activity_sub_category);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const category = categories.find((item) => item.activity_category === values.category)?.activity_category_id;

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", category ? category : "");
    formData.append("subCategory", values.sub_category);
    formData.append("address", values.address);
    formData.append("activityTitle", values.activity_title);
    formData.append("shortDesc", values.short_desc);
    formData.append("socialMediaLink", values.social_link);
    if (selectedImage) {
      formData.append("activityThumbnail", selectedImage);
    }
    
    try {
      const response = await uploadActivityData(formData, token, id);
      if (response!.status == 201) {
        toast({
          title: "Submitted Successfully.",
          description: "Your activity has been uploaded successfully.",
        });
        setTimeout(function () {
          window.location.reload();
        }, 1800);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
      console.error("Error:", error);
    }
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 h-[calc(80vh-50px)]">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Items</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.activity_category_id} value={category.activity_category}>
                      {category.activity_category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sub_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subCategories.map((subCategory) => (
                    <SelectItem key={subCategory.id} value={subCategory.name}>
                      {subCategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activity_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="social_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Media Link</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary w-[100%]">
          Submit
        </Button>
      </form>
    </Form>
  )
}
