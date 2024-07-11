"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { cn } from "@/lib/utils";
import { BsImages, BsPaperclip } from "react-icons/bs";
import { useToast } from "@/components/ui/use-toast";
import { uploadPlantData } from "@/app/requestsapi/request";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import imageCompression from 'browser-image-compression';

const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100MB
const TARGET_FILE_SIZE = 1024 * 1024 * 4; // 4MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

async function resizeImage(file:any) {
  const options = {
    maxSizeMB: TARGET_FILE_SIZE / (1024 * 1024),
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const resizedFile = await imageCompression(file, options);
    return resizedFile;
  } catch (error) {
    console.error('Error resizing the image:', error);
    throw error;
  }
}

async function validateAndResizeImage(files:any) {
  if (!files || files.length === 0) { 
    return files;
  }

  const file = files[0];
  if (file.size > TARGET_FILE_SIZE) {
    const resizedFile = await resizeImage(file);
    return [resizedFile];
  }

  return files;
}

const formSchema = z.object({
  uname: z.string().max(255),
  pname: z.string().max(255),
  tname: z.string().max(255),
  image: z
    .any()
    .refine(async (files) => {
      const validFiles = await validateAndResizeImage(files);
      return validFiles?.[0]?.size <= MAX_FILE_SIZE;
    }, "Max image size is 100MB.")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type ContactFormData = z.infer<typeof formSchema>;

export function FormUploadPlant() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const us_name = Cookies.get('name');
  const token = Cookies.get('token');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      uname: us_name,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const formData = new FormData();
    formData.append("name", data.uname);
    formData.append("planterName", data.pname);
    formData.append("treeName", data.tname);

    if (selectedImage) {
      const compressedImage = await resizeImage(selectedImage);
      formData.append("image", compressedImage);
    }

    try {
      const response = await uploadPlantData(formData, token as string);
      toast({
        title: "Submitted Successfully.",
        description: "Your plant has been uploaded successfully.",
      });
      // Reload the page
      setTimeout(function() {
        window.location.reload();
      }, 1800);

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
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-2 h-[calc(80vh-50px)]"
      >
        <FormField
          control={form.control}
          name="uname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uploader name</FormLabel>
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
          name="pname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Planter name</FormLabel>
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
          name="tname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tree name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={cn("flex md:flex-row w-[100%] gap-4 flex-col")}>
          <div className="flex w-[100%] gap-2 flex-col my-4">
            <FormLabel>Upload plant image</FormLabel>
            <span className="text-xs text-gray-400"></span>
            <div
              className={`flex w-[100%] gap-4 p-4 rounded border border-neutral-200 flex-col items-center md:flex-col md:justify-between md:items-center`}
            >
              <div
                className={`flex md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row`}
              >
                {selectedImage ? (
                  <div className="md:max-w-[200px]">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                    />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-between">
                    <div className="p-3 bg-slate-200 justify-center items-center flex">
                      <BsImages size={56} />
                    </div>
                  </div>
                )}
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        size="lg"
                        type="button"
                        className="bg-green-100 hover:bg-green-300 border-2 border-green-600 text-green-600"
                      >
                        <input
                          type="file"
                          className="hidden"
                          id="fileInput"
                          accept="image/*"
                          onBlur={field.onBlur}
                          name={field.name}
                          onChange={async (e) => {
                            const files = e.target.files;
                            if (files && files[0]) {
                              const validFiles = await validateAndResizeImage(files);
                              field.onChange(validFiles);
                              setSelectedImage(validFiles[0] || null);
                            }
                          }}
                          ref={field.ref}
                        />
                        <label
                          htmlFor="fileInput"
                          className="text-neutral-90 flex gap-2 justify-center items-center w-full"
                        >
                          <BsPaperclip /> Select Image
                        </label>
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="bg-green-700 w-[100%]">
          Submit
        </Button>
      </form>
    </Form>
  );
}
