import React from 'react'
import TransactionTable from './_components/TransactionTable'
import { Button } from '@/components/ui/button'
import TransactionCard from './_components/TransactionCard'
import BarChartComponent from './_components/BarChartComponent'
import PieChartComponent from './_components/PieChartComponent'
import AddTransaction from './_components/AddTransaction'
import { Plus } from 'lucide-react'
import { getAllTransactions } from './actions/transactions'
import ThemeChanger from './_components/ThemeChanger'

const page = async () => {

  const allTransactionsData = await getAllTransactions();
  const totalExpenses = allTransactionsData.data.reduce((acc, ele) => acc + ele.amount, 0);

  return (
    <div className='min-h-screen w-full'>
      <div className='flex flex-col lg:flex-row'>
        <div className='w-full lg:w-[30%] border p-5 min-h-screen '>
          <h1 className='text-5xl font-bold text-center'>Personal Finance Visualiser</h1>
          <div className='flex justify-center mt-5'>
            <ThemeChanger />
          </div>
          <div className='p-7 flex flex-col items-end space-y-2 mt-5 border'>
            <AddTransaction>
              <Button className={'w-full'}><Plus /> Add Transaction</Button>
            </AddTransaction>
            <div className='mt-5 w-full'>
              <TransactionTable data={allTransactionsData.data} />
            </div>

          </div>
        </div>
        <div className='w-full lg:w-[70%] border p-5 min-h-screen '>
          <div className='flex flex-col sm:flex-row gap-2 justify-between'>
            <TransactionCard name="Total Expenses" data={totalExpenses} />
            <TransactionCard name="Recent Transaction" data={allTransactionsData.data[0].amount} />
          </div>
          <div className='mt-5 lg:p-5'>
            <BarChartComponent data={allTransactionsData.data} />
          </div>
          <div className='mt-5'>
            <PieChartComponent data={allTransactionsData.data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page