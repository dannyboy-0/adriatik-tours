import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Star, Heart, Calendar, Users, Globe, ChevronDown, ChevronRight, ChevronLeft, Filter, X, Check, Mountain, Waves, Utensils, Building2, Sparkles, Camera, Compass, Sun, Award, Shield, MessageCircle, Clock, ArrowUpRight, Plus, Minus, CreditCard, User, Briefcase, BarChart3, Settings, Bell, LogOut, Eye, EyeOff, ArrowRight, Languages, BadgeCheck, TrendingUp, Edit3, Upload } from 'lucide-react';

// ============= MOCK DATA =============
const CATEGORIES = [
  { id: 'cultural', label: 'Cultural & Historical', icon: Building2 },
  { id: 'beach', label: 'Riviera & Beach', icon: Waves },
  { id: 'hiking', label: 'Hiking & Mountains', icon: Mountain },
  { id: 'food', label: 'Food & Wine', icon: Utensils },
  { id: 'daytrip', label: 'Day Trips', icon: Sun },
  { id: 'multiday', label: 'Multi-day', icon: Compass },
  { id: 'crossborder', label: 'Cross-border', icon: Globe },
  { id: 'adventure', label: 'Adventure', icon: Sparkles },
  { id: 'city', label: 'City Tours', icon: Building2 },
  { id: 'photo', label: 'Photography', icon: Camera },
];

const TOURS = [
  {
    id: 1, title: 'Theth to Valbona — Legendary Alpine Crossing', country: 'Albania', region: 'Albanian Alps',
    city: 'Theth', category: 'hiking', duration: '3 days', durationHours: 72,
    price: 285, rating: 4.94, reviews: 287, groupSize: 12, difficulty: 'moderate',
    languages: ['English', 'Albanian', 'Italian'], instant: true, cancellation: 'Free 48h',
    agentId: 1, image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Jezerski_Vrh_%282694%29_sa_Karanfila_%282480%29.jpg',
    badge: 'Guest Favorite',
    description: 'Cross the legendary Valbona Pass on foot through one of Europe\'s last truly wild mountain landscapes. Stay in family-run guesthouses, share meals with shepherds, and witness the dramatic limestone peaks of the Accursed Mountains.',
  },
  {
    id: 2, title: 'Berat — UNESCO Old Town & Castle Wine Walk', country: 'Albania', region: 'Central',
    city: 'Berat', category: 'cultural', duration: '6 hours', durationHours: 6,
    price: 65, rating: 4.89, reviews: 412, groupSize: 8, difficulty: 'easy',
    languages: ['English', 'Italian', 'German'], instant: true, cancellation: 'Free 24h',
    agentId: 2, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Berat_57.jpg/3840px-Berat_57.jpg',
    badge: 'Top Rated',
    description: 'Wander the city of a thousand windows with a local historian. Climb to the still-inhabited castle, taste organic wines from the Tomori valley, and end with a sunset over the Osum river.',
  },
  {
    id: 3, title: 'Ksamil & Butrint — Riviera Day Escape', country: 'Albania', region: 'Ionian Coast',
    city: 'Sarandë', category: 'beach', duration: '8 hours', durationHours: 8,
    price: 75, rating: 4.82, reviews: 624, groupSize: 14, difficulty: 'easy',
    languages: ['English', 'Italian'], instant: true, cancellation: 'Free 24h',
    agentId: 3, image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Ksamill-1.jpg',
    description: 'Snorkel the turquoise islets of Ksamil before exploring Butrint, the layered ancient city where Greek, Roman, Byzantine, and Venetian ruins overlap in a single afternoon.',
  },
  {
    id: 4, title: 'Pristina, Prizren & Gracanica — Kosovo Heritage Loop', country: 'Kosovo', region: 'Pristina',
    city: 'Pristina', category: 'cultural', duration: '10 hours', durationHours: 10,
    price: 95, rating: 4.91, reviews: 198, groupSize: 8, difficulty: 'easy',
    languages: ['English', 'German'], instant: true, cancellation: 'Free 48h',
    agentId: 4, image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Prishtina_seen_from_Mother_Theresa_Cathedral.jpg',
    badge: 'Top Rated',
    description: 'Three centuries in a day: Newborn Pristina, the Ottoman bridges and tekkes of Prizren, and the frescoes of Gracanica monastery — a UNESCO-protected jewel of medieval Serbian art.',
  },
  {
    id: 5, title: 'Rugova Canyon Via Ferrata & Waterfalls', country: 'Kosovo', region: 'Peja',
    city: 'Peja', category: 'adventure', duration: '7 hours', durationHours: 7,
    price: 110, rating: 4.96, reviews: 156, groupSize: 6, difficulty: 'moderate',
    languages: ['English', 'Albanian'], instant: false, cancellation: 'Free 48h',
    agentId: 5, image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Rugova_Canyon.jpg',
    description: 'Climb cable-equipped routes carved into limestone walls above the Rugova river, then cool off at the Drelaj waterfalls. Certified mountain guides, full safety equipment included.',
  },
  {
    id: 6, title: 'Albania + Kosovo — 7-Day Grand Balkan Circuit', country: 'Cross-border', region: 'Multiple',
    city: 'Tirana', category: 'crossborder', duration: '7 days', durationHours: 168,
    price: 1190, rating: 4.87, reviews: 92, groupSize: 14, difficulty: 'moderate',
    languages: ['English', 'German'], instant: false, cancellation: 'Strict',
    agentId: 1, image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Gjirokaster_2016-2017.jpg',
    badge: 'Editor\'s Pick',
    description: 'A curated circuit through both countries — Tirana, Berat, Gjirokastër, Prizren, Pristina, Peja, and the Albanian Alps. Boutique guesthouses, all transfers, and a single dedicated guide throughout.',
  },
  {
    id: 7, title: 'Mrizi i Zanave — Slow Food Farm Lunch & Tour', country: 'Albania', region: 'Northern',
    city: 'Lezhë', category: 'food', duration: '5 hours', durationHours: 5,
    price: 85, rating: 4.97, reviews: 341, groupSize: 10, difficulty: 'easy',
    languages: ['English', 'Italian'], instant: true, cancellation: 'Free 48h',
    agentId: 2, image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Elbasan_tav%C3%AB_me_mish_qengji.jpg',
    badge: 'Guest Favorite',
    description: 'Visit the farm that put Albanian gastronomy on the international map. A long lunch of fifteen courses cooked from the surrounding valley, paired with biodynamic Kallmet wine.',
  },
  {
    id: 8, title: 'Tirana After Dark — Bunkers, Bars & Brutalism', country: 'Albania', region: 'Tirana',
    city: 'Tirana', category: 'city', duration: '4 hours', durationHours: 4,
    price: 42, rating: 4.78, reviews: 503, groupSize: 12, difficulty: 'easy',
    languages: ['English'], instant: true, cancellation: 'Free 24h',
    agentId: 3, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Skanderbeg_square_tirana_2016.jpg/3840px-Skanderbeg_square_tirana_2016.jpg',
    description: 'A walking tour through Tirana\'s painted Soviet-era blocks, the Bunk\'Art atomic shelter, and the new wave of natural-wine bars in Blloku. Ends with a rakia tasting.',
  },
  {
    id: 9, title: 'Vjosa River Rafting — Europe\'s Last Wild River', country: 'Albania', region: 'Southern',
    city: 'Përmet', category: 'adventure', duration: '6 hours', durationHours: 6,
    price: 70, rating: 4.85, reviews: 234, groupSize: 8, difficulty: 'moderate',
    languages: ['English', 'Italian'], instant: true, cancellation: 'Free 48h',
    agentId: 5, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Vjosa_river_mouth.jpg/3840px-Vjosa_river_mouth.jpg',
    description: 'Raft the newly-protected Vjosa, Europe\'s only undammed wild river. Class II–III rapids, a swim in the thermal springs of Bënjë, and a riverside lunch.',
  },
];

