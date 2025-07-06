"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { CATEGORIES } from '@/constant';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { transactionSchemaChecker } from '../schema/transactionSchemaChecker';
import useFetch from '@/hooks/useFetch';
import { updateTransaction } from '@/app/actions/transactions.js';
import { Loader2 } from 'lucide-react';

const EditTransaction = ({ children, formData }) => {

    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState(formData.amount);
    const [category, setCategory] = useState(formData.category);
    const [date, setDate] = useState(formData.date);
    const [isOpen, setIsOpen] = useState(false);

    const { loading, error, data, fn } = useFetch(updateTransaction);

    const handleSubmit = async () => {
        const isValid = transactionSchemaChecker({ amount, category, date, setErrors });
        if (!isValid) return;
        await fn(amount, category, date, formData._id);
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); }}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Transaction</DialogTitle>
                </DialogHeader>

                <div className="space-y-1">
                    <Input
                        placeholder="Enter the amount ($)"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-sm">{errors.amount}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <Select value={category} onValueChange={(val) => setCategory(val)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                    {cat.emoji} {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>Date:</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Input
                                readOnly
                                value={date}
                                className="cursor-pointer"
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(val) => setDate(val.toDateString())}
                                className="rounded-lg border"
                            />
                        </PopoverContent>
                    </Popover>
                    {errors.date && (
                        <p className="text-red-500 text-sm">{errors.date}</p>
                    )}
                </div>

                <Button disabled={loading} onClick={handleSubmit}>
                    {
                        !loading ?
                            "Update" : <><Loader2 className='animate-spin' /> Updating </>
                    }
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default EditTransaction