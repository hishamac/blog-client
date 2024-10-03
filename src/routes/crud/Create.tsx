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
import { useForm, UseFormRegisterReturn, UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface Input {
  name: string;
  viewName: string;
  type: string;
  options?: { name: string; value: string }[]; // Allow array of options, not fixed-length tuple
}

interface CreateProps {
  formSchema: z.ZodObject<any, any>;
  createItem: any;
  inputs: Input[];
  fileRefValue?: string;
  title: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function Create({
  formSchema,
  createItem,
  inputs,
  title,
  fileRefValue,
  open,
  setOpen,
}: CreateProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register(`${fileRefValue as string}`);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createItem(values);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] w-full max-h-[95vh]  flex flex-col rounded-lg">
          <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 w-full h-screen">
            <div className="w-full  space-y-4">
              <Card className="">
                <div className="text-center mt-4 sm:mt-6 mb-2 sm:mb-4">
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                    Create {`${title}`}
                  </h1>
                </div>
                <CardContent className="space-y-4">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className=" h-[40vh] overflow-auto">
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
                            ) : null}
                          </>
                        ))}
                      </div>
                      <Button
                        className={`
                  w-full opacity-100 cursor-pointer            
                `}
                        type="submit"
                      >
                        Submit
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
    </>
  );
}
