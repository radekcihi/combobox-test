"use client"
import { SubmitHandler, useForm } from "react-hook-form"
import Input from "./components/Input";
import Button from "./components/Button";
import { useState } from "react";
import { motion } from "framer-motion";
import ComboBox from "./components/ComboBox";
import Spinner from "./components/Spinner";
export type Inputs = {
  name: string;
  university: string;
};

export default function Home() {
  const [showInput, setShowInput] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    setIsLoading(true)
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
      alert(`Jméno: ${data.name}, Univerzita: ${data.university ? data.university : "nevyplněno"}`)
    }, 1500)

  }

  return (
    <main className="flex flex-col items-center mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  items-center justify-center font-mono gap-4 w-1/2">
        <Input id="name" placeholder="Křestní jméno" label="Vaše křestní jméno" error={errors.name}  {...register("name", {
          required: {
            message: "Toto pole je povinné",
            value: true
          }, minLength: {
            message: "Minimální délka je 3 znaky",
            value: 3
          },
        })} />


        {!showInput ? <Input id="toggle" checked={showInput} type="checkbox" className="focus:ring-0" label="Máte Vysokoškoslké vzdělání?" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowInput(e.target.checked)} />
          :
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .2 }}
          >

            <ComboBox placeholder={"Název univerzity"} id="university" label="Zadejte název univerzity" error={errors.university} handleChange={(value) => setValue("university", value)} />

          </motion.div>}

        <Button disabled={isLoading} type="submit"
        >
          {isLoading ? <Spinner className="m-2" /> : null} Submit</Button>

        {success ? <div className="text-green-500">Formulář byl úspěšně odeslán, děkujeme!</div> : null}

      </form>
    </main >
  );
}