const AGENTS = [
  {
    id: 1, name: 'Outdoor Albania', tagline: 'Mountain experts since 2008',
    location: 'Tirana, Albania', languages: ['English', 'Italian', 'Albanian'],
    rating: 4.92, reviews: 1284, tours: 18, years: 17,
    verified: true, license: 'LN-2816-03-2017', responseTime: '< 2 hours',
    badges: ['Top Rated', 'Mountain Certified', 'ATOA Member', 'Sustainable'],
    image: 'https://i.pravatar.cc/400?img=12',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Jezerski_Vrh_%282694%29_sa_Karanfila_%282480%29.jpg',
    bio: 'Founded in 2008 by mountain guide Endrit Hoxha, Outdoor Albania has been pioneering responsible adventure travel in the Albanian Alps and beyond. Our team of certified guides speak fluent English, Italian, and Albanian.',
    specialties: ['Hiking', 'Adventure', 'Cross-border'],
  },
  {
    id: 2, name: 'Berat Heritage Tours', tagline: 'Stories the stones still tell',
    location: 'Berat, Albania', languages: ['English', 'Italian', 'German'],
    rating: 4.89, reviews: 892, tours: 12, years: 9,
    verified: true, license: 'LN-4421-08-2016', responseTime: '< 1 hour',
    badges: ['Top Rated', 'ATOA Member'],
    image: 'https://i.pravatar.cc/400?img=5',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Berat_57.jpg/3840px-Berat_57.jpg',
    bio: 'A small family-run agency in Berat\'s historic Mangalem quarter, specializing in cultural and food experiences across central Albania.',
    specialties: ['Cultural', 'Food & Wine', 'City Tours'],
  },
  {
    id: 3, name: 'Adriatic Albania', tagline: 'Coast, culture, character',
    location: 'Sarandë, Albania', languages: ['English', 'Italian'],
    rating: 4.81, reviews: 1156, tours: 22, years: 11,
    verified: true, license: 'LN-1124-05-2014', responseTime: '< 3 hours',
    badges: ['Top Rated'],
    image: 'https://i.pravatar.cc/400?img=68',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Ksamill-1.jpg',
    bio: 'Riviera specialists with a network of local boat captains, beach clubs, and inland village hosts from Vlorë to the Greek border.',
    specialties: ['Beach', 'Day Trips', 'Cultural'],
  },
  {
    id: 4, name: 'Kosovo Compass', tagline: 'Pristina locals, deep knowledge',
    location: 'Pristina, Kosovo', languages: ['English', 'German', 'Albanian'],
    rating: 4.93, reviews: 487, tours: 14, years: 7,
    verified: true, license: 'KS-TO-0089-2018', responseTime: '< 1 hour',
    badges: ['Top Rated', 'Sustainable'],
    image: 'https://i.pravatar.cc/400?img=33',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Prishtina_seen_from_Mother_Theresa_Cathedral.jpg',
    bio: 'A young Kosovar agency founded by three Pristina natives. We focus on contemporary Kosovo — the art scene, the food, the post-war rebirth — alongside the heritage sites.',
    specialties: ['Cultural', 'City Tours', 'Cross-border'],
  },
  {
    id: 5, name: 'Bjeshkët Adventures', tagline: 'Rugova\'s wild side',
    location: 'Peja, Kosovo', languages: ['English', 'Albanian'],
    rating: 4.95, reviews: 312, tours: 9, years: 6,
    verified: true, license: 'KS-TO-0142-2019', responseTime: '< 2 hours',
    badges: ['Top Rated', 'Mountain Certified'],
    image: 'https://i.pravatar.cc/400?img=51',
    cover: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Rugova_Canyon.jpg',
    bio: 'Operated by IFMGA-certified mountain guides based in Peja. Specialized in via ferrata, technical hiking, and the Peaks of the Balkans cross-border trek.',
    specialties: ['Adventure', 'Hiking', 'Cross-border'],
  },
];

const REVIEWS = [
  { id: 1, tourId: 1, author: 'Marco R.', country: '🇮🇹', rating: 5, date: 'Sep 2025', text: 'The Theth-Valbona crossing was the highlight of our Balkans trip. Endrit knew every shepherd by name and the guesthouse food was unforgettable.' },
  { id: 2, tourId: 1, author: 'Hannah K.', country: '🇩🇪', rating: 5, date: 'Aug 2025', text: 'Genuinely tough but the views are something else. Bring trekking poles, listen to the guide, and stay one extra night in Valbona.' },
  { id: 3, tourId: 1, author: 'Olivia T.', country: '🇬🇧', rating: 4, date: 'Jul 2025', text: 'Beautiful crossing, well organized. I\'d suggest adding more vegetarian options at the second guesthouse, but otherwise excellent.' },
];

