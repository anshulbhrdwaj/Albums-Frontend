import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  RadioGroup,
  Radio,
  ModalFooter,
} from "@nextui-org/react";
import { LockIcon, PlusIcon } from "../assets/Icons";
import { Trash, UserComment } from "@vectopus/atlas-icons-react";
import { styles } from "../assets/style";
import {
  useCreateAlbum,
  useDeleteAlbum,
  useDeleteMedia,
} from "../hooks/useAlbums";

export default function Delete({ album, refetch, refetchAlbum, media = ""  }) {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteAlbum = useDeleteAlbum({ refetch });
  const deleteMedia = media ? useDeleteMedia({ refetch, refetchAlbum }) : null


  const onSubmit = () => {
    media
      ? deleteMedia?.mutate({ mediaId: media })
      : deleteAlbum.mutate({ albumId: album._id });
  };

  return (
    <>
      <div onClick={onOpen} className="w-full flex justify-center">
        <Trash size={22} className="text-red-800" />
      </div>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Are You Sure?
              </ModalHeader>
              <ModalBody>
                <p>
                  This action will remove{" "}
                  {media || String(album.albumName).replace(/_/g, " ")}
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className={`${styles["bg-gradient-tbr"]} `}
                  type="submit"
                  disabled={Object.keys(errors).length > 0}
                  onPress={handleSubmit(() => onClose())}
                >
                  Delete
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
