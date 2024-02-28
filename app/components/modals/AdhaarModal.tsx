"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useAadhaarModal from "@/app/hooks/useAadhaarModal";
import { useRouter } from "next/navigation";
import Button from "../Button";
import axios from "axios";
import toast from "react-hot-toast";

const AdhaarModal = () => {
  console.log("called");
  
  const [isLoading, setIsLoading] = useState(false);
  const aadhaarModal = useAadhaarModal();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      aadhaar: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (res) => {
    try {
      setIsLoading(true);
      const { data } = await axios.patch("/api/addaadhaar");
      if (data) {
        toast.success("Aadhaar added successfully");
      } else {
        toast.error("unable to add Aadhaar number");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="aadhaar"
        label="Aadhaar Number"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        pattern="^\d{12}$
"
      />
    </div>
  );
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="submit" onClick={() => {}} />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={aadhaarModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={aadhaarModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default AdhaarModal;
