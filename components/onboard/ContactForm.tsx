"use client";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import makeAnimated from "react-select/animated";
import {
  createUser,
  getUserByAddress,
  getUsernameByAddress,
} from "@/lib/queries";
import { useWallets } from "@privy-io/react-auth";
import CustomImageUploader from "../ui/custom-image-uploader";
import { FormSchema, FormValues } from "@/lib/formSchema";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import UserProfileDisplay from "./UserProfileDisplay";
import FormFields from "./FormFields";
import SocialMediaInputs from "./SocialMediaInputs";
import Image from "next/image";

type Props = {};

const urlPatterns: Record<string, string> = {
  x: "^https?:\\/\\/(www\\.)?(twitter|x)\\.com\\/[A-Za-z0-9_]{1,15}$",
  instagram: "^https?:\\/\\/(www\\.)?instagram\\.com\\/[A-Za-z0-9_.]+$",
  youtube:
    "^https?:\\/\\/(www\\.)?youtube\\.com\\/(channel\\/|user\\/)?[A-Za-z0-9_-]+$",
  tiktok: "^https?:\\/\\/(www\\.)?tiktok\\.com\\/@[A-Za-z0-9_.]+$",
  linkedin: "^https?:\\/\\/(www\\.)?linkedin\\.com\\/in\\/[A-Za-z0-9_-]+$",
};

const animatedComponents = makeAnimated();

