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
import { addTransaction } from '@/app/actions/transactions.js';
import { Loader2 } from 'lucide-react';

const AddTransaction = ({ children }) => {

    const [errors, setErrors] = useState({});
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    const { loading, error, data, fn } = useFetch(addTransaction);

    const handleSubmit = async () => {
        const isValid = transactionSchemaChecker({ amount, category, date, setErrors });
        if (!isValid) return;
        await fn(amount, category, date);
        setIsOpen(false);
        resetForm();
    }

    const resetForm = () => { setErrors({}); setAmount(''); setCategory(''); setDate(new Date()) };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetForm();
        }}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Transaction</DialogTitle>
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
                                value={date.toDateString()}
                                className="cursor-pointer"
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(val) => setDate(val)}
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
                            "Add" : <><Loader2 className='animate-spin' /> Adding </>
                    }
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default AddTransaction