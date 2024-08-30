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
} from "@nextui-org/react";
import { LockIcon, PlusIcon } from "../assets/Icons";
import { Eye, PencilEdit, UserComment } from "@vectopus/atlas-icons-react";
import { styles } from "../assets/style";
import { useCreateAlbum } from "../hooks/useAlbums";
import Medias from "../screens/Medias";

export default function ViewAlbum({ album, refetch }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div onClick={onOpen} className="w-full flex justify-center">
        <Eye size={26} className="text-green-700" />
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        size="full"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {String(album.albumName).replace(/_/g, " ")}
          </ModalHeader>
          <ModalBody className="overflow-y-scroll">
            <Medias media={album.media} refetchAlbum={refetch} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