const ContactForm = (props: Props) => {
  const handleChange = useCallback((name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    let error = "";

    if (name === "email" && value && !/.+@.+\..+/.test(value)) {
      error = "Invalid email address";
    } else if (
      ["x", "instagram", "youtube", "tiktok", "linkedin"].includes(name)
    ) {
      const pattern = urlPatterns[name];
      if (pattern) {
        const isValid = validateUrl(value, pattern);
        if (!isValid) {
          error = `Invalid ${name.charAt(0).toUpperCase() + name.slice(1)} URL`;
        }
      }
    }

    setErrors((prevErrors: any) => ({ ...prevErrors, [name]: error }));
  }, []);
  const [countryCode, setCountryCode] = useState<string>("");
  const { wallets } = useWallets();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormValues>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    home_address: "",
    date_of_birth: "",
    education: "",
    work_history: "",
    phone_number: "",
    job_title: "",
    x: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    linkedin: "",
    info: "",
    imageUrl: "",
    skills: ["UI/UX", "DevOps", "FrontEnd Dev"],
  });

  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        setCountryCode(response.data.country_code);
        handleChange("country_code", response.data.country_code);
      } catch (error) {
        console.error("Error fetching country code:", error);
      }
    };
    fetchCountryCode();
  }, [handleChange]);

  useEffect(() => {
    const getUserInfo = async () => {
      let userInfo = (await getUserByAddress(wallets[0]?.address)) as any;
      let username = (await getUsernameByAddress(wallets[0]?.address)) as any;
      setFormData({
        first_name: userInfo?.basicInfo.firstName,
        last_name: userInfo?.basicInfo.lastName,
        username: username,
        email: userInfo?.basicInfo.email,
        home_address: userInfo?.basicInfo.homeAddress,
        date_of_birth: userInfo?.basicInfo.dateOfBirth,
        education: userInfo?.professionalInfo.education,
        work_history: userInfo?.professionalInfo.workHistory,
        phone_number: userInfo?.basicInfo.phoneNumber,
        job_title: userInfo?.professionalInfo.jobTitle,
        x: userInfo?.socialLinks.x,
        instagram: userInfo?.socialLinks.instagram,
        tiktok: userInfo?.socialLinks.tiktok,
        youtube: userInfo?.socialLinks.youtube,
        linkedin: userInfo?.socialLinks.linkedin,
        info: userInfo?.professionalInfo.info,
        skills: userInfo?.professionalInfo.skills,
        imageUrl: userInfo?.professionalInfo.imageURL,
      });
      // console.log(userInfo);
      // console.log(username);
    };
    getUserInfo();
  }, [wallets]);

  const [errors, setErrors] = useState<any>({});
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData,
  });

  const validateUrl = (url: string, pattern: string) => {
    if (!url) return false;
    const regex = new RegExp(pattern);
    return regex.test(url);
  };

  const handleSkillChange = (selected: any) => {
    if (selected.length <= 3) {
      const selectedValues = selected.map((option: any) => option.value);
      setSelectedOptions(selected);
      handleChange("skills", selectedValues);
    }
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? "#000000" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #d1d5db" : "none",
      "&:hover": {
        borderColor: "#d1d5db",
      },
      borderRadius: "0.375rem",
      paddingTop: "0.2rem",
      paddingBottom: "0.2rem",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#e5e7eb",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#374151",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#6b7280",
      "&:hover": {
        color: "#4b5563",
      },
    }),
  };

  const handleImagesChange = async (files: File[]) => {
    const file = files[0];
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("pinataMetadata", JSON.stringify({ name: file.name }));
      form.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
        },
        body: form,
      };

      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        options,
      );

      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      const fileUrl = `https://gateway.pinata.cloud/ipfs/${responseData.IpfsHash}`;
      setFormData((prev) => ({ ...prev, imageUrl: fileUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const basicInfo = {
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.email,
        homeAddress: formData.home_address,
        dateOfBirth: formData.date_of_birth,
        phoneNumber: formData.phone_number,
      };

      const professionalInfo = {
        education: formData.education,
        workHistory: formData.work_history,
        jobTitle: formData.job_title,
        info: formData.info,
        skills: formData.skills,
        imageURL: formData.imageUrl,
      };

      const socialLinks = {
        x: formData.x || "",
        instagram: formData.instagram || "",
        tiktok: formData.tiktok || "",
        youtube: formData.youtube || "",
        linkedin: formData.linkedin || "",
      };

      const visibility = {
        education: true,
        workHistory: true,
        phoneNumber: true,
        homeAddress: true,
        dateOfBirth: true,
      };

      if (
        !formData.username ||
        !basicInfo.firstName ||
        !basicInfo.lastName ||
        !basicInfo.email
      ) {
        throw new Error("Required fields are missing.");
      }

      const receipt = await createUser(
        formData.username,
        basicInfo,
        professionalInfo,
        socialLinks,
        visibility,
      );
      console.log("User created:", receipt);
      toast({
        title: "",
        description: "User created successfully",
      });
      setSubmitted(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mt-5 flex-col md:flex-row container gap-8">
      <div className="items-center flex justify-center">
        <Form {...form}>
          <div className="w-full md:w-2/3">
            {!submitted ? (
              <form onSubmit={onSubmit} className="space-y-4 w-full">
                <FormFields
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />

                <CustomImageUploader onImagesChange={handleImagesChange} />
                <SocialMediaInputs
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
                <FormItem className="items-center justify-center w-full">
                  <FormLabel className="w-60 text-sm">About you?</FormLabel>
                  <FormControl>
                    <textarea
                      style={{ height: "100px" }}
                      onChange={(e) => handleChange("info", e.target.value)}
                      value={formData.info}
                      className="form-textarea border p-2 border-gray-300 focus:outline-black rounded-md mt-1 block w-full"
                    />
                  </FormControl>
                </FormItem>
                <div className="flex items-center gap-4">
                  <Button
                    type="submit"
                    className="text-sm font-light"
                    disabled={loading}>
                    Submit
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-xl md:text-2xl flex items-centerjustify-center flex-col px-8">
                <div className="w-80">
                  <Image
                    width={300}
                    height={300}
                    src="/6.jpg"
                    alt="logo"
                    className="mx-auto"
                  />
                  <div className="text-gray-500 font-light text-center justify-center mx-auto py-10">
                    We&apos;ve received your inquiry and will be contacting you
                    via email shortly.
                  </div>
                </div>
              </div>
            )}
          </div>
        </Form>
      </div>

      <div className="gap-4 flex flex-col md:w-1/2 items-center">
        <div className="md:text-xl text-xl font-medium w-3/3 pb-3 items-center flex flex-col justify-center">
          Create your Clodron ID!
          <span className="text-orange-500">Clodron Star User ID</span>
        </div>
        <Toaster />
        <UserProfileDisplay formData={formData} countryCode={countryCode} />
      </div>
    </div>
  );
};

export default ContactForm;
