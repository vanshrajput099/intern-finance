'use client';
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';
import { deleteTransaction } from '../actions/transactions';
import { Loader2 } from 'lucide-react';

const DeleteTransaction = ({ children, formData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { loading, error, data, fn } = useFetch(deleteTransaction);

    const handleDelete = async () => {
        await fn(formData._id);
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Transaction</DialogTitle>
                </DialogHeader>
                <p>Do You Sure Want To Delete The Transaction ?</p>
                <div className='flex gap-3'>
                    <Button disabled={loading} onClick={handleDelete} className={''} variant={'destructive'}>
                        {
                            !loading ? "Delete" : <><Loader2 className='animate-spin'/> Deleting...</>
                        }
                    </Button>
                    <Button disabled={loading} onClick={() => { setIsOpen(false) }}>No</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteTransaction