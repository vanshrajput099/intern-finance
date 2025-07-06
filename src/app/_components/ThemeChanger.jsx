"use client";
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme()
    return (
        <Button variant="outline" className={'w-fit'} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Set Theme
            {theme === "light" ? <Moon className="h-fit w-fit" /> : <Sun className="h-fit w-fit" />}
        </Button>
    )
}

export default ThemeChanger