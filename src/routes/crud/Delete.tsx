import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CircleX, Trash } from "lucide-react";

interface DeleteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  itemToDelete: any;
  title: string;
  deleteItem: (id: string) => void;
}

export default function Delete({
  open,
  setOpen,
  itemToDelete,
  deleteItem,
  title,
}: DeleteProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[60vw] w-full max-h-[20vh]  flex flex-col rounded-lg">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-11/12 lg:w-full rounded-lg">
            <DialogHeader>
              <DialogTitle>Delete {title}</DialogTitle>
            </DialogHeader>
            {itemToDelete && (
              <>
                <Label className="text-md mb-4">
                  Are you sure you want to delete {itemToDelete?.name}?
                </Label>
                <DialogFooter className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setOpen(false)}
                  >
                    <CircleX className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className={`flex items-center gap-2`}
                    onClick={() => {
                      deleteItem(itemToDelete._id);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
