import { ProfileImage } from '@/utils/types';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import CropProfileImage from './CropProfileImage';
import { Trash } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

type ProfileImageUploadProps = {
  profileImage?: ProfileImage;
  resumeId: Id<'resume'>;
};

const ProfileImageUpload = ({
  resumeId,
  profileImage,
}: ProfileImageUploadProps) => {
  const [file, setFile] = useState<File | Blob | null>(null);
  const [photoURL, setPhotoURL] = useState(profileImage?.url ?? '');
  const [openCrop, setOpenCrop] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const generateUploadImageUrl = useMutation(api.upload.generateUploadImageUrl);
  const updateResumeProfileImage = useMutation(
    api.resume.updateResumeProfileImage
  );
  const deleteResumeProfileImage = useMutation(
    api.resume.deleteResumeProfileImage
  );

  const deleteImage = () => {
    deleteResumeProfileImage({ resumeId });
    setPhotoURL('');
  };

  const openChooseFile = () => {
    fileInputRef.current?.click();
  };

  const onChangFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return;
    setFile(file);
    setPhotoURL(URL.createObjectURL(file));
    setOpenCrop(true);
  };

  const onCrop = async ({ file, url }: { file: Blob; url: string }) => {
    if (!url) return;
    setPhotoURL(url);
    const response = await fetch(url);
    const imageBlob = await response.blob();

    const postUrl = await generateUploadImageUrl();

    if (!postUrl) return;

    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': imageBlob.type },
      body: imageBlob,
    });

    const { storageId } = await result.json();

    if (!storageId) return;

    await updateResumeProfileImage({ resumeId, storageId });
  };

  return (
    <div className="flex items-center mt-2">
      <Image
        src={
          !!photoURL
            ? photoURL
            : 'https:www.politihogskolen.no/globalassets/etter-og-videreutdanning/ansattprofiler/politihogskolen-dummy-profilbilde.jpg'
        }
        alt=""
        width={64}
        height={64}
        className="object-cover rounded-md"
      />

      <Button
        onClick={openChooseFile}
        variant={'outline'}
        className="border-2 ml-4"
      >
        Upload
      </Button>
      {profileImage && (
        <Trash
          onClick={deleteImage}
          className="text-red-400 cursor-pointer hover:opacity-50 ml-3"
        />
      )}
      <input
        onChange={onChangFile}
        ref={fileInputRef}
        type="file"
        hidden
        alt=""
        accept=".png, .jpg, .jpeg"
      />

      <Dialog open={openCrop} onOpenChange={(value) => setOpenCrop(value)}>
        <CropProfileImage
          photoURL={photoURL}
          setFile={setFile}
          setOpenCrop={setOpenCrop}
          setPhotoURL={setPhotoURL}
          onCrop={onCrop}
        />
      </Dialog>
    </div>
  );
};

export default ProfileImageUpload;
