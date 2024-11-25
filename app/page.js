import Image from "next/image";
import Link from 'next/link';
import navigation from '@/lib/navigation.json';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 pb-0 max-w-5xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-full md:w-80 h-96 md:h-max relative rounded-xl overflow-hidden">
          <Image
            src="/images/tyson-ely-shaun.jpg"
            alt="Tyson Ely"
            width="783"
            height="1200"
            className="-mt-[5%] md:mt-0"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl text-gray-200 font-bold mb-2">Tyson Ely</h1>
          <h2 className="text-2xl text-gray-400 mb-4">Filmmaker, Actor, Musician, Artist</h2>
          <div className="space-y-4 text-lg text-slate-300">
            <p>
              I’ve always been passionate about expressing myself through art, music, photography, and film. As a kid, I spent hours using a VHS camcorder, a VCR, and a tape deck to edit together my own shorts, igniting a lifelong love for filmmaking.
            </p>
            <p>
              My approach blends both the technical and the creative. I’m skilled at the detailed, behind-the-scenes work of planning, editing and producing. At the same time, my artistic side fuels my storytelling and vision, giving me a balanced perspective that I believe enhances every project I work on.
            </p>
            <p>
              I’m drawn to big ideas and bold concepts, particularly those that are out of the ordinary and out of this world. Sci-fi with a bit of a horror twist is my favorite genre - I love exploring stories that push the boundaries of imagination. Through my films I aim to entertain, and if I’m lucky, inspire others to think beyond the everyday.
            </p>
            <p>
              I’ve always been passionate about expressing myself through art, music, photography, and film. As a kid, I spent hours using a VHS camcorder, a VCR, and a tape deck to edit together my own shorts, igniting a lifelong love for filmmaking.
            </p>
            <p>
              My approach blends both the technical and the creative. I’m skilled at the detailed, behind-the-scenes work of planning, editing and producing. At the same time, my artistic side fuels my storytelling and vision, giving me a balanced perspective that I believe enhances every project I work on.
            </p>
            <p>
              I’m drawn to big ideas and bold concepts, particularly those that are out of the ordinary and out of this world. Sci-fi with a bit of a horror twist is my favorite genre - I love exploring stories that push the boundaries of imagination. Through my films I aim to entertain, and if I’m lucky, inspire others to think beyond the everyday.
            </p>
          </div>
        </div>
      </div>




      
    </div>
  );
}
