"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Utensils, 
  Car, 
  ShoppingBag, 
  Receipt, 
  Layers, 
  Plus, 
  TrendingUp,
  ChevronRight,
  History
} from "lucide-react"

type Category = "Food" | "Transport" | "Shopping" | "Bills" | "Other"

interface Expense {
  id: string
  name: string
  amount: number
  category: Category
  notes: string
  date: string
}

const CATEGORIES: { name: Category; icon: React.ReactNode }[] = [
  { name: "Food", icon: <Utensils className="w-5 h-5" /> },
  { name: "Transport", icon: <Car className="w-5 h-5" /> },
  { name: "Shopping", icon: <ShoppingBag className="w-5 h-5" /> },
  { name: "Bills", icon: <Receipt className="w-5 h-5" /> },
  { name: "Other", icon: <Layers className="w-5 h-5" /> },
]

export function ExpenseDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<Category>("Food")
  const [notes, setNotes] = useState("")

  const totalSpending = expenses.reduce((acc, curr) => acc + curr.amount, 0)

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !amount) return

    const newExpense: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      amount: parseFloat(amount),
      category,
      notes,
      date: new Date().toLocaleDateString(),
    }

    setExpenses([newExpense, ...expenses])
    setName("")
    setAmount("")
    setNotes("")
  }

  const getCategoryTotal = (cat: Category) => {
    return expenses
      .filter((e) => e.category === cat)
      .reduce((acc, curr) => acc + curr.amount, 0)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-headline font-bold">
              AS – <span className="text-primary">Daily Expenses</span>
            </h1>
            <p className="text-white/40 font-medium">Keep track of your daily flow.</p>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-sm mb-1 font-medium">TOTAL SPENDING TODAY</p>
            <div className="text-5xl md:text-6xl font-headline font-extrabold text-primary flex items-center justify-end gap-2">
              <span className="text-2xl font-bold opacity-50 mt-2">PKR</span>
              {totalSpending.toLocaleString()}
            </div>
          </div>
        </header>

        {/* Category Summaries */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Card key={cat.name} className="bg-muted/30 border-white/5 hover:border-primary/30 transition-all group overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20" />
                </div>
                <p className="text-white/40 text-xs font-bold tracking-wider uppercase mb-1">{cat.name}</p>
                <p className="text-2xl font-headline font-bold">
                  {getCategoryTotal(cat.name).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Input Form */}
          <section className="lg:col-span-1 space-y-6">
            <div className="p-8 glass-card rounded-[2rem] border-white/5 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h2 className="text-2xl font-headline font-bold">Add Expense</h2>
              </div>
              
              <form onSubmit={handleAddExpense} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Expense Name</Label>
                  <Input 
                    placeholder="e.g. Weekly Groceries" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Amount (PKR)</Label>
                    <Input 
                      type="number"
                      placeholder="0.00" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Category</Label>
                    <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
                      <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-muted border-white/10">
                        {CATEGORIES.map(c => (
                          <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Notes / Description</Label>
                  <Textarea 
                    placeholder="Add details about this expense..." 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px] bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full h-14 bg-primary text-black font-bold text-lg hover:bg-primary/90 yellow-glow rounded-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Expense
                </Button>
              </form>
            </div>
          </section>

          {/* Activity/History Section */}
          <section className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h2 className="text-2xl font-headline font-bold">Recent Activity</h2>
                </div>
                <div className="flex items-center gap-2 text-primary text-sm font-bold cursor-pointer hover:underline">
                   View All <TrendingUp className="w-4 h-4" />
                </div>
             </div>

             <div className="space-y-4">
                {expenses.length === 0 ? (
                  <div className="py-20 text-center glass-card rounded-[2rem] border-white/5">
                    <History className="w-12 h-12 text-white/10 mx-auto mb-4" />
                    <p className="text-white/40">No expenses recorded yet today.</p>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <div 
                      key={expense.id} 
                      className="group flex items-center justify-between p-5 glass-card rounded-2xl border border-white/5 hover:border-white/10 transition-all animate-in fade-in slide-in-from-right-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl text-primary font-bold group-hover:bg-primary group-hover:text-black transition-colors">
                          {CATEGORIES.find(c => c.name === expense.category)?.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{expense.name}</h4>
                          <p className="text-sm text-white/40">{expense.category} • {expense.notes || 'No description'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-headline font-bold text-white">
                          <span className="text-xs opacity-40 mr-1">PKR</span>
                          {expense.amount.toLocaleString()}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mt-1">Today</p>
                      </div>
                    </div>
                  ))
                )}
             </div>
          </section>
        </div>
      </div>
    </div>
  )
}