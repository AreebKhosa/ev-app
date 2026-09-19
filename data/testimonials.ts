export interface TestimonialItem {
  id: string;
  author: string;
  handle: string;
  location: string;
  avatar: string;
  modelOwned: string;
  milesLogged: string;
  rating: number;
  quote: string;
}

export const TESTIMONIALS_ROW_1: TestimonialItem[] = [
  {
    id: "rev-1",
    author: "Marcus Vance",
    handle: "@marcus_v",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    modelOwned: "Volt Stealth Alpha",
    milesLogged: "1,840 km",
    rating: 5,
    quote: "The instantaneous torque curve is unreal. Conquered the steepest hills in Seattle without breaking a single sweat. Battery lasts well over 80 km on a single charge.",
  },
  {
    id: "rev-2",
    author: "Elena Rostova",
    handle: "@elena_rides",
    location: "Zurich, Switzerland",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    modelOwned: "Apex Nomad 750",
    milesLogged: "3,200 km",
    rating: 5,
    quote: "Took it through rough Alpine gravel trails and wet mud. The inverted suspension soaks up every pothole. Best industrial design on the market.",
  },
  {
    id: "rev-3",
    author: "David Chen",
    handle: "@dchen_tech",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    modelOwned: "CyberTrack GT",
    milesLogged: "950 km",
    rating: 5,
    quote: "The retina cockpit and turn-by-turn navigation are game-changing. Feels like driving a mini electric hypercar on two wheels.",
  },
  {
    id: "rev-4",
    author: "Sophie Miller",
    handle: "@sophie_m",
    location: "Berlin, Germany",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    modelOwned: "Pulse City Cruiser",
    milesLogged: "2,150 km",
    rating: 5,
    quote: "Completely replaced my daily train commute. It’s lightweight enough to bring up to my 2nd-floor apartment effortlessly.",
  },
];

export const TESTIMONIALS_ROW_2: TestimonialItem[] = [
  {
    id: "rev-5",
    author: "Julian Thorne",
    handle: "@julian_t",
    location: "Vancouver, BC",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
    modelOwned: "Apex Nomad 750",
    milesLogged: "4,100 km",
    rating: 5,
    quote: "Regenerative braking is phenomenal. I barely touch mechanical brake pads on steep declines, and it pumps battery power right back into the system.",
  },
  {
    id: "rev-6",
    author: "Amara Sinclair",
    handle: "@amara_s",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces",
    modelOwned: "Volt Stealth Alpha",
    milesLogged: "1,220 km",
    rating: 5,
    quote: "Build quality is top tier. The frosted paint and acid lime accents turn heads at every traffic stop. 10/10 recommendation.",
  },
  {
    id: "rev-7",
    author: "Liam O'Connor",
    handle: "@liam_oc",
    location: "Dublin, Ireland",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces",
    modelOwned: "CyberTrack GT",
    milesLogged: "2,780 km",
    rating: 5,
    quote: "The dual motors provide instant launch acceleration. Easily hits 65 km/h with rock solid stability on windy roads.",
  },
  {
    id: "rev-8",
    author: "Chloe Dubois",
    handle: "@chloe_d",
    location: "Paris, France",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=faces",
    modelOwned: "Pulse City Cruiser",
    milesLogged: "890 km",
    rating: 5,
    quote: "Fast charging is a lifesaver. From 20% to 80% while having lunch at a café. The mobile app sync is seamless.",
  },
];
