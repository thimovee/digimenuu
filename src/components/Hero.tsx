import Image from "next/image";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";
import { Info } from "lucide-react";
import heroimage from "@public/heroimage.jpg";
export default function Hero() {
  return (
    <section className="mt-24 w-full min-h-[59vh]">
      <div className="w-3/4 mx-auto flex justify-between">
        <div className="max-w-[600px]">
          <Heading size="sm">Upgrade jouw digitale communicatie met onze Digital Signage thema&apos;s, afbeeldingen en video&apos;s.</Heading>
          <Paragraph className="mt-6">Ontdek tientallen eenvoudig aanpasbare Digital Signage thema&apos;s, templates en CMS producten. Upgrade jouw digitale communicatie vandaag nog en maak indruk op je klanten met onze hoogwaardige Digital Signage producten.</Paragraph>
          <div className="mt-20 flex gap-6">
            <button className=" border-2 border-[#292929] text-slate-700 font-semibold px-6 py-3 rounded-lg min-w-[250px] flex gap-2">Makkelijk aanpasbaar <Info className="my-auto" size={14} /></button>
            <button className=" bg-[#292929] font-semibold px-6 py-3 rounded-lg text-white min-w-[250px]">Bekijk producten</button>
          </div>
        </div>
        <div>
          <Image className="rounded-tl-[13rem] rounded-br-[13rem]" src={heroimage} width={600} height={400} alt={"Hero image"} />
        </div>
      </div>
    </section>
  );
}