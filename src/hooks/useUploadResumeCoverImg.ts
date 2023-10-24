import { exportAsImage } from '@/lib/html2canvas';
import { useAction, useMutation } from 'convex/react';
import { useEffect } from 'react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

const useUploadResumeCoverImg = ({ resumeId }: { resumeId: Id<'resume'> }) => {
  const updateResumeCoverImage = useAction(api.resume.updateResumeCoverImage);
  const generateUploadImageUrl = useMutation(api.upload.generateUploadImageUrl);

  const updateResumeCoverImageHandler = async () => {
    const imageUrl = await exportAsImage();
    if (!imageUrl || !resumeId) return;

    const response = await fetch(imageUrl);
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

    await updateResumeCoverImage({ resumeId, storageId });
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await updateResumeCoverImageHandler();
    }, 1000 * 60 * 5);
    return () => clearInterval(interval);
  }, []);
};

export default useUploadResumeCoverImg;