// ============= APP =============
export default function App() {
  const [route, setRoute] = useState({ page: 'home', params: {} });
  const [wishlist, setWishlist] = useState(new Set());
  const [user, setUser] = useState(null); // null | { type: 'client'|'agent', name, email }
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [filters, setFilters] = useState({
    country: null, priceMax: 1500, duration: null, language: null,
    rating: null, instant: false, difficulty: null,
  });

  const navigate = (page, params = {}) => {
    setRoute({ page, params });
    window.scrollTo(0, 0);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredTours = useMemo(() => {
    return TOURS.filter((t) => {
      if (activeCategory && t.category !== activeCategory) return false;
      if (filters.country && t.country !== filters.country) return false;
      if (filters.priceMax && t.price > filters.priceMax) return false;
      if (filters.language && !t.languages.includes(filters.language)) return false;
      if (filters.rating && t.rating < filters.rating) return false;
      if (filters.instant && !t.instant) return false;
      if (filters.difficulty && t.difficulty !== filters.difficulty) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.city.toLowerCase().includes(q) && !t.country.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [activeCategory, filters, searchQuery]);

  return (
    <div className="min-h-screen bg-white font-sans" style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', system-ui, sans-serif; }
        .font-serif { font-family: 'Instrument Serif', Georgia, serif; font-weight: 400; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>

      <Header
        user={user} setUser={setUser} navigate={navigate}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        wishlistCount={wishlist.size}
      />

      {route.page === 'home' && (
        <HomePage
          tours={TOURS} agents={AGENTS} navigate={navigate}
          wishlist={wishlist} toggleWishlist={toggleWishlist}
          activeCategory={activeCategory} setActiveCategory={setActiveCategory}
        />
      )}

      {route.page === 'browse' && (
        <BrowsePage
          tours={filteredTours} navigate={navigate}
          wishlist={wishlist} toggleWishlist={toggleWishlist}
          activeCategory={activeCategory} setActiveCategory={setActiveCategory}
          filters={filters} setFilters={setFilters}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        />
      )}

      {route.page === 'tour' && (
        <TourPage
          tour={TOURS.find(t => t.id === route.params.id)}
          agent={AGENTS.find(a => a.id === TOURS.find(t => t.id === route.params.id)?.agentId)}
          navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist}
          user={user}
        />
      )}

      {route.page === 'agents' && (
        <AgentsPage agents={AGENTS} navigate={navigate} />
      )}

      {route.page === 'agent' && (
        <AgentPage
          agent={AGENTS.find(a => a.id === route.params.id)}
          tours={TOURS.filter(t => t.agentId === route.params.id)}
          navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist}
        />
      )}

      {route.page === 'booking' && (
        <BookingPage
          tour={TOURS.find(t => t.id === route.params.id)}
          agent={AGENTS.find(a => a.id === TOURS.find(t => t.id === route.params.id)?.agentId)}
          navigate={navigate} user={user} setUser={setUser}
        />
      )}

      {route.page === 'auth' && (
        <AuthPage navigate={navigate} setUser={setUser} initialType={route.params.type} />
      )}

      {route.page === 'dashboard-client' && user?.type === 'client' && (
        <ClientDashboard user={user} navigate={navigate} wishlist={wishlist} />
      )}

      {route.page === 'dashboard-agent' && user?.type === 'agent' && (
        <AgentDashboard user={user} navigate={navigate} />
      )}

      <Footer navigate={navigate} />
    </div>
  );
}

// ============= HEADER =============
function Header({ user, setUser, navigate, searchQuery, setSearchQuery, wishlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E9E2D5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Adriatik Tours" className="h-9 w-auto group-hover:scale-105 transition-transform" />
          <span className="font-serif text-2xl tracking-tight text-[#1F1D1B]">adriatik tours</span>
        </button>

        <div className="hidden lg:flex items-center bg-white border border-[#E9E2D5] rounded-full px-2 py-2 shadow-sm hover:shadow-md transition-shadow w-[480px]">
          <div className="px-4 py-1 border-r border-[#E9E2D5]">
            <div className="text-[11px] font-semibold text-[#1F1D1B]">Where</div>
            <input
              type="text"
              placeholder="Albania, Kosovo, anywhere..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); }}
              className="text-[13px] text-[#5C5A57] outline-none bg-transparent w-full"
            />
          </div>
          <div className="px-4 py-1 border-r border-[#E9E2D5] flex-1">
            <div className="text-[11px] font-semibold text-[#1F1D1B]">When</div>
            <div className="text-[13px] text-[#5C5A57]">Any week</div>
          </div>
          <div className="px-4 py-1 flex-1">
            <div className="text-[11px] font-semibold text-[#1F1D1B]">Travelers</div>
            <div className="text-[13px] text-[#5C5A57]">Add guests</div>
          </div>
          <button
            onClick={() => navigate('browse')}
            className="ml-auto w-10 h-10 rounded-full bg-[#C75A3F] hover:bg-[#B44E35] text-white flex items-center justify-center transition-colors"
          >
            <Search size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('agents')}
            className="hidden md:block text-sm font-medium text-[#1F1D1B] hover:bg-[#E9E2D5]/60 px-4 py-2 rounded-full transition-colors"
          >
            Browse agents
          </button>
          {!user ? (
            <button
              onClick={() => navigate('auth', { type: 'agent' })}
              className="hidden md:block text-sm font-medium text-[#1F1D1B] hover:bg-[#E9E2D5]/60 px-4 py-2 rounded-full transition-colors"
            >
              List your tours
            </button>
          ) : null}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 border border-[#E9E2D5] rounded-full pl-3 pr-1 py-1 hover:shadow-md transition-shadow bg-white"
            >
              <div className="w-7 h-7 rounded-full bg-[#1F1D1B] flex items-center justify-center text-white text-xs font-semibold">
                {user ? user.name[0].toUpperCase() : <User size={14} />}
              </div>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-[#E9E2D5] py-2 fade-in">
                {!user ? (
                  <>
                    <button onClick={() => { navigate('auth', { type: 'client' }); setMenuOpen(false); }}
                      className="w-full text-left px-5 py-3 text-sm font-semibold text-[#1F1D1B] hover:bg-[#F8F4ED]">
                      Sign up
                    </button>
                    <button onClick={() => { navigate('auth', { type: 'client' }); setMenuOpen(false); }}
                      className="w-full text-left px-5 py-3 text-sm text-[#5C5A57] hover:bg-[#F8F4ED]">
                      Log in
                    </button>
                    <div className="border-t border-[#E9E2D5] my-1" />
                    <button onClick={() => { navigate('auth', { type: 'agent' }); setMenuOpen(false); }}
                      className="w-full text-left px-5 py-3 text-sm text-[#5C5A57] hover:bg-[#F8F4ED]">
                      List your tours
                    </button>
                    <button className="w-full text-left px-5 py-3 text-sm text-[#5C5A57] hover:bg-[#F8F4ED]">
                      Help center
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-5 py-2 border-b border-[#E9E2D5] mb-1">
                      <div className="text-sm font-semibold text-[#1F1D1B]">{user.name}</div>
                      <div className="text-xs text-[#5C5A57]">{user.type === 'agent' ? 'Tour Agent' : 'Traveler'}</div>
                    </div>
                    <button
                      onClick={() => { navigate(user.type === 'agent' ? 'dashboard-agent' : 'dashboard-client'); setMenuOpen(false); }}
                      className="w-full text-left px-5 py-2.5 text-sm hover:bg-[#F8F4ED] flex items-center gap-2">
                      <BarChart3 size={14} /> Dashboard
                    </button>
                    {user.type === 'client' && (
                      <button onClick={() => setMenuOpen(false)} className="w-full text-left px-5 py-2.5 text-sm hover:bg-[#F8F4ED] flex items-center gap-2">
                        <Heart size={14} /> Wishlist {wishlistCount > 0 && <span className="ml-auto text-xs">({wishlistCount})</span>}
                      </button>
                    )}
                    <button className="w-full text-left px-5 py-2.5 text-sm hover:bg-[#F8F4ED] flex items-center gap-2">
                      <Settings size={14} /> Settings
                    </button>
                    <div className="border-t border-[#E9E2D5] my-1" />
                    <button onClick={() => { setUser(null); navigate('home'); setMenuOpen(false); }}
                      className="w-full text-left px-5 py-2.5 text-sm hover:bg-[#F8F4ED] flex items-center gap-2 text-[#5C5A57]">
                      <LogOut size={14} /> Log out
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// ============= HOME PAGE =============
function HomePage({ tours, agents, navigate, wishlist, toggleWishlist, activeCategory, setActiveCategory }) {
  return (
    <div className="fade-in">
      {/* HERO */}
      <section className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-12 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#E9E2D5] px-3 py-1.5 rounded-full text-xs font-medium text-[#1F1D1B] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#3F7D58]"></span>
              327 verified local agents · 1,840+ tours
            </div>
            <h1 className="font-serif text-[64px] lg:text-[88px] leading-[0.95] tracking-tight text-[#1F1D1B] mb-6">
              The two countries<br />
              <em className="italic text-[#C75A3F]">no algorithm</em><br />
              has figured out yet.
            </h1>
            <p className="text-lg text-[#5C5A57] mb-8 max-w-xl leading-relaxed">
              A marketplace built only for Albania and Kosovo — curated by local guides, priced fairly,
              and designed for the kind of trip that actually surprises you.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('browse')}
                className="bg-[#1F1D1B] text-white px-7 py-3.5 rounded-full font-medium hover:bg-[#C75A3F] transition-colors flex items-center gap-2 group"
              >
                Browse tours
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </button>
              <button
                onClick={() => navigate('agents')}
                className="border border-[#1F1D1B] text-[#1F1D1B] px-7 py-3.5 rounded-full font-medium hover:bg-[#1F1D1B] hover:text-white transition-colors"
              >
                Meet the agents
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Berat_57.jpg/3840px-Berat_57.jpg" alt="Berat Albania" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 max-w-[260px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  {agents.slice(0, 3).map((a) => (
                    <img key={a.id} src={a.image} alt={a.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <span className="text-xs font-medium text-[#1F1D1B]">+24 agents online</span>
              </div>
              <p className="text-xs text-[#5C5A57] leading-snug">
                Average response time on inquiries: under 2 hours.
              </p>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#C75A3F] text-white rounded-2xl shadow-xl p-4 rotate-3">
              <div className="font-serif text-3xl">15%</div>
              <div className="text-[10px] uppercase tracking-wider opacity-90">commission, not 30</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY RAIL */}
      <section className="border-y border-[#E9E2D5] bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-1 overflow-x-auto py-5 scrollbar-hide">
            <button
              onClick={() => { setActiveCategory(null); navigate('browse'); }}
              className={`flex flex-col items-center gap-2 px-5 py-2 min-w-[88px] rounded-xl transition-colors ${!activeCategory ? 'bg-[#F8F4ED]' : 'hover:bg-[#F8F4ED]'}`}
            >
              <Sparkles size={22} className="text-[#1F1D1B]" />
              <span className="text-xs font-medium text-[#1F1D1B] whitespace-nowrap">All</span>
            </button>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); navigate('browse'); }}
                  className={`flex flex-col items-center gap-2 px-5 py-2 min-w-[88px] rounded-xl transition-colors ${activeCategory === cat.id ? 'bg-[#F8F4ED]' : 'hover:bg-[#F8F4ED]'}`}
                >
                  <Icon size={22} className="text-[#5C5A57]" />
                  <span className="text-xs font-medium text-[#5C5A57] whitespace-nowrap">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#C75A3F] font-semibold mb-2">Hand-picked this week</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-[#1F1D1B]">Tours travelers can't stop talking about</h2>
          </div>
          <button onClick={() => navigate('browse')} className="hidden md:flex items-center gap-1 text-sm font-medium text-[#1F1D1B] hover:gap-2 transition-all">
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {tours.slice(0, 6).map((tour, i) => (
            <div key={tour.id} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <TourCard tour={tour} navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist} />
            </div>
          ))}
        </div>
      </section>

      {/* COUNTRY SPLIT */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { country: 'Albania', tagline: 'Adriatic shores. Alpine villages. UNESCO old towns.', count: 1483, image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Ksamill-1.jpg' },
            { country: 'Kosovo', tagline: 'Balkan rebirth. Mountain canyons. Ottoman bazaars.', count: 357, image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Rugova_Canyon.jpg' },
          ].map((c) => (
            <button
              key={c.country}
              onClick={() => navigate('browse')}
              className="group relative aspect-[16/9] rounded-3xl overflow-hidden text-left"
            >
              <img src={c.image} alt={c.country} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="text-xs uppercase tracking-[0.2em] opacity-80 mb-2">{c.count.toLocaleString()} experiences</div>
                <h3 className="font-serif text-5xl mb-2">{c.country}</h3>
                <p className="text-sm opacity-90 max-w-md">{c.tagline}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* AGENTS PREVIEW */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#C75A3F] font-semibold mb-2">The people behind every booking</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-[#1F1D1B] max-w-2xl">No anonymous suppliers. Real local agents.</h2>
          </div>
          <button onClick={() => navigate('agents')} className="hidden md:flex items-center gap-1 text-sm font-medium text-[#1F1D1B] hover:gap-2 transition-all">
            All agents <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.slice(0, 3).map((agent) => (
            <AgentCard key={agent.id} agent={agent} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="bg-[#1F1D1B] text-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { v: '15%', l: 'Commission to agents', s: 'half what Viator charges' },
              { v: '4.91', l: 'Avg. tour rating', s: 'across 17,400 reviews' },
              { v: '< 2h', l: 'Agent reply time', s: 'nights and weekends included' },
              { v: '100%', l: 'Licensed agents', s: 'verified every 12 months' },
            ].map((s, i) => (
              <div key={i} className="border-l border-white/15 pl-5">
                <div className="font-serif text-6xl text-[#E9C28A] mb-2">{s.v}</div>
                <div className="text-sm font-medium mb-1">{s.l}</div>
                <div className="text-xs text-white/60">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============= TOUR CARD =============
function TourCard({ tour, navigate, wishlist, toggleWishlist }) {
  const [imgIdx, setImgIdx] = useState(0);
  const isWishlisted = wishlist.has(tour.id);
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-[#E9E2D5]" onClick={() => navigate('tour', { id: tour.id })}>
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        {tour.badge && (
          <div className="absolute top-3 left-3 bg-white rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1F1D1B] flex items-center gap-1">
            <Award size={11} className="text-[#C75A3F]" /> {tour.badge}
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(tour.id); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
        >
          <Heart size={18} className={isWishlisted ? 'text-[#C75A3F] fill-[#C75A3F]' : 'text-white'} strokeWidth={2.2} />
        </button>
        {tour.instant && (
          <div className="absolute bottom-3 left-3 bg-[#1F1D1B]/85 backdrop-blur-sm text-white rounded-full px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1">
            <Sparkles size={10} /> Instant booking
          </div>
        )}
      </div>
      <div onClick={() => navigate('tour', { id: tour.id })}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-1 text-xs text-[#5C5A57]">
            <MapPin size={12} /> {tour.city}, {tour.country}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Star size={12} className="fill-[#1F1D1B] text-[#1F1D1B]" />
            <span className="font-semibold text-[#1F1D1B]">{tour.rating}</span>
            <span className="text-[#5C5A57]">({tour.reviews})</span>
          </div>
        </div>
        <h3 className="font-medium text-[#1F1D1B] leading-snug mb-1 line-clamp-2">{tour.title}</h3>
        <div className="flex items-center gap-3 text-xs text-[#5C5A57] mb-2">
          <span className="flex items-center gap-1"><Clock size={11} /> {tour.duration}</span>
          <span className="flex items-center gap-1"><Users size={11} /> ≤{tour.groupSize}</span>
          <span className="flex items-center gap-1"><Languages size={11} /> {tour.languages.length}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-semibold text-[#1F1D1B]">€{tour.price}</span>
          <span className="text-xs text-[#5C5A57]">per person</span>
        </div>
      </div>
    </div>
  );
}

// ============= AGENT CARD =============
function AgentCard({ agent, navigate }) {
  return (
    <button onClick={() => navigate('agent', { id: agent.id })} className="group text-left bg-white rounded-2xl overflow-hidden border border-[#E9E2D5] hover:shadow-lg transition-shadow">
      <div className="relative h-32 overflow-hidden">
        <img src={agent.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-5 -mt-12 relative">
        <img src={agent.image} alt={agent.name} className="w-20 h-20 rounded-full border-4 border-white object-cover mb-3 shadow-md" />
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="font-serif text-2xl text-[#1F1D1B]">{agent.name}</h3>
          {agent.verified && <BadgeCheck size={16} className="text-[#3F7D58] fill-[#3F7D58]/20" />}
        </div>
        <p className="text-xs text-[#5C5A57] mb-3">{agent.tagline}</p>
        <div className="flex items-center gap-3 text-xs text-[#5C5A57] mb-3">
          <span className="flex items-center gap-1"><Star size={11} className="fill-[#1F1D1B] text-[#1F1D1B]" /><strong className="text-[#1F1D1B]">{agent.rating}</strong> ({agent.reviews})</span>
          <span>·</span>
          <span>{agent.tours} tours</span>
          <span>·</span>
          <span>{agent.years}y</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {agent.badges.slice(0, 2).map((b) => (
            <span key={b} className="text-[10px] bg-[#F8F4ED] text-[#1F1D1B] px-2 py-1 rounded-full font-medium">{b}</span>
          ))}
        </div>
      </div>
    </button>
  );
}

// ============= BROWSE PAGE =============
function BrowsePage({ tours, navigate, wishlist, toggleWishlist, activeCategory, setActiveCategory, filters, setFilters, searchQuery, setSearchQuery }) {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  const sorted = useMemo(() => {
    const arr = [...tours];
    if (sortBy === 'price-low') arr.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') arr.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [tours, sortBy]);

  const activeFilterCount = Object.values(filters).filter(v => v !== null && v !== false && v !== 1500).length;

  return (
    <div className="fade-in">
      {/* CATEGORY RAIL */}
      <section className="border-b border-[#E9E2D5] bg-white sticky top-20 z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4 py-5">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1">
              <button
                onClick={() => setActiveCategory(null)}
                className={`flex flex-col items-center gap-1.5 px-4 py-1 min-w-[80px] rounded-xl transition-colors ${!activeCategory ? 'border-b-2 border-[#1F1D1B] text-[#1F1D1B]' : 'text-[#5C5A57] hover:text-[#1F1D1B]'}`}
              >
                <Sparkles size={20} />
                <span className="text-[11px] font-medium whitespace-nowrap">All</span>
              </button>
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(active ? null : cat.id)}
                    className={`flex flex-col items-center gap-1.5 px-4 py-1 min-w-[80px] rounded-xl transition-colors ${active ? 'border-b-2 border-[#1F1D1B] text-[#1F1D1B]' : 'text-[#5C5A57] hover:text-[#1F1D1B]'}`}
                  >
                    <Icon size={20} />
                    <span className="text-[11px] font-medium whitespace-nowrap">{cat.label}</span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 border border-[#E9E2D5] rounded-xl px-4 py-2.5 text-sm font-medium hover:border-[#1F1D1B] transition-colors whitespace-nowrap bg-white"
            >
              <Filter size={14} /> Filters
              {activeFilterCount > 0 && (
                <span className="bg-[#1F1D1B] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-4xl text-[#1F1D1B] mb-1">
              {activeCategory ? CATEGORIES.find(c => c.id === activeCategory)?.label : 'All experiences'}
            </h1>
            <p className="text-sm text-[#5C5A57]">{sorted.length} tours · Albania, Kosovo & cross-border</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#5C5A57]">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E9E2D5] rounded-lg px-3 py-2 text-sm font-medium hover:border-[#1F1D1B] cursor-pointer outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-24">
            <div className="font-serif text-3xl text-[#1F1D1B] mb-2">Nothing matches yet</div>
            <p className="text-sm text-[#5C5A57] mb-4">Try clearing some filters.</p>
            <button onClick={() => { setFilters({ country: null, priceMax: 1500, duration: null, language: null, rating: null, instant: false, difficulty: null }); setActiveCategory(null); setSearchQuery(''); }}
              className="bg-[#1F1D1B] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#C75A3F] transition-colors">
              Clear all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {sorted.map((tour, i) => (
              <div key={tour.id} className="fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                <TourCard tour={tour} navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FILTERS DRAWER */}
      {showFilters && (
        <div className="fixed inset-0 z-50 fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[#E9E2D5] p-6 flex items-center justify-between">
              <h3 className="font-serif text-2xl">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-[#F8F4ED] rounded-full">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-8">
              <FilterSection title="Country">
                <div className="flex gap-2 flex-wrap">
                  {[null, 'Albania', 'Kosovo', 'Cross-border'].map((c) => (
                    <button key={c || 'all'} onClick={() => setFilters({ ...filters, country: c })}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${filters.country === c ? 'bg-[#1F1D1B] text-white border-[#1F1D1B]' : 'border-[#E9E2D5] hover:border-[#1F1D1B]'}`}>
                      {c || 'Anywhere'}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title={`Price up to €${filters.priceMax}`}>
                <input
                  type="range" min="20" max="1500" step="10"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({ ...filters, priceMax: parseInt(e.target.value) })}
                  className="w-full accent-[#C75A3F]"
                />
                <div className="flex justify-between text-xs text-[#5C5A57] mt-1">
                  <span>€20</span><span>€1500+</span>
                </div>
              </FilterSection>

              <FilterSection title="Language of guide">
                <div className="flex gap-2 flex-wrap">
                  {[null, 'English', 'Italian', 'German', 'Albanian'].map((l) => (
                    <button key={l || 'any'} onClick={() => setFilters({ ...filters, language: l })}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${filters.language === l ? 'bg-[#1F1D1B] text-white border-[#1F1D1B]' : 'border-[#E9E2D5] hover:border-[#1F1D1B]'}`}>
                      {l || 'Any'}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Difficulty">
                <div className="flex gap-2 flex-wrap">
                  {[null, 'easy', 'moderate', 'strenuous'].map((d) => (
                    <button key={d || 'any'} onClick={() => setFilters({ ...filters, difficulty: d })}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors capitalize ${filters.difficulty === d ? 'bg-[#1F1D1B] text-white border-[#1F1D1B]' : 'border-[#E9E2D5] hover:border-[#1F1D1B]'}`}>
                      {d || 'Any'}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Minimum rating">
                <div className="flex gap-2 flex-wrap">
                  {[null, 4.5, 4.8, 4.9].map((r) => (
                    <button key={r || 'any'} onClick={() => setFilters({ ...filters, rating: r })}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${filters.rating === r ? 'bg-[#1F1D1B] text-white border-[#1F1D1B]' : 'border-[#E9E2D5] hover:border-[#1F1D1B]'}`}>
                      {r ? `${r}+` : 'Any'}
                    </button>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Booking">
                <label className="flex items-center justify-between cursor-pointer p-3 -mx-3 hover:bg-[#F8F4ED] rounded-xl">
                  <div>
                    <div className="text-sm font-medium">Instant booking only</div>
                    <div className="text-xs text-[#5C5A57]">Confirmed without waiting</div>
                  </div>
                  <input type="checkbox" checked={filters.instant} onChange={(e) => setFilters({ ...filters, instant: e.target.checked })}
                    className="w-5 h-5 accent-[#C75A3F]" />
                </label>
              </FilterSection>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-[#E9E2D5] p-4 flex gap-3">
              <button
                onClick={() => setFilters({ country: null, priceMax: 1500, duration: null, language: null, rating: null, instant: false, difficulty: null })}
                className="flex-1 py-3 text-sm font-medium underline"
              >Clear all</button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-[#1F1D1B] text-white py-3 rounded-xl font-medium hover:bg-[#C75A3F] transition-colors"
              >Show {tours.length} tours</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-3 text-[#1F1D1B]">{title}</h4>
      {children}
    </div>
  );
}

// ============= TOUR DETAIL PAGE =============
function TourPage({ tour, agent, navigate, wishlist, toggleWishlist, user }) {
  if (!tour) return <div className="p-20 text-center">Tour not found</div>;
  const reviews = REVIEWS.filter(r => r.tourId === tour.id);
  const isWishlisted = wishlist.has(tour.id);

  return (
    <div className="fade-in max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
      <div className="mb-2">
        <button onClick={() => navigate('browse')} className="text-sm text-[#5C5A57] hover:text-[#1F1D1B] flex items-center gap-1 mb-4">
          <ChevronLeft size={14} /> Back to all tours
        </button>
        <h1 className="font-serif text-4xl lg:text-5xl text-[#1F1D1B] leading-tight mb-3">{tour.title}</h1>
        <div className="flex items-center gap-4 flex-wrap text-sm">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-[#1F1D1B] text-[#1F1D1B]" />
            <strong>{tour.rating}</strong>
            <span className="text-[#5C5A57]">({tour.reviews} reviews)</span>
          </div>
          <span className="text-[#5C5A57]">·</span>
          <span className="flex items-center gap-1 text-[#5C5A57]"><MapPin size={13} />{tour.city}, {tour.country}</span>
          {tour.badge && (
            <>
              <span className="text-[#5C5A57]">·</span>
              <span className="bg-[#C75A3F] text-white px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">{tour.badge}</span>
            </>
          )}
          <button onClick={() => toggleWishlist(tour.id)} className="ml-auto flex items-center gap-1.5 text-sm font-medium hover:bg-[#F8F4ED] px-3 py-1.5 rounded-lg">
            <Heart size={15} className={isWishlisted ? 'fill-[#C75A3F] text-[#C75A3F]' : ''} /> Save
          </button>
        </div>
      </div>

      {/* GALLERY */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[480px] rounded-3xl overflow-hidden mt-6 mb-12">
        <div className="col-span-2 row-span-2 relative">
          <img src={tour.image} alt="" className="w-full h-full object-cover" />
        </div>
        {[
          'https://upload.wikimedia.org/wikipedia/commons/4/41/Lezh%C3%AB%2C_Albania_%E2%80%93_Skanderbeg_Memorial_2016_02.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/1/16/Gjirokaster_2016-2017.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/8/87/Theth_Church_Albania.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Vjosa_river_mouth.jpg/3840px-Vjosa_river_mouth.jpg',
        ].map((src, i) => (
          <div key={i} className="relative">
            <img src={src} alt="" className="w-full h-full object-cover" />
            {i === 3 && (
              <div className="absolute bottom-3 right-3 bg-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                <Camera size={12} /> Show all photos
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 pb-6 border-b border-[#E9E2D5] mb-6">
            <button onClick={() => navigate('agent', { id: agent.id })} className="flex items-center gap-3 group">
              <img src={agent.image} alt={agent.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="text-left">
                <div className="font-medium text-[#1F1D1B] group-hover:underline flex items-center gap-1.5">
                  {agent.name} <BadgeCheck size={14} className="text-[#3F7D58]" />
                </div>
                <div className="text-xs text-[#5C5A57]">{agent.years} years on Adriatik Tours · Replies in {agent.responseTime}</div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Clock, label: 'Duration', value: tour.duration },
              { icon: Users, label: 'Group size', value: `Up to ${tour.groupSize}` },
              { icon: Languages, label: 'Languages', value: tour.languages.length },
              { icon: Mountain, label: 'Difficulty', value: tour.difficulty, capitalize: true },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="border border-[#E9E2D5] rounded-2xl p-4">
                  <Icon size={18} className="text-[#5C5A57] mb-2" />
                  <div className="text-xs text-[#5C5A57] mb-0.5">{m.label}</div>
                  <div className={`text-sm font-medium ${m.capitalize ? 'capitalize' : ''}`}>{m.value}</div>
                </div>
              );
            })}
          </div>

          <section className="mb-10">
            <h2 className="font-serif text-3xl mb-4">About this tour</h2>
            <p className="text-[#5C5A57] leading-relaxed">{tour.description}</p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl mb-5">What's included</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Local certified guide', 'All transportation', 'Entrance fees',
                'Lunch with local family', 'Bottled water', 'Insurance coverage',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <Check size={16} className="text-[#3F7D58] shrink-0" />{item}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl mb-5">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {tour.languages.map((l) => (
                <span key={l} className="border border-[#E9E2D5] rounded-full px-4 py-2 text-sm flex items-center gap-1.5">
                  <Globe size={13} /> {l}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-10 pb-10 border-b border-[#E9E2D5]">
            <h2 className="font-serif text-3xl mb-5">Cancellation policy</h2>
            <div className="bg-[#F8F4ED] rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-[#3F7D58] mt-0.5" />
                <div>
                  <div className="font-medium mb-1">{tour.cancellation}</div>
                  <div className="text-sm text-[#5C5A57]">
                    {tour.cancellation === 'Strict'
                      ? 'Non-refundable except in cases of force majeure.'
                      : 'Cancel before the cutoff for a full refund. Modifications subject to availability.'}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* REVIEWS */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Star size={26} className="fill-[#1F1D1B] text-[#1F1D1B]" />
              <h2 className="font-serif text-3xl">{tour.rating} · {tour.reviews} reviews</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {reviews.length > 0 ? reviews.map((r) => (
                <div key={r.id}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#1F1D1B] text-white flex items-center justify-center text-sm font-semibold">
                      {r.author[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{r.author} {r.country}</div>
                      <div className="text-xs text-[#5C5A57]">{r.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < r.rating ? 'fill-[#1F1D1B] text-[#1F1D1B]' : 'text-[#E9E2D5]'} />
                    ))}
                  </div>
                  <p className="text-sm text-[#5C5A57] leading-relaxed">{r.text}</p>
                </div>
              )) : (
                <p className="text-sm text-[#5C5A57]">No reviews yet for this tour. Be the first to share!</p>
              )}
            </div>
          </section>
        </div>

        {/* BOOKING WIDGET */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-white rounded-3xl border border-[#E9E2D5] shadow-lg p-6">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-serif text-3xl text-[#1F1D1B]">€{tour.price}</span>
              <span className="text-sm text-[#5C5A57]">per person</span>
            </div>
            <div className="border border-[#E9E2D5] rounded-2xl mb-4 overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-[#E9E2D5]">
                <div className="p-3">
                  <div className="text-[10px] uppercase tracking-wider font-semibold mb-1">Date</div>
                  <div className="text-sm">May 18, 2026</div>
                </div>
                <div className="p-3">
                  <div className="text-[10px] uppercase tracking-wider font-semibold mb-1">Travelers</div>
                  <div className="text-sm">2 adults</div>
                </div>
              </div>
              <div className="border-t border-[#E9E2D5] p-3">
                <div className="text-[10px] uppercase tracking-wider font-semibold mb-1">Language</div>
                <div className="text-sm">English</div>
              </div>
            </div>
            <button
              onClick={() => navigate('booking', { id: tour.id })}
              className="w-full bg-[#C75A3F] hover:bg-[#B44E35] text-white py-3.5 rounded-xl font-semibold transition-colors mb-3"
            >
              {tour.instant ? 'Book instantly' : 'Request to book'}
            </button>
            <p className="text-xs text-center text-[#5C5A57] mb-4">You won't be charged yet</p>
            <div className="space-y-2 pt-4 border-t border-[#E9E2D5]">
              <div className="flex justify-between text-sm">
                <span className="text-[#5C5A57]">€{tour.price} × 2 travelers</span>
                <span>€{tour.price * 2}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5C5A57]">Service fee</span>
                <span>€{Math.round(tour.price * 2 * 0.05)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-3 border-t border-[#E9E2D5]">
                <span>Total (EUR)</span>
                <span>€{tour.price * 2 + Math.round(tour.price * 2 * 0.05)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= AGENTS LIST PAGE =============
function AgentsPage({ agents, navigate }) {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = agents.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (country && !a.location.includes(country)) return false;
    if (specialty && !a.specialties.includes(specialty)) return false;
    if (verifiedOnly && !a.verified) return false;
    return true;
  });

  return (
    <div className="fade-in max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-[#C75A3F] font-semibold mb-2">Verified local experts</p>
        <h1 className="font-serif text-5xl lg:text-6xl text-[#1F1D1B] leading-[1] mb-3">
          The agents.
          <br />
          <em className="italic text-[#5C5A57]">Not the algorithm.</em>
        </h1>
        <p className="text-lg text-[#5C5A57] max-w-2xl">
          Every operator on Adriatik Tours is licensed, insured, and personally vetted. Browse them by specialty,
          language, and region.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-[#E9E2D5]">
        <div className="flex items-center gap-2 bg-white border border-[#E9E2D5] rounded-full px-4 py-2.5 flex-1 min-w-[240px]">
          <Search size={14} className="text-[#5C5A57]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search agents by name..."
            className="bg-transparent outline-none text-sm flex-1" />
        </div>
        {[
          { label: 'Country', value: country, setter: setCountry, opts: [null, 'Albania', 'Kosovo'] },
          { label: 'Specialty', value: specialty, setter: setSpecialty, opts: [null, 'Cultural', 'Hiking', 'Adventure', 'Beach', 'Food & Wine', 'Cross-border', 'City Tours'] },
        ].map((g) => (
          <select key={g.label} value={g.value || ''} onChange={(e) => g.setter(e.target.value || null)}
            className="bg-white border border-[#E9E2D5] rounded-full px-4 py-2.5 text-sm font-medium hover:border-[#1F1D1B] cursor-pointer outline-none">
            <option value="">{g.label}: any</option>
            {g.opts.filter(Boolean).map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        <button
          onClick={() => setVerifiedOnly(!verifiedOnly)}
          className={`px-4 py-2.5 rounded-full text-sm font-medium border flex items-center gap-2 transition-colors ${verifiedOnly ? 'bg-[#1F1D1B] text-white border-[#1F1D1B]' : 'border-[#E9E2D5] hover:border-[#1F1D1B] bg-white'}`}
        >
          <BadgeCheck size={14} /> Verified only
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a, i) => (
          <div key={a.id} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <AgentCard agent={a} navigate={navigate} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#5C5A57]">No agents match those filters.</p>
        </div>
      )}
    </div>
  );
}

// ============= AGENT PROFILE PAGE =============
function AgentPage({ agent, tours, navigate, wishlist, toggleWishlist }) {
  if (!agent) return <div className="p-20 text-center">Agent not found</div>;

  return (
    <div className="fade-in">
      <div className="relative h-[360px] overflow-hidden">
        <img src={agent.cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 -mt-32 relative">
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-[#E9E2D5]">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <img src={agent.image} alt={agent.name} className="w-32 h-32 rounded-full object-cover mb-4 -mt-20 border-4 border-white shadow-lg" />
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-serif text-4xl text-[#1F1D1B]">{agent.name}</h1>
                {agent.verified && <BadgeCheck size={22} className="text-[#3F7D58] fill-[#3F7D58]/15" />}
              </div>
              <p className="text-[#5C5A57] mb-5">{agent.tagline}</p>
              <div className="space-y-3 text-sm border-t border-[#E9E2D5] pt-5">
                <div className="flex items-start gap-3">
                  <Star size={15} className="fill-[#1F1D1B] text-[#1F1D1B] mt-0.5" />
                  <div>
                    <div><strong>{agent.rating}</strong> rating · {agent.reviews} reviews</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-[#5C5A57] mt-0.5" />
                  <div>{agent.location}</div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase size={15} className="text-[#5C5A57] mt-0.5" />
                  <div>License No. {agent.license}</div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle size={15} className="text-[#5C5A57] mt-0.5" />
                  <div>Replies in {agent.responseTime}</div>
                </div>
                <div className="flex items-start gap-3">
                  <Languages size={15} className="text-[#5C5A57] mt-0.5" />
                  <div>{agent.languages.join(' · ')}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {agent.badges.map((b) => (
                  <span key={b} className="text-xs bg-[#F8F4ED] text-[#1F1D1B] px-3 py-1.5 rounded-full font-medium border border-[#E9E2D5]">{b}</span>
                ))}
              </div>
              <button className="w-full mt-6 bg-[#1F1D1B] hover:bg-[#C75A3F] text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={16} /> Message {agent.name.split(' ')[0]}
              </button>
            </div>
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl text-[#1F1D1B] mb-3">About</h2>
              <p className="text-[#5C5A57] leading-relaxed mb-8">{agent.bio}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { v: agent.tours, l: 'Tours offered' },
                  { v: agent.years, l: 'Years on Adriatik Tours' },
                  { v: agent.reviews, l: 'Total reviews' },
                ].map((s) => (
                  <div key={s.l} className="border border-[#E9E2D5] rounded-2xl p-4">
                    <div className="font-serif text-3xl text-[#1F1D1B] mb-1">{s.v}</div>
                    <div className="text-xs text-[#5C5A57]">{s.l}</div>
                  </div>
                ))}
              </div>

              <h3 className="font-serif text-2xl text-[#1F1D1B] mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {agent.specialties.map((s) => (
                  <span key={s} className="border border-[#1F1D1B] text-[#1F1D1B] px-4 py-2 rounded-full text-sm font-medium">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="py-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-serif text-4xl text-[#1F1D1B]">Tours by {agent.name}</h2>
            <span className="text-sm text-[#5C5A57]">{tours.length} tours</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {tours.map((t, i) => (
              <div key={t.id} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <TourCard tour={t} navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// ============= BOOKING PAGE =============
function BookingPage({ tour, agent, navigate, user, setUser }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('2026-05-18');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [language, setLanguage] = useState(tour?.languages[0] || 'English');
  const [pickup, setPickup] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [card, setCard] = useState('');

  if (!tour) return <div className="p-20 text-center">Tour not found</div>;

  const subtotal = tour.price * adults + tour.price * 0.5 * children;
  const addons = (pickup ? 15 : 0) + (photo ? 35 : 0);
  const fee = Math.round(subtotal * 0.05);
  const total = subtotal + addons + fee;

  return (
    <div className="fade-in max-w-[1100px] mx-auto px-6 lg:px-10 py-10">
      <button onClick={() => navigate('tour', { id: tour.id })} className="text-sm text-[#5C5A57] hover:text-[#1F1D1B] flex items-center gap-1 mb-4">
        <ChevronLeft size={14} /> Back to tour
      </button>
      <h1 className="font-serif text-4xl text-[#1F1D1B] mb-8">Confirm and pay</h1>

      <div className="flex items-center gap-4 mb-10">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${step >= s ? 'text-[#1F1D1B]' : 'text-[#5C5A57]'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${step >= s ? 'bg-[#1F1D1B] text-white' : 'bg-[#E9E2D5]'}`}>
                {step > s ? <Check size={14} /> : s}
              </div>
              <span className="text-sm font-medium">{['Trip details', 'Add-ons', 'Pay'][s - 1]}</span>
            </div>
            {s < 3 && <div className={`flex-1 h-px ${step > s ? 'bg-[#1F1D1B]' : 'bg-[#E9E2D5]'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 space-y-8">
          {step === 1 && (
            <div className="space-y-6 fade-in">
              <div>
                <label className="block text-sm font-semibold mb-2">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-[#E9E2D5] rounded-xl px-4 py-3 outline-none focus:border-[#1F1D1B] bg-white" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-3">Travelers</label>
                <div className="space-y-3">
                  {[
                    { l: 'Adults', s: '13+', v: adults, setter: setAdults },
                    { l: 'Children', s: '2–12, half price', v: children, setter: setChildren },
                  ].map((g) => (
                    <div key={g.l} className="flex items-center justify-between border border-[#E9E2D5] rounded-xl px-4 py-3">
                      <div>
                        <div className="font-medium">{g.l}</div>
                        <div className="text-xs text-[#5C5A57]">{g.s}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => g.setter(Math.max(g.l === 'Adults' ? 1 : 0, g.v - 1))}
                          className="w-8 h-8 rounded-full border border-[#E9E2D5] flex items-center justify-center hover:border-[#1F1D1B]">
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center font-medium">{g.v}</span>
                        <button onClick={() => g.setter(g.v + 1)}
                          className="w-8 h-8 rounded-full border border-[#E9E2D5] flex items-center justify-center hover:border-[#1F1D1B]">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Language of guide</label>
                <div className="flex gap-2 flex-wrap">
                  {tour.languages.map((l) => (
                    <button key={l} onClick={() => setLanguage(l)}
                      className={`px-4 py-2 rounded-full text-sm border transition-colors ${language === l ? 'bg-[#1F1D1B] text-white border-[#1F1D1B]' : 'border-[#E9E2D5] hover:border-[#1F1D1B]'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep(2)}
                className="w-full bg-[#C75A3F] hover:bg-[#B44E35] text-white py-3.5 rounded-xl font-semibold transition-colors">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 fade-in">
              <h3 className="font-serif text-2xl mb-1">Add-ons</h3>
              <p className="text-sm text-[#5C5A57] mb-6">Optional extras to make this tour yours.</p>
              {[
                { id: 'pickup', label: 'Hotel pickup', sub: 'From any Tirana hotel', price: 15, v: pickup, setter: setPickup },
                { id: 'photo', label: 'Photography package', sub: '50+ professional photos delivered next day', price: 35, v: photo, setter: setPhoto },
              ].map((a) => (
                <button key={a.id} onClick={() => a.setter(!a.v)}
                  className={`w-full text-left border-2 rounded-xl p-4 transition-colors ${a.v ? 'border-[#1F1D1B] bg-[#F8F4ED]' : 'border-[#E9E2D5] hover:border-[#1F1D1B]'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{a.label}</div>
                    <div className="font-semibold">+€{a.price}</div>
                  </div>
                  <div className="text-xs text-[#5C5A57]">{a.sub}</div>
                </button>
              ))}
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(1)} className="flex-1 border border-[#E9E2D5] py-3 rounded-xl font-medium hover:border-[#1F1D1B]">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-[#C75A3F] hover:bg-[#B44E35] text-white py-3 rounded-xl font-semibold transition-colors">Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 fade-in">
              <h3 className="font-serif text-2xl">Your details</h3>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
                className="w-full border border-[#E9E2D5] rounded-xl px-4 py-3 outline-none focus:border-[#1F1D1B] bg-white" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"
                className="w-full border border-[#E9E2D5] rounded-xl px-4 py-3 outline-none focus:border-[#1F1D1B] bg-white" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (for WhatsApp confirmation)"
                className="w-full border border-[#E9E2D5] rounded-xl px-4 py-3 outline-none focus:border-[#1F1D1B] bg-white" />

              <h3 className="font-serif text-2xl pt-4">Pay with</h3>
              <div className="border-2 border-[#1F1D1B] rounded-xl p-4 flex items-center gap-3">
                <CreditCard size={20} />
                <input value={card} onChange={(e) => setCard(e.target.value)} placeholder="Card number"
                  className="flex-1 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="MM / YY" className="border border-[#E9E2D5] rounded-xl px-4 py-3 outline-none focus:border-[#1F1D1B] bg-white" />
                <input placeholder="CVV" className="border border-[#E9E2D5] rounded-xl px-4 py-3 outline-none focus:border-[#1F1D1B] bg-white" />
              </div>
              <div className="flex items-center gap-2 pt-2 text-xs text-[#5C5A57]">
                <Shield size={14} /> Secured by Stripe · 256-bit encryption
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(2)} className="flex-1 border border-[#E9E2D5] py-3 rounded-xl font-medium hover:border-[#1F1D1B]">Back</button>
                <button onClick={() => {
                  if (!user) setUser({ type: 'client', name: name || 'Guest', email: email || 'guest@adriatik-tours.app' });
                  alert('🎉 Booking confirmed! A voucher and WhatsApp confirmation are on their way.');
                  navigate('dashboard-client');
                }}
                  className="flex-1 bg-[#C75A3F] hover:bg-[#B44E35] text-white py-3 rounded-xl font-semibold transition-colors">
                  Confirm and pay €{total.toFixed(0)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SUMMARY */}
        <div className="lg:col-span-2">
          <div className="sticky top-32 bg-white border border-[#E9E2D5] rounded-3xl p-6">
            <div className="flex gap-4 mb-5 pb-5 border-b border-[#E9E2D5]">
              <img src={tour.image} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1">
                <h4 className="font-medium text-sm leading-snug mb-1">{tour.title}</h4>
                <div className="flex items-center gap-1 text-xs text-[#5C5A57] mb-1">
                  <Star size={11} className="fill-[#1F1D1B] text-[#1F1D1B]" /> {tour.rating} ({tour.reviews})
                </div>
                <div className="text-xs text-[#5C5A57]">{tour.duration} · {tour.city}</div>
              </div>
            </div>
            <h4 className="font-semibold text-sm mb-3">Price details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[#5C5A57]">€{tour.price} × {adults} adults</span><span>€{tour.price * adults}</span></div>
              {children > 0 && <div className="flex justify-between"><span className="text-[#5C5A57]">€{tour.price * 0.5} × {children} kids</span><span>€{tour.price * 0.5 * children}</span></div>}
              {pickup && <div className="flex justify-between"><span className="text-[#5C5A57]">Hotel pickup</span><span>€15</span></div>}
              {photo && <div className="flex justify-between"><span className="text-[#5C5A57]">Photography</span><span>€35</span></div>}
              <div className="flex justify-between"><span className="text-[#5C5A57]">Service fee</span><span>€{fee}</span></div>
              <div className="flex justify-between font-semibold pt-3 border-t border-[#E9E2D5] text-base">
                <span>Total (EUR)</span><span>€{total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= AUTH PAGE =============
function AuthPage({ navigate, setUser, initialType = 'client' }) {
  const [type, setType] = useState(initialType);
  const [mode, setMode] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="fade-in max-w-md mx-auto px-6 py-16">
      <div className="text-center mb-8">
        <img src="/logo.png" alt="Adriatik Tours" className="h-12 w-auto mx-auto mb-4" />
        <h1 className="font-serif text-4xl text-[#1F1D1B] mb-2">
          {mode === 'signup' ? 'Welcome to Adriatik Tours' : 'Welcome back'}
        </h1>
        <p className="text-sm text-[#5C5A57]">
          {mode === 'signup' ? 'Choose how you want to use Adriatik Tours' : 'Log in to your account'}
        </p>
      </div>

      {mode === 'signup' && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button onClick={() => setType('client')}
            className={`p-5 rounded-2xl border-2 text-left transition-colors ${type === 'client' ? 'border-[#1F1D1B] bg-[#F8F4ED]' : 'border-[#E9E2D5] hover:border-[#1F1D1B]'}`}>
            <Compass size={20} className="mb-2 text-[#C75A3F]" />
            <div className="font-semibold text-sm mb-0.5">I'm a traveler</div>
            <div className="text-xs text-[#5C5A57]">Browse and book tours</div>
          </button>
          <button onClick={() => setType('agent')}
            className={`p-5 rounded-2xl border-2 text-left transition-colors ${type === 'agent' ? 'border-[#1F1D1B] bg-[#F8F4ED]' : 'border-[#E9E2D5] hover:border-[#1F1D1B]'}`}>
            <Briefcase size={20} className="mb-2 text-[#C75A3F]" />
            <div className="font-semibold text-sm mb-0.5">I'm an agent</div>
            <div className="text-xs text-[#5C5A57]">List tours and earn</div>
          </button>
        </div>
      )}

      <div className="space-y-3">
        {mode === 'signup' && (
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={type === 'agent' ? 'Operator name' : 'Full name'}
            className="w-full border border-[#E9E2D5] rounded-xl px-4 py-3 outline-none focus:border-[#1F1D1B] bg-white" />
        )}
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email"
          className="w-full border border-[#E9E2D5] rounded-xl px-4 py-3 outline-none focus:border-[#1F1D1B] bg-white" />
        <div className="relative">
          <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPw ? 'text' : 'password'} placeholder="Password"
            className="w-full border border-[#E9E2D5] rounded-xl px-4 py-3 pr-12 outline-none focus:border-[#1F1D1B] bg-white" />
          <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C5A57]">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <button
          onClick={() => {
            if (!email) { alert('Enter your email'); return; }
            setUser({ type, name: name || email.split('@')[0], email });
            navigate(type === 'agent' ? 'dashboard-agent' : 'dashboard-client');
          }}
          className="w-full bg-[#1F1D1B] hover:bg-[#C75A3F] text-white py-3.5 rounded-xl font-semibold transition-colors"
        >
          {mode === 'signup' ? `Create ${type} account` : 'Log in'}
        </button>
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-[#E9E2D5]" />
          <span className="text-xs text-[#5C5A57]">or continue with</span>
          <div className="flex-1 h-px bg-[#E9E2D5]" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Google', 'Apple', 'Email'].map((p) => (
            <button key={p} className="border border-[#E9E2D5] rounded-xl py-3 text-sm font-medium hover:border-[#1F1D1B] transition-colors bg-white">
              {p}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-[#5C5A57] pt-3">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
          {' '}
          <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')} className="text-[#1F1D1B] font-semibold hover:underline">
            {mode === 'signup' ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}

// ============= CLIENT DASHBOARD =============
function ClientDashboard({ user, navigate, wishlist }) {
  const [tab, setTab] = useState('upcoming');
  const wishlistTours = TOURS.filter(t => wishlist.has(t.id));
  return (
    <div className="fade-in max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#C75A3F] font-semibold mb-2">My Adriatik Tours</p>
          <h1 className="font-serif text-5xl text-[#1F1D1B]">Hi, {user.name}.</h1>
        </div>
        <div className="flex gap-3">
          <button className="border border-[#E9E2D5] rounded-full p-3 hover:border-[#1F1D1B] bg-white relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C75A3F]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { v: 1, l: 'Upcoming trips', icon: Calendar },
          { v: 3, l: 'Past tours', icon: Check },
          { v: wishlist.size, l: 'Saved', icon: Heart },
          { v: '5★', l: 'Avg. rating given', icon: Star },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white border border-[#E9E2D5] rounded-2xl p-5">
              <Icon size={18} className="text-[#5C5A57] mb-3" />
              <div className="font-serif text-3xl text-[#1F1D1B]">{s.v}</div>
              <div className="text-xs text-[#5C5A57]">{s.l}</div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-1 mb-6 border-b border-[#E9E2D5]">
        {[
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'past', label: 'Past' },
          { id: 'wishlist', label: `Wishlist (${wishlist.size})` },
          { id: 'messages', label: 'Messages' },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${tab === t.id ? 'border-[#1F1D1B] text-[#1F1D1B]' : 'border-transparent text-[#5C5A57] hover:text-[#1F1D1B]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'upcoming' && (
        <div className="bg-white border border-[#E9E2D5] rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-3 gap-0">
            <img src={TOURS[0].image} className="md:col-span-1 h-64 md:h-auto object-cover" />
            <div className="md:col-span-2 p-6">
              <div className="flex items-center gap-2 text-xs text-[#3F7D58] font-medium mb-2">
                <span className="w-2 h-2 rounded-full bg-[#3F7D58]" /> Confirmed · in 12 days
              </div>
              <h3 className="font-serif text-2xl mb-1">{TOURS[0].title}</h3>
              <p className="text-sm text-[#5C5A57] mb-4">May 18, 2026 · 2 travelers · English guide</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Voucher', 'Itinerary', 'Message agent', 'Add to calendar'].map((b) => (
                  <button key={b} className="border border-[#E9E2D5] rounded-full px-4 py-1.5 text-xs font-medium hover:border-[#1F1D1B] transition-colors">
                    {b}
                  </button>
                ))}
              </div>
              <div className="text-xs text-[#5C5A57]">
                Booking ID: BLK-2026-018472
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'wishlist' && (
        wishlistTours.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E9E2D5] rounded-2xl">
            <Heart size={32} className="mx-auto mb-3 text-[#5C5A57]" />
            <p className="text-sm text-[#5C5A57] mb-4">Save tours you love by tapping the heart icon.</p>
            <button onClick={() => navigate('browse')} className="bg-[#1F1D1B] text-white px-5 py-2.5 rounded-full text-sm font-medium">Explore tours</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {wishlistTours.map(t => <TourCard key={t.id} tour={t} navigate={navigate} wishlist={wishlist} toggleWishlist={() => {}} />)}
          </div>
        )
      )}

      {(tab === 'past' || tab === 'messages') && (
        <div className="text-center py-20 bg-white border border-[#E9E2D5] rounded-2xl">
          <p className="text-sm text-[#5C5A57]">Nothing here yet.</p>
        </div>
      )}
    </div>
  );
}

// ============= AGENT DASHBOARD =============
function AgentDashboard({ user, navigate }) {
  const [tab, setTab] = useState('overview');
  const myTours = TOURS.slice(0, 4);

  return (
    <div className="fade-in max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#C75A3F] font-semibold mb-2">Agent dashboard</p>
          <h1 className="font-serif text-5xl text-[#1F1D1B]">Hi, {user.name.split(' ')[0]}.</h1>
        </div>
        <div className="flex gap-2">
          <button className="border border-[#E9E2D5] rounded-full p-3 hover:border-[#1F1D1B] bg-white relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C75A3F]" />
          </button>
          <button className="bg-[#1F1D1B] hover:bg-[#C75A3F] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2">
            <Plus size={16} /> New tour
          </button>
        </div>
      </div>

      {/* SETUP CHECKLIST */}
      <div className="bg-white border border-[#E9E2D5] rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Your shop is 80% set up</h3>
          <span className="text-xs text-[#5C5A57]">4/5 tasks completed</span>
        </div>
        <div className="h-2 bg-[#E9E2D5] rounded-full mb-4 overflow-hidden">
          <div className="h-full w-4/5 bg-[#C75A3F] rounded-full" />
        </div>
        <div className="grid sm:grid-cols-5 gap-2 text-xs">
          {[
            { l: 'Profile complete', d: true },
            { l: 'License verified', d: true },
            { l: 'First tour live', d: true },
            { l: 'Payouts setup', d: true },
            { l: 'Insurance docs', d: false },
          ].map((c) => (
            <div key={c.l} className={`flex items-center gap-2 ${c.d ? 'text-[#3F7D58]' : 'text-[#5C5A57]'}`}>
              {c.d ? <Check size={14} /> : <div className="w-3.5 h-3.5 rounded-full border border-[#5C5A57]" />}
              {c.l}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { v: '€4,820', l: 'Earnings this month', sub: '+18%', icon: TrendingUp, accent: true },
          { v: 47, l: 'Bookings this month', sub: '12 upcoming', icon: Calendar },
          { v: '4.94', l: 'Average rating', sub: '127 reviews', icon: Star },
          { v: '92%', l: 'Response rate', sub: '< 2 hours', icon: MessageCircle },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`rounded-2xl p-5 border ${s.accent ? 'bg-[#1F1D1B] text-white border-[#1F1D1B]' : 'bg-white border-[#E9E2D5]'}`}>
              <Icon size={18} className={s.accent ? 'text-[#E9C28A]' : 'text-[#5C5A57]'} />
              <div className={`font-serif text-3xl mt-3 ${s.accent ? 'text-white' : 'text-[#1F1D1B]'}`}>{s.v}</div>
              <div className={`text-xs ${s.accent ? 'text-white/70' : 'text-[#5C5A57]'}`}>{s.l}</div>
              <div className={`text-xs mt-1 ${s.accent ? 'text-[#E9C28A]' : 'text-[#3F7D58]'}`}>{s.sub}</div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-1 mb-6 border-b border-[#E9E2D5] overflow-x-auto scrollbar-hide">
        {['overview', 'tours', 'bookings', 'calendar', 'messages', 'payouts'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors capitalize whitespace-nowrap ${tab === t ? 'border-[#1F1D1B] text-[#1F1D1B]' : 'border-transparent text-[#5C5A57] hover:text-[#1F1D1B]'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-[#E9E2D5] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-2xl">Recent bookings</h3>
              <button onClick={() => setTab('bookings')} className="text-sm font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="divide-y divide-[#E9E2D5]">
              {[
                { name: 'Marco Rossi', tour: 'Theth to Valbona', date: 'May 18', pax: 2, total: 570, status: 'confirmed' },
                { name: 'Hannah Klein', tour: 'Berat Wine Walk', date: 'May 22', pax: 4, total: 260, status: 'confirmed' },
                { name: 'Olivia Taylor', tour: 'Rugova Via Ferrata', date: 'Jun 02', pax: 2, total: 220, status: 'pending' },
                { name: 'Pierre Dubois', tour: 'Tirana After Dark', date: 'Jun 09', pax: 3, total: 126, status: 'confirmed' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-4 py-4">
                  <div className="w-10 h-10 rounded-full bg-[#1F1D1B] text-white flex items-center justify-center text-sm font-semibold">
                    {b.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{b.name}</div>
                    <div className="text-xs text-[#5C5A57] truncate">{b.tour} · {b.date} · {b.pax} pax</div>
                  </div>
                  <div className="font-semibold text-sm">€{b.total}</div>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${b.status === 'confirmed' ? 'bg-[#3F7D58]/15 text-[#3F7D58]' : 'bg-[#D97706]/15 text-[#D97706]'}`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white border border-[#E9E2D5] rounded-2xl p-6">
              <h3 className="font-serif text-xl mb-4">Top tour this month</h3>
              <img src={myTours[0].image} className="w-full h-32 rounded-xl object-cover mb-3" />
              <div className="font-medium text-sm leading-snug mb-2">{myTours[0].title}</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#F8F4ED] rounded-lg p-2">
                  <div className="text-[#5C5A57]">Bookings</div>
                  <div className="font-serif text-xl">23</div>
                </div>
                <div className="bg-[#F8F4ED] rounded-lg p-2">
                  <div className="text-[#5C5A57]">Revenue</div>
                  <div className="font-serif text-xl">€2,915</div>
                </div>
              </div>
            </div>
            <div className="bg-[#F8F4ED] border border-[#E9E2D5] rounded-2xl p-6">
              <Award size={20} className="text-[#C75A3F] mb-2" />
              <h3 className="font-serif text-xl mb-2">You're outpacing 78% of agents</h3>
              <p className="text-xs text-[#5C5A57] mb-3">Your conversion rate (12.4%) is well above the platform average for hiking operators.</p>
              <button className="text-xs font-semibold underline">See full analytics</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'tours' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myTours.map((t) => (
            <div key={t.id} className="bg-white border border-[#E9E2D5] rounded-2xl overflow-hidden group">
              <div className="aspect-[16/10] relative">
                <img src={t.image} className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 size={14} />
                </button>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-sm leading-snug mb-2 line-clamp-1">{t.title}</h4>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#5C5A57]">
                    <span>€{t.price}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Star size={11} className="fill-[#1F1D1B] text-[#1F1D1B]" />{t.rating}</span>
                    <span>·</span>
                    <span>{t.reviews} reviews</span>
                  </div>
                  <span className="bg-[#3F7D58]/15 text-[#3F7D58] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">Live</span>
                </div>
              </div>
            </div>
          ))}
          <button className="border-2 border-dashed border-[#E9E2D5] rounded-2xl flex flex-col items-center justify-center min-h-[280px] hover:border-[#1F1D1B] transition-colors group">
            <Plus size={28} className="text-[#5C5A57] group-hover:text-[#C75A3F] mb-2" />
            <div className="text-sm font-medium">Add a new tour</div>
            <div className="text-xs text-[#5C5A57] mt-1">Use a template or start from scratch</div>
          </button>
        </div>
      )}

      {tab !== 'overview' && tab !== 'tours' && (
        <div className="bg-white border border-[#E9E2D5] rounded-2xl p-12 text-center">
          <div className="font-serif text-2xl mb-2 capitalize">{tab}</div>
          <p className="text-sm text-[#5C5A57]">Detailed {tab} view would render here in production.</p>
        </div>
      )}
    </div>
  );
}

// ============= FOOTER =============
function Footer({ navigate }) {
  return (
    <footer className="bg-[#1F1D1B] text-white mt-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Adriatik Tours" className="h-8 w-auto" />
              <span className="font-serif text-2xl">adriatik tours</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4 max-w-sm">
              Albania and Kosovo, exclusively. Built by locals, for the kind of trip
              you'll still talk about a decade from now.
            </p>
            <div className="flex gap-2">
              {['EN', 'SQ', 'IT', 'DE'].map((l) => (
                <button key={l} className="text-xs border border-white/20 px-3 py-1.5 rounded-full hover:bg-white hover:text-[#1F1D1B] transition-colors">
                  {l}
                </button>
              ))}
            </div>
          </div>
          {[
            { title: 'Discover', links: ['All tours', 'By region', 'By category', 'Cross-border', 'Multi-day'] },
            { title: 'For agents', links: ['List your tours', 'Pricing', 'Help center', 'Insurance', 'Best practices'] },
            { title: 'Company', links: ['About', 'Press', 'Careers', 'Sustainability', 'Contact'] },
          ].map((c) => (
            <div key={c.title} className="md:col-span-2">
              <div className="text-xs uppercase tracking-[0.18em] font-semibold mb-4 text-white/80">{c.title}</div>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-white/60 hover:text-white">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-[0.18em] font-semibold mb-4 text-white/80">Newsletter</div>
            <p className="text-xs text-white/60 mb-3">Once a month, real travel stories from Albania and Kosovo.</p>
            <div className="flex">
              <input placeholder="Email" className="bg-white/10 border border-white/20 rounded-l-full px-3 py-2 text-xs flex-1 outline-none placeholder-white/40" />
              <button className="bg-[#C75A3F] hover:bg-[#B44E35] rounded-r-full px-3 transition-colors">
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <div>© 2026 Adriatik Tours LLC</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy (GDPR)</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">DSAR</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
