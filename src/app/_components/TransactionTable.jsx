'use client'
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Pencil } from 'lucide-react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import EditTransaction from './EditTransaction';
import DeleteTransaction from './DeleteTransaction';

const ITEMS_PER_PAGE = 10;

const TransactionTable = ({ data }) => {
  const [page, setPage] = useState(1);

  const convertedData = data.map((ele) => ({
    ...ele,
    date: format(new Date(ele.date), 'dd MMM yyyy'),
  }));

  const totalPages = Math.ceil(convertedData.length / ITEMS_PER_PAGE);

  const paginatedData = convertedData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((ele, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium text-left">{ele.date}</TableCell>
              <TableCell className="text-center">{ele.amount}</TableCell>
              <TableCell className="text-center">{ele.category.toUpperCase()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <EditTransaction formData={ele}>
                    <Button>
                      <Pencil />
                    </Button>
                  </EditTransaction>
                  <DeleteTransaction formData={ele}>
                    <Button className="bg-red-600 text-white">
                      <Trash2 />
                    </Button>
                  </DeleteTransaction>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col sm:flex-row space-y-5 justify-between items-center mt-10">
        <Button className={'w-fit'} variant="outline" onClick={handlePrevious} disabled={page === 1}>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button className={'w-fit'} variant="outline" onClick={handleNext} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionTable;
