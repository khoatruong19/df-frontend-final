import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

type Props = {};

const ResumeCard = (props: Props) => {
  return (
    <div className="relative w-full py-5 bg-black/5 cursor-pointer hover:bg-black/10 group">
      <div className="relative w-full h-[450px] ">
        <Image
          src={
            'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg'
          }
          alt=""
          fill
          objectFit="contain"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full hidden group-hover:grid place-items-center ">
        <Button size={'lg'} textSize={'xl'} className="shadow-md h-14">
          Use this template
        </Button>
      </div>
    </div>
  );
};

export default ResumeCard;
