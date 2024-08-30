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
import { UserComment } from "@vectopus/atlas-icons-react";
import { styles } from "../assets/style";
import { useCreateAlbum } from "../hooks/useAlbums";

export default function NewAlbum({ refetch }) {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const addAlbum = useCreateAlbum({ refetch });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("albumName", data.albumName);
    formData.append("category", data.category);
    formData.append("status", data.status);

    data?.media?.forEach((file) => {
      formData.append("media", file);
    });

    addAlbum.mutate(formData);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className={`${styles["bg-gradient-tbr"]} w-full`}
        endContent={<PlusIcon />}
      >
        Add New
      </Button>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Add New Album
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  {...register("albumName", { required: true })}
                  endContent={
                    <UserComment
                      size={22}
                      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                    />
                  }
                  label="Name"
                  placeholder="Enter album name"
                  variant="bordered"
                />
                {errors.albumName && (
                  <p className="text-red-500 pl-1">Album name is required!</p>
                )}
                <Input
                  {...register("category", { required: true })}
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Category"
                  placeholder="Enter it's category"
                  variant="bordered"
                />
                {errors.category && (
                  <p className="text-red-500 pl-1">
                    Album category is required!
                  </p>
                )}
                {/* <Input
                  {...register("link", { required: true })}
                  endContent={
                    <span class="material-symbols-rounded text-gray-400">link</span>
                  }
                  label="Link"
                  placeholder="Enter it's drive link"
                  variant="bordered"
                />
                {errors.link && (
                  <p className="text-red-500 pl-1">Album Link is required!</p>
                )} */}
                <Input
                  variant="underlined"
                  type="file"
                  multiple
                  className="mt-1"
                  onChange={(e) =>
                    setValue("media", [...e.target.files])
                  }
                />
                {errors.media && (
                  <p className="text-red-500 pl-1">Media files required!</p>
                )}
                {/* <div className="flex py-2 px-1 justify-center">
                  <Controller
                    name="status"
                    control={control}
                    defaultValue="leaks"
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        label="Select the intensity"
                        orientation="horizontal"
                        color="secondary"
                        className="w-full flex justify-center"
                      >
                        <Radio value="sweet">Sweet</Radio>
                        <Radio value="leaks">Leaks</Radio>
                        <Radio value="intense">Intense</Radio>
                      </RadioGroup>
                    )}
                  />
                </div> */}
                <Button
                  className={`${styles["bg-gradient-tbr"]} my-4`}
                  type="submit"
                  disabled={Object.keys(errors).length > 0}
                  onPress={handleSubmit(() => onClose())}
                >
                  Add
                </Button>
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
