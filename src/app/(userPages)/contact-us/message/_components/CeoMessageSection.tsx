export default function CeoMessageSection() {
    return (
        <section>
            <div className="max-w-[1366px] mx-auto px-4 md:px-8 lg:px-16 py-16 lg:py-20">
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 h-full">
                    {/* Left card - Text content */}
                    <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 flex flex-col justify-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                A Message from Our CEO – Ali Olad
                            </h2>

                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    With over 15 years of experience in the plumbing industry, John Doe founded Community Plumbing
                                    Services with a clear mission to provide reliable, high-quality plumbing solutions with a
                                    customer-first approach.
                                </p>

                                <p>
                                    Starting as a hands-on plumber, John saw the need for honest, affordable, and expert plumbing services
                                    in the community. Today, Community Plumbing Services stands as a trusted name, built on integrity,
                                    professionalism, and a commitment to excellence.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right card - CEO image with background */}
                    <div className="relative rounded-2xl overflow-hidden shadow-sm min-h-[400px] md:min-h-[500px]">
                        {/* Background image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('/ali-olad.png')",
                                backgroundSize: "110%", // zoom out slightly
                                backgroundPosition: "center 20%", // shift image downward
                              }}
                        />

                        {/* Bottom linear gradient for text overlay */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-32"
                            style={{
                                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 40.2%, #F25F4A 116.69%)',
                            }}
                        />


                        {/* Name and title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="text-white">
                                <h3 className="text-2xl font-bold mb-1">Ali Olad</h3>
                                <p className="text-base opacity-95">CEO & Founder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
