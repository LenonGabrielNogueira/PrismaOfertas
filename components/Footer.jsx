'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
const Footer = () => {

    const MailIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.6654 4.66699L8.67136 8.48499C8.46796 8.60313 8.23692 8.66536 8.0017 8.66536C7.76647 8.66536 7.53544 8.60313 7.33203 8.48499L1.33203 4.66699M2.66536 2.66699H13.332C14.0684 2.66699 14.6654 3.26395 14.6654 4.00033V12.0003C14.6654 12.7367 14.0684 13.3337 13.332 13.3337H2.66536C1.92898 13.3337 1.33203 12.7367 1.33203 12.0003V4.00033C1.33203 3.26395 1.92898 2.66699 2.66536 2.66699Z" stroke="#00FFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const PhoneIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.22003 11.045C9.35772 11.1082 9.51283 11.1227 9.65983 11.086C9.80682 11.0493 9.93692 10.9636 10.0287 10.843L10.2654 10.533C10.3896 10.3674 10.5506 10.233 10.7357 10.1404C10.9209 10.0479 11.125 9.99967 11.332 9.99967H13.332C13.6857 9.99967 14.0248 10.1402 14.2748 10.3902C14.5249 10.6402 14.6654 10.9794 14.6654 11.333V13.333C14.6654 13.6866 14.5249 14.0258 14.2748 14.2758C14.0248 14.5259 13.6857 14.6663 13.332 14.6663C10.1494 14.6663 7.09719 13.4021 4.84675 11.1516C2.59631 8.90119 1.33203 5.84894 1.33203 2.66634C1.33203 2.31272 1.47251 1.97358 1.72256 1.72353C1.9726 1.47348 2.31174 1.33301 2.66536 1.33301H4.66536C5.01899 1.33301 5.35812 1.47348 5.60817 1.72353C5.85822 1.97358 5.9987 2.31272 5.9987 2.66634V4.66634C5.9987 4.87333 5.9505 5.07749 5.85793 5.26263C5.76536 5.44777 5.63096 5.60881 5.46536 5.73301L5.15336 5.96701C5.03098 6.06046 4.94471 6.1934 4.90923 6.34324C4.87374 6.49308 4.89122 6.65059 4.9587 6.78901C5.86982 8.63959 7.36831 10.1362 9.22003 11.045Z" stroke="#00FFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const MapPinIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3346 6.66634C13.3346 9.99501 9.64197 13.4617 8.40197 14.5323C8.28645 14.6192 8.14583 14.6662 8.0013 14.6662C7.85677 14.6662 7.71615 14.6192 7.60064 14.5323C6.36064 13.4617 2.66797 9.99501 2.66797 6.66634C2.66797 5.25185 3.22987 3.8953 4.23007 2.89511C5.23026 1.89491 6.58681 1.33301 8.0013 1.33301C9.41579 1.33301 10.7723 1.89491 11.7725 2.89511C12.7727 3.8953 13.3346 5.25185 13.3346 6.66634Z" stroke="#00FFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M8.0013 8.66634C9.10587 8.66634 10.0013 7.77091 10.0013 6.66634C10.0013 5.56177 9.10587 4.66634 8.0013 4.66634C6.89673 4.66634 6.0013 5.56177 6.0013 6.66634C6.0013 7.77091 6.89673 8.66634 8.0013 8.66634Z" stroke="#00FFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const FacebookIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.9987 1.66699H12.4987C11.3936 1.66699 10.3338 2.10598 9.55242 2.88738C8.77102 3.66878 8.33203 4.72859 8.33203 5.83366V8.33366H5.83203V11.667H8.33203V18.3337H11.6654V11.667H14.1654L14.9987 8.33366H11.6654V5.83366C11.6654 5.61265 11.7532 5.40068 11.9094 5.2444C12.0657 5.08812 12.2777 5.00033 12.4987 5.00033H14.9987V1.66699Z" stroke="#033b8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const InstagramIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.5846 5.41699H14.593M5.83464 1.66699H14.168C16.4692 1.66699 18.3346 3.53247 18.3346 5.83366V14.167C18.3346 16.4682 16.4692 18.3337 14.168 18.3337H5.83464C3.53345 18.3337 1.66797 16.4682 1.66797 14.167V5.83366C1.66797 3.53247 3.53345 1.66699 5.83464 1.66699ZM13.3346 9.47533C13.4375 10.1689 13.319 10.8772 12.9961 11.4995C12.6732 12.1218 12.1623 12.6265 11.536 12.9417C10.9097 13.2569 10.2 13.3667 9.50779 13.2553C8.81557 13.1439 8.1761 12.8171 7.68033 12.3213C7.18457 11.8255 6.85775 11.1861 6.74636 10.4938C6.63497 9.80162 6.74469 9.0919 7.05991 8.46564C7.37512 7.83937 7.87979 7.32844 8.50212 7.00553C9.12445 6.68261 9.83276 6.56415 10.5263 6.66699C11.2337 6.7719 11.8887 7.10154 12.3944 7.60725C12.9001 8.11295 13.2297 8.76789 13.3346 9.47533Z" stroke="#00FFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const WhatsAppIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M20 12C20 16.4183 16.4183 20 12 20C10.6818 20 9.4384 19.6818 8.3409 19.1182L4 20L4.8818 15.6591C4.3182 14.5616 4 13.3182 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
            stroke="#25D366"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M9.4 9.2C9.6 8.9 9.8 8.8 10 8.8C10.2 8.8 10.4 8.8 10.6 9.3L11.1 10.5C11.2 10.8 11.1 11 10.9 11.2L10.5 11.6C10.9 12.4 11.6 13.1 12.4 13.5L12.8 13.1C13 12.9 13.2 12.8 13.5 12.9L14.7 13.4C15.2 13.6 15.2 13.8 15.2 14C15.2 14.2 15.1 14.4 14.8 14.6C14.4 14.9 13.9 15.1 13.5 15.1C11.3 15.1 8.9 12.7 8.9 10.5C8.9 10.1 9.1 9.6 9.4 9.2Z"
            stroke="#25D366"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data.data || []);
            } catch (error) {
                console.error('Erro ao carregar categorias no Footer:', error);
            }
        };
        fetchCategories();
    }, []);

    const linkSections = [
        {
            title: "CATEGORIAS",
            links: categories.map(cat => ({ text: cat.name, path: `/category/${cat.slug}`, icon: null }))
        },
        {
            title: "EMPRESA",
            links: [
                { text: "Inicio", path: '/', icon: null },
                { text: "Sobre", path: '/sobre', icon: null },
                { text: "Contato", path: '/contato', icon: null },
                { text: "Newsletter", path: '/newsletter', icon: null },
                { text: "Política de Privacidade", path: '/privacidade', icon: null },
            ]
        },
        {
            title: "CONTATO",
            links: [
                { text: "suporte@prismaofertas.com", path: '/contato', icon: MailIcon },
                { text: "+55-48-9106-0485", path: '/contato', icon: PhoneIcon },
                { text: "Av. Des. Lauro Linhares, 1015", path: '/contato', icon: MapPinIcon }
            ]
        }
    ];

    const socialIcons = [
        { icon: FacebookIcon, link: "https://www.facebook.com" },
        { icon: InstagramIcon, link: "https://www.instagram.com" },
        { icon: WhatsAppIcon, link: "https://wa.me/554891060485" },
    ]

    return (
        <footer className="mx-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-slate-500/30 text-slate-500">
                    <div>
                        <Link href="/" className="text-4xl font-semibold text-slate-700">
                            <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.Prisma</span>Ofertas<span className="text-green-600 text-5xl leading-0"></span>
                        </Link>
                        <p className="max-w-[410px] mt-6 text-sm text-slate-600">Tudo o que você procura. O preço que você quer. Somos especialistas em transformar o 
                            seu desejo de compra na melhor experiência possível. Com uma curadoria rigorosa, unimos o maior catálogo da internet às ofertas mais imbatíveis 
                            do momento. Se você busca qualidade, variedade e a certeza de fazer um ótimo negócio, acabou de encontrar o seu lugar. Onde 
                            a excelência e a economia se encontram.
                            A <span className="font-black bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span> nasceu 
                            para ser o seu destino definitivo de 
                            compras online. Somos obcecados por qualidade e especializados em 
                            trazer até você as melhores ofertas e tudo o que você procura em um só lugar. Conectamos você ao que há de melhor no mercado, com a confiança 
                            de quem entende do assunto. Explore e sinta a diferença!</p>
                        <div className="flex items-center gap-3 mt-5">
                            {socialIcons.map((item, i) => (
                                <Link href={item.link} key={i} className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:scale-105 hover:border border-slate-300 transition rounded-full">
                                    <item.icon />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5 text-sm ">
                        {linkSections.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-medium text-slate-900 md:mb-5 mb-3">{section.title}</h3>
                                <ul className="space-y-2.5">
                                    {section.links.map((link, i) => (
                                        <li key={i} className="flex items-center gap-2 text-slate-700">
                                            {link.icon && <link.icon />}
                                            <Link href={link.path} className="
                                                                        transition-all
                                                                        duration-300
                                                                        hover:bg-gradient-to-r
                                                                        hover:from-red-600
                                                                        hover:via-cyan-700
                                                                        hover:to-violet-600
                                                                        hover:bg-clip-text
                                                                        hover:text-transparent
                                                                        hover:underline
                                                                        "
                                            >{link.text}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="py-4 text-sm text-slate-800">
                    Copyright 2025 © <span className="font-black bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span> Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;