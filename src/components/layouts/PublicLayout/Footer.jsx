
import React from 'react';
import LogoFooter from '@/components/svg/LogoFooter';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';


const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-8 px-4 md:px-16">
            <div className="w-full max-w-[1700px] mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="flex flex-col space-y-4">
                        <LogoFooter />
                        <p className="text-sm mt-4">
                            Let us build your career together. Be the first person to transform yourself with our unique & world class corporate level trainings.
                        </p>

                        <div className="mt-6">
                            <h3 className="font-bold text-lg mb-4">Subscribe Our Newsletter</h3>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your Email address"
                                    className="bg-blue-900 border border-gray-400 px-3 py-2 text-sm flex-grow"
                                />
                                <button className="bg-orange-500 px-4 py-2 text-white">
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className="md:mx-auto">
                        <h1 className="text-3xl font-bold mb-4">
                            <span className="text-white">Quick</span> <span style={{ color: '#F98149' }}>Links</span>
                        </h1>

                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-orange-300">Home</a></li>
                            <li><a href="#" className="hover:text-orange-300">Our Story</a></li>
                            <li><a href="#" className="hover:text-orange-300">Best Courses</a></li>
                            <li><a href="#" className="hover:text-orange-300">Your FAQ's</a></li>
                            <li><a href="#" className="hover:text-orange-300">Cancellation & Refunds</a></li>
                            <li><a href="#" className="hover:text-orange-300">Contact US</a></li>
                        </ul>
                    </div>

                    {/* Right Column */}
                    <div>
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="text-white">Contact </span>
                            <span style={{ color: '#F98149' }}>Us</span>
                        </h3>
                        <div className="space-y-4">
                            <div className="flex space-x-2">
                                <a href="#" className="hover:text-orange-300">< MapPin size={16} stroke="white" fill="white" /></a>

                                <p className="text-sm">
                                    Navakethan Complex, 6th Floor, 605, 606 A&P opp. Clock Tower, SD Road, Secunderabad, Telangana 500003
                                </p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <a href="#" className="hover:text-orange-300"><Mail color="white" size={16} /></a>
                                <p className="text-sm">info@ezyskills.in</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <a href="#" className="hover:text-orange-300">< Phone size={16} stroke="white" fill="white" /></a>
                                <div>
                                    <p className="text-sm">+91 8428448903</p>
                                    <p className="text-sm">+91 9475484959</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 pt-4 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <a href="#" className="text-xs hover:text-orange-300">Terms & Conditions</a>
                        <a href="#" className="text-xs hover:text-orange-300">Privacy Policy</a>
                    </div>

                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-orange-300"><Facebook size={16} stroke="white" fill="white" /></a>
                        <a href="#" className="hover:text-orange-300"><Twitter size={16} stroke="white" fill="white" /></a>
                        <a href="#" className="hover:text-orange-300"><Instagram size={16} stroke="white" /></a>
                        <a href="#" className="hover:text-orange-300"><Linkedin size={16} /></a>
                        <a href="#" className="hover:text-orange-300"><Youtube size={16} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;