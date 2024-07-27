"use client";

import { Box, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";

type Inputs = {
  example?: string,
  exampleRequired?: string,
  postPhoto?: null | string,
  caption?: string,
  tag?: string,
}

interface PostType {
  creatorId: string | undefined,
  caption: string | undefined,
  tag: string | undefined,
  postPhoto: null | undefined,
}

const Posting = ({ post, apiEndpoint }: { post: PostType, apiEndpoint: string, }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: post,

  });

  const router = useRouter();

  const handlePublish = async (data: any) => {
    try {
      const postForm = new FormData();

      postForm.append("creatorId", data?.creatorId);
      postForm.append("caption", data?.caption);
      postForm.append("tag", data?.tag);

      if (typeof data?.postPhoto !== "string") {
        postForm.append("postPhoto", data?.postPhoto[0]);
      } else {
        postForm.append("postPhoto", data?.postPhoto);
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: postForm,
      });

      if (response.ok) {
        router.push(`/profile/${data?.creatorId}/posts`)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="flex flex-col gap-7 p-16 w-auto"
      onSubmit={handleSubmit(handlePublish)}
    >
      <label
        htmlFor="photo"
        className="flex gap-4 items-center text-light-1 cursor-pointer"
      >
        {watch("postPhoto") ? (
          typeof watch("postPhoto") === "string" ? (
            <Image
              src={watch("postPhoto") as string}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          ) : (
            <Image
              src={URL.createObjectURL(watch("postPhoto")[0])}
              alt="post"
              width={250}
              height={200}
              className="object-cover rounded-lg"
            />
          )
        ) : (
          <MdAddPhotoAlternate
            size={27}
          />
        )}
        <p>Upload a photo</p>
      </label>
      <input
        {...register("postPhoto", {
          validate: (value) => {
            if (
              value === null ||
              (Array.isArray(value) && value?.length === 0) ||
              value === undefined
            ) {
              return "A photo is required!";
            }
            return true;
          },
        })}
        id="photo"
        type="file"
        style={{ display: "none" }}
      />
      {errors.postPhoto && (
        <p className="text-red-500">{errors?.postPhoto?.message}</p>
      )}
      <Box>
        <label htmlFor="caption" className="text-light-1">
          Caption
        </label>
        <textarea
          {...register("caption", {
            required: "Caption is required",
            validate: (value: any) => {
              if (value?.length < 3) {
                return "Caption must be more than 2 characters";
              }
            },
          })}
          rows={3}
          placeholder="What's on your mind?"
          className="w-full input "
          id="caption"
        />

        {errors.caption && (
          <p className="text-red-500">{errors?.caption?.message}</p>
        )}
      </Box>

      <Box>
        <label htmlFor="tag" className="text-light-1">
          Tag
        </label>
        <input
          {...register("tag", { required: "Tag is required" })}
          type="text"
          name="tag"
          placeholder="#tag"
          className="w-full input"
        />

        {errors.tag && <p className="text-red-500">{errors?.tag?.message}</p>}
      </Box>

      <Button type="submit" sx={{
        backgroundColor: '#1D9BF0',
        borderColor: '#D9D9D9',
        color: '#020406',
        "&:hover": { borderColor: '#2F3336', borderWidth: '1px', color: '#D9D9D9' }
      }} size="medium" variant="outlined"
      >
        Publish
      </Button>
    </form>
  );
};

export default Posting;