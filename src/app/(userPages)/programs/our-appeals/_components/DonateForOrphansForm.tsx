import Image from 'next/image'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Minus, Plus, Heart } from "lucide-react"

const DonateForOrphansForm = () => {
    const [formData, setFormData] = useState({
        currency: '',
        donationType: '',
        amount: '',
        quantity: 1,
        category: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (value: string, name: string) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const incrementQuantity = () => {
        setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }));
    };

    const decrementQuantity = () => {
        if (formData.quantity > 1) {
            setFormData(prev => ({ ...prev, quantity: prev.quantity - 1 }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData); // Log form data on submit
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 w-full bg-white ">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-center sm:text-left">
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Donate for Orphans</h2>
                        <p className="text-sm text-gray-600">Your donation transforms the lives of orphans.</p>
                    </div>
                    <div className="flex-shrink-0">
                        <Image src="/home/hands.svg" height={60} width={60} alt=" safe hands image" />
                    </div>
                </div>

                {/* Currency Selection */}
                <div className="space-y-2">
                    <Label htmlFor="currency" className="sr-only">
                        Currency
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange(value, 'currency')}  >
                        <SelectTrigger
                            id="currency"
                            className="w-full px-4 py-5 text-gray-500 border-gray-200 rounded-full focus:ring-[#007466] focus:ring-1 focus:border-[#007466]"
                        >
                            <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent className='bg-white border-gray-200 text-gray-500' >
                            <SelectItem value="usd">Currency (USD)</SelectItem>
                            <SelectItem value="eur">Currency (EUR)</SelectItem>
                            <SelectItem value="pkr">Currency (PKR)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Donation Type */}
                <div className="space-y-2">
                    <Label htmlFor="donation-type" className="sr-only">
                        Donation Type
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange(value, 'donationType')}>
                        <SelectTrigger
                            id="donation-type"
                            className="w-full px-4 py-5 text-gray-500 border-gray-200 rounded-full focus:ring-[#007466] focus:ring-1 focus:border-[#007466]"
                        >
                            <SelectValue placeholder="I would like to donate to" />
                        </SelectTrigger>
                        <SelectContent className='bg-white border-gray-200 text-gray-500'>
                            <SelectItem value="orphans">Orphans</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="medical">Medical Aid</SelectItem>
                            <SelectItem value="food">Food & Nutrition</SelectItem>
                            <SelectItem value="shelter">Shelter & Housing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                    <Label htmlFor="amount" className="sr-only">
                        Donation Amount
                    </Label>
                    <div className="relative">
                        <Input
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-5 border text-gray-600 border-gray-200 rounded-full focus:ring-[#007466] focus:border-[#007466] focus:ring-1 "
                            min="1"
                            step="0.01"
                        />
                    </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between border border-gray-200 rounded-full px-5 py-1">
                    <Label className="text-gray-500 font-medium">Quantity</Label>
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={decrementQuantity}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                            aria-label="Decrease quantity"
                            disabled={formData.quantity <= 1}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-gray-900 font-medium min-w-[2rem] text-center">{formData.quantity}</span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={incrementQuantity}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                            aria-label="Increase quantity"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <Label htmlFor="category" className="sr-only">
                        Category
                    </Label>
                    <Select
                        value={formData.category} // Add value for the selected category
                        onValueChange={(value) => handleSelectChange(value, 'category')}
                    >
                        <SelectTrigger
                            id="category"
                            className="w-full px-4 py-5 text-gray-500 border-gray-200 rounded-full focus:ring-[#007466] focus:ring-1 focus:border-[#007466]"
                        >
                            <SelectValue placeholder="General" /> {/* Set the placeholder to 'General' */}
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 text-gray-500">
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="zakat">Zakat</SelectItem>
                            <SelectItem value="sadaqah">Sadaqah</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                {/* Donate Button */}
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#f26a54] hover:bg-[#e85c46] text-white h-12 rounded-full font-medium text-base transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Processing..." : "Donate Now"}
                </Button>
            </form>
        </>
    );
};

export default DonateForOrphansForm;
