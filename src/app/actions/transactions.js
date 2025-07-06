"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "../lib/db";
import { Transaction } from "@/app/models/transaction.model.js";

export const getAllTransactions = async () => {
    try {
        await dbConnect();
        const transactions = await Transaction.find({}).sort({ date: -1 });
        const data = transactions.map((ele) => {
            return {
                _id: ele._id.toString(),
                amount: ele.amount,
                category: ele.category,
                date: ele.date.toISOString(),
            }
        })
        
        return { status: 201, message: "transaction retrieved", data };
    } catch (err) {
        console.error('Transaction POST error:', err);
        return { status: 500, message: "server error", error: err };
    }
}

export const addTransaction = async (amount, category, date) => {
    try {
        if (!amount || !category || !date) {
            return {
                status: 401,
                message: "Missing required fields",
                data: null,
            };
        }

        await dbConnect();

        const newTransaction = await Transaction.create({
            amount,
            category,
            date,
        });

        const plainTransaction = {
            _id: newTransaction._id.toString(),
            amount: newTransaction.amount,
            category: newTransaction.category,
            date: newTransaction.date.toISOString(),
        };

        revalidatePath("/");

        return {
            status: 201,
            message: "Transaction added",
            data: plainTransaction,
        };
    } catch (err) {
        return {
            status: 500,
            message: "server error",
            error: err instanceof Error ? err.message : String(err),
        };
    }
};


export const updateTransaction = async (amount, category, date, id) => {
    try {

        if (!amount && !category && !date) {
            return { status: 200, message: "Nothing updated", data: null };
        }

        await dbConnect();

        const updateFields = {};
        if (amount !== undefined) updateFields.amount = amount;
        if (category) updateFields.category = category;
        if (date) updateFields.date = date;

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedTransaction) {
            return { status: 404, message: "Transaction not found", data: null };
        }

        const plainTransaction = {
            _id: updatedTransaction._id.toString(),
            amount: updatedTransaction.amount,
            category: updatedTransaction.category,
            date: updatedTransaction.date.toISOString(),
        };

        revalidatePath("/");
        return { status: 201, message: "Transaction updated", data: plainTransaction };
    } catch (err) {
        return { status: 500, message: "server error", error: err };
    }
}

export const deleteTransaction = async (id) => {
    try {
        if (!id) {
            return { status: 400, message: "Id is required", data: null };
        }

        await dbConnect();

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return { status: 404, message: "Transaction not found", data: null };
        }

        const plainTransaction = {
            _id: deletedTransaction._id.toString(),
            amount: deletedTransaction.amount,
            category: deletedTransaction.category,
            date: deletedTransaction.date.toISOString(),
        };

        revalidatePath("/");
        return { status: 201, message: "Transaction deleted", data: plainTransaction };
    } catch (err) {
        return { status: 500, message: "server error", error: err };
    }
}