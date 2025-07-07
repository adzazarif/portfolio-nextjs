import { Instagram, Linkedin, Github } from "lucide-react";

export default function HomeSection() {
  return (
    <section id="home">
      <div className="flex items-center relative gap-5 max-w-screen-2xl mx-auto pt-48 pb-40 px-5 md:px-24 justify-between bg-dark flex-col md:flex-row">
        <div className="w-[400px] h-[400px] rounded-full opacity-50 left-0 bottom-[-100px] z-10 absolute animate-bounce bg-gradient-biru"></div>

        <div className=" w-[400px] h-[400px] rounded-full opacity-50 absolute right-0 top-0 animate-bounce bg-gradient-ungu"></div>

        {/* Left Section */}
        <div className="z-30">
          <h1 className="text-[45px] text-white font-bold md:w-[500px]">
            Adza Zarif Nur Iskandar.
          </h1>
          <div className="w-12 my-10 h-[5px] bg-biru"></div>
          <div className="flex gap-5">
            <a
              target="_blank"
              href="https://www.instagram.com/adzazarifnur/"
              rel="noopener noreferrer"
            >
              <Instagram className="text-[35px] text-white hover:text-yellow hover:animate-bounce" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/adzazarif/"
              rel="noopener noreferrer"
            >
              <Linkedin className="text-[35px] text-white hover:text-yellow hover:animate-bounce" />
            </a>
            <a
              target="_blank"
              href="https://github.com/Adzazarif"
              rel="noopener noreferrer"
            >
              <Github className="text-[35px] text-white hover:text-yellow hover:animate-bounce" />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-white z-30">
          <p className="text-[22px]">- Introduction</p>
          <p className="text-[28px] font-bold md:w-[500px] mt-5">
            Software Developer, IoT Engineer, AI Engineer.
          </p>
          <p className="text-[17px] md:w-[500px] mt-3">
            Mampu membuat aplikasi untuk kebutuhan dan fungsionalitas pengguna
            untuk meningkatkan produktivitas.
          </p>
          <a
            className="py-3 text-[17px] mt-3 inline-block hover:bg-yellow hover:text-dark hover:px-4 rounded duration-300 text-yellow"
            href="#about"
          >
            Lebih lengkap -&gt;
          </a>
        </div>
      </div>
    </section>
  );
}
