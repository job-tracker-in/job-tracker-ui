import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Home() {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/dashboard');
    }
    return (
        <div className="min-h-screen bg-[#050816] text-[#E8F0FF] overflow-x-hidden">
            {/* Background */}
            <div className="fixed inset-0 bg-[linear-gradient(90deg,rgba(0,255,163,0.03)_1px,transparent_1px),linear-gradient(rgba(0,255,163,0.03)_1px,transparent_1px)] bg-[length:50px_50px] pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 py-8 px-[5%] flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-4xl font-extrabold text-[#00FFA3] uppercase">
                    Job Tracker
                </div>
                <nav className="flex gap-10">
                    <a href="#features" className="text-[#8B92B0] hover:text-[#00FFA3] transition-colors uppercase text-sm">Features</a>
                    <a href="#extension" className="text-[#8B92B0] hover:text-[#00FFA3] transition-colors uppercase text-sm">Extension</a>
                    <a href="#about" className="text-[#8B92B0] hover:text-[#00FFA3] transition-colors uppercase text-sm">About</a>
                    <Link href="/login" className="text-[#8B92B0] hover:text-[#00FFA3] transition-colors uppercase text-sm">Login</Link>
                </nav>
            </header>

            {/* Hero */}
            <section className="relative z-10 py-20 md:py-32 px-[5%] max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                    Never Lose Track<br />
                    <span className="bg-gradient-to-r from-[#00FFA3] to-[#FFD93D] bg-clip-text text-transparent">
                        Of Your Dream Job
                    </span>
                </h1>
                <p className="text-xl text-[#8B92B0] max-w-2xl mb-12 leading-relaxed">
                    A simple, powerful Kanban board to organize your job applications.
                    Track every opportunity from wishlist to offer in one clean dashboard.
                </p>
                <Link
                    href="/login"
                    className="inline-block px-12 py-5 bg-[#00FFA3] text-[#0A0E27] font-bold uppercase hover:bg-transparent hover:text-[#00FFA3] border-2 border-[#00FFA3] transition-all"
                >
                    Get Started
                </Link>
            </section>

            {/* Stats */}
            <section className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-[5%] max-w-7xl mx-auto">
                {[
                    { number: "5", label: "Status Columns" },
                    { number: "100%", label: "Free Forever" },
                    { number: "Simple", label: "No Setup Required" },
                    { number: "Fast", label: "Instant Updates" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-10 backdrop-blur-sm hover:bg-white/10 hover:border-[#00FFA3] hover:-translate-y-2 transition-all">
                        <div className="text-6xl font-extrabold text-[#00FFA3] mb-2">{stat.number}</div>
                        <div className="text-[#8B92B0] text-sm uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </section>

            {/* About */}
            <section id="about" className="relative z-10 py-32 px-[5%] max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-4">Keep It Simple</h2>
                <p className="text-center text-[#8B92B0] text-xl mb-12 max-w-3xl mx-auto">
                    Job searching is stressful enough. Your tracker should not be.
                </p>
                <div className="max-w-4xl mx-auto p-12 bg-white/5 border border-white/10 space-y-6 text-[#8B92B0] text-lg leading-relaxed">
                    <p>Job Tracker is a straightforward Kanban board designed specifically for job seekers. No bloat, no unnecessary features—just a clean way to visualize and manage your job applications.</p>
                    <p>Track your applications across five stages: Applied, Interview, Offer, Rejected and Withdrawn. Drag and drop cards between columns, add notes, and keep everything organized in one place.</p>
                    <p>Perfect for anyone actively job hunting who wants a simple, visual way to stay on top of their search without the complexity of project management tools.</p>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="relative z-10 py-32 px-[5%] max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-4">Everything You Need</h2>
                <p className="text-center text-[#8B92B0] text-xl mb-20 max-w-2xl mx-auto">
                    Simple, focused features that actually help you land your next role.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                        {
                            icon: "📊",
                            title: "Kanban Board View",
                            desc: "Visualize your entire job search pipeline at a glance. Five customizable columns: Applied, Interview, Offer, Rejected and Withdrawn. Drag and drop cards between stages to track your progress effortlessly."
                        },
                        {
                            icon: "🎯",
                            title: "Drag & Drop",
                            desc: "Move applications between status columns with simple drag and drop. Update job status instantly by dragging cards to the appropriate column. No forms, no clicks—just natural, intuitive movement."
                        },
                        {
                            icon: "📝",
                            title: "Notes & Details",
                            desc: "Add notes to each application to track important details. Store company information, job titles, locations, salary ranges, and any other details you need. Keep everything in one place for easy reference."
                        },
                        {
                            icon: "📅",
                            title: "Status History",
                            desc: "View complete history of status changes for every application. Track when you applied, when you got interviews, and see the full timeline of your job search journey. Never lose track of important dates."
                        },
                        {
                            icon: "🔗",
                            title: "Direct Job Links",
                            desc: "Save the source URL for each job posting. Click on the source to instantly open the original job listing in a new tab. Quick access to job descriptions whenever you need them for interview prep."
                        },
                        {
                            icon: "🔍",
                            title: "Filter & Sort",
                            desc: "Filter applications by status, company, or applied date. Sort your jobs to find what you need quickly. Focus on specific companies or time periods with powerful filtering options."
                        }
                    ].map((feature, i) => (
                        <div key={i} className="bg-gradient-to-br from-[#0A0E27]/80 to-[#0A0E27]/40 border border-white/10 p-12 relative overflow-hidden hover:border-[#00FFA3] hover:-translate-y-2 transition-all group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FFA3] to-[#FFD93D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            <div className="text-5xl mb-6">{feature.icon}</div>
                            <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-[#8B92B0] leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Chrome Extension */}
            <section id="extension" className="relative z-10 py-32 px-[5%] max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-[#00FFA3]/10 to-[#FFD93D]/5 border border-[#00FFA3]/30 p-12 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FFA3]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-[#00FFA3]/10 border border-[#00FFA3]/30 px-4 py-2 mb-6 text-[#00FFA3] text-sm uppercase tracking-widest font-bold">
                                <span>New</span>
                                <span className="text-xs">Chrome Extension</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                                Add Jobs in<br />
                                <span className="bg-gradient-to-r from-[#00FFA3] to-[#FFD93D] bg-clip-text text-transparent">
                                    One Click
                                </span>
                            </h2>
                            <p className="text-[#8B92B0] text-lg leading-relaxed mb-8 max-w-xl">
                                Stop copying and pasting job details manually. Our Chrome extension detects job postings on LinkedIn — and sends them straight to your tracker with a single click.
                            </p>
                            <ul className="space-y-3 mb-10">
                                {[
                                    "Auto-fills company, title, location & job URL",
                                    "Works on LinkedIn job postings",
                                    "One click to log any job instantly",
                                    "No copy-paste, no switching tabs"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#8B92B0]">
                                        <span className="text-[#00FFA3] font-bold text-lg">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="https://chromewebstore.google.com/detail/job-tracker-extension/gmpcfhjnmladcmlnpemnegmiddeebdce"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-10 py-4 bg-[#00FFA3] text-[#0A0E27] font-bold uppercase hover:bg-transparent hover:text-[#00FFA3] border-2 border-[#00FFA3] transition-all"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                                </svg>
                                Add to Chrome — Free
                            </a>
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-center gap-6">
                            <div className="w-48 h-48 bg-gradient-to-br from-[#0A0E27] to-[#0A0E27]/60 border-2 border-[#00FFA3]/40 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-7xl mb-3">🧩</div>
                                    <div className="text-[#00FFA3] font-bold text-sm uppercase tracking-widest">Extension</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-extrabold text-[#00FFA3]">1-Click</div>
                                <div className="text-[#8B92B0] text-xs uppercase tracking-widest mt-1">Job Logging</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="relative z-10 py-32 px-[5%] max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-4">How It Works</h2>
                <p className="text-center text-[#8B92B0] text-xl mb-20 max-w-2xl mx-auto">
                    Three simple steps to organize your job search
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-[#00FFA3] text-[#0A0E27] rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto">1</div>
                        <h3 className="text-2xl font-bold mb-4">Add Jobs</h3>
                        <p className="text-[#8B92B0]">Create cards for each job application with company name, position, location, and job posting link.</p>
                    </div>

                    <div className="text-center">
                        <div className="w-20 h-20 bg-[#00FFA3] text-[#0A0E27] rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto">2</div>
                        <h3 className="text-2xl font-bold mb-4">Track Progress</h3>
                        <p className="text-[#8B92B0]">Drag cards between columns as your applications move through different stages of the interview process.</p>
                    </div>

                    <div className="text-center">
                        <div className="w-20 h-20 bg-[#00FFA3] text-[#0A0E27] rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto">3</div>
                        <h3 className="text-2xl font-bold mb-4">Land Offers</h3>
                        <p className="text-[#8B92B0]">View your application history, filter by company or date, and stay organized until you land your dream job.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 py-32 px-[5%] text-center bg-gradient-to-r from-[#00FFA3]/5 to-[#FF3D71]/5 border-y border-white/10">
                <h2 className="text-5xl md:text-6xl font-extrabold mb-6">Ready to Get Organized?</h2>
                <p className="text-[#8B92B0] text-xl mb-12 max-w-3xl mx-auto">
                    Start tracking your job applications with a simple, visual Kanban board.
                    No credit card required. No complicated setup.
                </p>
                <Link
                    href="/login"
                    className="inline-block px-12 py-5 bg-[#00FFA3] text-[#0A0E27] font-bold uppercase hover:bg-transparent hover:text-[#00FFA3] border-2 border-[#00FFA3] transition-all"
                >
                    Start Tracking
                </Link>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-[5%] text-center text-[#8B92B0] text-sm border-t border-white/10">
                <p>
                    &copy; 2026 Job Tracker. A simple tool for job seekers.{' '}
                    <a href="#" className="text-[#00FFA3] hover:underline">Privacy Policy</a> |{' '}
                    <a href="#" className="text-[#00FFA3] hover:underline">Terms</a>
                </p>
            </footer>
        </div>
    );
}