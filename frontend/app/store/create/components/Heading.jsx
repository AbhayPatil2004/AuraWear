import Image from "next/image";
// import StoreImg from '/mnt/data/1f20521b-ac37-423a-a495-c5cfce82303b.png'; // uploaded image

function OpenStoreHeading() {
    return (
        <section className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-800 to-black text-white px-6 sm:px-10 py-12">
            
            <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">

                {/* LEFT CONTENT */}
                <div className="max-w-xl">
                    <span className="inline-block mb-4 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold tracking-wide">
                        🎉 Grand Store Opening
                    </span>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                        Open Your Store on <span className="text-yellow-400">AURAStore</span>
                    </h1>

                    <p className="mt-5 text-white/80 text-lg sm:text-base">
                        Launch your branded online store, get verified by our admin team, 
                        and start selling to customers across India — all without technical setup.
                    </p>

                    {/* CTA Button */}
                    {/* <div className="mt-6 flex flex-wrap gap-4">
                        <button className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition">
                            Create Your Store
                        </button>
                        <button className="px-6 py-3 rounded-xl border border-white/40 text-white hover:bg-white/10 transition">
                            Learn More
                        </button>
                    </div> */}

                    {/* Highlights */}
                    <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/90">
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                            ⚡ <span>Setup in under 2 minutes</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                            🔒 <span>Admin verified stores</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                            💸 <span>Free to start selling</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative flex justify-center md:justify-end">
                    {/* Glow Circle */}
                    <div className="absolute -inset-6 rounded-full bg-white/10 blur-3xl" />

                    <div className="relative z-10 max-w-[320px] w-full">
                        {/* <Image
                            src={StoreImg}
                            alt="Store Preview"
                            className="rounded-2xl shadow-2xl"
                            priority
                        /> */}
                        <img src={'/torapril28.jpg'} alt="Store Preview"
                            className="rounded-2xl shadow-2xl">
                        </img>
                    </div>
                </div>
            </div>

            {/* Decorative background shapes */}
            <div className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-purple-800/30 blur-3xl z-0"></div>
            <div className="absolute bottom-0 right-1/2 w-[500px] h-[500px] translate-x-1/2 translate-y-1/4 rounded-full bg-indigo-900/30 blur-3xl z-0"></div>
        </section>
    );
}

export default OpenStoreHeading;
