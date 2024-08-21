import Link from "next/link";

function Home() {
  return (
    <>
      <section
        id="home"
        className="relative z-10 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] xl:pt-[210px] 2xl:pb-[200px]"
      >
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl leading-tight text-black sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  AI Note Assistant
                </h1>
                <p className="mb-12 text-base text-black sm:text-lg md:text-xl">
                  Transcribe note from speech and chat with it using powerful AI
                  models. Ask to summarize, answer questions, and much more.
                </p>
                <Link
                  href="https://github.com/farhan-hasib/amanuensis"
                  className="ease-in-up rounded-full bg-black px-8 py-3 text-base font-medium text-white shadow-btn transition duration-300 hover:bg-primary hover:bg-opacity-100 hover:shadow-btn-hover"
                >
                  Github
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
