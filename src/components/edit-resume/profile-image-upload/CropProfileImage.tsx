import React, { useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import getCroppedImg from '@/utils/cropImage';
import Cropper, { Area } from 'react-easy-crop';
import { Button } from '../../ui/button';
import { Slider } from '../../ui/slider';

type CropProfileImage = {
  photoURL: string;
  setOpenCrop: (value: boolean) => void;
  setPhotoURL: (value: string) => void;
  setFile: (value: File | Blob | null) => void;
  onCrop: ({ file, url }: { file: Blob; url: string }) => void;
};

const CropProfileImage = ({
  photoURL,
  setFile,
  setOpenCrop,
  setPhotoURL,
  onCrop,
}: CropProfileImage) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const cropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const croppedImg = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );

      if (!croppedImg) return;

      const { file, url } = croppedImg;
      setOpenCrop(false);
      setZoom(1);
      setRotation(0);
      onCrop({ file, url });
    } catch (error) {
      console.log(error);
    }
  };

  const cancleCropImage = () => {
    setFile(null);
    setOpenCrop(false);
    setPhotoURL('');
    setZoom(1);
    setRotation(0);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center mb-4">Crop Image</DialogTitle>
        <DialogDescription className="relative w-auto h-[400px]">
          <Cropper
            image={photoURL}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropChange={setCrop}
            onCropComplete={cropComplete}
          />
        </DialogDescription>
      </DialogHeader>
      <DialogDescription>
        <div className="flex flex-col gap-2">
          <h3>Zoom</h3>
          <Slider
            min={1}
            max={100}
            step={0.1}
            value={[zoom]}
            onValueChange={(e) => setZoom(e[0])}
          />
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <h3>Rotation</h3>
          <Slider
            min={0}
            max={360}
            step={0.1}
            value={[rotation]}
            onValueChange={(e) => setRotation(e[0])}
          />
        </div>
      </DialogDescription>
      <DialogFooter>
        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" onClick={cancleCropImage}>
            Cancel
          </Button>
          <Button onClick={cropImage}>Crop</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default CropProfileImage;
