import Image from "next/image"
import SignUpForm from "./_components/signup-form"
import '../../globals.css'
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left side: Image/Visual */}
      <div className="relative hidden w-1/2 items-center justify-center bg-[#007466] lg:flex">
        <Image
          src="/programs/our-appeal.svg"
          width={400}
          height={400}
          alt="Thematic illustration of community and helping hands"
          className="h-[500px] w-[500px] border-none mb-10"
          priority
        />
        <div className="absolute bottom-8 text-center text-white px-4">
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="mt-2 text-lg">Make a difference, one step at a time.</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2 bg-gray-100 ">
        <SignUpForm />
      </div>
    </div>
  )
}
