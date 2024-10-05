import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import Create from "../crud/Create";
import { useLanguageStore } from "@/store/languageStore";
import { useEffect } from "react";
import Update from "../crud/Update";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EyeIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Posts from "../Posts";
import Delete from "../crud/Delete";

export default function Language() {
  const {
    languages,
    createLanguage,
    getLanguages,
    updateLanguage,
    deleteLanguage,
    isCreateOpen,
    setIsCreateOpen,
    isViewOpen,
    setIsViewOpen,
    isUpdateOpen,
    setIsUpdateOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    errorMessage,
    setToView,
    toUpdate,
    setToUpdate,
    toDelete,
    setToDelete,
    isNull,
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
      {languages.length === 0 && errorMessage === "" && isNull === false && (
        <div className="container mx-auto px-4 py-8">
          <div className="p-2 w-full flex justify-end">
            <Skeleton className="h-10 w-28" />
          </div>
          <div className="grid gap-4">
            {[...Array(4)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {isNull && (
        <div className="text-center text-muted-foreground font-semibold py-4">
          No Posts Found
        </div>
      )}

      {errorMessage && <div>{errorMessage}</div>}

      {languages.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="p-2 w-full flex justify-end">
            <Button onClick={() => setIsCreateOpen(true)}>
              Create Post Type
            </Button>
          </div>
          <div className="grid gap-4">
            {languages?.map((language) => (
              <Card key={language._id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{language.name}</h2>
                    <p className="text-sm">
                      Posts Count: {language.posts?.length} | Date:{" "}
                      {formatDate(language.createdAt)}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setIsViewOpen(true);
                          setToView(language);
                        }}
                      >
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsUpdateOpen(true);
                          setToUpdate(language);
                        }}
                      >
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsDeleteOpen(true);
                          setToDelete(language);
                        }}
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      <Create
        formSchema={createFormSchema}
        createItem={createLanguage}
        inputs={createInputs}
        title="Post Type"
        open={isCreateOpen}
        setOpen={setIsCreateOpen}
        fileRefValue="imageUrl"
      />
      <Update
        formSchema={updateFormSchema}
        updateItem={updateLanguage}
        inputs={updateInputs}
        title="Post Type"
        open={isUpdateOpen}
        setOpen={setIsUpdateOpen}
        itemToUpdate={toUpdate}
        fileRefValue="imageUrl"
      />
      <>
        {isViewOpen && (
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-[95vw] w-full max-h-[95vh]  flex flex-col rounded-lg overflow-auto">
              <Posts />
            </DialogContent>
          </Dialog>
        )}
      </>
      <Delete
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        itemToDelete={toDelete}
        title="Post"
        deleteItem={deleteLanguage}
      />
    </>
  );
}
