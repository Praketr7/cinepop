"use client";
import { Search, Heart, Bookmark, Eye, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Navigation(){
    const [newItem,setNewItem] = useState("")
    return(
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-around h-16">
                    <div>
                        <h1 className="text-2xl font-bold text-primary">CinePop</h1>
                    </div>
                    <div className="flex items-center space-x-6">
                        <a href="/watched" className="flex items-center space-x-1 hover:scale-105 hover:text-primary transition-all duration-300">
                            <Eye/> 
                            <span>Watched</span>
                        </a>
                        <a href="/favorites" className="flex items-center space-x-1 hover:scale-105 hover:text-primary transition-all duration-300">
                            <Heart/>
                            <span>Favorites</span>
                        </a>
                        <a href="/watchlist" className="flex items-center space-x-1 hover:scale-105 hover:text-primary transition-all duration-300">
                            <Bookmark/>
                            <span>Watchlist</span>
                        </a>
                    </div>
                    <div className="border-border">
                        <div className="flex items-center space-x-3">
                            <Search/>
                            <Input type="text" placeholder="Search movies..." value={newItem} onChange={(e)=>setNewItem(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button className="bg-background text-foreground hover:text-background hover:bg-primary transition-colors-transform duration-300 hover:scale-110">
                            Login
                        </Button>
                        <Button className="transition-transition hover:scale-110">
                            Signup
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}