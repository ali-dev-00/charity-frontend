import Image from "next/image"
import SignInForm from "./_components/signin-form"
import '../../globals.css'
export default function SignInPage() {
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
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="mt-2 text-lg">Sign in to continue your journey.</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2 bg-gray-100" >
        <SignInForm />
      </div>
    </div>
  )
}
