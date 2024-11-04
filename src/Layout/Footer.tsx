
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-8 mt-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h2 className="text-3xl font-bold text-green-400">Green Garden</h2>
                        <p className="text-sm">Cultivating beauty and sustainability in every garden.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-green-400 transition duration-300">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-green-400 transition duration-300">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-green-400 transition duration-300">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-green-400 transition duration-300">
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-600 pt-4 mb-4">
                    <h3 className="text-lg font-semibold text-green-400">Quick Links</h3>
                    <ul className="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-6 mt-2">
                        <li><a href="/about" className="hover:text-green-400 transition duration-300">About Us</a></li>
                        <li><a href="/services" className="hover:text-green-400 transition duration-300">Services</a></li>
                        <li><a href="/contact" className="hover:text-green-400 transition duration-300">Contact</a></li>
                    </ul>
                </div>

                <div className="text-center">
                    <p className="text-xs mb-2">&copy; {new Date().getFullYear()} Green Garden. All rights reserved.</p>
                    <p className="text-xs">Contact us: info@greengarden.com | +1 (234) 567-890</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;