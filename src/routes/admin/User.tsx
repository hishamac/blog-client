import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MoreVerticalIcon, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { formatDate } from "@/utils/formatDate";
import { z } from "zod";
import { usePostTypeStore } from "@/store/postTypeStore";
import Create from "../crud/Create";
import Update from "../crud/Update";
// import UserDetail from "../UserDetail";
import Delete from "../crud/Delete";
import { Skeleton } from "@/components/ui/skeleton";
import Register from "../Register";
import UserRegister from "../UserRegister";

export default function User() {
  const {
    users,
    getUsers,
    updateUser,
    deleteUser,
    isViewOpen,
    setIsViewOpen,
    isCreateOpen,
    setIsCreateOpen,
    isUpdateOpen,
    setIsUpdateOpen,
    toView,
    setToView,
    toUpdate,
    setToUpdate,
    toDelete,
    setToDelete,
    isDeleteOpen,
    setIsDeleteOpen,
    errorMessage,
    isNull,
  } = useUserStore();

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, []);

  const inputs = [
    { name: "name", viewName: "Name", type: "text" },
    { name: "profilePicture", viewName: "Profile Picture", type: "file" },
    { name: "email", viewName: "Email", type: "text" },
    { name: "password", viewName: "Password", type: "password" },
  ];

  const updateFormSchema = z.object({
    name: z
      .string()
      .min(5, {
        message: "Name must be at least 5 characters.",
      })
      .optional(),
    email: z.string().email("Email must be Valid").optional(),
    password: z
      .string()
      .min(5, "Password must be at least 5 characters long")
      .optional(),
    profilePicture: z.instanceof(FileList).optional(),
  });

  return (
    <>
      {users.length === 0 && errorMessage === "" && isNull === false && (
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
          No Users Found
        </div>
      )}

      {errorMessage && <div>{errorMessage}</div>}

      {users.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="p-2 w-full flex justify-end">
            <Button onClick={() => setIsCreateOpen(true)}>Create User</Button>
          </div>
          <div className="grid gap-4">
            {users?.map((user) => (
              <Card key={user._id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Posts Count: {user.posts?.length} | Date:{" "}
                      {formatDate(user.createdAt)}
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
                          setToView(user);
                        }}
                      >
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsUpdateOpen(true);
                          setToUpdate(user);
                        }}
                      >
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setIsDeleteOpen(true);
                          setToDelete(user);
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
      <>
        {isCreateOpen && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogContent className="max-w-[95vw] w-full max-h-[95vh]  flex flex-col rounded-lg overflow-auto">
              <UserRegister />
            </DialogContent>
          </Dialog>
        )}
      </>
      <Update
        formSchema={updateFormSchema}
        updateItem={updateUser}
        inputs={inputs}
        title="User"
        open={isUpdateOpen}
        setOpen={setIsUpdateOpen}
        itemToUpdate={{
          _id: toUpdate?._id,
          name: toUpdate?.name,
          email: toUpdate?.email,
          profilePicture: toUpdate?.profilePicture,
        }}
        fileRefValue="profilePicture"
      />
      <>
        {isViewOpen && (
          <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
            <DialogContent className="max-w-[95vw] w-full max-h-[95vh]  flex flex-col rounded-lg overflow-auto">
              {/* <UserDetail id={toView?._id as string} /> */}
              user
            </DialogContent>
          </Dialog>
        )}
      </>
      <Delete
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        itemToDelete={toDelete}
        title="User"
        deleteItem={deleteUser}
      />
    </>
  );
}
