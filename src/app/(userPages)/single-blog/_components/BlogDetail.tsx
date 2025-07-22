import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Send } from "lucide-react"

export default function BlogDetailsSection() {
    return (
        <section className="w-full  overflow-hidden">
            <div className="max-w-[1366px] mx-auto py-4 px-4 md:px-8 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 overflow-hidden">
                    {/* Left Column - Introduction */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
                            <p className="text-gray-500 leading-relaxed mb-4">
                                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget
                                vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate
                                arcu amet, vitae nisl, tellus tincidunt. At feugiat sapien varius id.
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed
                                auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant odio at. Suscipit tristique risus
                                at donec. In turpis vel et quam imperdiet ipsum molestie aliquet sodales orci eu volutpat.
                            </p>
                        </div>

                        {/* Business Meeting Image */}
                        <div className="relative">
                            <Image
                                src="/blogs/blog-detail-01.svg"
                                alt="Business professionals reviewing documents in office meeting"
                                width={400}
                                height={300}
                                className="rounded-lg object-cover w-full h-auto max-w-full"
                            />
                            <p className="text-xs text-gray-400 mt-2">© Image courtesy of Moose Photos via Pexels</p>
                            <p className="text-gray-500 leading-relaxed">
                                Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.
                            </p>
                            <div className="max-w-xl border-l-2  border-black pl-6 my-8">
                                <p className="italic text-gray-800 font-semibold">
                                    “<span className="italic">
                                        In a world older and more complete than ours they move finished and
                                        complete, gifted with extensions of the senses we have lost or never
                                        attained, <span className="italic text-gray-800 font-semibold">
                                            living by voices we shall never hear.
                                        </span>
                                    </span>”
                                </p>
                                <div className="flex items-center mt-4">
                                    <img
                                        src="/olivia.jpg" // Replace with your image path in public/
                                        alt="Olivia Rhye"
                                        className="w-9 h-9 rounded-full mr-3"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-900">Olivia Rhye</p>
                                        <p className="text-sm text-gray-500">Product Designer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-500 leading-relaxed">
                                Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.           </p>
                            <p className="text-gray-500 leading-relaxed">
                                Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.           </p>
                            <p className="text-gray-500 leading-relaxed">
                                Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.    </p>
                            <p className="text-gray-500 leading-relaxed">
                                Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Software and tools</h2>
                            <p className="text-gray-500 leading-relaxed">
                                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.         </p>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Other resources</h2>
                            <p className="text-gray-500 leading-relaxed">
                                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.
                            </p>
                            <ol className="list-decimal pl-5 space-y-1 text-gray-500">
                                <li>Lectus id duis vitae porttitor enim gravida morbi.</li>
                                <li>Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.</li>
                                <li>Suspendisse maecenas ac donec scelerisque diam sed est duis purus.</li>
                            </ol>

                        </div>
                        <div className="relative">
                            <Image
                                src="/blogs/blog-detail-02.svg"
                                alt="Business professionals reviewing documents in office meeting"
                                width={400}
                                height={300}
                                className="rounded-lg object-cover w-full h-auto max-w-full"
                            />
                            <p className="text-xs text-gray-400 mt-2 ">© Image courtesy of Moose Photos via Pexels</p>

                        </div>
                        <p className="text-gray-500 leading-relaxed">
                            Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at.
                        </p>
                        <p className="text-gray-500 leading-relaxed">
                            Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.
                        </p>
                    </div>

                    {/* Right Column - Newsletter Signup */}
                    <div className="lg:pl-8">
                        <div className="bg-[#F9F4E8] border-t-4 border-[#FFD0C9] rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-sm">

                            <div className="space-y-4">
                                <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center">
                                    <Send className="h-6 w-6 text-[#F25F4A]" />
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Weekly newsletter</h3>

                                <p className="text-gray-500 text-sm leading-relaxed">
                                    No spam. Just the latest releases and tips, interesting articles, and exclusive interviews in your
                                    inbox every week.
                                </p>

                                <div className="space-y-3 pt-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-md focus:border-[#F25F4A] focus:ring-1 focus:ring-[#F25F4A] focus:outline-none transition"
                                    />

                                    <p className="text-xs text-gray-500">
                                        Read about our <span className="underline cursor-pointer">privacy policy</span>.
                                    </p>

                                    <button
                                        type="button"
                                        className="w-full bg-[#F25F4A] hover:opacity-90 text-white font-medium py-3 rounded-lg transition-colors"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
