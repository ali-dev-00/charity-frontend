"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Info, Calculator, CheckCircle, AlertCircle } from "lucide-react"

interface ZakatInputs {
  goldValue: number
  silverValue: number
  bankCash: number
  savings: number
  investedMoney: number
  businessInvestments: number
  stockValue: number
  borrowedMoney: number
  employeeSalaries: number
  otherOutgoing: number
}

interface ZakatResult {
  totalAssets: number
  totalLiabilities: number
  netWorth: number
  nisabThreshold: number
  zakatDue: number
  isZakatObligatory: boolean
  zakatRate: number
}

export default function ZakatCalculator() {
  const [inputs, setInputs] = useState<ZakatInputs>({
    goldValue: 0,
    silverValue: 0,
    bankCash: 0,
    savings: 0,
    investedMoney: 0,
    businessInvestments: 0,
    stockValue: 0,
    borrowedMoney: 0,
    employeeSalaries: 0,
    otherOutgoing: 0,
  })

  const [result, setResult] = useState<ZakatResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  // Current approximate values for Pakistan (these should be updated regularly)
  const GOLD_PRICE_PER_GRAM = 18000 // PKR per gram (approximate)
  const SILVER_PRICE_PER_GRAM = 220 // PKR per gram (approximate)
  const NISAB_GOLD_GRAMS = 87.48 // 7.5 tolas
  const NISAB_SILVER_GRAMS = 612.36 // 52.5 tolas
  const ZAKAT_RATE = 0.025 // 2.5%

  const handleInputChange = (field: keyof ZakatInputs, value: string) => {
    // Only allow numbers and decimal points
    const numericValue = value.replace(/[^0-9.]/g, "")
    const parsedValue = Number.parseFloat(numericValue) || 0

    setInputs((prev) => ({
      ...prev,
      [field]: parsedValue,
    }))
  }

  const calculateZakat = () => {
    // Calculate total assets
    const totalAssets =
      inputs.goldValue +
      inputs.silverValue +
      inputs.bankCash +
      inputs.savings +
      inputs.investedMoney +
      inputs.businessInvestments +
      inputs.stockValue

    // Calculate total liabilities
    const totalLiabilities = inputs.borrowedMoney + inputs.employeeSalaries + inputs.otherOutgoing

    // Calculate net worth
    const netWorth = Math.max(0, totalAssets - totalLiabilities)

    // Calculate Nisab threshold (using silver as it's typically lower)
    const goldNisab = NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM
    const silverNisab = NISAB_SILVER_GRAMS * SILVER_PRICE_PER_GRAM
    const nisabThreshold = Math.min(goldNisab, silverNisab)

    // Check if Zakat is obligatory
    const isZakatObligatory = netWorth >= nisabThreshold

    // Calculate Zakat due
    const zakatDue = isZakatObligatory ? netWorth * ZAKAT_RATE : 0

    const calculationResult: ZakatResult = {
      totalAssets,
      totalLiabilities,
      netWorth,
      nisabThreshold,
      zakatDue,
      isZakatObligatory,
      zakatRate: ZAKAT_RATE * 100,
    }

    setResult(calculationResult)
    setShowResult(true)
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const resetCalculator = () => {
    setShowResult(false)
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Zakat Calculator</h1>
          <p className="text-gray-600">Calculate your Zakat according to Islamic principles</p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            /* Input Form */
            <Card className="border border-gray-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Enter Your Financial Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Gold & Silver Section */}
                <div className="space-y-3">
                  <h2 className="text-base text-gray-900 font-semibold">Gold & Silver</h2>
                  <div className="space-y-2">
                    <div>
                      <label htmlFor="gold-value" className="text-sm text-gray-700 font-normal">
                        Value of gold you possess (PKR)
                      </label>
                      <Input
                        id="gold-value"
                        type="text"
                        placeholder="Enter amount"
                        value={inputs.goldValue || ""}
                        onChange={(e) => handleInputChange("goldValue", e.target.value)}
                        className="mt-1 border border-gray-200 rounded-full px-4 py-2 bg-gray-100 focus:border-[#007466] focus:ring-1 focus:ring-[#007466] focus:ring-opacity-20"
                      />
                    </div>
                    <div>
                      <label htmlFor="silver-value" className="text-sm text-gray-700 font-normal">
                        Value of silver you possess (PKR)
                      </label>
                      <Input
                        id="silver-value"
                        type="text"
                        placeholder="Enter amount"
                        value={inputs.silverValue || ""}
                        onChange={(e) => handleInputChange("silverValue", e.target.value)}
                        className="mt-1 border border-gray-200 rounded-full px-4 py-2 bg-gray-100 focus:border-[#007466] focus:ring-1 focus:ring-[#007466] focus:ring-opacity-20"
                      />
                    </div>
                  </div>
                </div>

                {/* Cash Section */}
                <div className="space-y-3">
                  <h2 className="text-base text-gray-900 font-semibold">Cash & Savings</h2>
                  <div className="space-y-2">
                    <div>
                      <label htmlFor="bank-cash" className="text-sm text-gray-700 font-normal">
                        Cash in bank accounts (PKR)
                      </label>
                      <Input
                        id="bank-cash"
                        type="text"
                        placeholder="Enter amount"
                        value={inputs.bankCash || ""}
                        onChange={(e) => handleInputChange("bankCash", e.target.value)}
                        className="mt-1 border border-gray-200 rounded-full px-4 py-2 bg-gray-100 focus:border-[#007466] focus:ring-1 focus:ring-[#007466] focus:ring-opacity-20"
                      />
                    </div>
                    <div>
                      <label htmlFor="savings" className="text-sm text-gray-700 font-normal">
                        Savings for the future (PKR)
                      </label>
                      <Input
                        id="savings"
                        type="text"
                        placeholder="Enter amount"
                        value={inputs.savings || ""}
                        onChange={(e) => handleInputChange("savings", e.target.value)}
                        className="mt-1 border border-gray-200 rounded-full px-4 py-2 bg-gray-100 focus:border-[#007466] focus:ring-1 focus:ring-[#007466] focus:ring-opacity-20"
                      />
                    </div>
                    <div>
                      <label htmlFor="invested-money" className="text-sm text-gray-700 font-normal">
                        Money you have invested (PKR)
                      </label>
                      <Input
                        id="invested-money"
                        type="text"
                        placeholder="Enter amount"
                        value={inputs.investedMoney || ""}
                        onChange={(e) => handleInputChange("investedMoney", e.target.value)}
                        className="mt-1 border border-gray-200 rounded-full px-4 py-2 bg-gray-100 focus:border-[#007466] focus:ring-1 focus:ring-[#007466] focus:ring-opacity-20"
                      />
                    </div>
                    <div>
                      <label htmlFor="business-investments" className="text-sm text-gray-700 font-normal">
                        Business investments (PKR)
                      </label>
                      <Input
                        id="business-investments"
                        type="text"
                        placeholder="Enter amount"
                        value={inputs.businessInvestments || ""}
                        onChange={(e) => handleInputChange("businessInvestments", e.target.value)}
                        className="mt-1 border border-gray-200 rounded-full px-4 py-2 bg-gray-100 focus:border-[#007466] focus:ring-1 focus:ring-[#007466] focus:ring-opacity-20"
                      />
                    </div>
                  </div>
                </div>

                {/* Business Assets Section */}
                <div className="space-y-3">
                  <h2 className="text-base text-gray-900 font-semibold">Business Assets</h2>
                  <div>
                    <label htmlFor="stock-value" className="text-sm text-gray-700 font-normal">
                      Stock/Inventory value (PKR)
                    </label>
                    <Input
                      id="stock-value"
                      type="text"
                      placeholder="Enter amount"
                      value={inputs.stockValue || ""}
                      onChange={(e) => handleInputChange("stockValue", e.target.value)}
                      className="mt-1 border border-gray-200 rounded-full px-4 py-2 bg-gray-100 focus:border-[#007466] focus:ring-1 focus:ring-[#007466] focus:ring-opacity-20"
                    />
                  </div>
                </div>

                {/* Liabilities Section */}
                <div className="space-y-3">
                  <h2 className="text-base text-gray-900 font-semibold">Liabilities</h2>
                  <div className="space-y-2">
                    <div>
                      <label htmlFor="borrowed-money" className="text-sm text-gray-700 font-normal">
                        Money owed/borrowed on credit (PKR)
                      </label>
                      <Input
                        id="borrowed-money"
                        type="text"
                        placeholder="Enter amount"
                        value={inputs.borrowedMoney || ""}
                        onChange={(e) => handleInputChange("borrowedMoney", e.target.value)}
                        className="mt-1 border border-gray-200 rounded-full px-4 py-2 bg-gray-100 focus:border-[#007466] focus:ring-1 focus:ring-[#007466] focus:ring-opacity-20"
                      />
                    </div>
                    <div>
                      <label htmlFor="employee-salaries" className="text-sm text-gray-700 font-normal">
                        Outstanding employee salaries (PKR)
                      </label>
                      <Input
                        id="employee-salaries"
                        type="text"
                        placeholder="Enter amount"
                        value={inputs.employeeSalaries || ""}
                        onChange={(e) => handleInputChange("employeeSalaries", e.target.value)}
                        className="mt-1 border border-gray-200 rounded-full px-4 py-2 bg-gray-100 focus:border-[#007466] focus:ring-1 focus:ring-[#007466] focus:ring-opacity-20"
                      />
                    </div>
                    <div>
                      <label htmlFor="other-outgoing" className="text-sm text-gray-700 font-normal">
                        Other immediate debts (PKR)
                      </label>
                      <Input
                        id="other-outgoing"
                        type="text"
                        placeholder="Enter amount"
                        value={inputs.otherOutgoing || ""}
                        onChange={(e) => handleInputChange("otherOutgoing", e.target.value)}
                        className="mt-1 border border-gray-200 rounded-full px-4 py-2 bg-gray-100 focus:border-[#007466] focus:ring-1 focus:ring-[#007466] focus:ring-opacity-20"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="pt-4">
                  <Button
                    onClick={calculateZakat}
                    className="w-full rounded-full bg-[#F25F4A] hover:opacity-90 text-white py-3 font-medium"
                  >
                    Calculate your Zakat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Results Section */
            result && (
              <Card className="border border-gray-200 rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {result.isZakatObligatory ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    )}
                    Zakat Calculation Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary Alert */}
                  <Alert
                    className={`border-2 ${result.isZakatObligatory ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}
                  >
                    <AlertDescription className="">
                      {result.isZakatObligatory ? (
                        <div>
                          <p className="font-semibold text-green-800 mb-1">Zakat is Obligatory</p>
                          <p className="text-green-700">
                            You must pay <span className="font-bold text-lg">{formatCurrency(result.zakatDue)}</span> in
                            Zakat
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-semibold text-orange-800 mb-1"> Zakat is Not Obligatory</p>
                          <p className="text-orange-700">Your wealth is below the Nisab threshold</p>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>

                  {/* Detailed Breakdown */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">📊 Calculation Breakdown</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Assets:</span>
                        <span className="font-medium">{formatCurrency(result.totalAssets)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Liabilities:</span>
                        <span className="font-medium text-red-600">-{formatCurrency(result.totalLiabilities)}</span>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-medium">Net Zakatable Wealth:</span>
                        <span className="font-bold text-lg">{formatCurrency(result.netWorth)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Nisab Threshold:</span>
                        <span className="font-medium">{formatCurrency(result.nisabThreshold)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Zakat Rate:</span>
                        <span className="font-medium">{result.zakatRate}%</span>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-900 font-semibold">💰 Total Zakat Due:</span>
                        <span className="font-bold text-xl text-[#F25F4A]">{formatCurrency(result.zakatDue)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-medium">📝 Important Reminders:</p>
                        <ul className="text-sm space-y-1 ml-4">
                          <li>• Zakat is due only if you've possessed this wealth for a full lunar year (Hawl)</li>
                          <li>• This calculation uses current approximate gold/silver prices in Pakistan</li>
                          <li>• Consult with a qualified Islamic scholar for complex situations</li>
                          <li>• Zakat should be paid to eligible recipients as defined in the Quran</li>
                        </ul>
                      </div>
                    </AlertDescription>
                  </Alert>

                  {result.isZakatObligatory && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-2">🤲 Who can receive your Zakat?</h4>
                      <p className="text-sm text-green-700">
                        According to the Quran (9:60), Zakat should be given to: the poor, the needy, Zakat collectors,
                        those whose hearts are to be reconciled, slaves seeking freedom, debtors, those fighting in the
                        way of Allah, and travelers in need.
                      </p>
                    </div>
                  )}

                  {/* Back Button */}
                  <div className="pt-4">
                    <Button
                      onClick={resetCalculator}
                      variant="outline"
                      className="w-full rounded-full border-[#007466] text-[#007466] hover:bg-[#007466] hover:text-white py-3 font-medium bg-transparent"
                    >
                      ← Back to Calculate Zakat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>

        {/* Educational Information */}
        <Card className="mt-8 border border-gray-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />📚 About Zakat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">What is Zakat?</h4>
                <p className="text-sm text-gray-600">
                  Zakat is one of the Five Pillars of Islam and represents a mandatory charitable contribution. It
                  purifies wealth and helps redistribute resources to those in need.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Nisab Thresholds (PKR)</h4>
                <p className="text-sm text-gray-600">
                  Gold: 87.48 grams ≈ {formatCurrency(NISAB_GOLD_GRAMS * GOLD_PRICE_PER_GRAM)}
                  <br />
                  Silver: 612.36 grams ≈ {formatCurrency(NISAB_SILVER_GRAMS * SILVER_PRICE_PER_GRAM)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
