import { Button } from "@/components/ui/button";

const VolunteerSection = () => {
    return (
        <section className="bg-[#F9F4E8] ">
            <div className="max-w-[1366px] mx-auto py-16 px-4 md:px-8 lg:px-16 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <div className="space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Volunteer with us
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                            Our Roadians are our family of incredible volunteers, the back-bone
                            of our organisation. They constantly inspire us and continue to leave
                            us all in awe every single day.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            {/* Filled primary button */}
                            <Button
                                className="bg-[#f25f4a] hover:bg-[#f25f4a]/90 text-white px-6 py-3 rounded-full text-sm font-medium shadow-sm"
                            >
                                Alumni registration
                            </Button>

                            {/* Outline buttons */}
                            <Button
                                variant="outline"
                                className="border-none text-gray-800 bg-white hover:bg-gray-100 px-6 py-3 rounded-full text-sm font-medium"
                            >
                                Register as Volunteer
                            </Button>
                            <Button
                                variant="outline"
                                className="border-none text-gray-800 bg-white hover:bg-gray-100 px-6 py-3 rounded-full text-sm font-medium"
                            >
                                Careers
                            </Button>
                        </div>

                    </div>

                    {/* Right image */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src="/home/voluteer.svg"
                                alt="Volunteers working together"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VolunteerSection;
