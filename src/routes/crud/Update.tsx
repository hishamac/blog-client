import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/passwordInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { z } from "zod";

interface Input {
  name: string;
  viewName: string;
  type: string;
  options?: { name: string; value: string }[];
}

interface UpdateProps {
  formSchema: z.ZodObject<any, any>;
  updateItem: (id: string, data: any) => void;
  inputs: Input[];
  title: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  itemToUpdate: any;
  fileRefValue?: string;
}

export default function Update({
  formSchema,
  updateItem,
  inputs,
  title,
  open,
  setOpen,
  itemToUpdate,
  fileRefValue,
}: UpdateProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: itemToUpdate,
  });

  const fileRef = form.register(`${fileRefValue as string}`);

  useEffect(() => {
    if (itemToUpdate) {
      form.reset(itemToUpdate);
    }
  }, [itemToUpdate, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const id = itemToUpdate._id; // Get the ID
    updateItem(id, values); // Spread the array as arguments
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95vw] w-full max-h-[95vh] flex flex-col rounded-lg">
        <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full h-screen">
          <div className="w-full space-y-4">
            <Card>
              <div className="text-center mt-4 sm:mt-6 mb-2 sm:mb-4">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                  Update {title}
                </h1>
              </div>
              <CardContent className="space-y-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className=" max-h-[40vh] overflow-auto">
                      {inputs?.map((input) => (
                        <>
                          {input?.type === "text" ? (
                            <FormField
                              control={form.control}
                              name={`${input?.name}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{input?.viewName}</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={`Enter ${title} ${input?.viewName}`}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : input?.type === "textarea" ? (
                            <FormField
                              control={form.control}
                              name={`${input?.name}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{input?.viewName}</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder={`Enter ${title} ${input?.viewName}`}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : input.type === "file" ? (
                            <FormField
                              control={form.control}
                              name={`${input?.name}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{input?.viewName}</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={`Enter your ${input?.viewName}`}
                                      type="file"
                                      {...fileRef}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : input.type === "select" ? (
                            <FormField
                              control={form.control}
                              name={`${input?.name}`} // Make sure this corresponds to the field you're selecting
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{input?.viewName}</FormLabel>
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange} // Bind the value change to form control
                                      defaultValue={field.value} // Set the default value from form state
                                    >
                                      <SelectTrigger>
                                        <SelectValue
                                          placeholder={`Select your ${input?.viewName}`}
                                        />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {/* Assuming `input?.options` contains options */}
                                        {input?.options?.map(
                                          (option, index) => (
                                            <SelectItem
                                              key={index}
                                              value={option?.value as string}
                                            >
                                              {option?.name as string}
                                            </SelectItem>
                                          )
                                        )}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : input?.type === "checkbox" ? (
                            <FormField
                              control={form.control}
                              name={`${input?.name}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{input?.viewName}</FormLabel>
                                  <FormControl>
                                    <Switch
                                      checked={field.value} // Sync the switch's state with the form's field value
                                      onCheckedChange={(checked) => {
                                        field.onChange(checked); // Notify React Hook Form of the change
                                      }}
                                      id={input.name} // Ensure the id is the input name for accessibility
                                      className="mt-1 block" // Styling
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : input?.type === "rte" ? (
                            <>
                              <Label>{input?.viewName}</Label>
                              <ReactQuill
                                className="mt-2 h-48 mb-12"
                                theme="snow"
                                value={form.watch(input.name)}
                                onChange={(value) =>
                                  form.setValue(input.name, value)
                                }
                              />
                            </>
                          ) : input.type === "password" ? (
                            <FormField
                              control={form.control}
                              name={`${input?.name}`}
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex items-center justify-between">
                                    <FormLabel>Password</FormLabel>
                                  </div>
                                  <FormControl>
                                    <PasswordInput
                                      placeholder={`Enter your ${input?.viewName}`}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : null}
                        </>
                      ))}
                    </div>
                    <Button
                      className="w-full opacity-100 cursor-pointer"
                      type="submit"
                    >
                      Update
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter />
            </Card>
          </div>
        </main>
      </DialogContent>
    </Dialog>
  );
}
