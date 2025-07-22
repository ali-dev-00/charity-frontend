
import { Book } from "lucide-react";
import Image from "next/image";

const audits = [
  { year: "2023–24", url: "#" },
  { year: "2022–23", url: "#" },
  { year: "2021–22", url: "#" },
];

export default function AuditReports() {
  return (
    <section >
      <div className="max-w-[1366px] px-4 md:px-8 lg:px-16 py-16 lg:py-20 mx-auto ">
        <h2 className="text-3xl font-bold mb-4 text-center">Transparency Through Every Year</h2>
        <p className="text-gray-600 text-sm mb-10 text-center">
          We believe in building trust through accountability. Download our official audit reports to <br/>
           see how we manage resources and maintain our commitment to ethical, impactful work.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {audits.map((audit) => (
            <div
              key={audit.year}
              className="border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col  "
            >
              <Image src="finance/audit-book.svg" height={50} width={50} alt="audit book" className="mb-4" />
              <h3 className="font-semibold text-lg mb-4">Audit Report {audit.year}</h3>
              <a
                href={audit.url}
                className="border text-center border-[#00937F] text-[#00937F] rounded-full px-6 py-3 text-sm hover:bg-[#00937F] hover:text-white transition"
                download
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
