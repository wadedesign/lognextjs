// app/components/Navbar.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, Layers, Sparkles, Activity, MoreHorizontal, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";

const NavItem = ({ icon: Icon, text, onClick }: { icon: any, text: string, onClick: () => void }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 px-3 py-2 rounded-md transition-colors"
        onClick={onClick}
    >
        <Icon className="h-5 w-5" />
        <span>{text}</span>
    </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const aiColor = "#3a86ff"; // Bright blue, AI-inspired color

  const links = [
    { icon: Layers, text: "Features" },
    { icon: Sparkles, text: "Showcase" },
    { icon: Activity, text: "Status" },
  ];

  return (
    <div className="p-4">
      <nav className={`rounded-xl shadow-lg`} style={{ backgroundColor: aiColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 flex items-center"
              >
                <Shield className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">Loguardian</span>
              </motion.div>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  {links.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 px-3 py-2 rounded-md transition-colors">
                        <link.icon className="h-5 w-5" />
                        <span>{link.text}</span>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-white">More</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {[
                          { title: "Documentation", href: "/docs", description: "Learn how to integrate Loguardian in your server." },
                          { title: "API", href: "/api", description: "Explore and integrate with our API." },
                          { title: "Support", href: "/support", description: "Get help from our support team." },
                          { title: "Blog", href: "/blog", description: "Read the latest updates and articles." },
                        ].map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{item.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <Badge variant="outline" className="ml-2 bg-white text-black">v2.1.0</Badge>
              <Badge variant="outline" className="ml-2 bg-green-400 text-black">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verified
              </Badge>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {links.map((link, index) => (
                  <NavItem key={index} icon={link.icon} text={link.text} onClick={() => setIsOpen(false)} />
                ))}
                <NavItem icon={MoreHorizontal} text="More" onClick={() => setIsOpen(false)} />
                <div className="flex items-center justify-between px-3 py-2">
                  <Badge variant="outline" className="bg-white text-black">v2.1.0</Badge>
                  <Badge variant="outline" className="bg-green-400 text-black">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;