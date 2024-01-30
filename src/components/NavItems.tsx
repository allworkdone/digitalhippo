"use client"

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<
        null | number
    >(null)

    // This will be used for ESC key pressing Close.
    // When the user will press the ESC key the menu will close.
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if(e.key === "Escape"){
                setActiveIndex(null)
            }
        }

        document.addEventListener("keydown", handler);

        return () => {
            document.removeEventListener("keydown", handler)
        }
    }, [])
    
    const isAnyOpen = activeIndex !== null

    // this code will be used to make the nav:drop menu close when clicked outside
    const navRef = useRef<HTMLDivElement | null>(null)

    // this will be used to close the menu when clicked outside the menu
    useOnClickOutside(navRef, () => setActiveIndex(null))

    return (
        <div
            className="
                flex
                gap-4
                h-full
            "
            ref={navRef}
        >
            {PRODUCT_CATEGORIES.map((category,i) => {
                const handleOpen = () => {
                    if(activeIndex === i) {
                        setActiveIndex(null)
                    }
                    else {
                        setActiveIndex(i)
                    }
                }

                const isOpen = i === activeIndex

                return (
                    <NavItem 
                        category={category} 
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                        key={category.value}
                        isAnyOpen={isAnyOpen}
                    />
                )
            })}
        </div>
    );
}

export default NavItems;