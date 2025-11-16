import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import Button from "../Button";

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if(email)
        {
            console.log('Subscribed with email:', email);
            setEmail('');
            alert('Thank you for subscribing');
        }
    };
    const quicklinks = [
        {name: 'Home', href: '/'},
        {name: 'Products', href: '/products'},
        {name: 'Contact', href:'/contact'}
    ];
    const customerServiceLinks = [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
    ];
    const contactInfo = [
        {
            icon: (
              <MapPin />
            ),
            text: '123 Business Street, Cit, State 12345'
        },
        { 
      icon: (
        <Phone/>
      ), 
      text: '+1 (555) 123-4567' 
    },
     { 
      icon: (
        <Mail />
      ), 
      text: 'hello@yourapp.com' 
    },
    ];
    const sociallinks = [
        {
          name: 'Facebook',
          href: '#',
          icon: <Facebook/>,
        },
        {
      name: 'Twitter',
      href: '#',
      icon: <Twitter/>,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: <Instagram/>,
    },
    ];
    return(
        <footer className="bg-[#EFE6D1] text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/**Main footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Contact Us*/}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            {contactInfo.map((contact, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <span className="text-black mt-0.5 flex-shrink-0">
                                        {contact.icon}
                                    </span>
                                    <span className="text-black/80 text-sm leading-relaxed">
                                        {contact.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/*Quick links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick links</h4>
                        <ul className="space-y-3">
                            {quicklinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                    href={link.href}
                                    className="text-black/80 hover:text-black transition-colors duration-200 hove:underline">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                            <h5 className="text-lg font-semibold mb-3">Follow us</h5>
                            <div className="flex space-x-4 mb-6">
                                {sociallinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="text-black/80 hover:text-black transition-colors duration-200"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                    {/*Customer Service */}
                    
                        <h4 className="text-lg font-semibold mt-4 mb-4">Customer Service</h4>
                        <ul className="space-y-3">
                            {customerServiceLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-black/80 hover:text-black transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/*Newsletter Subscription */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h4>
                        <p className="text-black/80 mb-4 text-sm">
                        Sign up to be the first to receive latest news about our products.
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <div>
                                <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-ful px-4 py-3 rounded-lg bg-blue/10 border border-black
                                placeholder-black/ text-black focus:outline-none focus:ring-2 focus:ring-white/50
                                "
                                required />
                            </div>
                            <Button
                            type="submit"
                            className="w-full py-3 px-6  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#B88E2F]"
                             >
                                Subscribe
                             </Button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </footer>

    )
}
export default Footer;
