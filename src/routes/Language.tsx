import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { z } from "zod";
import Create from "./crud/Create";
import { useLanguageStore } from "@/store/languageStore";
import { useEffect } from "react";
import Update from "./crud/Update";

export default function Language() {
  const {
    languages,
    setLanguages,
    createLanguage,
    getLanguages,
    getLanguage,
    updateLanguage,
    deleteLanguage,
    language,
    setLanguage,
    isCreateOpen,
    setIsCreateOpen,
    isUpdateOpen,
    setIsUpdateOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    errorMessage,
    toUpdate,
    setToUpdate,
    toDelete,
    setToDelete,
  } = useLanguageStore();

  useEffect(() => {
    if (languages.length === 0) {
      getLanguages();
    }
  }, []);

  const createFormSchema = z.object({
    name: z.string().min(5, {
      message: "Name must be at least 5 characters.",
    }),
    direction: z.string().min(1, {
      message: "Direction is required",
    }),
  });

  const createInputs = [
    {
      name: "name",
      viewName: "Name",
      type: "text",
    },
    {
      name: "direction",
      viewName: "Direction",
      type: "select",
      options: [
        {
          name: "LTR",
          value: "ltr",
        },
        {
          name: "RTL",
          value: "rtl",
        },
      ],
    },
  ];

  const updateFormSchema = createFormSchema;

  const updateInputs = [
    {
      name: "name",
      viewName: "Name",
      type: "text",
      value: toUpdate?.name,
    },
    {
      name: "direction",
      viewName: "Direction",
      type: "select",
      options: [
        {
          name: "LTR",
          value: "ltr",
        },
        {
          name: "RTL",
          value: "rtl",
        },
      ],
      value: toUpdate?.direction,
    },
  ];

  return (
    <>
      <button onClick={() => setIsCreateOpen(true)}>Create</button>
      <div className="grid grid-cols-3 gap-4">
        {languages?.map((lang) => (
          <Card key={lang?._id}>
            <CardContent>
              <div className="flex justify-between">
                <div>{lang?.name}</div>
                <div>{lang?.direction}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  setToUpdate(lang);
                  console.log(lang);
                  console.log(toUpdate);
                  setIsUpdateOpen(true);
                }}
              >
                Edit
              </Button>
              <Button onClick={() => deleteLanguage(lang?._id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Create
        formSchema={createFormSchema}
        createItem={createLanguage}
        inputs={createInputs}
        title="Language"
        open={isCreateOpen}
        setOpen={setIsCreateOpen}
      />
      <Update
        formSchema={updateFormSchema}
        updateItem={updateLanguage as any}
        inputs={updateInputs}
        title="Language"
        open={isUpdateOpen}
        setOpen={setIsUpdateOpen}
        itemToUpdate={toUpdate}
      />
    </>
  );
}
