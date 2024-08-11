"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import { IconZoomCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
type Props = {};

const VerifySection = (props: Props) => {
  const router = useRouter();

  const [searchVal, setSearchVal] = useState("");

  const onSumbitSearch = () => {
    if (searchVal.length <= 0) {
      alert(`Search value can't be empty`);
    } else {
      router.push(`/profile/${searchVal}`);
    }
  };

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <div className="md:items-center flex flex-col ">
      <div className="font-medium 2xl:w-1/3 md:w-2/3 xl:w-1/2 lg:px-0 px-8t ext-4xl xl:text-6xl flex flex-col items-center space-x-2 justify-center xl:pt-14 text-center pt-6">
        <span>Verify</span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSumbitSearch)}
          className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="border-2 border-black p-5"
                    placeholder="Enter username eg: clodron"
                    onChange={(e) => setSearchVal(e.target.value)}
                    value={searchVal}
                  />
                </FormControl>
                <Button
                  className="py-1 "
                  onClick={() => {
                    onSumbitSearch();
                  }}>
                  <div className="flex items-center justify-center">
                    <div className="text-lg">Verify</div>
                    <div>
                      <IconZoomCheck className="ml-2" height={20} width={20} />
                    </div>
                  </div>
                </Button>

                <FormDescription>
                  You can find the users in that area.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default VerifySection;
