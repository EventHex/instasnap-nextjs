"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Banner,
  Frame,
  PenIcon,
  Profileimg,
  ShineAI,
  Phone,
  User,
} from "../assets";
import Button from "../components/button";
import Banners from "../components/banner";
import AiInput from "../components/aiInput";
import { ChevronLeft, LogOut, RotateCcw } from "lucide-react";
import Link from "next/link";
import Input from "../components/input";
import Instance from "../instance";

// Add image compression utility
const compressImage = (base64Image, maxSizeMB = 0.5) => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      // Create canvas
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > 800 || height > 800) {
        const aspectRatio = width / height;
        if (width > height) {
          width = 800;
          height = width / aspectRatio;
        } else {
          height = 800;
          width = height * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw image to canvas
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Start with a lower quality to reduce size
      let quality = 0.7;
      let compressedBase64 = canvas.toDataURL("image/jpeg", quality);

      // Convert base64 size to bytes (approximate)
      const getBase64SizeInBytes = (base64String) => {
        const base64WithoutHeader = base64String.split(",")[1];
        return (base64WithoutHeader.length * 3) / 4;
      };

      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      // Progressively lower quality until under max size
      while (
        getBase64SizeInBytes(compressedBase64) > maxSizeBytes &&
        quality > 0.1
      ) {
        quality -= 0.1;
        compressedBase64 = canvas.toDataURL("image/jpeg", quality);
      }

      resolve(compressedBase64);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = base64Image;
  });
};

const page = () => {
  const [userSelfie, setUserSelfie] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [apiImages, setApiImages] = useState([]);
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    window.history.back();
  };

  const handleLogout = () => {
    // Clear all session storage
    sessionStorage.clear();
    // Redirect to home page
    window.location.href = "/";
  };

  useEffect(() => {
    setIsClient(true);

    // Retrieve the selfie image from sessionStorage
    const storedSelfie = sessionStorage.getItem("userSelfie");
    if (storedSelfie) {
      setUserSelfie(storedSelfie);
    }

    // Load saved form data if it exists
    const savedFullname = sessionStorage.getItem("editFullname");
    const savedPhone = sessionStorage.getItem("editPhone");
    if (savedFullname) setFullname(savedFullname);
    if (savedPhone) setPhone(savedPhone);
  }, []);


  // get profile function 
  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    console.log(id);

    const userDatafatching = async () => {
      const response = await Instance.get(`mobile/profile?id=${id}`);
      console.log(response.data);
      // Set the values from API response
      if (response.data) {
        setPhone(response.data.authenticationId || "");
        setFullname(response.data.fullName || "");
      }
    };
    userDatafatching();
  }, []);

  // Save form data before navigation
  const handleRetake = () => {
    sessionStorage.setItem("editFullname", fullname);
    sessionStorage.setItem("editPhone", phone);
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      setIsLoading(true);
      const id = sessionStorage.getItem("userId");
      const eventId = sessionStorage.getItem("eventId");

      // Validate required fields
      if (!id) {
        throw new Error("User ID is missing");
      }
      if (!fullname) {
        throw new Error("Full name is required");
      }
    

      const formData = new FormData();

      // Add all required data to formData
      formData.append("id", id);
      formData.append("fullName", fullname);

      // Get the profile image from session storage
      const profileImage = sessionStorage.getItem("profileUpdateImage");
      if (profileImage) {
        try {
          // Convert base64 to blob
          const base64Response = await fetch(profileImage);
          const blob = await base64Response.blob();
          formData.append("keyImage", blob, "profile.jpg");
        } catch (err) {
          console.error("Error processing profile image:", err);
          throw new Error("Failed to process profile image");
        }
      }

      // Log the form data for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await Instance.put(
        `/mobile/profile?id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile update response:", response.data);

      if (response.status !==400) {
        // Clear the profile image from session storage after successful update
        sessionStorage.removeItem("profileUpdateImage");
        // Update the user selfie in session storage
        sessionStorage.setItem("userSelfie", profileImage);
        // Update the local state
        setUserSelfie(profileImage);
        // Show success message
        alert("Profile updated successfully!");
      } else {
        throw new Error(response.data.message || "Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // More detailed error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile. Please try again.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-15 mb-[70px]">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full flex justify-between p-4">
          <ChevronLeft onClick={handleBack} />
          <LogOut onClick={handleLogout} className="cursor-pointer" />
        </div>
        <Banners
          profile={userSelfie || Profileimg}
          editIcon={<RotateCcw className="animate-spin" color="#525866" />}
          Banner={Banner}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-center text-[14px] font-[400]">
          {" "}
          Didn't like the photo?
          <Link href="/start" onClick={handleRetake}>
            {" "}
            <span className="text-[#375DFB] underline"> Retake</span>
          </Link>
        </p>
      </div>

      <div className="flex flex-col p-5">
        <div className="flex flex-col w-full gap-5">
          <div className="flex justify-center items-center">
            <h1 className="text-[16px] font-[400]">Edit your details</h1>
          </div>
          <div className="w-full">
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={Phone}
              className="text-black bg-transparent border-1 border-gray-300"
            />
          </div>
          <div>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              icon={User}
              className="text-black bg-transparent border-1 border-gray-300"
            />
          </div>
        </div>
        <Button
          type="button"
          className="w-full rounded-xl py-3 text-[16px] font-medium mt-2"
          onClick={handleProfileUpdate}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default page;
