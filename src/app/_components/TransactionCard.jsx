"use client";
import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const TransactionCard = ({ data, name }) => {
    return (
        <Card className={'w-full text-center sm:text-left sm:w-[47%]'}>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent className={'text-5xl font-medium'}>
                ${data}
            </CardContent>
        </Card>
    )
}

export default TransactionCard