"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

export default function Component() {
  const [openItem, setOpenItem] = useState("item-1")

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 text-lg">
          Have a question? We've got answers to help you move forward with confidence.
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        value={openItem}
        onValueChange={(value) => setOpenItem(value)}
        className="pb-4"
      >
        <AccordionItem
          value="item-1"
          className={`border border-gray-200 rounded-lg mb-4 px-6 ${openItem === "item-1" ? "bg-gray-100" : "bg-white"}`}
        >
          <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6">
            1. Who are the beneficiaries?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 pb-6">
            <p className="mb-4">
              Over 31,000 orphan students have benefited from Orphan Sponsorship Programme, which is one of the flagship
              programmes of the Foundation.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Annually 3000 to 3500 new orphan students join the Foundation's schools nationwide</li>
              <li>
                A total expenditure of 700 million has been incurred to educate these students under this programme last
                year
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className={`border border-gray-200 rounded-lg mb-4 px-6 ${openItem === "item-2" ? "bg-gray-100" : "bg-white"}`}
        >
          <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6">
            2. How can I contribute to support an orphan student?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 pb-6">
            <p>
              You can contribute to support an orphan student through various methods including online donations, bank
              transfers, or by visiting our offices. We offer flexible payment options to make it convenient for
              sponsors to contribute regularly.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className={`border border-gray-200 rounded-lg mb-4 px-6 ${openItem === "item-3" ? "bg-gray-100" : "bg-white"}`}
        >
          <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6">
            3. What is the procedure upon receiving sponsorship?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 pb-6">
            <p>
              Once we receive your sponsorship, we will match you with a suitable orphan student based on your
              preferences. You will receive detailed information about the student including their profile, educational
              needs, and progress updates.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          className={`border border-gray-200 rounded-lg mb-4 px-6 ${openItem === "item-4" ? "bg-gray-100" : "bg-white"}`}
        >
          <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6">
            4. Can I have a chance to meet my sponsored kid?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 pb-6">
            <p>
              Yes, we encourage sponsors to meet their sponsored students when possible. We can arrange meetings at our
              schools or during special events, following proper protocols to ensure the safety and comfort of both
              parties.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          className={`border border-gray-200 rounded-lg px-6 ${openItem === "item-5" ? "bg-gray-100" : "bg-white"}`}
        >
          <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6">
            5. How can I obtain progress reports on the sponsored student(s)?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 pb-6">
            <p>
              We provide regular progress reports on your sponsored student(s) including academic performance,
              attendance records, and personal development updates. These reports are sent quarterly via email or postal
              mail based on your preference.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
