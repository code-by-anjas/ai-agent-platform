"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FIELD_NAMES,
  FIELD_PLACHOLDERS,
  FILED_TYPES,
} from "@/constants/form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";
import { ZodType } from "zod";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (
    data: T
  ) => Promise<{ success: boolean; error?: string; message: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

export const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast.success("Success", {
        description: result.message,
      });

      router.push("/");
    } else {
      toast.error(`Error ${isSignIn ? "signin in" : "signin Up"}`, {
        description: result.error,
      });
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden'>
        <CardTitle className='font-poppins px-6'>
          <h1 className='text-2xl font-semibold'>
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          <p className='font-normal text-sm text-gray-500'>
            {isSignIn
              ? "Access the your best AI Agent Platform"
              : "Please complate all fields  to gain access to the plaform"}
          </p>
        </CardTitle>

        <CardContent>
          <Form {...form}>
            <form
              className='w-full flex flex-col gap-y-4'
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {Object.keys(defaultValues).map((field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as Path<T>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='capitalize'>
                        {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                      </FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder={
                            FIELD_PLACHOLDERS[
                              field.name as keyof typeof FIELD_NAMES
                            ]
                          }
                          type={
                            FILED_TYPES[field.name as keyof typeof FILED_TYPES]
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type='submit'
                className='form-btn'
                disabled={form.formState.isSubmitting}
              >
                {isSignIn ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
